import "server-only"

import { apiFetch, ApiError } from "@/lib/api-client"

export const parseUploadedFileUrl = (data: unknown): string => {
  if (typeof data === "string" && data.length > 0) {
    return data
  }

  if (
    data &&
    typeof data === "object" &&
    "url" in data &&
    typeof (data as { url: unknown }).url === "string"
  ) {
    return (data as { url: string }).url
  }

  throw new ApiError(
    500,
    "Upload succeeded but returned an unexpected response."
  )
}

const uploadFile = async (
  path: "/files/upload" | "/files/upload-pdf",
  file: Blob,
  filename: string
): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file, filename)

  const data = await apiFetch<unknown>(path, {
    method: "POST",
    body: formData,
  })

  return parseUploadedFileUrl(data)
}

export const uploadImage = async (
  file: Blob,
  filename: string
): Promise<string> => uploadFile("/files/upload", file, filename)

export const uploadDocument = async (
  file: Blob,
  filename: string
): Promise<string> => uploadFile("/files/upload-pdf", file, filename)
