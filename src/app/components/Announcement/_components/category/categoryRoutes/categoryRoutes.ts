import { MarketplaceKey } from "../normalizers/marketplaceFields/categoryLinkScreen/types"

export const MARKETPLACES: {
  key: MarketplaceKey
  label: string
  slug: string
  categoryRoute: string
}[] = [
    {
      key: "mercado_livre",
      label: "Mercado Livre",
      slug: "mercado-livre",
      categoryRoute: "/meli/categories",
    },
    {
      key: "shopee",
      label: "Shopee",
      slug: "shopee",
      categoryRoute: "/shopee/categories",
    },
    {
      key: "amazon",
      label: "Amazon",
      slug: "amazon",
      categoryRoute: "/amazon/categories",
    },
    {
      key: "magalu",
      label: "Magalu",
      slug: "magalu",
      categoryRoute: "/magalu/categories",
    },
  ]