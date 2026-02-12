import { api } from "../api"
import { ForecastResponse } from "./types"

export type TopChannel = {
  name: string
  value: number
}

export type TopChannelsResponse = {
  productId?: string | null
  days: number
  topChannels: TopChannel[]
}


export async function getForecastByDayCustom(productId: string, days: number): Promise<ForecastResponse> {
  const res = await api.get(`/forecast/${productId}`, { params: { days } })
  return res.data
}

export async function getTopChannels(params: { days: number, productId?: string }): Promise<TopChannelsResponse> {
  const res = await api.get("/forecast/channels", {
    params,
  })
  return res.data
}

export async function getForecastByDay(productId: string, days: number): Promise<ForecastResponse> {
  const res = await api.get(`/forecast/orders/realized/daily`, {
    params: { productId, days }
  })

  return res.data
}
