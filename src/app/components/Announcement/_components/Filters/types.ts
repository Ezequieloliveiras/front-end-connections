import { AnnouncementStatus, Marketplace } from "../../constants"

export type MarketplaceFilter = Marketplace | "all"
export type StatusFilter = AnnouncementStatus | "all"

export type FiltersProps = {
    mpFilter: MarketplaceFilter
    setMpFilter: React.Dispatch<React.SetStateAction<MarketplaceFilter>>

    statusFilter: StatusFilter
    setStatusFilter: React.Dispatch<React.SetStateAction<StatusFilter>>

    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>

    filtered: unknown[] // se você tiver o tipo Announcement, troque pra Announcement[]

    pageSize: number
}