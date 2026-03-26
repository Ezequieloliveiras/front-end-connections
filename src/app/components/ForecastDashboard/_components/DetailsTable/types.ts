
export interface DetailsTableProps {
    preset: number | string
    customDays: string
    productId: string | undefined
}

export type DailyRow = { date: string; qty: number }
