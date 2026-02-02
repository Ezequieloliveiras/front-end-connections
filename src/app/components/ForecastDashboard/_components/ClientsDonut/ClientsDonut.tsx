import { ForecastResponse } from "../../types"
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

export function ClientsDonut({ data }: Props) {
    const total = data.clients.hit + data.clients.notHit
    const percent = total ? data.clients.hit / total : 0
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
                    <Badge $tone="good">Atingiram: {data.clients.hit.toLocaleString("pt-BR")}</Badge>
                    <Badge $tone="neutral">Não atingiram: {data.clients.notHit.toLocaleString("pt-BR")}</Badge>
                </div>
            </Card>
        </>
    )
}
