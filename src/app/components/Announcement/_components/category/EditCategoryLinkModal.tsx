import { CategoryLinkItem, MarketplaceKey } from "./CategoryLinkScreen"
import type { MarketplaceFieldItem } from "./normalizers/marketplaceFields/types"
import { MARKETPLACES } from "./categoryRoutes/categoryRoutes"

import {
  Overlay,
  ModalScroll,
  Header,
  Title,
  Subtitle,
  Content,
  Label,
  InputField,
  SelectField,
  LinkGrid,
  LinkIconWrapper,
  LinkIconCircle,
  ConfigCard,
  ConfigToggleButton,
  ToggleIcon,
  ConfigBody,
  SectionTitle,
  CheckboxGrid,
  CheckboxItem,
  CheckboxItemRequired,
  RequiredMark,
  MutedText,
  ActionsRight,
  SaveFieldConfigButton,
  Footer,
  FooterActions,
  RemoveButton,
  CancelButton,
  SaveButton
} from "./styles"

import { useCategoryStates } from "@/app/hooks/category/useCategoryStates"
import { useHandlers } from "@/app/hooks/category/useHandlers"

type BasicFieldKey = "title" | "description" | "price"

export type AnnouncementFieldConfig = {
  entityId?: string
  marketplace: string
  marketplaceCategoryId: string
  basicFields: BasicFieldKey[]
  fieldsRequired: MarketplaceFieldItem[]
  fieldsByCategory: MarketplaceFieldItem[]
  selectedOptionalFieldIds: MarketplaceFieldItem[]
}
export type CategoryOption = {
  id: string
  name: string
}

export type ErpCategoryOption = {
  id: string
  name: string
}

export type PropsEditCategoryLinkModal = {
  link: CategoryLinkItem | null
  onClose: () => void
  onSaved: () => void
}

export type CategoryFieldsResponse = {
  marketplace: string
  marketplaceCategoryId: string
  fields: MarketplaceFieldItem[]
}

export function EditCategoryLinkModal({ link, onClose, onSaved }: PropsEditCategoryLinkModal) {
  const statesCategory = useCategoryStates({ link })

  const {
    erpCategories,
    erpCategoryId,
    erpCategoryName,
    marketplace,
    marketplaceCategoryId,
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
  } = statesCategory

  const {
    handleSave,
    handleRemove,
    handleSaveFieldConfig,
    toggleBasicField,
    toggleOptionalField,
  } = useHandlers({
    link,
    onSaved,
    ...statesCategory,
  })

  return (
    <Overlay onMouseDown={onClose}>
      <ModalScroll className="modal-scroll" onMouseDown={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            {link ? "Editar vínculo de categoria" : "Novo vínculo de categoria"}
          </Title>
          <Subtitle>
            Relacione uma categoria ERP com uma categoria do marketplace.
          </Subtitle>
        </Header>

        <Content>
          <div>
            <Label>Categoria ERP</Label>
            <SelectField
              value={erpCategoryId}
              onChange={(e) => {
                const selected = erpCategories.find((item) => item.id === e.target.value)
                setErpCategoryId(e.target.value)
                setErpCategoryName(selected?.name || "")
              }}
              disabled={saving}
            >
              <option value="">Selecione</option>
              {erpCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </SelectField>
          </div>

          <div>
            <Label>Marketplace</Label>
            <SelectField
              value={marketplace}
              onChange={(e) => {
                const value = e.target.value as MarketplaceKey | ""
                setMarketplace(value)
                setMarketplaceCategoryId("")
                setMarketplaceCategoryName("")
              }}
              disabled={saving}
            >
              <option value="">Selecione</option>
              {MARKETPLACES.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </SelectField>
          </div>

          <LinkGrid>
            <div>
              <Label>Categoria ERP</Label>
              <InputField value={erpCategoryName} disabled />
            </div>

            <LinkIconWrapper>
              <LinkIconCircle>🔗</LinkIconCircle>
            </LinkIconWrapper>

            <div>
              <Label>
                Categoria {selectedMarketplaceConfig?.label || "do marketplace"}
              </Label>
              <SelectField
                value={marketplaceCategoryId}
                onChange={(e) => {
                  const selected = marketplaceCategories.find(
                    (item) => item.id === e.target.value
                  )
                  setMarketplaceCategoryId(e.target.value)
                  setMarketplaceCategoryName(selected?.name || "")
                }}
                disabled={!marketplace || loadingMarketplaceCategories || saving}
              >
                <option value="">
                  {loadingMarketplaceCategories ? "Carregando categorias..." : "Selecione"}
                </option>
                {marketplaceCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </SelectField>
            </div>
          </LinkGrid>

          {marketplace && marketplaceCategoryId && (
            <ConfigCard>
              <ConfigToggleButton
                type="button"
                onClick={() => setConfigOpen((prev) => !prev)}
                disabled={loadingFieldConfig || saving}
              >
                <span>Configurar campos a serem exibidos na criação do anúncio</span>
                <ToggleIcon>{configOpen ? "▾" : "▸"}</ToggleIcon>
              </ConfigToggleButton>

              {configOpen && (
                <ConfigBody>
                  {loadingFieldConfig ? (
                    <MutedText>Carregando configuração...</MutedText>
                  ) : (
                    <>
                      <div>
                        <SectionTitle>Campos básicos</SectionTitle>

                        <CheckboxGrid>
                          <CheckboxItem>
                            <input
                              type="checkbox"
                              checked={fieldConfig.basicFields.includes("title")}
                              onChange={() => toggleBasicField("title")}
                            />
                            <span>Título</span>
                          </CheckboxItem>

                          <CheckboxItem>
                            <input
                              type="checkbox"
                              checked={fieldConfig.basicFields.includes("description")}
                              onChange={() => toggleBasicField("description")}
                            />
                            <span>Descrição</span>
                          </CheckboxItem>

                          <CheckboxItem>
                            <input
                              type="checkbox"
                              checked={fieldConfig.basicFields.includes("price")}
                              onChange={() => toggleBasicField("price")}
                            />
                            <span>Preço</span>
                          </CheckboxItem>
                        </CheckboxGrid>
                      </div>

                      <div>
                        <SectionTitle>Campos obrigatórios da categoria</SectionTitle>

                        {fieldConfig.fieldsRequired.length === 0 ? (
                          <MutedText>Nenhum campo obrigatório encontrado.</MutedText>
                        ) : (
                          <CheckboxGrid>
                            {fieldConfig.fieldsRequired.map((field) => (
                              <CheckboxItemRequired key={field.id}>
                                <input type="checkbox" checked disabled />
                                <span>
                                  {field.name} <RequiredMark>*</RequiredMark>
                                </span>
                              </CheckboxItemRequired>
                            ))}
                          </CheckboxGrid>
                        )}
                      </div>

                      <div>
                        <SectionTitle>Adicionar mais campos da categoria</SectionTitle>

                        {fieldConfig.fieldsByCategory.length === 0 ? (
                          <MutedText>
                            Nenhum campo adicional disponível para esta categoria.
                          </MutedText>
                        ) : (
                          <CheckboxGrid>
                            {fieldConfig.fieldsByCategory.map((field) => {
                              const checked = fieldConfig.selectedOptionalFieldIds.some(
                                (item) => item.id === field.id
                              )

                              return (
                                <CheckboxItem key={field.id}>
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleOptionalField(field.id)}
                                  />
                                  <span>{field.name}</span>
                                </CheckboxItem>
                              )
                            })}
                          </CheckboxGrid>
                        )}
                      </div>

                      <ActionsRight>
                        <SaveFieldConfigButton
                          type="button"
                          onClick={handleSaveFieldConfig}
                          disabled={savingFieldConfig}
                        >
                          {savingFieldConfig
                            ? "Salvando campos..."
                            : "Salvar configuração dos campos"}
                        </SaveFieldConfigButton>
                      </ActionsRight>
                    </>
                  )}
                </ConfigBody>
              )}
            </ConfigCard>
          )}
        </Content>

        <Footer>
          <div>
            {link && (
              <RemoveButton onClick={handleRemove} disabled={saving}>
                Remover vínculo
              </RemoveButton>
            )}
          </div>

          <FooterActions>
            <CancelButton onClick={onClose} disabled={saving}>
              Cancelar
            </CancelButton>

            <SaveButton onClick={handleSave} disabled={saving}>
              {saving ? "Salvando..." : "Salvar vínculo"}
            </SaveButton>
          </FooterActions>
        </Footer>
      </ModalScroll>
    </Overlay>
  )
}