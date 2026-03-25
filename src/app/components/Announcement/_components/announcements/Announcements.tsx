import Image from "next/image"
import { api } from "@/app/services/api"
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
    BtnGhost,
} from "./styles"

import { MARKETPLACES } from "../../constants"
import { statusLabel } from "@/app/utils/announcements/status"
import { formatBRL } from "@/app/utils/announcements/formatBRL"
import { Announcement, AnnouncementStatus } from "@/app/types/announcements/types"
import { AnnouncementsProps } from "./types"

export function Announcements({ openModalFor, safeNumber, setAnnouncements, pageItems }: AnnouncementsProps) {
    const { pushToast } = useToast()

    const upsertByIdLocal = (id: string, patch: Partial<Announcement>) => {
        setAnnouncements((prev) =>
            prev.map((a) =>
                a._id === id ? { ...a, ...patch, updatedAt: new Date().toISOString() } : a
            )
        )
    }

    const handleSyncOne = async (ann: Announcement) => {
        if (!ann._id) return pushToast("error", "Anúncio sem ID para sincronizar.")
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
        <Grid>
            {pageItems.length ? (
                pageItems.map((ann) => {
                    const mpInfo = MARKETPLACES.find((m) => m.key === ann.marketplace)
                    const st: AnnouncementStatus = ann.status ?? "inactive"

                    const cardKey =
                        ann._id ?? `${ann.marketplace}-${ann.marketplaceProductId ?? "—"}-${ann.productId ?? "—"}`

                    return (
                        <Card key={cardKey}>
                            <CardTop>
                                <CardTitleRow>
                                    <MarketplaceName>
                                        {mpInfo?.label ?? ann.marketplace}
                                        {mpInfo && (
                                            <Image
                                                src={mpInfo.src}
                                                alt={mpInfo.label}
                                                width={mpInfo.width ?? 50}
                                                height={mpInfo.height ?? 50}
                                            />
                                        )}
                                    </MarketplaceName>

                                    <StatusBadge $status={st}>{statusLabel(st)}</StatusBadge>
                                </CardTitleRow>
                            </CardTop>

                            <CardBody>
                                <Row>
                                    <Label>ID no marketplace</Label>
                                    <Value>{ann.marketplaceProductId ?? "—"}</Value>
                                </Row>
                                <Row>
                                    <Label>Product ID</Label>
                                    <Value>{ann.productId ?? "—"}</Value>
                                </Row>
                                <Row>
                                    <Label>Produto</Label>
                                    <Value>{ann?.config?.title ?? "—"}</Value>
                                </Row>

                                <Row>
                                    <Label>Descrição</Label>
                                    <Value>{ann?.config?.description ?? "—"}</Value>
                                </Row>

                                <Row>
                                    <Label>Preço</Label>
                                    <Value>{formatBRL(safeNumber(ann.price))}</Value>
                                </Row>
                                <Row>
                                    <Label>Estoque</Label>
                                    <Value>{safeNumber(ann.stock)}</Value>
                                </Row>

                                {ann.status === "error" && ann.syncError ? (
                                    <EmptyHint>Erro: {ann.syncError}</EmptyHint>
                                ) : null}
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
    )
}
