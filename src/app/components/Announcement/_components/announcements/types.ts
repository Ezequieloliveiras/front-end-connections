export type FieldOption = {
  label: string
  value: string | number | boolean
}

export type FieldType =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "textarea"
  | "array"

export type FieldDef = {
  key: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: FieldOption[]
}
export type GetAnnouncementFieldsResponse = {
  marketplace: string
  fields: FieldDef[]
}