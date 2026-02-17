import { useToast } from "@/app/components/Toast/Toast"
import {
    Grid,
    Card,
    CardTop,
    CardTitleRow,
    MarketplaceName,
    StatusBadge,
    CardBody,
    Row,
    Label,
    Value,
    CardActions,
    Btn,
    BtnPrimary,
    BtnDanger,
    EmptyHint,
    BtnGhost
} from "./styles"
import { api } from "@/app/services/api"
import Image from "next/image"
type Marketplace = "mercado_livre" | "shopee" | "magalu"
type AnnouncementStatus = "active" | "paused" | "inactive" | "draft" | "error"

type Announcement = {
    _id?: string
    entityId: string
    productId?: string
    marketplace: Marketplace
    marketplaceProductId?: string
    price: number
    stock: number
    status: AnnouncementStatus
    lastSyncAt?: string
    syncError?: string | null
    config?: Record<string, any>
    createdAt?: string
    updatedAt?: string
}


export function Announcements({ pageItems, statusLabel, openModalFor, safeNumber, formatBRL, MARKETPLACES, setAnnouncements }: any) {
    const { pushToast } = useToast()
    const upsertByIdLocal = (id: string, patch: Partial<Announcement>) => {
        setAnnouncements((prev: any) =>
            prev.map((a: any) => (a._id === id ? { ...a, ...patch, updatedAt: new Date().toISOString() } : a))
        )
    }

    const handleSyncOne = async (ann: Announcement) => {
        if (!ann?._id) return pushToast("error", "Anúncio sem ID para sincronizar.")
        try {
            const { data } = await api.post<Announcement>(`/announcements/${ann._id}/sync`)
            upsertByIdLocal(ann._id, data)
            pushToast("info", "Sincronização disparada.")
        } catch (err) {
            console.error(err)
            pushToast("error", "Erro ao sincronizar.")
        }
    }

    return (
        <>
            <Grid>
                {pageItems.length ? (
                    pageItems.map((ann: any) => {
                        const mpInfo = MARKETPLACES.find((m: any) => m.key === ann.marketplace)
                        const st = ann.status ?? "inactive"
                        return (
                            <Card key={ann._id ?? `${ann.marketplace}-${ann.marketplaceProductId}-${ann.productId}`}>
                                <CardTop>
                                    <CardTitleRow>
                                        <MarketplaceName>
                                            <span aria-hidden>{mpInfo?.icon}</span> {mpInfo?.label ?? ann.marketplace}
                                            <Image src={mpInfo.src} alt={mpInfo.label} width={mpInfo.width ?? 50} height={mpInfo.height ?? 50} />

                                        </MarketplaceName>
                                        <StatusBadge $status={st}>{statusLabel(st)}</StatusBadge>
                                    </CardTitleRow>
                                </CardTop>

                                <CardBody>
                                    <Row>
                                        <Label>ID do anúncio</Label>
                                        <Value>{ann._id ?? "—"}</Value>
                                    </Row>
                                    <Row>
                                        <Label>ID no marketplace</Label>
                                        <Value>{ann.marketplaceProductId ?? "—"}</Value>
                                    </Row>
                                    <Row>
                                        <Label>Product ID</Label>
                                        <Value>{ann.productId ?? "—"}</Value>
                                    </Row>
                                    <Row>
                                        <Label>Preço</Label>
                                        <Value>{formatBRL(safeNumber(ann.price))}</Value>
                                    </Row>
                                    <Row>
                                        <Label>Estoque</Label>
                                        <Value>{safeNumber(ann.stock)}</Value>
                                    </Row>

                                    {ann.status === "error" && ann.syncError ? <EmptyHint>Erro: {ann.syncError}</EmptyHint> : null}
                                </CardBody>

                                <CardActions>
                                    <Btn onClick={() => openModalFor(ann, "edit")} disabled={!ann._id}>
                                        Editar
                                    </Btn>

                                    {ann.status === "inactive" || ann.status === "draft" ? (
                                        <BtnPrimary onClick={() => openModalFor(ann, "publish")} disabled={!ann._id}>
                                            Publicar
                                        </BtnPrimary>
                                    ) : (
                                        <BtnDanger onClick={() => openModalFor(ann, "unpublish")} disabled={!ann._id}>
                                            Despublicar
                                        </BtnDanger>
                                    )}

                                    <BtnGhost onClick={() => handleSyncOne(ann)} disabled={!ann._id}>
                                        Sincronizar
                                    </BtnGhost>
                                </CardActions>
                            </Card>
                        )
                    })
                ) : (
                    <Card>
                        <CardBody>
                            <EmptyHint>Nenhum anúncio com esses filtros.</EmptyHint>
                        </CardBody>
                    </Card>
                )}
            </Grid>
        </>
    )
}