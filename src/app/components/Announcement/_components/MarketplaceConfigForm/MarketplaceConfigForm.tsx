import React from "react"
import { Field, FieldLabel, Input, Select } from "./styles"

type FieldType = "text" | "number" | "select" | "textarea" | "string[]"

export type FieldDef = {
  key: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: { label: string; value: string }[]
}

type ConfigValue = Record<string, unknown>
type ConfigLeaf = string | number | boolean | null | undefined | string[] | ConfigValue

function getByPath(obj: ConfigValue, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, k) => {
    if (acc == null || typeof acc !== "object") return undefined
    return (acc as Record<string, unknown>)[k]
  }, obj)
}

function setByPath(obj: ConfigValue, path: string, value: unknown) {
  const keys = path.split(".")
  let cur: ConfigValue = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]
    const next = cur[k]
    if (!next || typeof next !== "object" || Array.isArray(next)) {
      cur[k] = {}
    }
    cur = cur[k] as ConfigValue
  }

  cur[keys[keys.length - 1]] = value as ConfigLeaf
}

type Props = {
  fields: FieldDef[]
  value: ConfigValue | undefined
  onChange: (next: ConfigValue) => void
  missingKeys?: string[]
}

export function MarketplaceConfigForm({ fields, value, onChange, missingKeys = [] }: Props) {
  const cfg: ConfigValue = value ?? {}

  function update(path: string, nextValue: unknown) {
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
        const fieldProps = { "data-missing": isMissing ? "1" : "0" } as const

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
          const valueStr = v == null ? "" : String(v)
          return (
            <Field key={f.key} {...fieldProps}>
              <FieldLabel>{label}</FieldLabel>
              <Input
                type="number"
                value={valueStr}
                placeholder={f.placeholder}
                onChange={(e) => {
                  const raw = e.target.value
                  if (raw === "") return update(f.key, undefined)
                  const n = Number(raw)
                  update(f.key, Number.isNaN(n) ? undefined : n)
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

        if (f.type === "textarea") {
          return (
            <Field key={f.key} {...fieldProps}>
              <FieldLabel>{label}</FieldLabel>
              <Input
                as="textarea"
                value={String(v ?? "")}
                placeholder={f.placeholder}
                onChange={(e) => update(f.key, e.target.value)}
              />
            </Field>
          )
        }

        if (f.type === "string[]") {
          const arr = Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []
          return (
            <Field key={f.key} {...fieldProps}>
              <FieldLabel>{label}</FieldLabel>
              <Input
                as="textarea"
                placeholder={f.placeholder ?? "1 URL por linha"}
                value={arr.join("\n")}
                onChange={(e) => {
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
