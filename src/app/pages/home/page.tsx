"use client"

import { useState } from "react"
import { ForecastForm } from "@/app/components/ForecastForm/ForecastForm"
import { getForecastBySku, ForecastResponse } from "@/app/services/forecast.service"
import { GlobalStyle } from "@/app/styles/global"

export default function Home() {
const [data, setData] = useState<ForecastResponse | undefined>(undefined)

  async function handleSearch(sku: string) {
    const result = await getForecastBySku(sku)
    setData(result)
  }

  return (
    <>
      <main>
        <ForecastForm onSubmit={handleSearch} data={data} />
      </main>
    </>
  )
}
