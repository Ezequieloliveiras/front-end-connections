import { useEffect, useState } from "react"

import { Marketplace } from "@/app/types/marketplace/types"
import { Announcement, AnnouncementConfig, AnnouncementStatus } from "@/app/types/announcements/types"
import { api } from "@/app/services/api"
import { useToast } from "@/app/components/Toast/Toast"

export const useDetailsStates = ({announcementId}: {announcementId?: string}) => {
    
    const { pushToast } = useToast()

    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)

    // filters
    const [mpFilter, setMpFilter] = useState<Marketplace | "all">("all")
    const [statusFilter, setStatusFilter] = useState<AnnouncementStatus | "all">("all")
    const [search, setSearch] = useState("")

    // form
    const [formConfig, setFormConfig] = useState<Partial<AnnouncementConfig>>({})

    // modal
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState<"edit" | "publish" | "unpublish">("edit")
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [page, setPage] = useState(1)

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


    return {
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
    }
}