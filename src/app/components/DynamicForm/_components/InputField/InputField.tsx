'use client'

import { FieldSchema } from "../../types"
import { StyledInput } from "./styles"

interface Props {
  field: FieldSchema
  value: any
  onChange: (name: string, value: any) => void
}

export function InputField({ field, value, onChange }: Props) {
  return (
    <StyledInput
      name={field.name}
      value={value ?? ""}
      placeholder={field.placeholder}
      disabled={field.disabled === true}
      onChange={e => onChange(field.name, e.target.value)}
    />
  )
}
