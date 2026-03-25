export type MarketplaceKey =
    | "mercado_livre"
    | "shopee"
    | "amazon"
    | "magalu"

export type CategoryLinkItem = {
    _id: string
    erpCategoryId: string
    erpCategoryName: string
    marketplace: MarketplaceKey
    marketplaceCategoryId: string
    marketplaceCategoryName: string
}