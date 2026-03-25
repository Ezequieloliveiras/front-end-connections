import { api } from "@/app/services/api"
import { safeNumber } from "@/app/utils/safeNumber"
import { Announcement } from "@/app/types/announcements/types"
import { FieldDef } from "./types"
import { AnnouncementFieldConfig } from "@/app/components/Announcement/_components/category/EditCategoryLinkModal"
import { FieldConfigResponseItem, ProductOption } from "@/app/components/Announcement/_components/announcements/createAnnouncements/types"
import { useToast } from "@/app/components/Toast/Toast"

interface useHandlersCreateAnnouncementProps {
    setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>
  closeModal: () => void
    selectedMarketplace: string
    setSelectedMarketplace: React.Dispatch<React.SetStateAction<string>>
    marketplaceFields: FieldDef[]
    setMarketplaceFields: React.Dispatch<React.SetStateAction<FieldDef[]>>
    isLoadingMarketplaceFields: boolean
    price: number
    stock: number
    description: string
    title: string
    url: string
    configuration: AnnouncementFieldConfig
    isCreatingAnnouncement: boolean
    missingFieldKeys: string[]
    products: ProductOption[]
    isLoadingProducts: boolean
    productSearchText: string
    selectedProductId: string
    setSelectedProductId: React.Dispatch<React.SetStateAction<string>>
    selectedProduct: ProductOption | null
    dataCategory: FieldConfigResponseItem[] | null
    shippingMode: string
    shippingOptions: { label: string; value: string }[]
    setShippingMode: React.Dispatch<React.SetStateAction<string>>
    setShippingOptions: React.Dispatch<React.SetStateAction<{ label: string; value: string }[]>>
    setConfiguration: React.Dispatch<React.SetStateAction<AnnouncementFieldConfig>>
    setMissingFieldKeys: React.Dispatch<React.SetStateAction<string[]>>
    setIsCreatingAnnouncement: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedProduct: React.Dispatch<React.SetStateAction<ProductOption | null>>
}

const emptyConfig: AnnouncementFieldConfig = {
    marketplace: "",
    marketplaceCategoryId: "",
    basicFields: [],
    fieldsRequired: [],
    fieldsByCategory: [],
    selectedOptionalFieldIds: [],
}

export const useHandlersCreateAnnouncement = ({
    setAnnouncements,
    closeModal,
    selectedMarketplace,
    setSelectedMarketplace,
    setMarketplaceFields,
    price,
    stock,
    description,
    title,
    url,
    configuration,
    products,
    selectedProductId,
    setSelectedProductId,
    dataCategory,
    shippingMode,
    setConfiguration,
    setMissingFieldKeys,
    setIsCreatingAnnouncement,
    setSelectedProduct

}: useHandlersCreateAnnouncementProps) => {

    const { pushToast } = useToast()

    function addAnnouncementToList(newAnnouncement: Announcement) {
        setAnnouncements((currentAnnouncements) => [
            newAnnouncement,
            ...currentAnnouncements,
        ])
    }

    function handleMarketplaceChange(marketplaceValue: string) {
        setSelectedMarketplace(marketplaceValue)
        setConfiguration(emptyConfig)
        setMissingFieldKeys([])
        setMarketplaceFields([])
    }

    function handleProductChange(productIdValue: string) {
        setSelectedProductId(productIdValue)

        const foundProduct = products.find((product) => product._id === productIdValue)

        setSelectedProduct(foundProduct || null)
        setConfiguration(emptyConfig)
        setMissingFieldKeys([])
        setMarketplaceFields([])
    }

    async function handleCreateAnnouncement() {
        if (!selectedProductId) {
            pushToast("error", "Selecione um produto.")
            return
        }

        if (!selectedMarketplace) {
            pushToast("error", "Selecione um marketplace.")
            return
        }

        try {
            setIsCreatingAnnouncement(true)
            setMissingFieldKeys([])
            const marketplaceCategoryId = dataCategory?.[0]?.marketplaceCategoryId ?? null
            const payload = {
                productId: selectedProductId,
                marketplace: selectedMarketplace,
                title,
                description,
                price: safeNumber(price),
                stock: safeNumber(stock),
                shippingMode,
                config: configuration,
                marketplaceCategoryId,
                images: url,
            }

            const { data } = await api.post<Announcement>("/announcements", payload)

            addAnnouncementToList(data)
            pushToast("success", "Anúncio criado com sucesso.")
            closeModal()
        } catch (error: any) {
            console.error(error)

            const apiMissingKeys = error?.response?.data?.missingKeys
            const apiMessage =
                error?.response?.data?.message || "Erro ao criar anúncio."

            if (Array.isArray(apiMissingKeys)) {
                setMissingFieldKeys(apiMissingKeys)
            }

            pushToast("error", apiMessage)
        } finally {
            setIsCreatingAnnouncement(false)
        }
    }

    return {
        handleMarketplaceChange,
        handleProductChange,
        handleCreateAnnouncement

    }
}