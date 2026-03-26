import { Announcement, AnnouncementConfig, AnnouncementStatus } from "@/app/types/announcements/types"
import { FieldDef } from "../createAnnoucement/types"

export interface StatesModalAnnoucementsProps {
  selectedAnnouncement: (Announcement & { configFields?: FieldDef[] }) | null
}

export interface HandlersModalAnnouncementProps {
    selectedAnnouncement: Announcement | null
    formPrice: number
    formStock: number
    formStatus: AnnouncementStatus
    formConfig: Partial<AnnouncementConfig>
    setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>
    closeModal: () => void
}
