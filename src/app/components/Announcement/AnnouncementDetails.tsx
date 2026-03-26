"use client"

import { useMemo } from "react"
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

import { HeaderTotal } from "./_components/HeaderTotal/HeaderTotal"
import { Filters } from "./_components/Filters/Filters"
import { Announcements } from "./_components/announcements/Announcements"
import { ModalAnnoucements } from "./_components/ModalAnnoucements/ModalAnnouncements"
import { useToast } from "@/app/components/Toast/Toast"
import { safeNumber } from "@/app/utils/safeNumber"
import { useAnnouncementsView } from "./useAnnouncements"
import { Announcement } from "@/app/types/announcements/types"
import { CreateAnnouncementBar } from "./_components/announcements/createAnnouncements/CreateAnnouncementBar"
import { useDetailsStates } from "@/app/hooks/announcement/detailsAnnouncement/useDetailsStates"

export default function AnnouncementManager() {
    const params = useParams<{ id?: string }>()
    const announcementId = params?.id
    const { pushToast } = useToast()

    const states = useDetailsStates({ announcementId })

    const {
        announcements,
        setAnnouncements,
        loading,
        setLoading,
        mpFilter,
        setMpFilter,
        statusFilter,
        setStatusFilter,
        search,
        setSearch,
        formConfig,
        setFormConfig,
        isOpen,
        setIsOpen,
        mode,
        setMode,
        selectedId,
        setSelectedId,
        page,
        setPage
    } = states

    const closeModal = () => setIsOpen(false)

    const { summaryByMarketplace, filtered } = useAnnouncementsView(
        announcements,
        mpFilter,
        statusFilter,
        search
    )

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

    const pageSize = 20

    const pageItems = useMemo(() => {
        const start = (page - 1) * pageSize
        return filtered.slice(start, start + pageSize)
    }, [filtered, page])

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
                    pageSize={pageSize}
                />
                <Divider />
                <CreateAnnouncementBar productId={announcementId} setAnnouncements={setAnnouncements} />

                <Announcements
                    pageItems={pageItems}
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
