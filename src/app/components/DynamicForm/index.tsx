'use client'

import { useEffect } from "react"
import { FieldSchema } from "./types"
import { InputField } from "./_components/InputField/InputField"
import { ButtonField } from "./_components/ButtonField/ButtonField"
import { FieldGroup, Container } from "./styles"
import { LiveStatus } from "./_components/Status/Status"
import { useFormContext } from "@/app/contexts/FormContext"
import { getOAuthByMarketplace } from "@/app/services/meli/meliService"

interface Props {
  fields: FieldSchema[]
  marketplaceId: "meli" | "shopee"
  clientId: string
  onSubmit: (data: Record<string, any>) => void
  status?: string
}

export function DynamicForm({
  fields,
  marketplaceId,
  clientId,
  onSubmit,
  status,
}: Props) {
  const { formData, setField, setManyFields } = useFormContext()

  useEffect(() => {
    if (!clientId) return

    async function load() {
      try {
        const data = await getOAuthByMarketplace(marketplaceId, clientId)
        if (data) {
          setManyFields(data)
        }
      } catch (err) {
        console.error("Erro ao carregar dados do formulário", err)
      }
    }

    load()
  }, [])

  return (
    <Container>
      <form
        onSubmit={e => {
          e.preventDefault()
          onSubmit(formData)
        }}
      >
        {fields.map(field => {
          if (field.type === "button") {
            return (
              <FieldGroup key={field.id}>
                <ButtonField
                  field={field}
                  marketplaceId={marketplaceId}
                  values={formData}
                />
              </FieldGroup>
            )
          }

          if (field.type === "text") {
            return (
              <FieldGroup key={field.id}>
                <label>{field.label}</label>
                <InputField
                  field={field}
                  value={formData[field.name]}
                  onChange={(id, value) => setField(id, value)}
                />
              </FieldGroup>
            )
          }

          if (field.type === "status") {
            return (
              <FieldGroup key={field.id}>
                <LiveStatus formData={formData} status={status ?? ""} />
              </FieldGroup>
            )
          }

          return null
        })}
      </form>
    </Container>
  )
}
