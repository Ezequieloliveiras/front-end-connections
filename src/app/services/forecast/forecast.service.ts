import { api } from "../api"
import { ForecastResponse } from "./types"

export type TopChannel = {
  name: string
  value: number
}

export type TopChannelsResponse = {
  entityId: string
  productId?: string | null
  days: number
  topChannels: TopChannel[]
}


export async function getForecastByDayCustom(entityId: string, productId: string, days: number): Promise<ForecastResponse> {
  const res = await api.get(`/forecast/${entityId}/${productId}`, { params: { days } })
  return res.data
}

export async function getTopChannels(params: { entityId: string, days: number, productId?: string }): Promise<TopChannelsResponse> {
  const res = await api.get("/forecast/top-channels", {
    params,
  })
  return res.data
}
