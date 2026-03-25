import { Announcement } from "@/app/types/announcements/types"

export type ModalMode = "edit" | "publish" | "unpublish"

export type AnnouncementsProps = {
    openModalFor: (ann: Announcement, mode: ModalMode) => void
    safeNumber: (value: unknown) => number
    setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>
    pageItems: Announcement[]
}