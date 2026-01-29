'use client'

import { useEffect, useState } from "react"
import { getMarketplaceFields } from "../services/formSchema/getMarketplaceFields"
import { FieldSchema } from "../components/DynamicForm/types"

export function useMarketplaceFields(marketplaceId: string) {
  const [fields, setFields] = useState<FieldSchema[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await getMarketplaceFields(marketplaceId)
        setFields(data)
      } catch (err) {
        setError("Erro ao carregar campos")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [marketplaceId])

  return { fields, loading, error }
}
