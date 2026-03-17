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
  | "boolean"
  | "list"
  | "number_unit"

export type FieldDef = {
  key: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: FieldOption[]
  values?: FieldOption[]
  raw?: Record<string, any>
  info?: string
  id?: string
  name?: string
}

export type GetAnnouncementFieldsResponse = {
  marketplace: string
  fields: FieldDef[]
}