import { useEffect, useState } from "react"
import { AnnouncementStatus } from "@/app/types/announcements/types"
import { safeNumber } from "@/app/utils/safeNumber"
import { StatesModalAnnoucementsProps } from "./types"

export const useModalAnnouncementStates = ({ selectedAnnouncement }: StatesModalAnnoucementsProps) => {

    const [formPrice, setFormPrice] = useState<number>(0)
    const [formStock, setFormStock] = useState<number>(0)
    const [formStatus, setFormStatus] = useState<AnnouncementStatus>("draft")

    useEffect(() => {
        if (!selectedAnnouncement) return
        setFormPrice(safeNumber(selectedAnnouncement.price))
        setFormStock(safeNumber(selectedAnnouncement.stock))
        setFormStatus(selectedAnnouncement.status ?? "draft")
    }, [selectedAnnouncement])

    return {
        formPrice,
        setFormPrice,
        formStock,
        setFormStock,
        formStatus,
        setFormStatus
    }
}