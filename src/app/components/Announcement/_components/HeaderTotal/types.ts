import { AnnouncementStatus, Marketplace } from "../../constants";

export interface HeaderTotalProps {
    summaryByMarketplace: Record<Marketplace, { total: number; counts: Record<AnnouncementStatus, number> }>
}
