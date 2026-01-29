'use client'

import { FieldSchema } from "../../types"

interface Props {
  field: FieldSchema
  value: any
  onChange: (id: string, value: any) => void
}

interface Props {
  field: FieldSchema
  value: any
  onChange: (name: string, value: any) => void
}

export function InputField({ field, value, onChange }: Props) {
  return (
    <input
      name={field.name}
      value={value ?? ""}
      onChange={e => onChange(field.name, e.target.value)}
    />
  )
}

