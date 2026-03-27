import { Field, FieldLabel, Input, Select } from "./styles"
import { ConfigObject, ConfigPrimitiveValue, MarketplaceConfigFormProps } from "./types"

function getValueByPath(
  objectValue: ConfigObject,
  fieldPath?: string
): unknown {
  if (!fieldPath) return undefined

  return fieldPath.split(".").reduce<unknown>((currentValue, currentKey) => {
    if (currentValue == null || typeof currentValue !== "object") {
      return undefined
    }

    return (currentValue as Record<string, unknown>)[currentKey]
  }, objectValue)
}

function setValueByPath(
  objectValue: ConfigObject,
  fieldPath: string,
  newValue: unknown
) {
  const pathParts = fieldPath.split(".")
  let currentObject: ConfigObject = objectValue

  for (let index = 0; index < pathParts.length - 1; index++) {
    const currentKey = pathParts[index]
    const existingValue = currentObject[currentKey]

    if (
      !existingValue ||
      typeof existingValue !== "object" ||
      Array.isArray(existingValue)
    ) {
      currentObject[currentKey] = {}
    }

    currentObject = currentObject[currentKey] as ConfigObject
  }

  const lastPathPart = pathParts[pathParts.length - 1]
  currentObject[lastPathPart] = newValue as ConfigPrimitiveValue
}

export function MarketplaceConfigForm({
  fields,
  value,
  onChange,
  missingKeys = [],
}: MarketplaceConfigFormProps) {
  const currentConfig: ConfigObject = value ?? {}

  function updateFieldValue(fieldPath: string, newValue: unknown) {
    const updatedConfig = structuredClone(currentConfig)
    setValueByPath(updatedConfig, fieldPath, newValue)
    onChange(updatedConfig)
  }

  return (
    <>
      {fields.map((field) => {
        const fieldKey = field.key || field.id
        const fieldLabel = field.label || field.name || field.id
        const fieldType = field.type || "string"
        const fieldOptions = field.values ?? field.options ?? []
        const fieldPlaceholder = field.placeholder || field.raw?.hint || ""

        if (!fieldKey) return null

        const fieldValue = getValueByPath(currentConfig, fieldKey)
        const labelText = `${fieldLabel}${field.required ? " *" : ""}`
        const isFieldMissing = missingKeys.includes(fieldKey)
        const fieldAttributes = {
          "data-missing": isFieldMissing ? "1" : "0",
        } as const

        if (fieldType === "text" ) {
          return (
            <Field key={fieldKey} {...fieldAttributes}>
              <FieldLabel>{labelText}</FieldLabel>
              <Input
                value={String(fieldValue ?? "")}
                placeholder={fieldPlaceholder}
                onChange={(event) =>
                  updateFieldValue(fieldKey, event.target.value)
                }
              />
            </Field>
          )
        }

        if (fieldType === "number") {
          const inputValue =
            fieldValue == null ? "" : String(fieldValue)

          return (
            <Field key={fieldKey} {...fieldAttributes}>
              <FieldLabel>{labelText}</FieldLabel>
              <Input
                type="number"
                value={inputValue}
                placeholder={fieldPlaceholder}
                onChange={(event) => {
                  const inputValue = event.target.value

                  if (inputValue === "") {
                    updateFieldValue(fieldKey, undefined)
                    return
                  }

                  const numericValue = Number(inputValue)

                  updateFieldValue(
                    fieldKey,
                    Number.isNaN(numericValue) ? undefined : numericValue
                  )
                }}
              />
            </Field>
          )
        }

        if (fieldType === "select" || fieldType === "list") {
          return (
            <Field key={fieldKey} {...fieldAttributes}>
              <FieldLabel>{labelText}</FieldLabel>
              <Select
                value={String(fieldValue ?? "")}
                onChange={(event) =>
                  updateFieldValue(fieldKey, event.target.value)
                }
              >
                <option value="">Selecione...</option>

                {fieldOptions.map((option) => (
                  <option
                    key={String(option.value)}
                    value={String(option.value)}
                  >
                    {option.label}
                  </option>
                ))}
              </Select>
            </Field>
          )
        }

        if (fieldType === "textarea") {
          return (
            <Field key={fieldKey} {...fieldAttributes}>
              <FieldLabel>{labelText}</FieldLabel>
              <Input
                as="textarea"
                value={String(fieldValue ?? "")}
                placeholder={fieldPlaceholder}
                onChange={(event) =>
                  updateFieldValue(fieldKey, event.target.value)
                }
              />
            </Field>
          )
        }

        if (fieldType === "checkbox" || fieldType === "boolean") {
          return (
            <Field key={fieldKey} {...fieldAttributes}>
              <FieldLabel>
                <input
                  type="checkbox"
                  checked={Boolean(fieldValue)}
                  onChange={(event) =>
                    updateFieldValue(fieldKey, event.target.checked)
                  }
                  style={{ marginRight: 8 }}
                />
                {labelText}
              </FieldLabel>
            </Field>
          )
        }

        if (fieldType === "array") {
          const arrayValue = Array.isArray(fieldValue)
            ? fieldValue.filter(
              (item): item is string => typeof item === "string"
            )
            : []

          return (
            <Field key={fieldKey} {...fieldAttributes}>
              <FieldLabel>{labelText}</FieldLabel>
              <Input
                as="textarea"
                placeholder={fieldPlaceholder || "1 item por linha"}
                value={arrayValue.join("\n")}
                onChange={(event) => {
                  const items = String(event.target.value)
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)

                  updateFieldValue(fieldKey, items)
                }}
              />
            </Field>
          )
        }

        if (fieldType === "number_unit") {
          const fieldObjectValue =
            fieldValue &&
              typeof fieldValue === "object" &&
              !Array.isArray(fieldValue)
              ? (fieldValue as Record<string, unknown>)
              : {}

          const numberValue = fieldObjectValue.value ?? ""
          const unitValue =
            fieldObjectValue.unit ?? field.raw?.default_unit ?? ""

          const allowedUnits = Array.isArray(field.raw?.allowed_units)
            ? field.raw.allowed_units
            : []

          return (
            <Field key={fieldKey} {...fieldAttributes}>
              <FieldLabel>{labelText}</FieldLabel>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 140px",
                  gap: 8,
                }}
              >
                <Input
                  type="number"
                  value={String(numberValue)}
                  placeholder={fieldPlaceholder || "Digite o valor"}
                  onChange={(event) => {
                    const inputValue = event.target.value

                    updateFieldValue(fieldKey, {
                      value: inputValue === "" ? "" : Number(inputValue),
                      unit: unitValue,
                    })
                  }}
                />

                <Select
                  value={String(unitValue)}
                  onChange={(event) =>
                    updateFieldValue(fieldKey, {
                      value: numberValue,
                      unit: event.target.value,
                    })
                  }
                >
                  <option value="">Selecione...</option>

                  {allowedUnits.map(
                    (unitOption: { id: string; name: string }) => (
                      <option key={unitOption.id} value={unitOption.id}>
                        {unitOption.name}
                      </option>
                    )
                  )}
                </Select>
              </div>
            </Field>
          )
        }

        return (
          <Field key={fieldKey} {...fieldAttributes}>
            <FieldLabel>{labelText}</FieldLabel>
            <Input
              value={String(fieldValue ?? "")}
              placeholder={fieldPlaceholder}
              onChange={(event) =>
                updateFieldValue(fieldKey, event.target.value)
              }
            />
          </Field>
        )
      })}
    </>
  )
}