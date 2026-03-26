import { FieldDef } from "@/app/hooks/announcement/createAnnoucement/types"

export type ConfigObject = Record<string, unknown>

export type ConfigPrimitiveValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | string[]
    | ConfigObject

export type MarketplaceConfigFormProps = {
    fields: FieldDef[]
    value: ConfigObject | undefined
    onChange: (updatedValue: ConfigObject) => void
    missingKeys?: string[]
}