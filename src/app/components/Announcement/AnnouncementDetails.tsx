"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import {
    Page,
    Container,
    HeaderLeft,
    Title,
    SubTitle,
    MetaRow,
    MetaPill,
    Divider,
    EmptyHint,
    Header
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
    config?: Record<string, unknown>
    createdAt?: string
    updatedAt?: string
}

export default function AnnouncementManager() {
    const params = useParams<{ id?: string }>()
    const announcementId = params?.id
    const { pushToast } = useToast()

    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)

    // filters
    const [mpFilter, setMpFilter] = useState<Marketplace | "all">("all")
    const [statusFilter, setStatusFilter] = useState<AnnouncementStatus | "all">("all")
    const [search, setSearch] = useState("")
    const [formConfig, setFormConfig] = useState<Record<string, unknown>>({})

    // modal
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

    // seleção/modal
    const selectedAnnouncement = useMemo(() => {
        if (!selectedId) return null
        return announcements.find((a) => a._id === selectedId) ?? null
    }, [selectedId, announcements])

    const openModalFor = (ann: Announcement, nextMode: typeof mode) => {
        if (!ann?._id) return pushToast("error", "Anúncio sem ID.")
        setSelectedId(ann._id)
        setMode(nextMode)
        setFormConfig(ann.config ?? {})
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

                <HeaderTotal summaryByMarketplace={summaryByMarketplace} />

                <Divider />

                <Filters
                    mpFilter={mpFilter}
                    statusFilter={statusFilter}
                    search={search}
                    filtered={filtered}
                    setSearch={setSearch}
                    setMpFilter={setMpFilter}
                    setStatusFilter={setStatusFilter}
                />
                <Divider />

                <Announcements
                    pageItems={filtered}
                    openModalFor={openModalFor}
                    safeNumber={safeNumber}
                    setAnnouncements={setAnnouncements}
                />

                {isOpen && selectedAnnouncement ? (
                    <ModalAnnoucements
                        formConfig={formConfig}
                        setFormConfig={setFormConfig}
                        mode={mode}
                        selectedAnnouncement={selectedAnnouncement}
                        closeModal={closeModal}
                        setAnnouncements={setAnnouncements}
                    />
                ) : null}

            </Container>
        </Page>
    )
}
