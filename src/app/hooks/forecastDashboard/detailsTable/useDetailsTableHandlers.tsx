import { DailyRow } from "@/app/components/ForecastDashboard/_components/DetailsTable/types"
import { getForecastByDay } from "@/app/services/forecast/forecast.service"
import { useEffect, useState } from "react"

interface DetailsTableStates {
    productId: string | undefined
    days: number
}

export const useDetailsTableStates = ({ productId, days }: DetailsTableStates) => {
    const [daily, setDaily] = useState<DailyRow[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!productId) return

        const fetchDaily = async () => {
            try {
                setLoading(true)
                setError(null)

                const res = await getForecastByDay(productId, days)

                setDaily(res.daily)
            } catch (err) {
                console.error("DetailsTable fetch error:", err)
                setError("Erro ao buscar vendas realizadas")
                setDaily([])
            } finally {
                setLoading(false)
            }
        }

        fetchDaily()
    }, [productId, days])
    return {
        daily,
        loading,
        error
    }
}