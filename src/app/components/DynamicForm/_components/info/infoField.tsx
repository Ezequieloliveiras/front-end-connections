'use client'

import { InfoContainer, InfoLabel, InfoValue } from "./styles"
import { InfoFieldProps } from "./types"

export function InfoField({ field }: InfoFieldProps) {
  return (
    <InfoContainer>
      {field.label && <InfoLabel>{field.label}</InfoLabel>}
      <InfoValue>{field.name}</InfoValue>
    </InfoContainer>
  )
}
