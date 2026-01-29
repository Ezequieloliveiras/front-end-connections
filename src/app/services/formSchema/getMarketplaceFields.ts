import { api } from "../api"

export interface FieldSchema {
  id: string
  label: string
  type: string
  options?: { value: string; label: string }[]
  action?: string
  oauthUrl?: string
}

export async function getMarketplaceFields(
  marketplaceId: string
): Promise<FieldSchema[]> {

  const [labelsRes, typesRes] = await Promise.all([
    api.get(`/fields/${marketplaceId}/labels`),
    api.get(`/field-types`)
  ]);

  if (!labelsRes.data) throw new Error("Erro ao buscar labels")
  if (!typesRes.data) throw new Error("Erro ao buscar tipos")

  const labelsData = await labelsRes.data
  const typesData = await typesRes.data

  return labelsData.labels.map((label: any) => {
    const fieldType = typesData.find(
      (type: any) => type.id === label.fieldTypeId
    )

    return {
      id: label.id,
      name: label.name,
      label: label.label,
      type: fieldType?.type ?? "text",
      options: fieldType?.options,
      action: label.action,
      oauthUrl: label.oauthUrl,
    }
  })
}