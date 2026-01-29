'use client'

import { useState } from "react"
import { FieldSchema } from "./types"
import { InputField } from "./_components/InputField/InputField"
import { ButtonField } from "./_components/ButtonField/ButtonField"
import { FieldGroup, Container } from "./styles"
import { LiveStatus } from "./_components/Status/Status"

interface Props {
  fields: FieldSchema[]
  onSubmit: (data: Record<string, any>) => void
  status?: string
}

export function DynamicForm({ fields, onSubmit }: Props) {
  const [formData, setFormData] = useState<Record<string, any>>({})

  const handleChange = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  return (
    <Container>
      <form
        onSubmit={e => {
          e.preventDefault()
          onSubmit(formData)
        }}
      >
        {fields.map(field => {
          // BOTÃO
          if (field.type === "button") {
            return (
              <FieldGroup key={field.id}>
                <ButtonField field={field} />
              </FieldGroup>
            )
          }

          if (field.type === "text") {
            return (
              <FieldGroup key={field.id}>
                <label>{field.label}</label>
               <InputField field={field} value={formData[field.id]} onChange={handleChange} />
              </FieldGroup>
            )
          }

          if (field.type === "status") {
            return (
              <FieldGroup key={field.id}>
                <LiveStatus status={status ?? ""} />
              </FieldGroup>
            )
          }

        })}
      </form>
    </Container>
  )
}
