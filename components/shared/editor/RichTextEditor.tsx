"use client"

import * as React from "react"
import { toast } from "sonner"

import type { TElement, Value } from "platejs"
import type { LucideIcon } from "@/lib/icons"

import { KEYS } from "platejs"
import {
  Plate,
  useEditorRef,
  useEditorSelector,
  usePlateEditor,
} from "platejs/react"

import { uploadImageAction } from "@/app/actions/files"
import { Editor, EditorContainer } from "@/components/ui/editor"
import { FixedToolbar } from "@/components/ui/fixed-toolbar"
import { LinkToolbarButton } from "@/components/ui/link-toolbar-button"
import { ListToolbarButton } from "@/components/ui/list-classic-toolbar-button"
import { MarkToolbarButton } from "@/components/ui/mark-toolbar-button"
import { ToolbarButton, ToolbarGroup } from "@/components/ui/toolbar"
import { IMAGE_UPLOAD_ACCEPT, validateImageFile } from "@/lib/files/upload"
import {
  IBold,
  IHeading1,
  IHeading2,
  IHeading3,
  IImage,
  IItalic,
} from "@/lib/icons"
import { isLikelyHtml, plainTextToHtml } from "@/lib/rich-text"
import { cn } from "@/lib/utils"

import { descriptionValueToHtml } from "./description-html"
import { DescriptionKit } from "./description-kit"

export type RichTextEditorHandle = {
  insertPlainText: (text: string) => void
  insertHtml: (html: string) => void
}

type RichTextEditorProps = {
  id?: string
  value: string
  onChange: (html: string) => void
  onBlur?: () => void
  disabled?: boolean
  placeholder?: string
  ariaInvalid?: boolean
  editorRef?: React.Ref<RichTextEditorHandle>
  /** Extra classes for the editable area — e.g. a max-h cap in dialogs. */
  contentClassName?: string
}

const EMPTY_VALUE: TElement[] = [{ type: "p", children: [{ text: "" }] }]

const SERIALIZE_DEBOUNCE_MS = 200

type HeadingToolbarButtonProps = {
  level: "h1" | "h2" | "h3"
  icon: LucideIcon
  tooltip: string
}

const HeadingToolbarButton = ({
  level,
  icon: Icon,
  tooltip,
}: HeadingToolbarButtonProps) => {
  const editor = useEditorRef()
  const pressed = useEditorSelector(
    (e) => e.api.some({ match: { type: level } }),
    [level]
  )

  return (
    <ToolbarButton
      pressed={pressed}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        editor.tf.toggleBlock(level)
        editor.tf.focus()
      }}
      tooltip={tooltip}
    >
      <Icon />
    </ToolbarButton>
  )
}

const ImageToolbarButton = () => {
  const editor = useEditorRef()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = React.useState(false)

  const handleFile = async (file: File) => {
    const validationError = validateImageFile(file)
    if (validationError) {
      toast.error(validationError)
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    const result = await uploadImageAction(formData)
    setIsUploading(false)

    if (result.url) {
      editor.tf.insertNodes({
        type: KEYS.img,
        url: result.url,
        children: [{ text: "" }],
      })
      editor.tf.focus()
      return
    }

    toast.error(
      result.errors?.file?.[0] ??
        result.message ??
        "Couldn't upload that image."
    )
  }

  return (
    <>
      <ToolbarButton
        tooltip="Image"
        disabled={isUploading}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
      >
        <IImage />
      </ToolbarButton>
      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_UPLOAD_ACCEPT}
        className="sr-only"
        onChange={async (e) => {
          const file = e.target.files?.[0]
          e.target.value = ""
          if (file) await handleFile(file)
        }}
      />
    </>
  )
}

const RichTextEditor = ({
  id,
  value,
  onChange,
  onBlur,
  disabled,
  placeholder,
  ariaInvalid,
  editorRef,
  contentClassName,
}: RichTextEditorProps) => {
  // One-way controlled: initial HTML/plain-text deserializes once at mount,
  // then the editor owns state and pushes HTML via onChange — never re-deserialize on prop change.
  const initialHtmlRef = React.useRef(
    value ? (isLikelyHtml(value) ? value : plainTextToHtml(value)) : ""
  )

  const editor = usePlateEditor({
    plugins: DescriptionKit,
    value: (e) =>
      initialHtmlRef.current
        ? // Top-level deserialized nodes are always block elements
          (e.api.html.deserialize({
            element: initialHtmlRef.current,
          }) as Value)
        : EMPTY_VALUE,
  })

  const onChangeRef = React.useRef(onChange)
  React.useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  const seqRef = React.useRef(0)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingRef = React.useRef<Value | null>(null)

  const emit = React.useCallback(async () => {
    const pending = pendingRef.current
    if (!pending) return
    pendingRef.current = null
    const seq = ++seqRef.current
    const html = await descriptionValueToHtml(pending)
    // Drop stale results if a newer serialization started meanwhile
    if (seq === seqRef.current) onChangeRef.current(html)
  }, [])

  const handleValueChange = React.useCallback(
    ({ value: nextValue }: { value: Value }) => {
      pendingRef.current = nextValue
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => void emit(), SERIALIZE_DEBOUNCE_MS)
    },
    [emit]
  )

  const handleBlur = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    void emit()
    onBlur?.()
  }, [emit, onBlur])

  React.useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    []
  )

  const insertNodesAtEnd = React.useCallback(
    (nodes: TElement[]) => {
      if (!nodes.length) return

      if (editor.api.string([]).trim()) {
        editor.tf.insertNodes(nodes, { at: [editor.children.length] })
      } else {
        editor.tf.setValue(nodes)
      }
      editor.tf.focus({ edge: "endEditor" })
    },
    [editor]
  )

  React.useImperativeHandle(
    editorRef,
    () => ({
      insertPlainText: (text: string) => {
        const nodes: TElement[] = text
          .split(/\n+/)
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => ({ type: "p", children: [{ text: line }] }))
        insertNodesAtEnd(nodes)
      },
      // Deserializes real HTML (formatting preserved) rather than dumping raw
      // markup as text — used to insert admin-authored guideline content.
      insertHtml: (html: string) => {
        const nodes = editor.api.html.deserialize({ element: html }) as Value
        insertNodesAtEnd(nodes as TElement[])
      },
    }),
    [editor, insertNodesAtEnd]
  )

  return (
    <Plate
      editor={editor}
      onValueChange={handleValueChange}
      readOnly={disabled}
    >
      <div
        className={cn(
          "w-full rounded-xl border border-input shadow-xs transition-[color,box-shadow] dark:bg-input/30",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          ariaInvalid &&
            "border-destructive ring-3 ring-destructive/20 dark:border-destructive/50 dark:ring-destructive/40",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <FixedToolbar className="static z-auto justify-start rounded-t-md">
          <ToolbarGroup>
            <HeadingToolbarButton
              level="h1"
              icon={IHeading1}
              tooltip="Large heading"
            />

            <HeadingToolbarButton
              level="h2"
              icon={IHeading2}
              tooltip="Medium heading"
            />

            <HeadingToolbarButton
              level="h3"
              icon={IHeading3}
              tooltip="Small heading"
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <MarkToolbarButton nodeType={KEYS.bold} tooltip="Bold (⌘B)">
              <IBold />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={KEYS.italic} tooltip="Italic (⌘I)">
              <IItalic />
            </MarkToolbarButton>

            <LinkToolbarButton />
          </ToolbarGroup>
          <ToolbarGroup>
            <ListToolbarButton nodeType={KEYS.ulClassic} />

            <ListToolbarButton nodeType={KEYS.olClassic} />
          </ToolbarGroup>
          <ToolbarGroup>
            <ImageToolbarButton />
          </ToolbarGroup>
        </FixedToolbar>

        <EditorContainer>
          <Editor
            id={id}
            variant="none"
            className={cn(
              "min-h-40 px-2.5 py-2 text-base md:text-sm",
              contentClassName
            )}
            aria-invalid={ariaInvalid}
            disabled={disabled}
            placeholder={placeholder}
            onBlur={handleBlur}
          />
        </EditorContainer>
      </div>
    </Plate>
  )
}

export default RichTextEditor
