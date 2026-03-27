import { FieldDef } from "@/app/hooks/announcement/createAnnoucement/types"
import { ConditionalRule } from "./fieldRules"

export const GTIN_FIELD_ID = "GTIN"
export const EMPTY_GTIN_REASON_FIELD_ID = "EMPTY_GTIN_REASON"
export const WITHOUT_GTIN_CHECKBOX_KEY = "__WITHOUT_GTIN__"

function createWithoutGtinCheckboxField(): FieldDef {
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

export const announcementConditionalRules: ConditionalRule[] = [
  {
    id: "without-gtin",
    triggerField: WITHOUT_GTIN_CHECKBOX_KEY,
    when: (value) => Boolean(value),
    injectFields: [createWithoutGtinCheckboxField()],
    showFields: [EMPTY_GTIN_REASON_FIELD_ID],
    hideFields: [GTIN_FIELD_ID],
    clearFields: [GTIN_FIELD_ID],
    transformSubmit: (values) => {
      const next = { ...values }
      delete next[GTIN_FIELD_ID]
      delete next[WITHOUT_GTIN_CHECKBOX_KEY]
      return next
    },
  },
  {
    id: "with-gtin",
    triggerField: WITHOUT_GTIN_CHECKBOX_KEY,
    when: (value) => !Boolean(value),
    injectFields: [createWithoutGtinCheckboxField()],
    showFields: [GTIN_FIELD_ID],
    hideFields: [EMPTY_GTIN_REASON_FIELD_ID],
    clearFields: [EMPTY_GTIN_REASON_FIELD_ID],
    transformSubmit: (values) => {
      const next = { ...values }
      delete next[EMPTY_GTIN_REASON_FIELD_ID]
      delete next[WITHOUT_GTIN_CHECKBOX_KEY]
      return next
    },
  },
]