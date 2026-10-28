export const IMAGE_UPLOAD_ACCEPT = "image/png,image/jpeg,image/jpg,image/gif"

export const DOCUMENT_UPLOAD_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"

export const DEFAULT_MAX_IMAGE_SIZE_MB = 5
export const DEFAULT_MAX_DOCUMENT_SIZE_MB = 10

const IMAGE_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/gif"])

const DOCUMENT_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
])

const DOCUMENT_EXTENSIONS = new Set([".pdf", ".doc", ".docx"])

const getExtension = (filename: string): string => {
  const dot = filename.lastIndexOf(".")

  return dot === -1 ? "" : filename.slice(dot).toLowerCase()
}

const maxBytes = (maxMb: number): number => maxMb * 1024 * 1024

export const validateImageFile = (
  file: File,
  maxSizeMb = DEFAULT_MAX_IMAGE_SIZE_MB
): string | null => {
  if (file.size === 0) return "That file is empty."

  if (!IMAGE_MIME_TYPES.has(file.type)) {
    return "Upload a PNG, JPG, or GIF image."
  }

  if (file.size > maxBytes(maxSizeMb)) {
    return `Image must be under ${maxSizeMb} MB.`
  }

  return null
}

export const validateDocumentFile = (
  file: File,
  maxSizeMb = DEFAULT_MAX_DOCUMENT_SIZE_MB
): string | null => {
  if (file.size === 0) return "That file is empty."

  const hasAllowedMime = DOCUMENT_MIME_TYPES.has(file.type)
  const hasAllowedExtension = DOCUMENT_EXTENSIONS.has(getExtension(file.name))

  if (!hasAllowedMime && !hasAllowedExtension) {
    return "Upload a PDF or Word document (.pdf, .doc, .docx)."
  }

  if (file.size > maxBytes(maxSizeMb)) {
    return `Document must be under ${maxSizeMb} MB.`
  }

  return null
}
