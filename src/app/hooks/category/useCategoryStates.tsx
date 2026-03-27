import { useEffect, useMemo, useState } from "react"
import { useToast } from "@/app/components/Toast/Toast"
import { api } from "@/app/services/api"
import { getCategoriesERP } from "@/app/services/category/category.service"

import {
    CategoryLinkItem,
    MarketplaceKey,
} from "@/app/components/Announcement/_components/category/normalizers/marketplaceFields/categoryLinkScreen/types"
import { MARKETPLACES } from "@/app/components/Announcement/_components/category/categoryRoutes/categoryRoutes"

import { normalizeMarketplaceFields } from "@/app/components/Announcement/_components/category/normalizers/marketplaceFields"
import { AnnouncementFieldConfig, CategoryFieldsResponse, CategoryOption, ErpCategoryOption } from "@/app/components/Announcement/_components/category/EditCategoryLinkModal/types"

type UseCategoryStatesProps = {
    link: CategoryLinkItem | null
}

export const useCategoryStates = ({ link }: UseCategoryStatesProps) => {
    const { pushToast } = useToast()

    const [saving, setSaving] = useState(false)
    const [erpCategories, setErpCategories] = useState<ErpCategoryOption[]>([])
    const [loadingMarketplaceCategories, setLoadingMarketplaceCategories] =
        useState(false)

    const [erpCategoryId, setErpCategoryId] = useState(link?.erpCategoryId || "")
    const [erpCategoryName, setErpCategoryName] = useState(link?.erpCategoryName || "")
    const [marketplace, setMarketplace] = useState<MarketplaceKey | "">(link?.marketplace || "")
    const [marketplaceCategoryId, setMarketplaceCategoryId] = useState(link?.marketplaceCategoryId || "")
    const [marketplaceCategoryName, setMarketplaceCategoryName] = useState(link?.marketplaceCategoryName || "")
    const [categoryLevels, setCategoryLevels] = useState<CategoryOption[][]>([])
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])

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
    console.log("fieldConfig", fieldConfig)     
    const resetFieldConfig = () => {
        setFieldConfig({
            marketplace: "",
            marketplaceCategoryId: "",
            basicFields: ["title", "description", "price"],
            fieldsRequired: [],
            fieldsByCategory: [],
            selectedOptionalFieldIds: [],
        })
    }

    const normalizeCategoryList = (input: any): CategoryOption[] => {
        const list =
            input?.children ||
            input?.children_categories ||
            input?.categories ||
            input?.results ||
            input?.data?.children ||
            input?.data?.children_categories ||
            input?.data?.categories ||
            input?.data?.results ||
            input?.data ||
            input

        if (!Array.isArray(list)) {
            return []
        }

        return list
            .map((item: any) => ({
                id: String(item?.id ?? ""),
                name: String(item?.name ?? ""),
            }))
            .filter((item: CategoryOption) => item.id && item.name)
    }

    const getChildrenCategories = async (categoryId: string) => {
        const { data } = await api.get(`/meli/categories/${categoryId}`)
        console.log("children response raw", data)

        const children = normalizeCategoryList(data)

        console.log("children normalized", children)

        return children
    }

    const loadRootMarketplaceCategories = async (marketplaceKey: MarketplaceKey) => {
        const config = MARKETPLACES.find((item) => item.key === marketplaceKey)
        if (!config) return

        try {
            setLoadingMarketplaceCategories(true)

            const { data } = await api.get(config.categoryRoute)
            const rootCategories = normalizeCategoryList(data)

            setCategoryLevels(rootCategories.length > 0 ? [rootCategories] : [])
            setSelectedCategoryIds([])
            setMarketplaceCategoryId("")
            setMarketplaceCategoryName("")
            setConfigOpen(false)
            resetFieldConfig()
        } catch (err: any) {
            console.error(err)
            pushToast(
                "error",
                err?.response?.data?.message ||
                `Erro ao listar categorias de ${config.label}.`
            )

            setCategoryLevels([])
            setSelectedCategoryIds([])
            setMarketplaceCategoryId("")
            setMarketplaceCategoryName("")
            setConfigOpen(false)
            resetFieldConfig()
        } finally {
            setLoadingMarketplaceCategories(false)
        }
    }

    const handleCategoryLevelChange = async (levelIndex: number, value: string) => {
        const currentOptions = categoryLevels[levelIndex] || []
        const selectedCategory = currentOptions.find((item) => item.id === value)

        const nextSelectedIds = [...selectedCategoryIds.slice(0, levelIndex), value]
        const nextLevels = categoryLevels.slice(0, levelIndex + 1)

        if (!value) {
            setSelectedCategoryIds(selectedCategoryIds.slice(0, levelIndex))
            setCategoryLevels(nextLevels)
            setMarketplaceCategoryId("")
            setMarketplaceCategoryName("")
            setConfigOpen(false)
            resetFieldConfig()
            return
        }

        setSelectedCategoryIds(nextSelectedIds)
        setMarketplaceCategoryId("")
        setMarketplaceCategoryName("")
        setConfigOpen(false)
        resetFieldConfig()

        try {
            setLoadingMarketplaceCategories(true)

            const children = await getChildrenCategories(value)

            if (children.length > 0) {
                setCategoryLevels([...nextLevels, children])
                return
            }

            setCategoryLevels(nextLevels)
            setMarketplaceCategoryId(value)
            setMarketplaceCategoryName(selectedCategory?.name || "")
        } catch (err: any) {
            console.error(err)
            pushToast(
                "error",
                err?.response?.data?.message || "Erro ao buscar subcategorias."
            )

            setCategoryLevels(nextLevels)
            setMarketplaceCategoryId("")
            setMarketplaceCategoryName("")
        } finally {
            setLoadingMarketplaceCategories(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingFieldConfig(true)

                const { data } = await api.post<CategoryFieldsResponse>(
                    `/category/fields`,
                    {
                        marketplace,
                        marketplaceCategoryId,
                    }
                )
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
                resetFieldConfig()
            } finally {
                setLoadingFieldConfig(false)
            }
        }

        if (marketplace && marketplaceCategoryId) {
            fetchData()
        } else {
            resetFieldConfig()
            setConfigOpen(false)
        }
    }, [marketplace, marketplaceCategoryId])

    useEffect(() => {
        const fetchErpCategories = async () => {
            try {
                const response = await getCategoriesERP()
                const list = Array.isArray(response) ? response : response?.data

                setErpCategories(Array.isArray(list) ? list : [])
            } catch (err: any) {
                console.error(err)
                pushToast(
                    "error",
                    err?.response?.data?.message || "Erro ao listar categorias RP."
                )
            }
        }

        fetchErpCategories()
    }, [])

    useEffect(() => {
        if (!marketplace) {
            setCategoryLevels([])
            setSelectedCategoryIds([])
            setMarketplaceCategoryId("")
            setMarketplaceCategoryName("")
            setConfigOpen(false)
            resetFieldConfig()
            return
        }

        loadRootMarketplaceCategories(marketplace)
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

        categoryLevels,
        selectedCategoryIds,

        setErpCategoryId,
        setErpCategoryName,
        setMarketplace,
        setMarketplaceCategoryId,
        setMarketplaceCategoryName,
        setConfigOpen,
        setSavingFieldConfig,
        setSaving,
        setFieldConfig,

        handleCategoryLevelChange,
    }
}