import { FieldDef } from "@/app/hooks/announcement/createAnnoucement/types"
import { ModalMode, Announcement, AnnouncementConfig } from "@/app/types/announcements/types"

export type ModalAnnoucementsProps = {
    mode: ModalMode
    selectedAnnouncement: (Announcement & { configFields?: FieldDef[] }) | null
    formConfig: Partial<AnnouncementConfig>
    setFormConfig: React.Dispatch<React.SetStateAction<Partial<AnnouncementConfig>>>

    closeModal: () => void
    missingKeys?: string[]

    setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>
}