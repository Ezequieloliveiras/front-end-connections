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

  const { setManyFields, setUrl, url } = useFormContext()

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

    const redirect_uri = url
    const user_id = "8913040778729826"

    await action(values, { setManyFields, setUrl, redirect_uri, user_id })
  }

  const variant =
    field.label === "Salvar / Renovar Token" ? "secondary" : "primary"

  return (
    <Button
      type={field.submit ? "submit" : "button"}
      onClick={handleClick}
      variant={variant}
    >
      {field.label}
    </Button>
  )
}

