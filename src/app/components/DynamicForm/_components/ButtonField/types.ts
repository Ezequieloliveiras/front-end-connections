import { Marketplace } from "@/app/actions/oauth/types"
import { FieldSchema } from "../../types"

export interface ButtonFieldProps<M extends Marketplace> {
  field: FieldSchema<M>
  marketplaceId: M
  values: Record<string, any>
}