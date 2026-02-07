import {
    Card,
    CardHeader,
    CardTitle,
    CardHint,
    DonutWrap,
    DonutRing,
    DonutCenter,
    DonutValue,
    DonutLabel,
    Badge,
    Divider
} from "./styles"

interface Props {
    data: ForecastResponse
}

export type ForecastResponse = {
  topChannels: {
    name: string
    value: number
  }[]

  clients: {
    hit: number
    notHit: number
  }
}


 const mockForecast: ForecastResponse = {
  topChannels: [
    { name: "Mercado Livre", value: 1280 },
    { name: "Shopee", value: 860 },
    { name: "Amazon", value: 540 },
    { name: "Magalu", value: 310 },
    { name: "Loja Física", value: 150 },
  ],

  clients: {
    hit: 74,
    notHit: 26,
  },
}



export function ClientsDonut() {
    const total = mockForecast.clients.hit + mockForecast.clients.notHit
    const percent = total ? mockForecast.clients.hit / total : 0
    const donutPercent = Math.min(1, Math.max(0, percent))

    return (
        <>
            <Card>
                <CardHeader>
                    <div>
                        <CardTitle>Clientes atingindo o planejado</CardTitle>
                        <CardHint>Status da meta no período</CardHint>
                    </div>
                </CardHeader>

                <Divider />

                <DonutWrap>
                    <DonutRing $percent={donutPercent} />
                    <DonutCenter>
                        <DonutValue>{Math.round(donutPercent * 100)}%</DonutValue>
                        <DonutLabel>Atingiram</DonutLabel>
                    </DonutCenter>
                </DonutWrap>

                <div style={{ marginTop: 14, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    <Badge $tone="good">Atingiram: {mockForecast.clients.hit.toLocaleString("pt-BR")}</Badge>
                    <Badge $tone="neutral">Não atingiram: {mockForecast.clients.notHit.toLocaleString("pt-BR")}</Badge>
                </div>
            </Card>
        </>
    )
}
