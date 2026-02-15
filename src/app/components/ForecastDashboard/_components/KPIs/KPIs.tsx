import { ForecastResponse } from "../../types"
import {
    Card,
    Badge,
    KpiRow,
    KpiCard,
    KpiLabel,
    KpiValue,
} from "./styles"

interface Props {
    data: ForecastResponse
    preset: number | string
}

type Tone = "good" | "bad" | "neutral"

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
// Utilizamos o histórico de vendas do produto e a tendência recente para projetar a demanda futura
export function KPIs({ data, preset }: Props) {
    const { tone: trendTone, text: trendText } = getTrendUI(data.trend)
    const forecast = Number(data.nextDays ?? 0)      // previsão para os próximos X dias
    const days = Number(data.days ?? 0)              // dias analisados (vem do back)
    const avgPerDay = days > 0 ? forecast / days : 0
    const confidence = Math.round(Number(data.confidence ?? 0))

    return (
        <Card style={{ gridColumn: "1 / -1", padding: "16px 16px 12px 16px" }}>

            <KpiRow style={{ gridTemplateColumns: "1.2fr 1fr", gap: 14 }}>
                {/* KPI principal */}
                <KpiCard style={{ minHeight: 110, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <KpiLabel>Vendas previstas nos próximos {preset} dias</KpiLabel>
                    <KpiValue style={{ fontSize: 34, lineHeight: "40px" }}>
                        {forecast.toLocaleString("pt-BR")}
                    </KpiValue>
                    <KpiLabel>Com base nas vendas recentes e na tendência atual, a expectativa é de aproximadamente {forecast} unidades nos próximos {preset} dias</KpiLabel>
                </KpiCard>

                {/* mini KPIs (tapando o “buraco” com info útil pro forecast) */}
                <KpiCard style={{ display: "grid", gap: 10, alignContent: "start" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                        <div>
                            <KpiLabel>Confiança</KpiLabel>
                            <KpiValue>{confidence}%</KpiValue>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                            <KpiLabel>Tendência</KpiLabel>
                            <div style={{ marginTop: 6 }}>
                                <Badge $tone={trendTone}>{trendText}</Badge>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                        <div>
                            <KpiLabel>Média/dia</KpiLabel>
                            <KpiValue>{avgPerDay.toFixed(1).replace(".", ",")}</KpiValue>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <KpiLabel>Dias analisados</KpiLabel>
                            <KpiValue>{preset}</KpiValue>
                        </div>
                    </div>
                </KpiCard>
            </KpiRow>
        </Card>
    )
}
