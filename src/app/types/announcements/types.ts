import { Marketplace } from "../../types/marketplace/types"
export type Dimensions = {
    height: number
    width: number
    length: number
}

export type AnnouncementStatus = "active" | "paused" | "inactive" | "draft" | "error"

export type AnnouncementConfig = {
    title: string
    description: string
    categoryId: string
    brand: string
    gtin?: string
    ncm?: string
    shippingMode: "me2" | "custom" | string
    warranty?: string
    weight: number
    dimensions: Dimensions
    images: string[]
}

export type Announcement = {
    _id?: string
    entityId: string
    productId?: string
    marketplace: Marketplace
    marketplaceProductId?: string
    price: number
    stock: number
    status: AnnouncementStatus
    lastSyncAt?: string
    syncError?: string | null
    config?: Partial<AnnouncementConfig>
    createdAt?: string
    updatedAt?: string
}

export type ModalMode = "edit" | "publish" | "unpublish"
