import { useEffect, useMemo, useState } from "react"
import { api } from "@/app/services/api"

import {
    Card,
    CardHeader,
    CardTitle,
    CardHint,
    Divider,
    Table,
    Tr,
    Th,
    Td,
    EmptyState,
} from "./styles"

interface Props {
    preset:  number | string
    customDays: string 
    productId: string | undefined
    entityId: string
}

type DailyRow = { date: string; qty: number }

type RealizedSalesResponse = {
    daily: DailyRow[]
}


function parseDays(preset: number | string, customDays: string) {
    const custom = Number(customDays)
    if (Number.isFinite(custom) && custom > 0) return custom
    return Math.max(1, Number(preset) || 1)
}

export function formatDateBRIntl(iso: string) {
    const date = new Date(`${iso}T00:00:00`)
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date)
}

export function DetailsTable({ preset, customDays, productId, entityId }: Props) {
    const [daily, setDaily] = useState<DailyRow[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const days = useMemo(() => parseDays(preset, customDays), [preset, customDays])

    useEffect(() => {
        if (!entityId || !productId) return

        const fetchDaily = async () => {
            try {
                setLoading(true)
                setError(null)

                const res = await api.get<RealizedSalesResponse>("/forecast/orders/realized/daily", {
                    params: { entityId, productId, days },
                })

                setDaily(res.data.daily ?? [])
            } catch (err) {
                console.error("DetailsTable fetch error:", err)
                setError("Erro ao buscar vendas realizadas")
                setDaily([])
            } finally {
                setLoading(false)
            }
        }

        fetchDaily()
    }, [entityId, productId, days])

    return (
        <Card style={{ gridColumn: "1 / -1" }}>
            <CardHeader>
                <div>
                    <CardTitle>Detalhamento (realizado)</CardTitle>
                    <CardHint>Vendas realizadas por dia (últimos {days} dias)</CardHint>
                    {error && <CardHint><b>{error}</b></CardHint>}
                </div>
            </CardHeader>

            <Divider />

            {loading ? (
                <EmptyState>Carregando vendas...</EmptyState>
            ) : daily.length === 0 ? (
                <EmptyState>Nenhuma venda encontrada no período.</EmptyState>
            ) : (
                <Table>
                    <thead>
                        <Tr>
                            <Th>Data</Th>
                            <Th style={{ textAlign: "right" }}>Qtd.</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {daily.map((d) => (
                            <Tr key={d.date}>
                                <Td>{formatDateBRIntl(d.date)}</Td>
                                <Td style={{ textAlign: "right" }}>{d.qty.toLocaleString("pt-BR")}</Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Card>
    )
}
