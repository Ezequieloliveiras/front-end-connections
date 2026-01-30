'use client'

import { DynamicForm } from "../../DynamicForm"
import { useMarketplaceFields } from "@/app/hooks/useMarketplaceFields"
import { useFormContext } from "@/app/contexts/FormContext"

export default function MeliSettings() {
  const { fields, loading, error } = useMarketplaceFields("meli")
  const { formData } = useFormContext()

  if (loading) return <p>Carregando campos...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <DynamicForm
        clientId={formData.clientId || ""}
        marketplaceId="meli"
        fields={fields}
      />
    </>
  )
}