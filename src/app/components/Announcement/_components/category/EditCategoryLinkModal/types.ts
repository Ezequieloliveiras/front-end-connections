import { CategoryLinkItem } from "../normalizers/marketplaceFields/categoryLinkScreen/types"
import { MarketplaceFieldItem } from "../types"

export type BasicFieldKey = "title" | "description" | "price"

export type AnnouncementFieldConfig = {
  entityId?: string
  marketplace: string
  marketplaceCategoryId: string
  basicFields: BasicFieldKey[]
  fieldsRequired: MarketplaceFieldItem[]
  fieldsByCategory: MarketplaceFieldItem[]
  selectedOptionalFieldIds: MarketplaceFieldItem[]
}

export type CategoryOption = {
  id: string
  name: string
}

export type ErpCategoryOption = {
  id: string
  name: string
}

export type PropsEditCategoryLinkModal = {
  link: CategoryLinkItem | null
  onClose: () => void
  onSaved: () => void
}

export type CategoryFieldsResponse = {
  marketplace: string
  marketplaceCategoryId: string
  fields: MarketplaceFieldItem[]
}