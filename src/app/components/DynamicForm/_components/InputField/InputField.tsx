'use client'

import { StyledInput } from "./styles"
import { InputFieldProps } from "./types"

export function InputField({ field, value, onChange }: InputFieldProps) {
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
