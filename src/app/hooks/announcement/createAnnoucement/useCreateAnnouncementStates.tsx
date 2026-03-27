import { useEffect, useState } from "react"
import { FieldDef, UseCreateAnnouncementStatesProps } from "./types"
import { api } from "@/app/services/api"
import { useToast } from "@/app/components/Toast/Toast"
import { FieldConfigResponseItem, ProductOption } from "@/app/components/Announcement/_components/announcements/createAnnouncements/types"
import { AnnouncementFieldConfig } from "@/app/components/Announcement/_components/category/EditCategoryLinkModal/types"
import { buildFieldsFromConfig, WITHOUT_GTIN_CHECKBOX_KEY, } from "@/app/components/Announcement/_components/announcements/createAnnouncements/BuildFieldsFromConfig"
import { announcementConditionalRules } from "@/app/components/Announcement/_components/announcements/createAnnouncements/rules/announcementConditionalRules"
import { applyFieldRules } from "@/app/components/Announcement/_components/announcements/createAnnouncements/rules/fieldRulesEngine"


const emptyConfig: AnnouncementFieldConfig = {
    marketplace: "",
    marketplaceCategoryId: "",
    basicFields: [],
    fieldsRequired: [],
    fieldsByCategory: [],
    selectedOptionalFieldIds: [],
}

export const useCreateAnnouncementStates = ({ productId }: UseCreateAnnouncementStatesProps) => {

    const [selectedMarketplace, setSelectedMarketplace] = useState("")
    const [marketplaceFields, setMarketplaceFields] = useState<FieldDef[]>([])
    const [isLoadingMarketplaceFields, setIsLoadingMarketplaceFields] = useState(false)
    const [price, setPrice] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [configuration, setConfiguration] = useState<AnnouncementFieldConfig>(emptyConfig)
    const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useState(false)
    const [missingFieldKeys, setMissingFieldKeys] = useState<string[]>([])
    const [products, setProducts] = useState<ProductOption[]>([])
    const [isLoadingProducts, setIsLoadingProducts] = useState(false)
    const [productSearchText, setProductSearchText] = useState("")
    const [selectedProductId, setSelectedProductId] = useState(productId || "")
    const [selectedProduct, setSelectedProduct] = useState<ProductOption | null>(null)
    const [dataCategory, setDataCategory] = useState<FieldConfigResponseItem[] | null>(null)
    const [shippingMode, setShippingMode] = useState<string>("me2")
    const [shippingOptions, setShippingOptions] = useState<
        { label: string; value: string }[]
    >([])
    const { pushToast } = useToast()

    const configValues = configuration as Record<string, any>

    useEffect(() => {
        const firstConfig = Array.isArray(dataCategory) ? dataCategory[0] : undefined

        if (!firstConfig) {
            setMarketplaceFields([])
            return
        }

        const baseFields = buildFieldsFromConfig(firstConfig)

        const finalFields = applyFieldRules({
            baseFields,
            values: configValues,
            rules: announcementConditionalRules,
        })

        setMarketplaceFields(finalFields)
    }, [dataCategory, configuration])

    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoadingProducts(true)

                const { data } = await api.get<ProductOption[]>("/product/list", {
                    params: {
                        search: productSearchText,
                    },
                })

                setProducts(Array.isArray(data) ? data : [])

                if (!selectedProductId) {
                    return
                }

                const currentSelectedProduct = (Array.isArray(data) ? data : []).find(
                    (product) => product._id === selectedProductId
                )

                if (currentSelectedProduct) {
                    setSelectedProduct(currentSelectedProduct)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoadingProducts(false)
            }
        }

        const timeout = setTimeout(() => {
            fetchProducts()
        }, 400)

        return () => clearTimeout(timeout)
    }, [productSearchText, selectedProductId])

    useEffect(() => {
        async function fetchMarketplaceFields() {
            try {
                if (!selectedProduct?.erpCategoryId || !selectedMarketplace) {
                    setMarketplaceFields([])
                    return
                }

                setIsLoadingMarketplaceFields(true)

                const response = await api.get<FieldConfigResponseItem[]>(
                    `/announcements/field-config/fields-category/${selectedProduct.erpCategoryId}/${selectedMarketplace}`
                )

                setDataCategory(response.data)
                const firstConfig = Array.isArray(response.data) ? response.data[0] : undefined

                if (!firstConfig) {
                    setMarketplaceFields([])
                    return
                }

                const normalizedFields = buildFieldsFromConfig(firstConfig)
                setMarketplaceFields(normalizedFields)
            } catch (error: any) {
                console.error(error)
                setMarketplaceFields([])

                pushToast(
                    "error",
                    error?.response?.data?.message ||
                    "Erro ao buscar configuração de campos."
                )
            } finally {
                setIsLoadingMarketplaceFields(false)
            }
        }

        fetchMarketplaceFields()
    }, [selectedProduct?.erpCategoryId, selectedMarketplace, pushToast])

    useEffect(() => {
        async function loadShipping() {
            try {
                const { data } = await api.get("/meli/shipping/preferences")

                const options = data.modes.map((mode: string) => ({
                    value: mode,
                    label:
                        mode === "me2"
                            ? "Mercado Envios"
                            : mode === "custom"
                                ? "Frete personalizado"
                                : mode === "not_specified"
                                    ? "Não especificado"
                                    : mode,
                }))

                setShippingOptions(options)
                setShippingMode(data.defaultMode || "me2")
            } catch (err) {
                console.error(err)

                // fallback
                setShippingOptions([
                    { label: "Mercado Envios", value: "me2" },
                ])
                setShippingMode("me2")
            }
        }

        loadShipping()
    }, [])

    return {
        selectedMarketplace,
        marketplaceFields,
        isLoadingMarketplaceFields,
        price,
        stock,
        description,
        title,
        url,
        configuration,
        isCreatingAnnouncement,
        missingFieldKeys,
        products,
        isLoadingProducts,
        productSearchText,
        selectedProductId,
        selectedProduct,
        dataCategory,
        shippingMode,
        shippingOptions,

        setSelectedMarketplace,
        setMarketplaceFields,
        setIsLoadingMarketplaceFields,
        setPrice,
        setStock,
        setDescription,
        setTitle,
        setUrl,
        setConfiguration,
        setIsCreatingAnnouncement,
        setMissingFieldKeys,
        setProducts,
        setIsLoadingProducts,
        setProductSearchText,
        setSelectedProductId,
        setSelectedProduct,
        setDataCategory,
        setShippingMode,
        setShippingOptions
    }
}