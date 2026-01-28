import { api } from "./api"

export interface ForecastResponse {
  sku: string
  prediction: number
  history: number[]
  forecast: number
  confidence: number
  trend: number
}

export async function getForecastBySku(sku: string): Promise<ForecastResponse> {
  const response = await api.get(`/forecast/${sku}`)
  console.log(response.data)
  return response.data
}
