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

export interface FieldSchema {
  id: string
  label?: string
  type: FieldType
  action?: string // ex: oauth, submit
  submit?: boolean
  status?: string
}
