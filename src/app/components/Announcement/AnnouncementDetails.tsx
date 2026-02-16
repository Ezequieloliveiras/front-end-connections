"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import {
    Page,
    Container,
    Header,
    HeaderLeft,
    Title,
    SubTitle,
    MetaRow,
    MetaPill,
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
    BtnGhost,
    Divider,
    EmptyHint,
    ModalOverlay,
    ModalCard,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    FieldGrid,
    Field,
    FieldLabel,
    Input,
    Select,
    ModalFooter,
    ToastArea,
    ToastItem,
} from "./styles"

import { api } from "@/app/services/api"

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

const MARKETPLACES: Array<{ key: Marketplace; label: string; icon: string }> = [
    { key: "mercado_livre", label: "Mercado Livre", icon: "🟡" },
    { key: "shopee", label: "Shopee", icon: "🟠" },
    { key: "magalu", label: "Magalu", icon: "🔵" },
]

const STATUS_OPTIONS: Array<{ key: AnnouncementStatus | "all"; label: string }> = [
    { key: "all", label: "Todos" },
    { key: "active", label: "Publicado" },
    { key: "paused", label: "Pausado" },
    { key: "inactive", label: "Não publicado" },
    { key: "draft", label: "Rascunho" },
    { key: "error", label: "Erro" },
]

function statusLabel(status: AnnouncementStatus) {
    switch (status) {
        case "active":
            return "Publicado"
        case "paused":
            return "Pausado"
        case "inactive":
            return "Não publicado"
        case "draft":
            return "Rascunho"
        case "error":
            return "Erro"
        default:
            return status
    }
}

type Toast = { id: string; type: "success" | "error" | "info"; message: string }

function safeNumber(v: any) {
    const n = Number(v)
    return Number.isFinite(n) ? n : 0
}

function formatBRL(value: number) {
    try {
        return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    } catch {
        return `R$ ${value}`
    }
}

export default function AnnouncementManager() {
    const params = useParams<{ id?: string }>()
    const announcementId = params?.id // (se existir, você pode usar futuramente pra deep-link)

    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)

    /** filtros */
    const [mpFilter, setMpFilter] = useState<Marketplace | "all">("all")
    const [statusFilter, setStatusFilter] = useState<AnnouncementStatus | "all">("all")
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const pageSize = 20

    /** toast */
    const [toastList, setToastList] = useState<Toast[]>([])
    const pushToast = (type: Toast["type"], message: string) => {
        const id = String(Date.now() + Math.random())
        setToastList((prev) => [{ id, type, message }, ...prev].slice(0, 3))
        setTimeout(() => setToastList((prev) => prev.filter((t) => t.id !== id)), 2500)
    }

    /** modal */
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState<"edit" | "publish" | "unpublish">("edit")
    const [selectedId, setSelectedId] = useState<string | null>(null)

    /** form modal */
    const [formPrice, setFormPrice] = useState<number>(0)
    const [formStock, setFormStock] = useState<number>(0)
    const [formStatus, setFormStatus] = useState<AnnouncementStatus>("draft")

    const closeModal = () => setIsOpen(false)

    const entityId = announcements[0]?.entityId

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true)
            try {
                const { data } = await api.get<Announcement[]>(`/announcements`)
                setAnnouncements(data ?? [])
            } catch (err) {
                console.error(err)
                setAnnouncements([])
                pushToast("error", "Erro ao carregar anúncios.")
            } finally {
                setLoading(false)
            }
        }

        fetchAll()
    }, [announcementId])

    /** ===== agregação por marketplace ===== */
    const summaryByMarketplace = useMemo(() => {
        const base: Record<Marketplace, { total: number; counts: Record<AnnouncementStatus, number> }> = {
            mercado_livre: { total: 0, counts: { active: 0, paused: 0, inactive: 0, draft: 0, error: 0 } },
            shopee: { total: 0, counts: { active: 0, paused: 0, inactive: 0, draft: 0, error: 0 } },
            magalu: { total: 0, counts: { active: 0, paused: 0, inactive: 0, draft: 0, error: 0 } },
        }

        for (const a of announcements) {
            const mp = a.marketplace
            base[mp].total += 1
            base[mp].counts[a.status] = (base[mp].counts[a.status] ?? 0) + 1
        }
        return base
    }, [announcements])

    /** ===== lista filtrada ===== */
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        const items = announcements.filter((a) => {
            if (mpFilter !== "all" && a.marketplace !== mpFilter) return false
            if (statusFilter !== "all" && a.status !== statusFilter) return false

            if (!q) return true

            // reaproveitando seus dados (sem "title" disponível)
            const hay = [
                a._id,
                a.marketplaceProductId,
                a.productId,
                a.entityId,
                a.status,
                a.marketplace,
                String(a.price),
                String(a.stock),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase()

            return hay.includes(q)
        })

        // ordenação: erro primeiro, depois updatedAt desc
        const scoreStatus = (s: AnnouncementStatus) => (s === "error" ? 0 : s === "draft" ? 1 : s === "inactive" ? 2 : s === "paused" ? 3 : 4)

        items.sort((a, b) => {
            const sa = scoreStatus(a.status)
            const sb = scoreStatus(b.status)
            if (sa !== sb) return sa - sb

            const da = new Date(a.updatedAt ?? a.createdAt ?? 0).getTime()
            const db = new Date(b.updatedAt ?? b.createdAt ?? 0).getTime()
            return db - da
        })

        return items
    }, [announcements, mpFilter, statusFilter, search])

    /** paginação front */
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))

    useEffect(() => {
        // sempre que filtro muda, volta pra 1
        setPage(1)
    }, [mpFilter, statusFilter, search])

    const pageItems = useMemo(() => {
        const start = (page - 1) * pageSize
        return filtered.slice(start, start + pageSize)
    }, [filtered, page])

    /** ===== seleção/modal ===== */
    const selectedAnnouncement = useMemo(() => {
        if (!selectedId) return null
        return announcements.find((a) => a._id === selectedId) ?? null
    }, [selectedId, announcements])

    const openModalFor = (ann: Announcement, nextMode: typeof mode) => {
        if (!ann?._id) return pushToast("error", "Anúncio sem ID.")
        setSelectedId(ann._id)
        setMode(nextMode)

        setFormPrice(safeNumber(ann.price))
        setFormStock(safeNumber(ann.stock))
        setFormStatus((ann.status as AnnouncementStatus) ?? "draft")

        setIsOpen(true)
    }

    const upsertByIdLocal = (id: string, patch: Partial<Announcement>) => {
        setAnnouncements((prev) =>
            prev.map((a) => (a._id === id ? { ...a, ...patch, updatedAt: new Date().toISOString() } : a))
        )
    }

    const handleSaveEdit = async () => {
        if (!selectedAnnouncement?._id) return pushToast("error", "Anúncio sem ID para atualizar.")
        const annId = selectedAnnouncement._id

        try {
            const payload = {
                price: safeNumber(formPrice),
                stock: safeNumber(formStock),
                status: formStatus,
            }

            const { data } = await api.patch<Announcement>(`/announcements/${annId}`, payload)
            upsertByIdLocal(annId, data)
            pushToast("success", "Anúncio atualizado.")
            closeModal()
        } catch (err) {
            console.error(err)
            pushToast("error", "Erro ao salvar anúncio.")
        }
    }

    const handlePublish = async () => {
        if (!selectedAnnouncement?._id) return pushToast("error", "Anúncio sem ID para publicar.")
        const annId = selectedAnnouncement._id

        try {
            const payload = {
                price: safeNumber(formPrice),
                stock: safeNumber(formStock),
            }

            const { data } = await api.post<Announcement>(`/announcements/${annId}/publish`, payload)
            upsertByIdLocal(annId, data)
            pushToast("success", "Publicado com sucesso.")
            closeModal()
        } catch (err) {
            console.error(err)
            pushToast("error", "Erro ao publicar.")
        }
    }

    const handleUnpublish = async () => {
        if (!selectedAnnouncement?._id) return pushToast("error", "Anúncio sem ID para despublicar.")
        const annId = selectedAnnouncement._id

        try {
            const { data } = await api.post<Announcement>(`/announcements/${annId}/unpublish`)
            upsertByIdLocal(annId, data)
            pushToast("info", "Despublicado.")
            closeModal()
        } catch (err) {
            console.error(err)
            pushToast("error", "Erro ao despublicar.")
        }
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

    if (loading) {
        return (
            <Page>
                <Container>
                    <EmptyHint>Carregando…</EmptyHint>
                </Container>
            </Page>
        )
    }

    if (!announcements.length) {
        return (
            <Page>
                <Container>
                    <EmptyHint>Nenhum anúncio encontrado ou erro ao carregar.</EmptyHint>
                </Container>
            </Page>
        )
    }

    return (
        <Page>
            <Container>
                <Header>
                    <HeaderLeft>
                        <Title>Anúncios</Title>
                        <SubTitle>Resumo + lista (pronto pra 100+)</SubTitle>

                        <MetaRow>
                            {entityId ? <MetaPill>Entity: {entityId}</MetaPill> : null}
                            {announcementId ? <MetaPill>Route ID: {announcementId}</MetaPill> : null}
                            <MetaPill>Total: {announcements.length}</MetaPill>
                            <MetaPill>Filtrados: {filtered.length}</MetaPill>
                        </MetaRow>
                    </HeaderLeft>
                </Header>

                <Divider />

                {/* ===== Resumo por marketplace ===== */}
                <Grid>
                    {MARKETPLACES.map((mp) => {
                        const sum = summaryByMarketplace[mp.key]
                        const worstStatus: AnnouncementStatus =
                            sum.counts.error > 0 ? "error" : sum.counts.draft > 0 ? "draft" : sum.counts.inactive > 0 ? "inactive" : sum.counts.paused > 0 ? "paused" : "active"

                        return (
                            <Card key={mp.key}>
                                <CardTop>
                                    <CardTitleRow>
                                        <MarketplaceName>
                                            <span aria-hidden>{mp.icon}</span> {mp.label}
                                        </MarketplaceName>
                                        <StatusBadge $status={worstStatus}>{sum.counts.error ? "Atenção" : "OK"}</StatusBadge>
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

                                <CardActions>
                                    <BtnGhost
                                        onClick={() => {
                                            setMpFilter(mp.key)
                                            pushToast("info", `Filtrando: ${mp.label}`)
                                        }}
                                    >
                                        Ver lista
                                    </BtnGhost>

                                    <Btn
                                        onClick={() => {
                                            setMpFilter("all")
                                            setStatusFilter("all")
                                            setSearch("")
                                            pushToast("info", "Filtros limpos.")
                                        }}
                                    >
                                        Limpar filtros
                                    </Btn>
                                </CardActions>
                            </Card>
                        )
                    })}
                </Grid>

                <Divider />

                {/* ===== Filtros (reaproveitando seus styles: FieldGrid/Field/Input/Select) ===== */}
                <Card>
                    <CardTop>
                        <CardTitleRow>
                            <MarketplaceName>🔎 Filtros</MarketplaceName>
                        </CardTitleRow>
                    </CardTop>

                    <CardBody>
                        <FieldGrid>
                            <Field>
                                <FieldLabel>Marketplace</FieldLabel>
                                <Select value={mpFilter} onChange={(e) => setMpFilter(e.target.value as any)}>
                                    <option value="all">Todos</option>
                                    {MARKETPLACES.map((m) => (
                                        <option key={m.key} value={m.key}>
                                            {m.label}
                                        </option>
                                    ))}
                                </Select>
                            </Field>

                            <Field>
                                <FieldLabel>Status</FieldLabel>
                                <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
                                    {STATUS_OPTIONS.map((s) => (
                                        <option key={s.key} value={s.key}>
                                            {s.label}
                                        </option>
                                    ))}
                                </Select>
                            </Field>

                            <Field>
                                <FieldLabel>Buscar (id, productId, marketplaceProductId…)</FieldLabel>
                                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ex: 65f... ou ML123..." />
                            </Field>
                        </FieldGrid>
                    </CardBody>

                    <CardActions>
                        <BtnGhost
                            onClick={() => {
                                setPage((p) => Math.max(1, p - 1))
                            }}
                            disabled={page <= 1}
                        >
                            ◀ Anterior
                        </BtnGhost>

                        <MetaPill>
                            Página {page} / {totalPages}
                        </MetaPill>

                        <BtnGhost
                            onClick={() => {
                                setPage((p) => Math.min(totalPages, p + 1))
                            }}
                            disabled={page >= totalPages}
                        >
                            Próxima ▶
                        </BtnGhost>
                    </CardActions>
                </Card>

                <Divider />

                {/* ===== Lista ===== */}
                <Grid>
                    {pageItems.length ? (
                        pageItems.map((ann) => {
                            const mpInfo = MARKETPLACES.find((m) => m.key === ann.marketplace)
                            const st = ann.status ?? "inactive"

                            return (
                                <Card key={ann._id ?? `${ann.marketplace}-${ann.marketplaceProductId}-${ann.productId}`}>
                                    <CardTop>
                                        <CardTitleRow>
                                            <MarketplaceName>
                                                <span aria-hidden>{mpInfo?.icon}</span> {mpInfo?.label ?? ann.marketplace}
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

                {/* ===== Modal ===== */}
                {isOpen && selectedAnnouncement ? (
                    <ModalOverlay onMouseDown={closeModal}>
                        <ModalCard onMouseDown={(e) => e.stopPropagation()}>
                            <ModalHeader>
                                <div>
                                    <ModalTitle>
                                        {mode === "edit" ? "Editar anúncio" : mode === "publish" ? "Publicar anúncio" : "Despublicar anúncio"}
                                    </ModalTitle>
                                    <SubTitle>
                                        {MARKETPLACES.find((m) => m.key === selectedAnnouncement.marketplace)?.label}
                                        {" • "}
                                        Anúncio: {selectedAnnouncement._id ?? "—"}
                                    </SubTitle>
                                </div>
                                <ModalClose onClick={closeModal} aria-label="Fechar">
                                    ✕
                                </ModalClose>
                            </ModalHeader>

                            <ModalBody>
                                {mode === "unpublish" ? (
                                    <EmptyHint>
                                        Isso vai marcar como <b>não publicado</b> neste marketplace.
                                    </EmptyHint>
                                ) : null}

                                <FieldGrid>
                                    <Field>
                                        <FieldLabel>Preço</FieldLabel>
                                        <Input
                                            type="number"
                                            value={formPrice}
                                            onChange={(e) => setFormPrice(Number(e.target.value))}
                                            min={0}
                                            step="0.01"
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel>Estoque</FieldLabel>
                                        <Input
                                            type="number"
                                            value={formStock}
                                            onChange={(e) => setFormStock(Number(e.target.value))}
                                            min={0}
                                            step="1"
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel>Status</FieldLabel>
                                        <Select
                                            value={formStatus}
                                            onChange={(e) => setFormStatus(e.target.value as AnnouncementStatus)}
                                            disabled={mode !== "edit"}
                                        >
                                            <option value="draft">Rascunho</option>
                                            <option value="active">Publicado</option>
                                            <option value="paused">Pausado</option>
                                            <option value="inactive">Não publicado</option>
                                            <option value="error">Erro</option>
                                        </Select>
                                    </Field>
                                </FieldGrid>

                                <Divider />

                                <EmptyHint>
                                    Aqui você pode encaixar “Configurações do marketplace” (categoria, shipping, variações, imagens, etc.) em um bloco separado usando{" "}
                                    <code>announcement.config</code>.
                                </EmptyHint>
                            </ModalBody>

                            <ModalFooter>
                                <Btn onClick={closeModal}>Cancelar</Btn>

                                {mode === "edit" ? (
                                    <BtnPrimary onClick={handleSaveEdit}>Salvar</BtnPrimary>
                                ) : mode === "publish" ? (
                                    <BtnPrimary onClick={handlePublish}>Confirmar publicação</BtnPrimary>
                                ) : (
                                    <BtnDanger onClick={handleUnpublish}>Confirmar despublicação</BtnDanger>
                                )}
                            </ModalFooter>
                        </ModalCard>
                    </ModalOverlay>
                ) : null}

                {/* Toast */}
                <ToastArea>
                    {toastList.map((t) => (
                        <ToastItem key={t.id} $type={t.type}>
                            {t.message}
                        </ToastItem>
                    ))}
                </ToastArea>
            </Container>
        </Page>
    )
}
