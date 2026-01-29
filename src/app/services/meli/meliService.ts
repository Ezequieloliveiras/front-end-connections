import { api } from "../api"

export async function saveOAuthOnBackend(payload: Record<string, any>) {
  await api.post("/meli/form", payload)
}

export async function getOAuthByMarketplace(
  marketplaceId: "meli" | "shopee",
  clientId: string
) {
  const { data } = await api.get(`/meli/${marketplaceId}/client/${clientId}`)
  return data
}