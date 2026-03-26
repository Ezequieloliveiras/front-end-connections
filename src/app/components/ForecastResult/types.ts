export interface ForecastData {
  sku: string
  prediction: number
  history?: number[]
  forecast?: number
  confidence?: number
  trend?: number
}