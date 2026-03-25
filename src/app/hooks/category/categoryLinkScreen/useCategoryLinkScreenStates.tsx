import { CategoryLinkItem } from "@/app/components/Announcement/_components/category/normalizers/marketplaceFields/categoryLinkScreen/types"
import { useToast } from "@/app/components/Toast/Toast"
import { fetchCategoryLinks } from "@/app/services/category/category.service"
import { useEffect, useState } from "react"

export const useCategoryLinkScreenStates = () => {
    const { pushToast } = useToast()
    const [links, setLinks] = useState<CategoryLinkItem[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedLink, setSelectedLink] = useState<CategoryLinkItem | null>(null)
    const [openCreate, setOpenCreate] = useState(false)
    
    const fetchLinks = async () => {
        try {
            setLoading(true)

            const { data } = await fetchCategoryLinks()

            setLinks(Array.isArray(data) ? data : [])
        } catch (err: any) {
            console.error(err)
            pushToast(
                "error",
                err?.response?.data?.message || "Erro ao listar vínculos de categoria."
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLinks()
    }, [])

    return {
        links,
        loading,
        selectedLink,
        openCreate,
        setLinks,
        setLoading,
        setSelectedLink,
        setOpenCreate,
        fetchLinks
    }
}