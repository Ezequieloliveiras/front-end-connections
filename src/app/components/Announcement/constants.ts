export type Marketplace = "mercado_livre" | "shopee" | "magalu"
export type AnnouncementStatus = "active" | "paused" | "inactive" | "draft" | "error"

export type MarketplaceItem = {
  key: Marketplace
  label: string
  src: string
  width?: number
  height?: number
}

export const MARKETPLACES: MarketplaceItem[] = [
  { key: "mercado_livre", label: "Mercado Livre", src: "/marketplace/mercado-libre.png", width: 40, height: 40 },
  { key: "shopee", label: "Shopee", src: "/marketplace/shopee.png", width: 40, height: 40 },
  { key: "magalu", label: "Magalu", src: "/marketplace/magablue.png", width: 40, height: 40 },
]

export const STATUS_OPTIONS: Array<{ key: AnnouncementStatus | "all"; label: string }> = [
  { key: "all", label: "Todos" },
  { key: "active", label: "Publicado" },
  { key: "paused", label: "Pausado" },
  { key: "inactive", label: "Não publicado" },
  { key: "draft", label: "Rascunho" },
  { key: "error", label: "Erro" },
]
