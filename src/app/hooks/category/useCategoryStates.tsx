import { CategoryLinkItem, MarketplaceKey } from "@/app/components/Announcement/_components/category/CategoryLinkScreen"
import { MARKETPLACES } from "@/app/components/Announcement/_components/category/categoryRoutes/categoryRoutes"
import { AnnouncementFieldConfig, CategoryFieldsResponse, CategoryOption, ErpCategoryOption, PropsEditCategoryLinkModal } from "@/app/components/Announcement/_components/category/EditCategoryLinkModal"
import { normalizeMarketplaceFields } from "@/app/components/Announcement/_components/category/normalizers/marketplaceFields"

import { useToast } from "@/app/components/Toast/Toast"
import { api } from "@/app/services/api"
import { getCategoriesERP } from "@/app/services/category/category.service"
import { useEffect, useMemo, useState } from "react"



type UseCategoryStatesProps = {
  link: CategoryLinkItem | null
}

export const useCategoryStates = ({ link }: UseCategoryStatesProps) => {
    const { pushToast } = useToast()

    const [saving, setSaving] = useState(false)
    const [erpCategories, setErpCategories] = useState<ErpCategoryOption[]>([])
    const [marketplaceCategories, setMarketplaceCategories] = useState<CategoryOption[]>([])
    const [loadingMarketplaceCategories, setLoadingMarketplaceCategories] = useState(false)

    const [erpCategoryId, setErpCategoryId] = useState(link?.erpCategoryId || "")
    const [erpCategoryName, setErpCategoryName] = useState(link?.erpCategoryName || "")
    const [marketplace, setMarketplace] = useState<MarketplaceKey | "">(
        link?.marketplace || ""
    )
    const [marketplaceCategoryId, setMarketplaceCategoryId] = useState(
        link?.marketplaceCategoryId || ""
    )
    const [marketplaceCategoryName, setMarketplaceCategoryName] = useState(
        link?.marketplaceCategoryName || ""
    )

    const selectedMarketplaceConfig = useMemo(() => {
        return MARKETPLACES.find((item) => item.key === marketplace) || null
    }, [marketplace])

    const [configOpen, setConfigOpen] = useState(false)
    const [loadingFieldConfig, setLoadingFieldConfig] = useState(false)
    const [savingFieldConfig, setSavingFieldConfig] = useState(false)

    const [fieldConfig, setFieldConfig] = useState<AnnouncementFieldConfig>({
        marketplace: "",
        marketplaceCategoryId: "",
        basicFields: ["title", "description", "price"],
        fieldsRequired: [],
        fieldsByCategory: [],
        selectedOptionalFieldIds: [],
    })


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingFieldConfig(true)

                const { data } = await api.post<CategoryFieldsResponse>("/category/fields", {
                    marketplace,
                    marketplaceCategoryId,
                })

                const normalized = normalizeMarketplaceFields({
                    marketplace: String(marketplace),
                    response: data,
                })

                const fieldsRequired = normalized.fieldsRequired
                const fieldsByCategory = normalized.fieldsByCategory

                setFieldConfig((prev) => ({
                    marketplace: normalized.marketplace || String(marketplace),
                    marketplaceCategoryId:
                        normalized.marketplaceCategoryId || String(marketplaceCategoryId),
                    basicFields:
                        prev.basicFields?.length > 0
                            ? prev.basicFields
                            : ["title", "description", "price"],
                    fieldsRequired,
                    fieldsByCategory,
                    selectedOptionalFieldIds: prev.selectedOptionalFieldIds.filter((item) =>
                        fieldsByCategory.some((field) => field.id === item.id)
                    ),
                }))
            } catch (error) {
                console.error(error)
                pushToast("error", "Erro ao buscar campos da categoria.")
                setFieldConfig({
                    marketplace: "",
                    marketplaceCategoryId: "",
                    basicFields: ["title", "description", "price"],
                    fieldsRequired: [],
                    fieldsByCategory: [],
                    selectedOptionalFieldIds: [],
                })
            } finally {
                setLoadingFieldConfig(false)
            }
        }

        if (marketplace && marketplaceCategoryId) {
            fetchData()
        } else {
            setFieldConfig({
                marketplace: "",
                marketplaceCategoryId: "",
                basicFields: ["title", "description", "price"],
                fieldsRequired: [],
                fieldsByCategory: [],
                selectedOptionalFieldIds: [],
            })
            setConfigOpen(false)
        }
    }, [marketplace, marketplaceCategoryId, pushToast])

    useEffect(() => {
        const fetchErpCategories = async () => {
            try {
                const { data } = await getCategoriesERP()
                setErpCategories(Array.isArray(data) ? data : [])
            } catch (err: any) {
                console.error(err)
                pushToast("error", err?.response?.data?.message || "Erro ao listar categorias RP.")
            }
        }

        fetchErpCategories()
    }, [])

    useEffect(() => {
        if (marketplace) {
            const fetchMarketplaceCategories = async (marketplaceKey: MarketplaceKey) => {
                const config = MARKETPLACES.find((item) => item.key === marketplaceKey)
                if (!config) return

                try {
                    setLoadingMarketplaceCategories(true)

                    const { data } = await api.get<CategoryOption[]>(config.categoryRoute)
                    setMarketplaceCategories(Array.isArray(data) ? data : [])
                } catch (err: any) {
                    console.error(err)
                    pushToast(
                        "error",
                        err?.response?.data?.message ||
                        `Erro ao listar categorias de ${config.label}.`
                    )
                } finally {
                    setLoadingMarketplaceCategories(false)
                }
            }

            fetchMarketplaceCategories(marketplace)
        } else {
            setMarketplaceCategories([])
        }
    }, [marketplace])

    return {
        erpCategories,
        erpCategoryId,
        erpCategoryName,
        marketplace,
        marketplaceCategoryId,
        marketplaceCategoryName,
        selectedMarketplaceConfig,
        configOpen,
        loadingFieldConfig,
        savingFieldConfig,
        saving,
        fieldConfig,
        loadingMarketplaceCategories,
        marketplaceCategories,

        setErpCategoryId,
        setErpCategoryName,
        setMarketplace,
        setMarketplaceCategoryId,
        setMarketplaceCategoryName,
        setConfigOpen,
        setSavingFieldConfig,
        setSaving,
        setFieldConfig,
        
    }

}