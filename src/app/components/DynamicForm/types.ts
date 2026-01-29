import { OAuthActionKeysByMarketplace } from "@/app/actions/oauth/types"
import { Marketplace } from "@/app/actions/oauth/types"

export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "checkbox"
  | "button"
  | "submit"
  | "select"
  | "radio"
  | "date"
  | "time"
  | "status"



export interface FieldSchema<M extends Marketplace = Marketplace> {
  id: string
  name: string
  label?: string
  type: FieldType

  action?: OAuthActionKeysByMarketplace[M]
  submit?: boolean
  status?: string

  options?: { value: string; label: string }[]
}
