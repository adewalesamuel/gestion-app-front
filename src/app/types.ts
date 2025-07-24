export type PaginateLink = {
  url: string,
  label: string,
  active: boolean,
}

export type ResponsePaginate<T> = {
  product_categorys: ResponsePaginate<T[]>
  current_page: number,
  data: T,
  first_page_url: string,
  from: number,
  last_page: number,
  last_page_url: string,
  links: PaginateLink[],
  next_page_url: string,
  path: string,
  per_page: number,
  prev_page_url: string,
  to: number,
  total: number,
}

export type Response<T> = {
  data: T | ResponsePaginate<T>,
  success: any,
}

export type ResponseError = Partial<{
  status: number,
  messages: Promise<unknown>
}>;
