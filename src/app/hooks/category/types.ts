import {
    CategoryLinkItem,
    MarketplaceKey,
} from "@/app/components/Announcement/_components/category/normalizers/marketplaceFields/categoryLinkScreen/types"
import { AnnouncementFieldConfig } from "@/app/components/Announcement/_components/category/EditCategoryLinkModal/types"

export type UseCategoryStatesProps = {
    link: CategoryLinkItem | null
}

export interface UseHandlersProps {
    onSaved: () => void
    link: CategoryLinkItem | null

    erpCategoryId: string
    erpCategoryName: string

    marketplace: MarketplaceKey | ""
    marketplaceCategoryId: string
    marketplaceCategoryName: string

    fieldConfig: AnnouncementFieldConfig

    setMarketplaceCategoryName: React.Dispatch<React.SetStateAction<string>>
    setSavingFieldConfig: React.Dispatch<React.SetStateAction<boolean>>
    setSaving: React.Dispatch<React.SetStateAction<boolean>>
    setFieldConfig: React.Dispatch<React.SetStateAction<AnnouncementFieldConfig>>
}

export type BasicFieldKey = "title" | "description" | "price"
