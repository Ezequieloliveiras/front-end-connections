import Image from "next/image"
import {
    Grid,
    Btn,
    BtnGhost,
    Card,
    CardActions,
    CardBody,
    CardTitleRow,
    CardTop,
    Label,
    MarketplaceName,
    Row,
    StatusBadge,
    Value,
} from "./styles"


type AnnouncementStatus = "active" | "paused" | "inactive" | "draft" | "error"

export function HeaderTotal({
    MARKETPLACES,
    summaryByMarketplace,
    pushToast,
    setSearch,
}: any) {
    return (
        <>
            {/* se quiser usar o ícone em algum lugar: <GridIcon size={18} /> */}

            <Grid>
                {MARKETPLACES.map((mp: any) => {
                    const sum = summaryByMarketplace?.[mp.key]

                    // guarda pra não quebrar se vier undefined
                    if (!sum) return null

                    const worstStatus: AnnouncementStatus =
                        sum.counts.error > 0
                            ? "error"
                            : sum.counts.draft > 0
                                ? "draft"
                                : sum.counts.inactive > 0
                                    ? "inactive"
                                    : sum.counts.paused > 0
                                        ? "paused"
                                        : "active"

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
