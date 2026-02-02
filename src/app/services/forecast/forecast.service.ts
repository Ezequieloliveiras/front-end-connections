import { ForecastResponse } from "./types"

export async function getForecast(
  productId: string,
  days: number
): Promise<ForecastResponse> {
  // 🔌 Aqui você pluga sua API real depois
  const res = await fetch(`/api/forecast?productId=${productId}&days=${days}`)
  return res.json()
}
