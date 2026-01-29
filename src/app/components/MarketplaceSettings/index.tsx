import MeliSettings from "./meli/Settings"
//import ShopeeSettings from "./shopee/Settings"

export const MARKETPLACE_REGISTRY = {
  meli: {
    id: "meli",
    name: "Mercado Livre",
    SettingsComponent: MeliSettings,
  },
} as const

export type MarketplaceKey = keyof typeof MARKETPLACE_REGISTRY
