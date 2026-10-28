import type { Metadata } from "next"

import EditorDemo from "@/components/rich-text/EditorDemo"
import Typography from "@/components/ui/Typography"
import { requireRole } from "@/lib/auth/permissions"

export const metadata: Metadata = {
  title: "Editor",
  robots: { index: false, follow: false },
}

// Demo page — shows the Plate editor wired to the image-upload action and the
// server-side sanitizer. Delete it (and its nav item) when you no longer need it.
const EditorPage = async () => {
  await requireRole("USER")

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" as="h1">
          Rich text editor
        </Typography>
        <Typography variant="muted">
          Write on the left; the preview is sanitized on the server exactly as
          stored content would be.
        </Typography>
      </div>

      <EditorDemo />
    </div>
  )
}

export default EditorPage
