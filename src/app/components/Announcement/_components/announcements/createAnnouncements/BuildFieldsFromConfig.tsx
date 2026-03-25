import { FieldDef, FieldOption, FieldType } from "@/app/hooks/announcement/createAnnoucement/types"
import { ApiFieldItem, FieldConfigResponseItem } from "./types"

function isValidFieldType(value?: string): value is FieldType {
  return (
    value === "text" ||
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

  if (hasSelectableValues(field)) {
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

export function buildFieldsFromConfig(
  fieldConfig?: FieldConfigResponseItem
): FieldDef[] {
  if (!fieldConfig) {
    return []
  }

  const allFields = [
    ...(fieldConfig.fieldsRequired ?? []),
    ...(fieldConfig.fieldsByCategory ?? []),
    ...(fieldConfig.selectedOptionalFieldIds ?? []),
  ]

  const uniqueFields = allFields.filter((currentField, currentIndex, list) => {
    return (
      list.findIndex((field) => field.id === currentField.id) === currentIndex
    )
  })

  return uniqueFields.map(mapApiFieldToFieldDef)
}