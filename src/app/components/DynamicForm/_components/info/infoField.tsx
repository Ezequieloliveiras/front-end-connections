'use client'

import { FieldSchema } from "../../types"
import { InfoContainer, InfoLabel, InfoValue } from "./styles"

interface Props {
  field: FieldSchema
}

export function InfoField({ field }: Props) {
  return (
    <InfoContainer>
      {field.label && <InfoLabel>{field.label}</InfoLabel>}
      <InfoValue>{field.name}</InfoValue>
    </InfoContainer>
  )
}
