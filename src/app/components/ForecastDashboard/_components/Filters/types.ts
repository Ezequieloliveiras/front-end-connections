import { PeriodPreset, ProductOption } from "../../types"

export interface FiltersProps {
    products: ProductOption[]
    productId: string
    period: PeriodPreset
    customDays: string
    loading: boolean
    onProductChange: (id: string) => void
    onPeriodChange: (p: PeriodPreset) => void
    onCustomDaysChange: (v: string) => void
    onSubmit: () => void
}