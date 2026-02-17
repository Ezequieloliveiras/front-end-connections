// MarketplaceConfigForm.tsx
import React from "react"
import { Field, FieldLabel, Input, Select } from "./styles"
// se você tiver TextArea no styles:
// import { TextArea } from "./styles"

type FieldType = "text" | "number" | "select" | "textarea" | "string[]"

export type FieldDef = {
  key: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: { label: string; value: string }[]
}

function getByPath(obj: any, path: string) {
  return path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), obj)
}

function setByPath(obj: any, path: string, value: any) {
  const keys = path.split(".")
  let cur = obj
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]
    if (!cur[k] || typeof cur[k] !== "object") cur[k] = {}
    cur = cur[k]
  }
  cur[keys[keys.length - 1]] = value
}

type Props = {
  fields: FieldDef[]
  value: Record<string, any> | undefined
  onChange: (next: Record<string, any>) => void
  // opcional: destacar campos faltando
  missingKeys?: string[]
}

export function MarketplaceConfigForm({ fields, value, onChange, missingKeys = [] }: Props) {
  const cfg = value ?? {}

  function update(path: string, nextValue: any) {
    const next = structuredClone(cfg)
    setByPath(next, path, nextValue)
    onChange(next)
  }

  return (
    <>
      {fields.map((f) => {
        const v = getByPath(cfg, f.key)
        const label = `${f.label}${f.required ? " *" : ""}`
        const isMissing = missingKeys.includes(f.key)

        // usa data-attr pra você estilizar se quiser (borda vermelha etc.)
        const fieldProps = { "data-missing": isMissing ? "1" : "0" }

        if (f.type === "text") {
          return (
            <Field key={f.key} {...fieldProps}>
              <FieldLabel>{label}</FieldLabel>
              <Input
                value={String(v ?? "")}
                placeholder={f.placeholder}
                onChange={(e) => update(f.key, e.target.value)}
              />
            </Field>
          )
        }

        if (f.type === "number") {
          return (
            <Field key={f.key} {...fieldProps}>
              <FieldLabel>{label}</FieldLabel>
              <Input
                type="number"
                value={v ?? ""}
                placeholder={f.placeholder}
                onChange={(e) => {
                  const raw = e.target.value
                  const n = raw === "" ? undefined : Number(raw)
                  update(f.key, Number.isNaN(n as any) ? undefined : n)
                }}
              />
            </Field>
          )
        }

        if (f.type === "select") {
          return (
            <Field key={f.key} {...fieldProps}>
              <FieldLabel>{label}</FieldLabel>
              <Select value={String(v ?? "")} onChange={(e) => update(f.key, e.target.value)}>
                <option value="" disabled>
                  Selecione...
                </option>
                {f.options?.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </Select>
            </Field>
          )
        }

        // Se ainda não tiver TextArea no seu styles,
        // dá pra começar tratando textarea como Input e depois melhora
        if (f.type === "textarea") {
          return (
            <Field key={f.key} {...fieldProps}>
              <FieldLabel>{label}</FieldLabel>
              <Input
                as="textarea"
                value={String(v ?? "")}
                placeholder={f.placeholder}
                onChange={(e: any) => update(f.key, e.target.value)}
              />
            </Field>
          )
        }

        if (f.type === "string[]") {
          const arr = Array.isArray(v) ? v : []
          return (
            <Field key={f.key} {...fieldProps}>
              <FieldLabel>{label}</FieldLabel>
              <Input
                as="textarea"
                placeholder={f.placeholder ?? "1 URL por linha"}
                value={arr.join("\n")}
                onChange={(e: any) => {
                  const lines = String(e.target.value)
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean)
                  update(f.key, lines)
                }}
              />
            </Field>
          )
        }

        return null
      })}
    </>
  )
}
