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