import { Announcement } from "@/app/types/announcements/types"

export type ProductOption = {
    _id: string
    name: string
    internalSku: string
    brand?: string
    erpCategoryId?: string
    marketplaceCategoryId?: string
    erpCategoryName?: string
}

export type ApiFieldOption =
    | {
        id?: string | number | boolean
        value?: string | number | boolean
        name?: string
        label?: string
    }
    | null

export type ApiAllowedUnit =
    | {
        id?: string | number
        name?: string
    }
    | null

export type ApiFieldItem = {
    id: string
    name: string
    type?: string
    required?: boolean
    options?: Array<{ value: string; label: string } | null>
    raw?: {
        hint?: string
        values?: ApiFieldOption[]
        allowed_units?: ApiAllowedUnit[]
        value_type?: string
        default_unit?: string
        [key: string]: any
    }
}

export type FieldConfigResponseItem = {
    _id: string
    entityId: string
    marketplaceCategoryId: string
    marketplace: string
    basicFields: string[]
    fieldsRequired: ApiFieldItem[]
    fieldsByCategory: ApiFieldItem[]
    selectedOptionalFieldIds: ApiFieldItem[]
}

export type CreateAnnouncementModalProps = {
    productId?: string
    closeModal: () => void
    setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>
}

export type CreateAnnouncementBarProps = {
    productId: string | undefined
    setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>
}
