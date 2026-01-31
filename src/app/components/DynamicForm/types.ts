import { OAuthActionKeysByMarketplace } from "@/app/actions/oauth/types"
import { Marketplace } from "@/app/actions/oauth/types"
import { info } from "console"

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
  | "info"



export interface FieldSchema<M extends Marketplace = Marketplace> {
  id: string
  name: string
  label?: string
  type: FieldType
  placeholder?: string
  action?: OAuthActionKeysByMarketplace[M]
  submit?: boolean
  status?: string
  disabled?: boolean
  options?: { value: string; label: string }[]
  info?: string
}
