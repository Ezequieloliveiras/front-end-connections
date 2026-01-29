'use client'

import { FieldSchema } from "../../types"
import { Button } from "./styles"

interface Props {
  field: FieldSchema
}

export function ButtonField({ field }: Props) {
  return (
    <Button type={field.submit ? "submit" : "button"}>
      {field.label}
    </Button>
  )
}
