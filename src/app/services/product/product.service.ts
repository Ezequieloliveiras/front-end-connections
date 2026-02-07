import { api } from "../api"

export type ProductApi = {
  _id: string
  name: string
}

export async function getAllProductsByEntity(entityId: string): Promise<ProductApi[]> {
  const { data } = await api.get<ProductApi[]>(`/product/list`, {
    params: { entityId },
  })
  return data
}
