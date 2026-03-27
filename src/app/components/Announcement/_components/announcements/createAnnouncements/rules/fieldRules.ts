import { FieldDef } from "@/app/hooks/announcement/createAnnoucement/types"

export type FormValues = Record<string, any>

export type ConditionalRule = {
  id: string
  triggerField: string
  when: (value: any, values: FormValues) => boolean

  injectFields?: FieldDef[]
  showFields?: string[]
  hideFields?: string[]
  clearFields?: string[]

  transformSubmit?: (values: FormValues) => FormValues
}