import { FieldDef, FieldOption, FieldType } from "@/app/hooks/announcement/createAnnoucement/types"
import { ApiFieldItem, FieldConfigResponseItem } from "./types"

export const GTIN_FIELD_ID = "GTIN"
export const EMPTY_GTIN_REASON_FIELD_ID = "EMPTY_GTIN_REASON"
export const WITHOUT_GTIN_CHECKBOX_KEY = "__WITHOUT_GTIN__"

function isValidFieldType(value?: string): value is FieldType {
  return (
    value === "text" ||
    value === "string" ||
    value === "number" ||
    value === "select" ||
    value === "checkbox" ||
    value === "textarea" ||
    value === "array" ||
    value === "boolean" ||
    value === "list" ||
    value === "number_unit"
  )
}

function hasSelectableValues(field: ApiFieldItem): boolean {
  const rawValues = Array.isArray(field.raw?.values) ? field.raw.values : []
  const directOptions = Array.isArray(field.options) ? field.options : []

  return rawValues.filter(Boolean).length > 0 || directOptions.filter(Boolean).length > 0
}

export function normalizeFieldType(field: ApiFieldItem): FieldType {
  const originalType = field.type ?? field.raw?.value_type

  if (originalType === "number_unit") {
    return "number_unit"
  }

  if (hasSelectableValues(field) && originalType === "list") {
    return "select"
  }

  if (originalType === "number") {
    return "number"
  }

  if (originalType === "checkbox") {
    return "checkbox"
  }

  if (originalType === "textarea") {
    return "textarea"
  }

  if (originalType === "array") {
    return "array"
  }

  if (originalType === "boolean") {
    return "boolean"
  }

  if (originalType === "list") {
    return "list"
  }

  if (originalType === "string") {
    return "text"
  }

  if (isValidFieldType(originalType)) {
    return originalType
  }

  return "text"
}

export function normalizeFieldOptions(field: ApiFieldItem): FieldOption[] {
  const originalType = field.type ?? field.raw?.value_type

  if (originalType === "number_unit") {
    return []
  }

  const rawValues = Array.isArray(field.raw?.values) ? field.raw.values : []
  const directOptions = Array.isArray(field.options) ? field.options : []

  const optionsFromRawValues: FieldOption[] = rawValues
    .filter(Boolean)
    .map((option) => ({
      value: option?.id ?? option?.value ?? option?.name ?? "",
      label: String(
        option?.name ?? option?.label ?? option?.value ?? option?.id ?? ""
      ),
    }))
    .filter((option) => option.value !== "" && option.label !== "")

  const optionsFromDirectOptions: FieldOption[] = directOptions
    .filter(Boolean)
    .map((option) => ({
      value: option?.value ?? "",
      label: String(option?.label ?? ""),
    }))
    .filter((option) => option.value !== "" && option.label !== "")

  const mergedOptions = [...optionsFromRawValues, ...optionsFromDirectOptions]

  const uniqueOptions = mergedOptions.filter((currentOption, currentIndex, list) => {
    return (
      list.findIndex(
        (option) =>
          String(option.value) === String(currentOption.value) &&
          option.label === currentOption.label
      ) === currentIndex
    )
  })

  return uniqueOptions
}

export function mapApiFieldToFieldDef(field: ApiFieldItem): FieldDef {
  const normalizedType = normalizeFieldType(field)
  const normalizedOptions = normalizeFieldOptions(field)

  return {
    key: field.id,
    label: field.name,
    id: field.id,
    name: field.name,
    required: Boolean(field.required),
    type: normalizedType,
    values: normalizedOptions,
    options: normalizedOptions,
    raw: {
      ...field.raw,
    },
    info: field.raw?.hint ?? "",
    placeholder: field.raw?.hint ?? "",
  }
}

export function createWithoutGtinCheckboxField(): FieldDef {
  return {
    key: WITHOUT_GTIN_CHECKBOX_KEY,
    id: WITHOUT_GTIN_CHECKBOX_KEY,
    name: "Produto sem GTIN",
    label: "Produto sem GTIN",
    type: "checkbox",
    required: false,
    values: [],
    options: [],
    raw: {},
    info: "Marque esta opção se o produto não possui GTIN.",
    placeholder: "",
  }
}

export function getRawFieldsFromConfig(
  fieldConfig?: FieldConfigResponseItem
): ApiFieldItem[] {
  if (!fieldConfig) {
    return []
  }

  return [
    ...(fieldConfig.fieldsRequired ?? []),
    ...(fieldConfig.fieldsByCategory ?? []),
    ...(fieldConfig.selectedOptionalFieldIds ?? []),
  ]
}

export function buildFieldsFromConfig(
  fieldConfig?: FieldConfigResponseItem
): FieldDef[] {
  if (!fieldConfig) {
    return []
  }

  const allFields = getRawFieldsFromConfig(fieldConfig).filter(
    (field) => field.id !== EMPTY_GTIN_REASON_FIELD_ID
  )

  const uniqueFields = allFields.filter((currentField, currentIndex, list) => {
    return (
      list.findIndex((field) => field.id === currentField.id) === currentIndex
    )
  })

  return uniqueFields.map(mapApiFieldToFieldDef)
}