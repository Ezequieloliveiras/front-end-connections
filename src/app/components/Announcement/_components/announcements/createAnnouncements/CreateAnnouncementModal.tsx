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

import { MarketplaceConfigForm } from "../../MarketplaceConfigForm/MarketplaceConfigForm"
import { CreateAnnouncementModalProps } from "./types"
import { useCreateAnnouncementStates } from "@/app/hooks/announcement/createAnnoucement/useCreateAnnouncementStates"
import { useHandlersCreateAnnouncement } from "@/app/hooks/announcement/createAnnoucement/useHandlersCreateAnnouncement"
import { AnnouncementFieldConfig } from "../../category/EditCategoryLinkModal/types"

export function CreateAnnouncementModal({
  productId,
  closeModal,
  setAnnouncements,
}: CreateAnnouncementModalProps) {

  const states = useCreateAnnouncementStates({ productId })

  const {
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
    shippingMode,
    shippingOptions,
    setPrice,
    setStock,
    setDescription,
    setTitle,
    setUrl,
    setConfiguration,
    setProductSearchText,
    setShippingMode,
  } = states

  const {
    handleMarketplaceChange,
    handleProductChange,
    handleCreateAnnouncement
  } = useHandlersCreateAnnouncement({
    ...states,
    closeModal,
    setAnnouncements,
  })

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
              <FieldLabel>Envio</FieldLabel>
              <Select
                value={shippingMode}
                onChange={(e) => setShippingMode(e.target.value)}
              >
                {shippingOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
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
                  onChange={(updatedValue) =>
                    setConfiguration((previousValue: AnnouncementFieldConfig) => ({
                      ...previousValue,
                      ...updatedValue,
                    }))
                  }
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