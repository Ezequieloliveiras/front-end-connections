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
} from "../styles"
import { api } from "@/app/services/api"
import { useToast } from "@/app/components/Toast/Toast"
import { safeNumber } from "@/app/utils/safeNumber"
import { Announcement, AnnouncementConfig } from "@/app/types/announcements/types"
import { MarketplaceConfigForm } from "../../MarketplaceConfigForm/MarketplaceConfigForm"
import { FieldDef } from "../types"

type ProductOption = {
  _id: string
  name: string
  internalSku: string
  brand?: string
  erpCategoryId?: string
  erpCategoryName?: string
}

type Props = {
  productId?: string
  closeModal: () => void
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>
}

export function CreateAnnouncementModal({
  productId,
  closeModal,
  setAnnouncements,
}: Props) {
  const { pushToast } = useToast()

  const [marketplace, setMarketplace] = useState("")
  console.log("marketplace", marketplace)
  const [fields, setFields] = useState<FieldDef[]>([])
  const [loadingFields, setLoadingFields] = useState(false)

  const [formPrice, setFormPrice] = useState<number>(0)
  const [formStock, setFormStock] = useState<number>(0)
  const [formConfig, setFormConfig] = useState<Partial<AnnouncementConfig>>({})
  const [loading, setLoading] = useState(false)

  const [missingKeys, setMissingKeys] = useState<string[]>([])

  const [products, setProducts] = useState<ProductOption[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [productSearch, setProductSearch] = useState("")
  const [selectedProductId, setSelectedProductId] = useState(productId || "")
  console.log("selectedProductId", selectedProductId)

  useEffect(() => {
    const fetchCategoryLinkByProductAndMarketplace = async () => {
      try {
        if (!selectedProductId || !marketplace) return

        const { data } = await api.get(
          `/category/product/${selectedProductId}/marketplace/${marketplace}`
        )

        console.log("vínculo encontrado:", data)
        if (!data?.found) {
          setFields([])
          pushToast("warning", data?.message || "Vínculo não encontrado.")
          return
        }

        const marketplaceCategoryId = data.data.marketplaceCategoryId

        const fieldsResponse = await api.post("/category/fields", {
          marketplace,
          marketplaceCategoryId,
        })

        setFields(fieldsResponse.data.fields ?? [])
        // Exemplo:
        // data.categoryLink.marketplaceCategoryId
        // data.categoryLink.marketplaceCategoryName

        // aqui você pode salvar no state se quiser
        // setCategoryId(data.categoryLink.marketplaceCategoryId)
      } catch (err: any) {
        console.error(err)
        pushToast(
          "error",
          err?.response?.data?.message ||
          "Erro ao buscar vínculo da categoria do produto."
        )
      }
    }

    fetchCategoryLinkByProductAndMarketplace()
  }, [selectedProductId])

  const appendAnnouncementLocal = (announcement: Announcement) => {
    setAnnouncements((prev) => [announcement, ...prev])
  }

  const fetchProducts = async (search = "") => {
    try {
      setLoadingProducts(true)

      const { data } = await api.get<ProductOption[]>("/product/list", {
        params: {
          search,
        },
      })

      setProducts(Array.isArray(data) ? data : [])
    } catch (err: any) {
      console.error(err)
      pushToast(
        "error",
        err?.response?.data?.message || "Erro ao listar produtos."
      )
    } finally {
      setLoadingProducts(false)
    }
  }

  useEffect(() => {
    fetchProducts("")
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(productSearch)
    }, 400)

    return () => clearTimeout(timer)
  }, [productSearch])

  const handleMarketplaceChange = async (nextMarketplace: string) => {
    setMarketplace(nextMarketplace)
    setFormConfig({})
    setMissingKeys([])
    setFields([])

    if (!nextMarketplace) return

    try {
      setLoadingFields(true)

      // const { data } = await api.get(`/announcements/fields/${nextMarketplace}`)
      // setFields(data.fields ?? [])
    } catch (err: any) {
      console.error(err)
      pushToast(
        "error",
        err?.response?.data?.message || "Erro ao buscar campos do marketplace."
      )
    } finally {
      setLoadingFields(false)
    }
  }

  const handleCreate = async () => {
    if (!selectedProductId) {
      pushToast("error", "Selecione um produto.")
      return
    }

    if (!marketplace) {
      pushToast("error", "Selecione um marketplace.")
      return
    }

    try {
      setLoading(true)
      setMissingKeys([])

      const payload = {
        productId: selectedProductId,
        marketplace,
        price: safeNumber(formPrice),
        stock: safeNumber(formStock),
        config: formConfig,
      }

      const { data } = await api.post<Announcement>("/announcements", payload)

      appendAnnouncementLocal(data)
      pushToast("success", "Anúncio criado com sucesso.")
      closeModal()
    } catch (err: any) {
      console.error(err)

      const apiMissingKeys = err?.response?.data?.missingKeys
      const apiMessage =
        err?.response?.data?.message || "Erro ao criar anúncio."

      if (Array.isArray(apiMissingKeys)) {
        setMissingKeys(apiMissingKeys)
      }

      pushToast("error", apiMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalOverlay onMouseDown={closeModal}>
      <ModalCard onMouseDown={(e) => e.stopPropagation()}>
        <ModalBody>
          <FieldGrid>

            {marketplace.length > 0 &&
              <>
                <Field>
                  <FieldLabel>Buscar produto</FieldLabel>
                  <Input
                    placeholder="Digite nome, SKU, marca ou categoria"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel>Produto</FieldLabel>
                  <Select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    disabled={loadingProducts}
                  >
                    <option value="">
                      {loadingProducts ? "Carregando produtos..." : "Selecione"}
                    </option>

                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name} — {product.internalSku}
                        {product.erpCategoryName ? ` — ${product.erpCategoryName}` : ""}
                      </option>
                    ))}
                  </Select>
                </Field>
              </>
            }

            <Field>
              <FieldLabel>Marketplace</FieldLabel>
              <Select
                value={marketplace}
                onChange={(e) => handleMarketplaceChange(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="mercado_livre">Mercado Livre</option>
                <option value="shopee">Shopee</option>
                <option value="magalu">Magalu</option>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Preço</FieldLabel>
              <Input
                type="number"
                value={formPrice}
                onChange={(e) => setFormPrice(Number(e.target.value))}
                min={0}
                step="0.01"
              />
            </Field>

            <Field>
              <FieldLabel>Estoque</FieldLabel>
              <Input
                type="number"
                value={formStock}
                onChange={(e) => setFormStock(Number(e.target.value))}
                min={0}
                step="1"
              />
            </Field>
          </FieldGrid>

          {!marketplace ? (
            <EmptyHint>Selecione um marketplace para carregar os campos.</EmptyHint>
          ) : loadingFields ? (
            <EmptyHint>Carregando campos do marketplace...</EmptyHint>
          ) : fields.length > 0 ? (
            <>
              <EmptyHint>
                <b>Campos do marketplace</b> — preencha somente os dados do anúncio
                para <b> {marketplace.replace("_", " ")}</b>.
              </EmptyHint>

              <FieldGrid>
                <MarketplaceConfigForm
                  fields={fields}
                  value={formConfig}
                  onChange={setFormConfig}
                  missingKeys={missingKeys}
                />
              </FieldGrid>
            </>
          ) : (
            <EmptyHint>Nenhum campo configurado para este marketplace.</EmptyHint>
          )}
        </ModalBody>

        <ModalFooter>
          <BtnDanger onClick={closeModal}>Cancelar</BtnDanger>
          <BtnPrimary onClick={handleCreate} disabled={loading || loadingFields}>
            {loading ? "Criando..." : "Criar anúncio"}
          </BtnPrimary>
        </ModalFooter>
      </ModalCard>
    </ModalOverlay>
  )
}