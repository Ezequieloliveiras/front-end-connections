import { ForecastResponse } from "../../types"
import {
    Card,
    CardHeader,
    CardTitle,
    CardHint,
    Divider,
    ChartWrap,
    BarList,
    BarItem,
    BarLabel,
    BarTrack,
    BarFill
} from "./styles"

interface Props {
    data: ForecastResponse
}

export function PlannedVsRealized({ data }: Props) {
    const max = Math.max(...data.topChannels.map(c => c.value), 1)
    const maxChannel = Math.max(...data.topChannels.map(c => c.value), 1)

    return (
        <>
            <Card>
                <CardHeader>
                    <div>
                        <CardTitle>Planejado x Realizado</CardTitle>
                        <CardHint>Comparativo rápido por canal (exemplo)</CardHint>
                    </div>
                </CardHeader>

                <Divider />

                <ChartWrap>
                    <BarList>
                        {data.topChannels.map((c) => (
                            <BarItem key={c.name}>
                                <BarLabel>{c.name}</BarLabel>
                                <BarTrack>
                                    <BarFill style={{ width: `${Math.round((c.value / maxChannel) * 100)}%` }} />
                                </BarTrack>
                                <span style={{ width: 64, textAlign: "right" }}>
                                    {c.value.toLocaleString("pt-BR")}
                                </span>
                            </BarItem>
                        ))}
                    </BarList>
                </ChartWrap>
            </Card>
        </>
    )
}
