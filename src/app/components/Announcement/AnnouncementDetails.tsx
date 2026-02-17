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
import { HeaderTotal } from "./_components/HeaderTotal/HeaderTotal"
import { Filters } from "./_components/Filters/Filters"
import { Announcements } from "./_components/announcements/Announcements"
import { ModalAnnoucements } from "./_components/ModalAnnoucements/ModalAnnouncements"
import { useToast } from "@/app/components/Toast/Toast"
import { safeNumber } from "@/app/utils/safeNumber"
import { useAnnouncementsView } from "./useAnnouncements"

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
type MarketplaceItem = {
  key: Marketplace
  label: string
  src: string
  width?: number
  height?: number
}

const MARKETPLACES: MarketplaceItem[] = [
  { key: "mercado_livre", label: "Mercado Livre", src: "/marketplace/mercado-libre.png", width: 40, height: 40 },
  { key: "shopee", label: "Shopee", src: "/marketplace/shopee.png" , width: 40, height: 40},
  { key: "magalu", label: "Magalu", src: "/marketplace/magablue.png",  width: 40, height: 40},
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

function formatBRL(value: number) {
    try {
        return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    } catch {
        return `R$ ${value}`
    }
}

export default function AnnouncementManager() {
    const params = useParams<{ id?: string }>()
    const announcementId = params?.id
    const { pushToast } = useToast()

    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)

    /** filtros */
    const [mpFilter, setMpFilter] = useState<Marketplace | "all">("all")
    const [statusFilter, setStatusFilter] = useState<AnnouncementStatus | "all">("all")
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const pageSize = 20

    /** modal */
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState<"edit" | "publish" | "unpublish">("edit")
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const closeModal = () => setIsOpen(false)

    const { summaryByMarketplace, filtered } = useAnnouncementsView(
        announcements,
        mpFilter,
        statusFilter,
        search
    )

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

    useEffect(() => {
        setPage(1)
    }, [mpFilter, statusFilter, search])

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))

    const pageItems = useMemo(() => {
        const start = (page - 1) * pageSize
        return filtered.slice(start, start + pageSize)
    }, [filtered, page])

    // seleção/modal
    const selectedAnnouncement = useMemo(() => {
        if (!selectedId) return null
        return announcements.find((a) => a._id === selectedId) ?? null
    }, [selectedId, announcements])

    const openModalFor = (ann: Announcement, nextMode: typeof mode) => {
        if (!ann?._id) return pushToast("error", "Anúncio sem ID.")
        setSelectedId(ann._id)
        setMode(nextMode)
        setIsOpen(true)
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
                            {announcementId ? <MetaPill>Route ID: {announcementId}</MetaPill> : null}
                            <MetaPill>Total: {announcements.length}</MetaPill>
                            <MetaPill>Filtrados: {filtered.length}</MetaPill>
                        </MetaRow>
                    </HeaderLeft>
                </Header>

                <Divider />

                {/* ===== Resumo por marketplace ===== */}
                <HeaderTotal
                    MARKETPLACES={MARKETPLACES}
                    summaryByMarketplace={summaryByMarketplace}
                    pushToast={pushToast}
                    setSearch={setSearch}
                />

                <Divider />

                {/* ===== Filtros (reaproveitando seus styles: FieldGrid/Field/Input/Select) ===== */}
                <Filters
                    MARKETPLACES={MARKETPLACES}
                    STATUS_OPTIONS={STATUS_OPTIONS}
                    mpFilter={mpFilter}
                    statusFilter={statusFilter}
                    search={search}
                    setPage={setPage}
                    page={page}
                    totalPages={totalPages}
                    setSearch={setSearch}
                    setMpFilter={setMpFilter}
                    setStatusFilter={setStatusFilter}
                />
                <Divider />

                {/* ===== Lista ===== */}
                <Announcements
                    pageItems={filtered}
                    statusLabel={statusLabel}
                    openModalFor={openModalFor}
                    safeNumber={safeNumber}
                    formatBRL={formatBRL}
                    MARKETPLACES={MARKETPLACES}
                    setAnnouncements={setAnnouncements}
                />

                {/* ===== Modal ===== */}
                {isOpen && selectedAnnouncement ? (
                    <ModalAnnoucements
                        mode={mode}
                        selectedAnnouncement={selectedAnnouncement}
                        closeModal={closeModal}
                        MARKETPLACES={MARKETPLACES}
                        setAnnouncements={setAnnouncements}
                    />
                ) : null}

            </Container>
        </Page>
    )
}
