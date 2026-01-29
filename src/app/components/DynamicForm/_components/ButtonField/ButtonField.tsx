'use client'

import { useFormContext } from "@/app/contexts/FormContext"
import { oauthActions } from "@/app/actions/oauth"
import { Button } from "./styles"
import { Marketplace } from "@/app/actions/oauth/types"
import { FieldSchema } from "../../types"

interface Props<M extends Marketplace> {
  field: FieldSchema<M>
  marketplaceId: M
  values: Record<string, any>
}

export function ButtonField<M extends Marketplace>({
  field,
  marketplaceId,
  values,
}: Props<M>) {
  
  const { setManyFields } = useFormContext()

  const handleClick = async () => {
    if (!field.action) {
      console.warn("Campo sem action")
      return
    }

    const action = oauthActions[marketplaceId][field.name]

    if (!action) {
      console.warn("Ação não encontrada", marketplaceId, field.name)
      return
    }

    await action(values, { setManyFields })
  }

  return (
    <Button
      type={field.submit ? "submit" : "button"}
      onClick={handleClick}
    >
      {field.label}
    </Button>
  )
}
