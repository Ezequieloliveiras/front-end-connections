import { MarketplaceFieldItem, MarketplaceFieldOption, MercadoLivreField, MercadoLivreResponse } from "../../types"

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

  const isRequired =
    Boolean(field?.required) ||
    Boolean(field?.raw?.tags?.required) ||
    Boolean(field?.raw?.tags?.conditional_required)

  return {
    id: String(field?.id ?? ""),
    name: String(field?.name ?? ""),
    type: String(field?.type ?? field?.raw?.value_type ?? "string"),
    required: isRequired,
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