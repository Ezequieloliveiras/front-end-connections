import { MarketplaceFieldItem, MarketplaceFieldOption } from "./types"

type MercadoLivreField = {
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
    [key: string]: any
  }
}

type MercadoLivreResponse = {
  marketplace?: string
  marketplaceCategoryId?: string
  fields?: MercadoLivreField[]
}

function normalizeOption(option: any): MarketplaceFieldOption {
  return {
    id: String(option?.id ?? ""),
    name: String(option?.name ?? ""),
    metadata: option?.metadata,
  }
}

function normalizeField(field: MercadoLivreField): MarketplaceFieldItem {
  const optionsSource = Array.isArray(field?.raw?.values)
    ? field.raw.values
    : Array.isArray(field?.values)
    ? field.values
    : []

  return {
    id: String(field?.id ?? ""),
    name: String(field?.name ?? ""),
    type: String(field?.type ?? field?.raw?.value_type ?? "string"),
    required: Boolean(field?.required),
    raw: field?.raw ?? {},
    options: optionsSource.map(normalizeOption),
  }
}

export function normalizeMercadoLivreFields(response: MercadoLivreResponse) {
  const allFields = Array.isArray(response?.fields)
    ? response.fields.map(normalizeField)
    : []

  return {
    marketplace: String(response?.marketplace ?? "mercado_livre"),
    marketplaceCategoryId: String(response?.marketplaceCategoryId ?? ""),
    allFields,
    fieldsRequired: allFields.filter((field) => field.required),
    fieldsByCategory: allFields.filter((field) => !field.required),
  }
}