import { CategoryLinkItem } from "@/app/components/Announcement/_components/category/normalizers/marketplaceFields/categoryLinkScreen/types"

export interface UseHandlersCategoryLinkScreenProps {
    setSelectedLink: (link: CategoryLinkItem | null) => void
    setOpenCreate: (open: boolean) => void
    fetchLinks: () => Promise<void>
}
