export type MarketplaceFieldOption = {
  id: string
  name: string
  metadata?: Record<string, any>
}

export type MarketplaceFieldItem = {
  id: string
  name: string
  type: string
  required: boolean
  options: MarketplaceFieldOption[]
  raw?: Record<string, any>
}

export type NormalizeParams = {
  marketplace: string
  response: any
}

export type MercadoLivreField = {
  id: string
  name: string
  type?: string
  required?: boolean
  values?: Array<{
    id: string
    name: string
    metadata?: Record<string, any>
  }>
  raw?: {
    value_type?: string
    values?: Array<{
      id: string
      name: string
      metadata?: Record<string, any>
    }>
    tags?: {
      required?: boolean
      conditional_required?: boolean
      [key: string]: any
    }
    [key: string]: any
  }
}

export type MercadoLivreResponse = {
  marketplace?: string
  marketplaceCategoryId?: string
  fields?: MercadoLivreField[]
}
