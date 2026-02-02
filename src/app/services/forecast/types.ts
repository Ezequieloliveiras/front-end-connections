export type PeriodPreset = "7" | "30" | "90" | "custom"

export type ProductOption = {
  id: string
  name: string
}

export type ForecastResponse = {
  productId: string
  productName: string
  days: number
  forecastQty: number
  confidence: number
  trend: "up" | "down" | "stable"
  plannedQty: number
  realizedQty: number
  daily: Array<{ date: string; qty: number }>
  clients: { hit: number; notHit: number }
  topChannels: Array<{ name: string; value: number }>
}
