import { ForecastResponse } from "../../types"
import {
    Card,
    CardHeader,
    CardTitle,
    CardHint,
    Divider,
    Table,
    Tr,
    Th,
    Td
} from "./styles"

interface Props {
    data: ForecastResponse
}

export function DetailsTable({ data }: Props) {
    return (
        <>
            <Card style={{ gridColumn: "1 / -1" }}>
                <CardHeader>
                    <div>
                        <CardTitle>Detalhamento (amostra)</CardTitle>
                        <CardHint>Últimos dias (exemplo). Aqui você pluga sua série real.</CardHint>
                    </div>
                </CardHeader>

                <Divider />

                <Table>
                    <thead>
                        <Tr>
                            <Th>Data</Th>
                            <Th style={{ textAlign: "right" }}>Qtd.</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {data.daily.map(d => (
                            <Tr key={d.date}>
                                <Td>{d.date}</Td>
                                <Td style={{ textAlign: "right" }}>{d.qty.toLocaleString("pt-BR")}</Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}
