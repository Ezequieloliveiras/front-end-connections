import { useMemo } from "react"

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
import { DetailsTableProps } from "./types"
import { useDetailsTableStates } from "@/app/hooks/forecastDashboard/detailsTable/useDetailsTableHandlers"

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

export function DetailsTable({ preset, customDays, productId }: DetailsTableProps) {

  const days = useMemo(() => parseDays(preset, customDays), [preset, customDays])

  const states = useDetailsTableStates({ productId, days })
  const { daily, loading, error } = states

  return (
    <Card style={{ gridColumn: "1 / -1", position: "relative" }}>
      <CardHeader>
        <div>
          <CardTitle>Detalhamento de unidades vendidas nos últimos {days} dias</CardTitle>
          <CardHint>Quantidade de unidades vendidas por dia.</CardHint>
          {error && <CardHint><b>{error}</b></CardHint>}
        </div>
      </CardHeader>

      <Divider />

      {/* mantém estrutura estável */}
      {daily.length === 0 ? (
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

      {/* overlay de loading sem trocar layout */}
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.65)",
            display: "grid",
            placeItems: "center",
            backdropFilter: "blur(2px)",
          }}
        >
          <EmptyState style={{ marginTop: 0 }}>Carregando vendas...</EmptyState>
        </div>
      )}
    </Card>
  )
}
