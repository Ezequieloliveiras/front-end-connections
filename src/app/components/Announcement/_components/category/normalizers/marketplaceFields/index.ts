import { normalizeMercadoLivreFields } from "./mercadoLivre"

type NormalizeParams = {
  marketplace: string
  response: any
}

export function normalizeMarketplaceFields({
  marketplace,
  response,
}: NormalizeParams) {
  switch (marketplace) {
    case "mercado_livre":
      return normalizeMercadoLivreFields(response)

    // case "shopee":
    //   return normalizeShopeeFields(response)

    // case "amazon":
    //   return normalizeAmazonFields(response)

    // case "magalu":
    //   return normalizeMagaluFields(response)

    default:
      return {
        marketplace: String(response?.marketplace ?? marketplace ?? ""),
        marketplaceCategoryId: String(response?.marketplaceCategoryId ?? ""),
        allFields: [],
        fieldsRequired: [],
        fieldsByCategory: [],
      }
  }
}