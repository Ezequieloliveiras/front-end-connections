'use client'

import { DynamicForm } from "../../DynamicForm"
import { useMarketplaceFields } from "@/app/hooks/useMarketplaceFields"
import { useFormContext } from "@/app/contexts/FormContext"
import { Loading } from "../../../components/loading"

export default function MeliSettings() {
  const { fields, loading, error } = useMarketplaceFields("meli")
  const { formData } = useFormContext()

  if (loading) return <Loading />
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