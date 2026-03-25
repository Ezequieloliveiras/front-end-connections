import { CategoryLinkItem } from "@/app/components/Announcement/_components/category/normalizers/marketplaceFields/categoryLinkScreen/types"

interface UseHandlersCategoryLinkScreenProps {
    setSelectedLink: (link: CategoryLinkItem | null) => void
    setOpenCreate: (open: boolean) => void
    fetchLinks: () => Promise<void>
}

export const useHandlersCategoryLinkScreen = ({ setSelectedLink, setOpenCreate, fetchLinks }: UseHandlersCategoryLinkScreenProps) => {


    const handleEdit = (link: CategoryLinkItem) => {
        setSelectedLink(link)
    }

    const handleCloseModal = () => {
        setSelectedLink(null)
        setOpenCreate(false)
    }

    const handleSaved = async () => {
        await fetchLinks()
        handleCloseModal()
    }

    return { handleEdit, handleCloseModal, handleSaved }

}