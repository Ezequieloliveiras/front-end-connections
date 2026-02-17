import {
  BtnDanger,
  BtnPrimary,
  Divider,
  EmptyHint,
  Field,
  FieldGrid,
  FieldLabel,
  Input,
  ModalBody,
  ModalCard,
  ModalClose,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  Select,
  SubTitle,
  Btn,
} from "./styles"

import { MarketplaceConfigForm } from "../MarketplaceConfigForm/MarketplaceConfigForm"
import { useEffect, useState } from "react"
import { api } from "@/app/services/api"
import { useToast } from "@/app/components/Toast/Toast"
import { safeNumber } from "@/app/utils/safeNumber"
type Marketplace = "mercado_livre" | "shopee" | "magalu"

type AnnouncementStatus = "active" | "paused" | "inactive" | "draft" | "error"
type Announcement = {
  _id?: string
  entityId: string
  productId?: string
  marketplace: Marketplace
  marketplaceProductId?: string
  price: number
  stock: number
  status: AnnouncementStatus
  lastSyncAt?: string
  syncError?: string | null
  config?: Record<string, any>
  createdAt?: string
  updatedAt?: string
}

export function ModalAnnoucements({
  mode,
  selectedAnnouncement,
  formConfig,
  setFormConfig,
  closeModal,
  MARKETPLACES,
  missingKeys = [],
  setAnnouncements,
}: any) {
  const { pushToast } = useToast()

  const fields = selectedAnnouncement?.configFields ?? []

  const [formPrice, setFormPrice] = useState<number>(0)
  const [formStock, setFormStock] = useState<number>(0)
  const [formStatus, setFormStatus] = useState<AnnouncementStatus>("draft")
    const upsertByIdLocal = (id: string, patch: Partial<Announcement>) => {
        setAnnouncements((prev: any) =>
            prev.map((a: any) => (a._id === id ? { ...a, ...patch, updatedAt: new Date().toISOString() } : a))
        )
    }
  // sempre que mudar o anúncio selecionado, carrega no form
  useEffect(() => {
    if (!selectedAnnouncement) return
    setFormPrice(safeNumber(selectedAnnouncement.price))
    setFormStock(safeNumber(selectedAnnouncement.stock))
    setFormStatus((selectedAnnouncement.status ?? "draft") as AnnouncementStatus)
    // se quiser também puxar config:
    // setFormConfig(selectedAnnouncement.config ?? {})
  }, [selectedAnnouncement])

  const handleSaveEdit = async () => {
    if (!selectedAnnouncement?._id) return pushToast("error", "Anúncio sem ID para atualizar.")
    const annId = selectedAnnouncement._id
    try {
      const payload = {
        price: safeNumber(formPrice),
        stock: safeNumber(formStock),
        status: formStatus,
      }

      const { data } = await api.patch<Announcement>(`/announcements/${annId}`, payload)
      upsertByIdLocal(annId, data)
      pushToast("success", "Anúncio atualizado.")
      closeModal()
    } catch (err) {
      console.error(err)
      pushToast("error", "Erro ao salvar anúncio.")
    }
  }

  const handlePublish = async () => {
    if (!selectedAnnouncement?._id) return pushToast("error", "Anúncio sem ID para publicar.")
    const annId = selectedAnnouncement._id
    try {
      // publica com os valores que o usuário editou no modal
      const payload = {
        price: safeNumber(formPrice),
        stock: safeNumber(formStock),
      }

      const { data } = await api.post<Announcement>(`/announcements/${annId}/publish`, payload)
      upsertByIdLocal(annId, data)
      pushToast("success", "Publicado com sucesso.")
      closeModal()
    } catch (err) {
      console.error(err)
      pushToast("error", "Erro ao publicar.")
    }
  }

  const handleUnpublish = async () => {
    if (!selectedAnnouncement?._id) return pushToast("error", "Anúncio sem ID para despublicar.")
    const annId = selectedAnnouncement._id

    try {
      const { data } = await api.post<Announcement>(`/announcements/${annId}/unpublish`)
      upsertByIdLocal(annId, data)
      pushToast("info", "Despublicado.")
      closeModal()
    } catch (err) {
      console.error(err)
      pushToast("error", "Erro ao despublicar.")
    }
  }

  return (
    <ModalOverlay onMouseDown={closeModal}>
      <ModalCard onMouseDown={(e) => e.stopPropagation()}>
        {/* ...header */}

        <ModalBody>
          <FieldGrid>
            <Field>
              <FieldLabel>Preço</FieldLabel>
              <Input
                type="number"
                value={formPrice}
                onChange={(e) => setFormPrice(Number(e.target.value))}
                min={0}
                step="0.01"
                disabled={mode === "unpublish"}
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
                disabled={mode === "unpublish"}
              />
            </Field>

            <Field>
              <FieldLabel>Status</FieldLabel>
              <Select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as AnnouncementStatus)}
                disabled={mode !== "edit"}
              >
                <option value="draft">Rascunho</option>
                <option value="active">Publicado</option>
                <option value="paused">Pausado</option>
                <option value="inactive">Não publicado</option>
                <option value="error">Erro</option>
              </Select>
            </Field>
          </FieldGrid>

          {/* bloco de config dinamico */}
          {mode !== "unpublish" && fields.length > 0 ? (
            <>
              <EmptyHint>
                <b>Configurações do marketplace</b> — preencha os campos abaixo.
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
          ) : mode !== "unpublish" ? (
            <EmptyHint>Nenhuma configuração adicional para este marketplace.</EmptyHint>
          ) : null}
        </ModalBody>

        <ModalFooter>
          {mode === "edit" ? (
            <BtnPrimary onClick={handleSaveEdit}>Salvar</BtnPrimary>
          ) : mode === "publish" ? (
            <BtnPrimary onClick={handlePublish}>Confirmar publicação</BtnPrimary>
          ) : (
            <BtnDanger onClick={handleUnpublish}>Confirmar despublicação</BtnDanger>
          )}
        </ModalFooter>
      </ModalCard>
    </ModalOverlay>
  )
}
