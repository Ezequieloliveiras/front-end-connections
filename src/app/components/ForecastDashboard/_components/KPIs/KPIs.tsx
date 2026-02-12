import { ForecastResponse } from "../../types"
import {
    Card,
    Badge,
    CardHeader,
    CardTitle,
    CardHint,
    KpiRow,
    KpiCard,
    KpiLabel,
    KpiValue,
    KpiSub
} from "./styles"

interface Props {
    data: ForecastResponse
}

type Trend = "stable" | "up" | "down"
type Tone = "good" | "bad" | "neutral"




export function KPIs({ data }: Props) {
    const trendMap = {
        up: { label: "Alta", tone: "good" },
        down: { label: "Queda", tone: "bad" },
        stable: { label: "Estável", tone: "neutral" },
    }

    const trend = trendMap[data.trend]

function getTrendUI(trend?: string): { tone: Tone; text: string } {
  switch (trend) {
    case "up":
      return { tone: "good", text: "Em alta" }
    case "down":
      return { tone: "bad", text: "Em baixa" }
    case "stable":
    default:
      return { tone: "neutral", text: "Estável" }
  }
}
const { tone: trendTone, text: trendText } = getTrendUI(data.trend)

    return (
        <>
            <Card style={{ gridColumn: "1 / -1" }}>
                <CardHeader>
                    <div>
                        <CardTitle>{data.productName}</CardTitle>
                        <CardHint>
                            Período: <b>{data.days} dias</b> • Confiança: <b>{Math.round(data.confidence)}%</b> • Tendência:{" "}
                           <Badge $tone={trendTone}>{trendText}</Badge>

                        </CardHint>
                    </div>
                </CardHeader>

                <KpiRow>
                    <KpiCard>
                        <KpiLabel>Previsão (Qtd.)</KpiLabel>
                        <KpiValue>{data.nextDays?.toLocaleString("pt-BR")}</KpiValue>
                        <KpiSub>Estimativa para {data.days} dias</KpiSub>
                    </KpiCard>

                    <KpiCard>
                        <KpiLabel>Planejado</KpiLabel>
                        <KpiValue>{data.plannedQty?.toLocaleString("pt-BR")}</KpiValue>
                        <KpiSub>Meta definida</KpiSub>
                    </KpiCard>

                    <KpiCard>
                        <KpiLabel>Realizado</KpiLabel>
                        <KpiValue>{data.realizedQty?.toLocaleString("pt-BR")}</KpiValue>
                        <KpiSub>Último consolidado</KpiSub>
                    </KpiCard>

                    <KpiCard>
                        <KpiLabel>Gap (Planejado - Realizado)</KpiLabel>
                        <KpiValue>{(data.plannedQty - data.realizedQty)?.toLocaleString("pt-BR")}</KpiValue>
                        <KpiSub>Diferença atual</KpiSub>
                    </KpiCard>
                </KpiRow>
            </Card>
        </>
    )
}
