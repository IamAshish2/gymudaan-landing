export type ApiEnvelope<T> = {
  success: boolean
  status: number
  message: string
  data: T
}

/** Return type of every server action — never throw to the client, return this instead. */
export type ActionState = {
  errors?: Record<string, string[]>
  message?: string
  id?: number | string
}

/** Returned by upload server actions — `url` is the temp-storage URL from the API. */
export type FileUploadState = ActionState & {
  url?: string
}

/** Audit block the API attaches to persisted entities. */
export type Audit = {
  addedBy: string
  updatedBy: string
  createdDate: string
  localTimeZone: string | null
  activeStatus: boolean
  lastModifiedDate: string
}

// Spring Data page wrapper — shared shape across every paginated list endpoint.
export type Page<T> = {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

export type PagedResult<T> = {
  page: Page<T>
  activeCount: number
  inActiveCount: number
}
