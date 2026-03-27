import { FieldDef } from "@/app/hooks/announcement/createAnnoucement/types"
import { ConditionalRule, FormValues } from "./fieldRules"

type ApplyRulesParams = {
  baseFields: FieldDef[]
  values: FormValues
  rules: ConditionalRule[]
}

export function applyFieldRules({
  baseFields,
  values,
  rules,
}: ApplyRulesParams): FieldDef[] {
  let visibleFields = [...baseFields]

  for (const rule of rules) {
    const triggerValue = values[rule.triggerField]
    const isActive = rule.when(triggerValue, values)

    if (!isActive) continue

    if (rule.hideFields?.length) {
      visibleFields = visibleFields.filter((field) => {
        if (!field.id) return true
        return !rule.hideFields!.includes(field.id)
      })
    }

    if (rule.showFields?.length) {
      const hiddenFields = baseFields.filter((field) => {
        if (!field.id) return false
        return rule.showFields!.includes(field.id)
      })

      for (const field of hiddenFields) {
        const alreadyExists = visibleFields.some((item) => item.id === field.id)

        if (!alreadyExists) {
          visibleFields.push(field)
        }
      }
    }

    if (rule.injectFields?.length) {
      for (const field of rule.injectFields) {
        const alreadyExists = visibleFields.some((item) => item.id === field.id)

        if (!alreadyExists) {
          visibleFields.push(field)
        }
      }
    }
  }

  return visibleFields
}

export function sanitizeValuesByRules(
  values: FormValues,
  rules: ConditionalRule[]
): FormValues {
  let nextValues = { ...values }

  for (const rule of rules) {
    const triggerValue = nextValues[rule.triggerField]
    const isActive = rule.when(triggerValue, nextValues)

    if (!isActive) continue

    if (rule.clearFields?.length) {
      for (const fieldKey of rule.clearFields) {
        delete nextValues[fieldKey]
      }
    }
  }

  return nextValues
}

export function transformSubmitValues(
  values: FormValues,
  rules: ConditionalRule[]
): FormValues {
  let nextValues = { ...values }

  for (const rule of rules) {
    const triggerValue = nextValues[rule.triggerField]
    const isActive = rule.when(triggerValue, nextValues)

    if (!isActive) continue

    if (rule.transformSubmit) {
      nextValues = rule.transformSubmit(nextValues)
    }
  }

  return nextValues
}