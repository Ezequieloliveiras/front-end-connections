import { FieldSchema } from "../../types"

export interface InputFieldProps {
    field: FieldSchema
    value: any
    onChange: (name: string, value: any) => void
}
