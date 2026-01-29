'use client'

import { FieldSchema } from "../../types"

interface Props {
  field: FieldSchema
  value: any
  onChange: (id: string, value: any) => void
}

export function InputField({ field, value, onChange }: Props) {
  switch (field.type) {
    case "text":
      return (
        <input
          value={value ?? ""}
          onChange={e => onChange(field.id, e.target.value)}
        />
      )
    default:
      return null
  }
}
