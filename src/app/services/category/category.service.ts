import { MarketplaceKey } from "@/app/components/Announcement/_components/category/normalizers/marketplaceFields/categoryLinkScreen/types"
import { api } from "../api"
import { MarketplaceFieldItem } from "@/app/components/Announcement/_components/category/types"

export type BasicFieldKey = "title" | "description" | "price"

interface CategoryFields {
    marketplace: MarketplaceKey
    marketplaceCategoryId: string
    basicFields: BasicFieldKey[]
    fieldsRequired: MarketplaceFieldItem[]
    selectedOptionalFieldIds: MarketplaceFieldItem[]
}
export interface CategoryLinkPayload {
    erpCategoryId: string
    erpCategoryName: string
    marketplace: MarketplaceKey
    marketplaceCategoryName: string
}

export async function getCategoriesERP() {
    const { data } = await api.get("/category/erp")
    return data
}

export async function updateAnnouncementFields(payload: CategoryFields) {
    const { data } = await api.put("/announcements/field-config", payload)
    return data
}

export async function createCategoryLink(payload: CategoryLinkPayload) {
    const { data } = await api.post("/category/links", payload)
    return data
}

export async function updateCategoryLink(linkId: string, payload: CategoryLinkPayload) {
    const { data } = await api.patch(`/category/links/${linkId}`, payload)
    return data
}

export async function deleteCategoryLink(linkId: string) {
    const { data } = await api.delete(`/category/links/${linkId}`)
    return data
}

export async function fetchCategoryLinks() {
    const { data } = await api.get("/category/links")
    console.log('xxxx', data)
    return data
}