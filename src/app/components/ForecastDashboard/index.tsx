import React, { use, useEffect, useMemo, useState } from "react"
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
  EmptyState,
} from "./styles"
import { KPIs } from "./_components/KPIs/KPIs"
import { ClientsDonut } from "./_components/ClientsDonut/ClientsDonut"
import { PlannedVsRealized } from "./_components/PlannedVsRealized/PlannedVsRealized"
import { DetailsTable } from "./_components/DetailsTable/DetailsTable"
import { getForecastByDayCustom } from "@/app/services/forecast/forecast.service"
import { getAllProductsByEntity } from "@/app/services/product/product.service"

type PeriodPreset = 7 | 30 | 90 | "custom"

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

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}

type ProductApi = { _id: string; name: string }

export default function ForecastDashboard() {
  const [products, setProducts] = useState<ProductOption[]>([])
  const [productId, setProductId] = useState<string | undefined>()
  const [preset, setPreset] = useState<PeriodPreset>(30)
  const [customDays, setCustomDays] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ForecastResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const entityId = "697f8d6228e99ad17b44c353"


  useEffect(() => {
    if (!entityId) return

    const fetchProducts = async () => {
      try {
        const res: ProductApi[] = await getAllProductsByEntity(entityId)

        const options = res.map(p => ({ id: p._id, name: p.name }))
        setProducts(options)

        // só seta default se não tiver um selecionado ainda
        setProductId(prev => {
          if (prev && res.some(p => p._id === prev)) return prev
          return res[0]?._id ?? ""
        })
      } catch (err) {
        console.error("Erro ao buscar products:", err)
      }
    }

    fetchProducts()
  }, [entityId])

  const days = useMemo(() => {
    if (preset === "custom") return Math.max(1, Number(customDays || 1))
    return Number(preset)
  }, [preset, customDays])


  useEffect(() => {
    if (!entityId || !productId) return

    const fetchProductToAnalyze = async () => {
      try {
        const res = await getForecastByDayCustom(entityId, productId, days)
        setData(res)
      } catch (err) {
        console.log('err', err)
        console.error("Erro ao buscar products:", err)
      }
    }
    fetchProductToAnalyze()
  }, [products, preset, productId])


  const handleFetch = async () => {
    if (!entityId || !productId) return

    try {
      setLoading(true)
      const res = await getForecastByDayCustom(entityId, productId, days)
      setData(res)
    } catch (err) {
      setError("Erro ao buscar previsão")
    } finally {
      setLoading(false)
    }
  }

  // const days = useMemo(() => {
  //   if (preset === "custom") return Math.max(1, Number(customDays || 1))
  //   return Number(preset)
  // }, [preset, customDays])

  // const donutPercent = useMemo(() => {
  //   if (!data) return 0
  //   const total = data.clients.hit + data.clients.notHit
  //   if (!total) return 0
  //   return data.clients.hit / total
  // }, [data])

  // const maxChannel = useMemo(() => {
  //   if (!data?.topChannels?.length) return 1
  //   return Math.max(...data.topChannels.map(c => c.value), 1)
  // }, [data])

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
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label>Período</Label>
            <Select
              value={preset}
              onChange={(e) => {
                setPreset(e.target.value as PeriodPreset)
                setCustomDays("")
              }}
            >
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

          <Button onClick={handleFetch} disabled={loading}>
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

          <PlannedVsRealized entityId={entityId} productId={productId} days={days} />

          {/* Clientes atingindo o planejado (donut) */}
          <ClientsDonut />

          {/* Tabela (detalhes) */}
          <DetailsTable preset={preset} customDays={customDays} productId={productId}  entityId={entityId} />
        </ContentGrid>
      )}
    </Page>
  )
}
