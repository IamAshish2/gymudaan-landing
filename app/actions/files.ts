"use server"

import { uploadDocument, uploadImage } from "@/lib/files/api"
import { ApiError } from "@/lib/api-client"
import { getSessionUser } from "@/lib/auth/get-session-user"
import { validateDocumentFile, validateImageFile } from "@/lib/files/upload"
import type { FileUploadState } from "@/lib/types"
const requireAuthenticatedUploader =
  async (): Promise<FileUploadState | null> => {
    const user = await getSessionUser()

    if (!user) {
      return { message: "You need to be logged in to upload files." }
    }

    return null
  }

const readUploadedFile = (formData: FormData): File | FileUploadState => {
  const file = formData.get("file")

  if (!(file instanceof File)) {
    return { errors: { file: ["Choose a file to upload."] } }
  }

  return file
}

export const uploadImageAction = async (
  formData: FormData
): Promise<FileUploadState> => {
  const authError = await requireAuthenticatedUploader()
  if (authError) return authError

  const fileResult = readUploadedFile(formData)
  if (!(fileResult instanceof File)) return fileResult

  const validationError = validateImageFile(fileResult)
  if (validationError) {
    return { errors: { file: [validationError] } }
  }

  try {
    const url = await uploadImage(fileResult, fileResult.name)

    return { url, message: "Image uploaded." }
  } catch (err) {
    if (err instanceof ApiError) {
      return { message: err.message }
    }

    return { message: "Couldn't upload that image. Please try again." }
  }
}

export const uploadDocumentAction = async (
  formData: FormData
): Promise<FileUploadState> => {
  const authError = await requireAuthenticatedUploader()
  if (authError) return authError

  const fileResult = readUploadedFile(formData)
  if (!(fileResult instanceof File)) return fileResult

  const validationError = validateDocumentFile(fileResult)
  if (validationError) {
    return { errors: { file: [validationError] } }
  }

  try {
    const url = await uploadDocument(fileResult, fileResult.name)

    return { url, message: "Document uploaded." }
  } catch (err) {
    if (err instanceof ApiError) {
      return { message: err.message }
    }

    return { message: "Couldn't upload that document. Please try again." }
  }
}
