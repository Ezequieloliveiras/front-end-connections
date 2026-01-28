import {
  Card,
  Header,
  Sku,
  MainValue,
  Label,
  Value,
  Grid,
  Metric,
  MetricLabel,
  MetricValue,
  Divider,
  History,
  Container,
} from "./styles"

interface ForecastData {
  sku: string
  prediction: number
  history?: number[]
  forecast?: number
  confidence?: number
  trend?: number
}

export function ForecastResult({ data }: { data?: ForecastData }) {
  if (!data) return null

  return (
      <Card>
        <Header>
          <Sku>SKU {data.sku}</Sku>
        </Header>

        <MainValue>
          <Label>Previsão</Label>
          <Value>{data.prediction}</Value>
        </MainValue>

        <Grid>
          <Metric>
            <MetricLabel>Previsão</MetricLabel>
            <MetricValue>{data.forecast ?? "—"}</MetricValue>
          </Metric>

          <Metric>
            <MetricLabel>Confiança</MetricLabel>
            <MetricValue>
              {data.confidence ? `${data.confidence}%` : "—"}
            </MetricValue>
          </Metric>

          <Metric>
            <MetricLabel>Tendência</MetricLabel>
            <MetricValue>{data.trend ?? "—"}</MetricValue>
          </Metric>
        </Grid>

        <Divider />

        <History>
          <strong>Histórico:</strong>{" "}
          {data.history?.length ? data.history.join(", ") : "Sem histórico"}
        </History>
      </Card>
  )
}
