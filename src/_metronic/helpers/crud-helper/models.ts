
export type ID = undefined | null | number

export type PaginationState = {
  page: number
  items_per_page: 10 | 30 | 50 | 100
  links?: Array<{label: string; active: boolean; url: string | null; page: number | null}>
}


export type Response<T> = {
  data?: T
  payload?: {
    message?: string
    errors?: {
      [key: string]: Array<string>
    }
    pagination?: PaginationState
  }
}
