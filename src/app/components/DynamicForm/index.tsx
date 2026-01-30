'use client'

import React, { useEffect } from "react"
import { FieldSchema } from "./types"
import { InputField } from "./_components/InputField/InputField"
import { ButtonField } from "./_components/ButtonField/ButtonField"
import { FieldGroup, Container } from "./styles"
import { useFormContext } from "@/app/contexts/FormContext"
import { getOAuthByMarketplace } from "@/app/services/meli/meliService"
import { AuthorizationLink } from "./_components/AuthorizationLink/AuthorizationLink"

interface Props {
  fields: FieldSchema[]
  marketplaceId: "meli" | "shopee"
  clientId: string
}

export function DynamicForm({
  fields,
  marketplaceId,
}: Props) {
  const { formData, setField, setManyFields, setUrl, url } = useFormContext()

  useEffect(() => {
    const clientId = '8913040778729826'

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
      <form>
        {fields.map(field => {
          if (field.type === "button") {
            return (
              <React.Fragment key={field.id}>
                <FieldGroup key={field.id}>
                  <ButtonField
                    field={field}
                    marketplaceId={marketplaceId}
                    values={formData}
                  />
                </FieldGroup>

                {url && field.name === "authorization" && (
                  <AuthorizationLink url={url} setUrl={setUrl} />
                )}

              </React.Fragment>
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
          return null
        })}
      </form>
    </Container>
  )
}
