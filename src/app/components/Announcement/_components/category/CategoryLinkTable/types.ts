import { CategoryLinkItem } from "../normalizers/marketplaceFields/categoryLinkScreen/types"

export type CategoryLinkTableProps = {
    links: CategoryLinkItem[]
    loading?: boolean
    onEdit: (link: CategoryLinkItem) => void
}
