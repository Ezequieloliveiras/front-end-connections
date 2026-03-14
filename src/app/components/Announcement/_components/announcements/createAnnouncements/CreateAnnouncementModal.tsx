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
import { FieldDef, GetAnnouncementFieldsResponse } from "../types"


type Props = {
  productId: string | undefined
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
  const [fields, setFields] = useState<FieldDef[]>([])
  const [loadingFields, setLoadingFields] = useState(false)

  const [formPrice, setFormPrice] = useState<number>(0)
  const [formStock, setFormStock] = useState<number>(0)
  const [formConfig, setFormConfig] = useState<Partial<AnnouncementConfig>>({})
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [categoryId, setCategoryId] = useState("")

  const [missingKeys, setMissingKeys] = useState<string[]>([])

  const appendAnnouncementLocal = (announcement: Announcement) => {
    setAnnouncements((prev) => [announcement, ...prev])
  }

  const handleMarketplaceChange = async (nextMarketplace: string) => {
    setMarketplace(nextMarketplace)
    setFormConfig({})
    setMissingKeys([])
    setFields([])

    if (!nextMarketplace) return

    try {
      setLoadingFields(true)

      // const { data } = await api.get<GetAnnouncementFieldsResponse>(
      //   `/announcements/fields/${nextMarketplace}`
      // )

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
    if (!productId) {
      pushToast("error", "Produto não informado.")
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
        productId,
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