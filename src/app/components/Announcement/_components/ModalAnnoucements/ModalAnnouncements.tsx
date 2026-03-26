import {
  BtnDanger,
  BtnPrimary,
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
} from "./styles"

import { MarketplaceConfigForm } from "../MarketplaceConfigForm/MarketplaceConfigForm"
import { api } from "@/app/services/api"
import { useToast } from "@/app/components/Toast/Toast"
import { safeNumber } from "@/app/utils/safeNumber"
import { Announcement, AnnouncementStatus } from "@/app/types/announcements/types"
import { ModalAnnoucementsProps } from "./types"
import { useModalAnnouncementStates } from "@/app/hooks/announcement/modalAnnouncement/useModalAnnouncementStates"
import { useHandlersModalAnnouncement } from "@/app/hooks/announcement/modalAnnouncement/useHandlersModalAnnouncement"

export function ModalAnnoucements({
  mode,
  selectedAnnouncement,
  formConfig,
  setFormConfig,
  closeModal,
  missingKeys = [],
  setAnnouncements,
}: ModalAnnoucementsProps) {

  const fields = selectedAnnouncement?.configFields ?? []

  const states = useModalAnnouncementStates({ selectedAnnouncement })

  const {
    formPrice,
    setFormPrice,
    formStock,
    setFormStock,
    formStatus,
    setFormStatus,
  } = states

  const {
    handleSaveEdit,
    handlePublish,
    handleUnpublish
  } = useHandlersModalAnnouncement({
    selectedAnnouncement,
    ...states,
    setAnnouncements,
    formConfig,
    closeModal
  })

  return (
    <ModalOverlay onMouseDown={closeModal}>
      <ModalCard onMouseDown={(e) => e.stopPropagation()}>
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
