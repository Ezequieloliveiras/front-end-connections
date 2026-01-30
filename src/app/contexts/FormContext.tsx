'use client'

import { createContext, useContext, useState } from "react"

type FormData = Record<string, any>

interface FormContextType {
  formData: FormData
  setField: (name: string, value: any) => void
  setManyFields: (data: Record<string, any>) => void
  url: string
  setUrl: (url: string) => void
}

const FormContext = createContext<FormContextType | null>(null)

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>({})
  const [url, setUrl] = useState('')

  const setField = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const setManyFields = (data: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  return (
    <FormContext.Provider
      value={{ formData, setField, setManyFields, url, setUrl }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const ctx = useContext(FormContext)
  if (!ctx) {
    throw new Error("useFormContext must be used inside FormProvider")
  }
  return ctx
}
