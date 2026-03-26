import Image from "next/image"
import {
    Grid,
    Card,
    CardBody,
    CardTitleRow,
    CardTop,
    Label,
    MarketplaceName,
    Row,
    Value,
} from "./styles"

import { MARKETPLACES } from "../../constants"
import { HeaderTotalProps } from "./types"

export function HeaderTotal({ summaryByMarketplace }: HeaderTotalProps) {
    return (
        <>
            {/* se quiser usar o ícone em algum lugar: <GridIcon size={18} /> */}

            <Grid>
                {MARKETPLACES.map((mp) => {
                    const sum = summaryByMarketplace[mp.key]

                    if (!sum) return null

                    return (
                        <Card key={mp.key}>
                            <CardTop>
                                <CardTitleRow>
                                    <MarketplaceName>
                                        <span aria-hidden>{mp.label}</span>
                                    </MarketplaceName>
                                    <Image src={mp.src} alt={mp.label} width={mp.width ?? 50} height={mp.height ?? 50} />
                                    {/* <StatusBadge $status={worstStatus}>
                                        {sum.counts.error ? "Atenção" : "OK"}
                                    </StatusBadge> */}
                                </CardTitleRow>
                            </CardTop>

                            <CardBody>
                                <Row>
                                    <Label>Total</Label>
                                    <Value>{sum.total}</Value>
                                </Row>
                                <Row>
                                    <Label>Publicados</Label>
                                    <Value>{sum.counts.active}</Value>
                                </Row>
                                <Row>
                                    <Label>Pausados</Label>
                                    <Value>{sum.counts.paused}</Value>
                                </Row>
                                <Row>
                                    <Label>Rascunho</Label>
                                    <Value>{sum.counts.draft}</Value>
                                </Row>
                                <Row>
                                    <Label>Erros</Label>
                                    <Value>{sum.counts.error}</Value>
                                </Row>
                            </CardBody>
                        </Card>
                    )
                })}
            </Grid>
        </>
    )
}
