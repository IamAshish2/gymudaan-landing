"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"

import { previewRichTextAction } from "@/app/actions/rich-text"
import RichTextEditorLazy from "@/components/shared/editor/RichTextEditorLazy"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import GridContainer from "@/components/ui/GridContainer"
import { RICH_TEXT_CLASSES } from "@/lib/rich-text"

const INITIAL_HTML =
  "<h2>Hello there</h2><p>This is the <strong>rich text editor</strong>. Try headings, lists, links, and images.</p>"

const EditorDemo = () => {
  const [html, setHtml] = useState(INITIAL_HTML)
  const [preview, setPreview] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handlePreview = () => {
    startTransition(async () => {
      const result = await previewRichTextAction(html)

      if (result.html === undefined) {
        toast.error(result.message ?? "Couldn't render the preview.")
        return
      }

      setPreview(result.html)
    })
  }

  return (
    <GridContainer className="gap-4 md:gap-6">
      <Card className="col-span-4 lg:col-span-6">
        <CardHeader>
          <CardTitle>Editor</CardTitle>
          <CardDescription>Output is stored as HTML.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <RichTextEditorLazy
            id="editor-demo"
            value={html}
            onChange={setHtml}
            placeholder="Start writing…"
          />
          <Button
            type="button"
            className="self-end"
            onClick={handlePreview}
            disabled={isPending}
          >
            {isPending ? "Rendering…" : "Preview"}
          </Button>
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-6">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Sanitized on the server.</CardDescription>
        </CardHeader>
        <CardContent>
          {preview === null ? (
            <p className="text-sm text-muted-foreground">
              Press Preview to render the editor content.
            </p>
          ) : (
            // Safe: the HTML came back from the server-side sanitizer.
            <div
              className={RICH_TEXT_CLASSES}
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          )}
        </CardContent>
      </Card>
    </GridContainer>
  )
}

export default EditorDemo
