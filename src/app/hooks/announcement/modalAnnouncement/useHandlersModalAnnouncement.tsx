import { api } from "@/app/services/api"
import { safeNumber } from "@/app/utils/safeNumber"
import { Announcement } from "@/app/types/announcements/types"
import { useToast } from "@/app/components/Toast/Toast"
import { HandlersModalAnnouncementProps } from "./types"


export const useHandlersModalAnnouncement = ({
    selectedAnnouncement,
    formPrice,
    formStock,
    formStatus,
    formConfig,
    setAnnouncements,
    closeModal
}: HandlersModalAnnouncementProps) => {

    const { pushToast } = useToast()
    const upsertByIdLocal = (id: string, patch: Partial<Announcement>) => {
        setAnnouncements((prev) =>
            prev.map((a) =>
                a._id === id ? { ...a, ...patch, updatedAt: new Date().toISOString() } : a
            )
        )
    }

    const handleSaveEdit = async () => {
        if (!selectedAnnouncement?._id) return pushToast("error", "Anúncio sem ID para atualizar.")
        const annId = selectedAnnouncement._id

        try {
            const payload: Pick<Announcement, "price" | "stock" | "status" | "config"> = {
                price: safeNumber(formPrice),
                stock: safeNumber(formStock),
                status: formStatus,
                config: formConfig,
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
            const payload: Pick<Announcement, "price" | "stock"> = {
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

    return {
        handleSaveEdit,
        handlePublish,
        handleUnpublish
    }
}