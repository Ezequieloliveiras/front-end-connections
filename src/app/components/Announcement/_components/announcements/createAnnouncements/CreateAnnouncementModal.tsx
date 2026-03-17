import { useEffect, useState } from "react"
import {
  BtnPrimary,
  BtnDanger,
  EmptyHint,
  Field,
  FieldGrid,
  FieldLabel,
  Input,
  ModalBody,
  ModalCard,
  ModalFooter,
  ModalOverlay,
  Select,
  Divider,
} from "../styles"
import { api } from "@/app/services/api"
import { useToast } from "@/app/components/Toast/Toast"
import { safeNumber } from "@/app/utils/safeNumber"
import {
  Announcement,
  AnnouncementConfig,
} from "@/app/types/announcements/types"
import { MarketplaceConfigForm } from "../../MarketplaceConfigForm/MarketplaceConfigForm"
import { FieldDef } from "../types"
import {
  buildFieldsFromConfig,
  CreateAnnouncementModalProps,
  FieldConfigResponseItem,
  ProductOption
} from "./BuildFieldsFromConfig"
import { CategoryOption } from "../../category/EditCategoryLinkModal"

export function CreateAnnouncementModal({
  productId,
  closeModal,
  setAnnouncements,
}: CreateAnnouncementModalProps) {
  const { pushToast } = useToast()

  const [selectedMarketplace, setSelectedMarketplace] = useState("")
  const [marketplaceFields, setMarketplaceFields] = useState<FieldDef[]>([])
  const [isLoadingMarketplaceFields, setIsLoadingMarketplaceFields] = useState(false)
  const [price, setPrice] = useState<number>(0)
  const [stock, setStock] = useState<number>(0)
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [configuration, setConfiguration] = useState<Partial<AnnouncementConfig>>({})
  const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useState(false)
  const [missingFieldKeys, setMissingFieldKeys] = useState<string[]>([])
  const [products, setProducts] = useState<ProductOption[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [productSearchText, setProductSearchText] = useState("")
  const [selectedProductId, setSelectedProductId] = useState(productId || "")
  const [selectedProduct, setSelectedProduct] = useState<ProductOption | null>(null)
  const [dataCategory, setDataCategory] = useState<FieldConfigResponseItem[] | null>(null)

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
        console.log('response', response)
        setDataCategory(response.data)
        const firstConfig = Array.isArray(response.data) ? response.data[0] : undefined
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

  function addAnnouncementToList(newAnnouncement: Announcement) {
    setAnnouncements((currentAnnouncements) => [
      newAnnouncement,
      ...currentAnnouncements,
    ])
  }

  function handleMarketplaceChange(marketplaceValue: string) {
    setSelectedMarketplace(marketplaceValue)
    setConfiguration({})
    setMissingFieldKeys([])
    setMarketplaceFields([])
  }

  function handleProductChange(productIdValue: string) {
    setSelectedProductId(productIdValue)

    const foundProduct = products.find((product) => product._id === productIdValue)

    setSelectedProduct(foundProduct || null)
    setConfiguration({})
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
        data: configuration,
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

  return (
    <ModalOverlay onMouseDown={closeModal}>
      <ModalCard onMouseDown={(event) => event.stopPropagation()}>
        <ModalBody>
          <FieldGrid>
            <Field>
              <FieldLabel>Marketplace</FieldLabel>
              <Select
                value={selectedMarketplace}
                onChange={(event) =>
                  handleMarketplaceChange(event.target.value)
                }
              >
                <option value="">Selecione</option>
                <option value="mercado_livre">Mercado Livre</option>
                <option value="shopee">Shopee</option>
                <option value="magalu">Magalu</option>
              </Select>
            </Field>

            {selectedMarketplace.length > 0 && (
              <>
                <Field>
                  <FieldLabel>Buscar produto</FieldLabel>
                  <Input
                    placeholder="Digite nome, SKU, marca ou categoria"
                    value={productSearchText}
                    onChange={(event) =>
                      setProductSearchText(event.target.value)
                    }
                  />
                </Field>

                <Field>
                  <FieldLabel>Produto</FieldLabel>
                  <Select
                    value={selectedProductId}
                    onChange={(event) =>
                      handleProductChange(event.target.value)
                    }
                    disabled={isLoadingProducts}
                  >
                    <option value="">
                      {isLoadingProducts
                        ? "Carregando produtos..."
                        : "Selecione"}
                    </option>

                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name} — {product.internalSku}
                        {product.erpCategoryName
                          ? ` — ${product.erpCategoryName}`
                          : ""}
                      </option>
                    ))}
                  </Select>
                </Field>
              </>
            )}

            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Descrição</FieldLabel>
              <Input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Preço</FieldLabel>
              <Input
                type="number"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
                min={0}
                step="0.01"
              />
            </Field>

            <Field>
              <FieldLabel>Estoque</FieldLabel>
              <Input
                type="number"
                value={stock}
                onChange={(event) => setStock(Number(event.target.value))}
                min={0}
                step="1"
              />
            </Field>

            <Field>
              <FieldLabel>Imagem</FieldLabel>
              <Input
                type="text"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="URL da imagem"
                min={0}
              />
            </Field>
          </FieldGrid>

          <Divider />


          {!selectedMarketplace ? (
            <EmptyHint>
              Selecione um marketplace para carregar os campos.
            </EmptyHint>
          ) : isLoadingMarketplaceFields ? (
            <EmptyHint>Carregando campos do marketplace...</EmptyHint>
          ) : marketplaceFields.length > 0 ? (
            <>
              <EmptyHint>
                <b>Campos do marketplace</b> — preencha os dados do anúncio para{" "}
                <b>{selectedMarketplace.replace("_", " ")}</b>.
              </EmptyHint>

              <FieldGrid>
                <MarketplaceConfigForm
                  fields={marketplaceFields}
                  value={configuration}
                  onChange={setConfiguration}
                  missingKeys={missingFieldKeys}
                />
              </FieldGrid>
            </>
          ) : (
            <EmptyHint>
              Nenhum campo configurado para este marketplace.
            </EmptyHint>
          )}
        </ModalBody>

        <ModalFooter>
          <BtnDanger onClick={closeModal}>Cancelar</BtnDanger>

          <BtnPrimary
            onClick={handleCreateAnnouncement}
            disabled={isCreatingAnnouncement || isLoadingMarketplaceFields}
          >
            {isCreatingAnnouncement ? "Criando..." : "Criar anúncio"}
          </BtnPrimary>
        </ModalFooter>
      </ModalCard>
    </ModalOverlay>
  )
}