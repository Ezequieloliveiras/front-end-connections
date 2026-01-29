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
    fetch(`http://localhost:4000/api/fields/${marketplaceId}/labels`),
    fetch(`http://localhost:4000/api/field-types`),
  ])

  if (!labelsRes.ok) throw new Error("Erro ao buscar labels")
  if (!typesRes.ok) throw new Error("Erro ao buscar tipos")

  const labelsData = await labelsRes.json()
  const typesData = await typesRes.json()

  return labelsData.labels.map((label: any) => {
    const fieldType = typesData.find(
      (type: any) => type.id === label.fieldTypeId
    )

    return {
      id: label.id,
      label: label.label,
      type: fieldType?.type ?? "text",
      options: fieldType?.options,
      action: label.action,
      oauthUrl: label.oauthUrl,
    }
  })
}
