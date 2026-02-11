import { api } from "../api"

export async function saveOAuthOnBackend(payload: Record<string, any>) {
  await api.post("/meli/form", payload)
}

export async function getOAuthByMarketplace(
  marketplaceId: "meli" | "shopee",
) {
  const { data } = await api.get(`/meli/${marketplaceId}`)
  return data
}

export async function generateTokenApi(payload: Record<string, any>) {
  const { data } = await api.post("/meli/generate/token", payload)
  return data
}

export async function renewTokenApi(payload: Record<string, any>) {
  const { data } = await api.post("/meli/renew/token", payload)
  return data
}

export async function authorizationApi(payload: Record<string, any>) {
  const { data } = await api.post("/meli/authorization", payload)
  return data
}