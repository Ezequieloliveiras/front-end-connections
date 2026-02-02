import React, { useEffect, useMemo, useState } from "react"
import {
  Page,
  Topbar,
  TitleBlock,
  Title,
  Subtitle,
  Filters,
  Field,
  Label,
  Select,
  Input,
  Button,
  ContentGrid,
  Card,
  CardHeader,
  CardTitle,
  CardHint,
  KpiRow,
  KpiCard,
  KpiLabel,
  KpiValue,
  KpiSub,
  Divider,
  ChartWrap,
  BarList,
  BarItem,
  BarLabel,
  BarTrack,
  BarFill,
  DonutWrap,
  DonutRing,
  DonutCenter,
  DonutValue,
  DonutLabel,
  Table,
  Th,
  Td,
  Tr,
  Badge,
  EmptyState,
} from "./styles"
import { KPIs } from "./_components/KPIs/KPIs"
import { ClientsDonut } from "./_components/ClientsDonut/ClientsDonut"
import { PlannedVsRealized } from "./_components/PlannedVsRealized/PlannedVsRealized"
import { DetailsTable } from "./_components/DetailsTable/DetailsTable"

type PeriodPreset = "7" | "30" | "90" | "custom"

type ProductOption = {
  id: string
  name: string
}

type ForecastResponse = {
  productId: string
  productName: string
  days: number
  forecastQty: number
  confidence: number // 0..1
  trend: "up" | "down" | "stable"
  plannedQty: number
  realizedQty: number
  // exemplo de breakdown (pra gráficos)
  daily: Array<{ date: string; qty: number }>
  clients: { hit: number; notHit: number }
  topChannels: Array<{ name: string; value: number }>
}

const mockProducts: ProductOption[] = [
  { id: "p1", name: "Suporte Monitor LG 27" },
  { id: "p2", name: "Teclado Mecânico" },
  { id: "p3", name: "Mouse Gamer" },
]

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}

// 🔌 Troque isso por sua chamada real: api.get(`/forecast?productId=${id}&days=${days}`)
async function fetchForecast(productId: string, days: number): Promise<ForecastResponse> {
  const product = mockProducts.find(p => p.id === productId) ?? mockProducts[0]
  const base = productId === "p1" ? 120 : productId === "p2" ? 80 : 55

  const forecastQty = Math.round(base * (days / 30) * 1.12)
  const plannedQty = Math.round(forecastQty * 1.05)
  const realizedQty = Math.round(forecastQty * 0.92)

  const confidence = clamp01(productId === "p1" ? 0.78 : productId === "p2" ? 0.66 : 0.59)
  const trend: ForecastResponse["trend"] = productId === "p1" ? "up" : productId === "p2" ? "stable" : "down"

  const daily = Array.from({ length: Math.min(days, 14) }).map((_, i) => {
    const qty = Math.max(0, Math.round((forecastQty / Math.min(days, 14)) * (0.6 + Math.random())))
    const date = new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    return { date, qty }
  })

  const hit = Math.round(120 + Math.random() * 80)
  const notHit = Math.round(260 + Math.random() * 200)

  const topChannels = [
    { name: "Primary", value: Math.round(90 + Math.random() * 60) },
    { name: "Blood Culture", value: Math.round(60 + Math.random() * 45) },
    { name: "ID/AST", value: Math.round(35 + Math.random() * 30) },
    { name: "Wongels", value: Math.round(20 + Math.random() * 25) },
    { name: "TB", value: Math.round(10 + Math.random() * 20) },
  ]

  return {
    productId,
    productName: product.name,
    days,
    forecastQty,
    confidence,
    trend,
    plannedQty,
    realizedQty,
    daily,
    clients: { hit, notHit },
    topChannels,
  }
}

export default function ForecastDashboard() {
  const [productId, setProductId] = useState(mockProducts[0].id)
  const [preset, setPreset] = useState<PeriodPreset>("30")
  const [customDays, setCustomDays] = useState("30")

  const days = useMemo(() => {
    if (preset === "custom") return Math.max(1, Number(customDays || 1))
    return Number(preset)
  }, [preset, customDays])

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ForecastResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    try {
      setLoading(true)
      setError(null)
      const res = await fetchForecast(productId, days)
      setData(res)
    } catch (e: any) {
      setError("Não foi possível carregar a previsão.")
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, days])

  const donutPercent = useMemo(() => {
    if (!data) return 0
    const total = data.clients.hit + data.clients.notHit
    if (!total) return 0
    return data.clients.hit / total
  }, [data])

  const maxChannel = useMemo(() => {
    if (!data?.topChannels?.length) return 1
    return Math.max(...data.topChannels.map(c => c.value), 1)
  }, [data])

  const trendText = data?.trend === "up" ? "Alta" : data?.trend === "down" ? "Queda" : "Estável"
  const trendTone = data?.trend === "up" ? "good" : data?.trend === "down" ? "bad" : "neutral"

  return (
    <Page>
      <Topbar>
        <TitleBlock>
          <Title>Previsão de Vendas</Title>
          <Subtitle>Dashboard simples, limpo e pronto pra evoluir</Subtitle>
        </TitleBlock>

        <Filters>
          <Field>
            <Label>Produto</Label>
            <Select value={productId} onChange={(e) => setProductId(e.target.value)}>
              {mockProducts.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label>Período</Label>
            <Select value={preset} onChange={(e) => setPreset(e.target.value as PeriodPreset)}>
              <option value="7">7 dias</option>
              <option value="30">30 dias</option>
              <option value="90">90 dias</option>
              <option value="custom">Personalizado</option>
            </Select>
          </Field>

          <Field style={{ minWidth: 160, opacity: preset === "custom" ? 1 : 0.55 }}>
            <Label>Dias</Label>
            <Input
              disabled={preset !== "custom"}
              value={customDays}
              onChange={(e) => setCustomDays(e.target.value.replace(/\D/g, ""))}
              placeholder="Ex: 45"
              inputMode="numeric"
            />
          </Field>

          <Button onClick={load} disabled={loading}>
            {loading ? "Carregando..." : "Atualizar"}
          </Button>
        </Filters>
      </Topbar>

      {error && (
        <Card>
          <CardHeader>
            <CardTitle>Ops</CardTitle>
            <CardHint>{error}</CardHint>
          </CardHeader>
        </Card>
      )}

      {!data && !loading && !error && (
        <EmptyState>
          Selecione um produto e um período para visualizar.
        </EmptyState>
      )}

      {data && (
        <ContentGrid>
          {/* KPIs */}
          <KPIs data={data} />

          {/* Planejado x Realizado (barras simples) */}
         <PlannedVsRealized data={data} />

          {/* Clientes atingindo o planejado (donut) */}
          <ClientsDonut data={data} />

          {/* Tabela (detalhes) */}
          <DetailsTable data={data} />
        </ContentGrid>
      )}
    </Page>
  )
}
