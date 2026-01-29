'use client'

import { useState } from "react"
import { DynamicForm } from "../../DynamicForm"
import { generateToken } from "../../../../marketplaces/meli/auth"
import { useMarketplaceFields } from "@/app/hooks/useMarketplaceFields"
import { useFormContext } from "@/app/contexts/FormContext"

export default function MeliSettings() {
  const { fields, loading, error } = useMarketplaceFields("meli")
  const [status, setStatus] = useState("")
  const { formData } = useFormContext()
  const handleSubmit = async (data: Record<string, any>) => {
    try {
      setStatus("Gerando token...")

      await generateToken({
        clientId: data.clientId,
        clientSecret: data.clientSecret,
        redirectUri: data.redirectUri,
        code: data.authCode,
      })

      setStatus("Token gerado com sucesso!")
    } catch (err) {
      console.error(err)
      setStatus("Erro ao gerar token")
    }
  }

  if (loading) return <p>Carregando campos...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <DynamicForm
        clientId={formData.clientId || ""}
        marketplaceId="meli"
        fields={fields}
        onSubmit={handleSubmit}
      />

      {status && <p>{status}</p>}
    </>
  )
}