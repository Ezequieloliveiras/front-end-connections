import { useEffect, useMemo, useState } from "react"
import { api } from "@/app/services/api"
import { useToast } from "@/app/components/Toast/Toast"
import { CategoryLinkItem, MarketplaceKey } from "./CategoryLinkScreen"
import { normalizeMarketplaceFields } from "./normalizers/marketplaceFields"
type BasicFieldKey = "title" | "description" | "price"
import type { MarketplaceFieldItem } from "./normalizers/marketplaceFields/types"
import { MARKETPLACES } from "./categoryRoutes/categoryRoutes"

type AnnouncementFieldConfig = {
  entityId?: string
  marketplace: string
  marketplaceCategoryId: string
  basicFields: BasicFieldKey[]
  fieldsRequired: MarketplaceFieldItem[]
  fieldsByCategory: MarketplaceFieldItem[]
  selectedOptionalFieldIds: MarketplaceFieldItem[]
}
type CategoryOption = {
  id: string
  name: string
}

type ErpCategoryOption = {
  id: string
  name: string
}

type Props = {
  link: CategoryLinkItem | null
  onClose: () => void
  onSaved: () => void
}

type CategoryFieldsResponse = {
  marketplace: string
  marketplaceCategoryId: string
  fields: MarketplaceFieldItem[]
}

export function EditCategoryLinkModal({ link, onClose, onSaved }: Props) {
  const { pushToast } = useToast()

  const [saving, setSaving] = useState(false)
  const [erpCategories, setErpCategories] = useState<ErpCategoryOption[]>([])
  const [marketplaceCategories, setMarketplaceCategories] = useState<CategoryOption[]>([])
  const [loadingMarketplaceCategories, setLoadingMarketplaceCategories] = useState(false)

  const [erpCategoryId, setErpCategoryId] = useState(link?.erpCategoryId || "")
  const [erpCategoryName, setErpCategoryName] = useState(link?.erpCategoryName || "")
  const [marketplace, setMarketplace] = useState<MarketplaceKey | "">(
    link?.marketplace || ""
  )
  const [marketplaceCategoryId, setMarketplaceCategoryId] = useState(
    link?.marketplaceCategoryId || ""
  )
  const [marketplaceCategoryName, setMarketplaceCategoryName] = useState(
    link?.marketplaceCategoryName || ""
  )

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

  const fetchErpCategories = async () => {
    try {
      const { data } = await api.get<ErpCategoryOption[]>("/category/erp")
      setErpCategories(Array.isArray(data) ? data : [])
    } catch (err: any) {
      console.error(err)
      pushToast("error", err?.response?.data?.message || "Erro ao listar categorias RP.")
    }
  }

  const fetchMarketplaceCategories = async (marketplaceKey: MarketplaceKey) => {
    const config = MARKETPLACES.find((item) => item.key === marketplaceKey)
    if (!config) return

    try {
      setLoadingMarketplaceCategories(true)

      const { data } = await api.get<CategoryOption[]>(config.categoryRoute)
      setMarketplaceCategories(Array.isArray(data) ? data : [])
    } catch (err: any) {
      console.error(err)
      pushToast(
        "error",
        err?.response?.data?.message ||
        `Erro ao listar categorias de ${config.label}.`
      )
    } finally {
      setLoadingMarketplaceCategories(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingFieldConfig(true)

        const { data } = await api.post<CategoryFieldsResponse>("/category/fields", {
          marketplace,
          marketplaceCategoryId,
        })

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
        setFieldConfig({
          marketplace: "",
          marketplaceCategoryId: "",
          basicFields: ["title", "description", "price"],
          fieldsRequired: [],
          fieldsByCategory: [],
          selectedOptionalFieldIds: [],
        })
      } finally {
        setLoadingFieldConfig(false)
      }
    }

    if (marketplace && marketplaceCategoryId) {
      fetchData()
    } else {
      setFieldConfig({
        marketplace: "",
        marketplaceCategoryId: "",
        basicFields: ["title", "description", "price"],
        fieldsRequired: [],
        fieldsByCategory: [],
        selectedOptionalFieldIds: [],
      })
      setConfigOpen(false)
    }
  }, [marketplace, marketplaceCategoryId, pushToast])

  useEffect(() => {
    fetchErpCategories()
  }, [])

  useEffect(() => {
    if (marketplace) {
      fetchMarketplaceCategories(marketplace)
    } else {
      setMarketplaceCategories([])
    }
  }, [marketplace])

  const handleSave = async () => {
    if (!erpCategoryId) {
      pushToast("error", "Selecione a categoria RP.")
      return
    }

    if (!marketplace) {
      pushToast("error", "Selecione o marketplace.")
      return
    }

    if (!marketplaceCategoryId) {
      pushToast("error", "Selecione a categoria do marketplace.")
      return
    }

    try {
      setSaving(true)

      const payload = {
        erpCategoryId,
        erpCategoryName,
        marketplace,
        marketplaceCategoryId,
        marketplaceCategoryName,
      }

      if (link?._id) {
        await api.patch(`/category/links/${link._id}`, payload)
      } else {
        await api.post("/category/links", payload)
      }

      pushToast("success", "Vínculo salvo com sucesso.")
      onSaved()
    } catch (err: any) {
      console.error(err)
      pushToast(
        "error",
        err?.response?.data?.message || "Erro ao salvar vínculo."
      )
    } finally {
      setSaving(false)
    }
  }

  const handleRemove = async () => {
    if (!link?._id) return

    try {
      setSaving(true)
      await api.delete(`/category/links/${link._id}`)
      pushToast("success", "Vínculo removido com sucesso.")
      onSaved()
    } catch (err: any) {
      console.error(err)
      pushToast(
        "error",
        err?.response?.data?.message || "Erro ao remover vínculo."
      )
    } finally {
      setSaving(false)
    }
  }

  const toggleBasicField = (field: BasicFieldKey) => {
    setFieldConfig((prev) => {
      const exists = prev.basicFields.includes(field)

      return {
        ...prev,
        basicFields: exists
          ? prev.basicFields.filter((item) => item !== field)
          : [...prev.basicFields, field],
      }
    })
  }

  const toggleOptionalField = (fieldId: string) => {
    setFieldConfig((prev) => {
      const requiredIds = prev.fieldsRequired.map((item) => item.id)

      if (requiredIds.includes(fieldId)) {
        return prev
      }

      const exists = prev.selectedOptionalFieldIds.some(
        (item) => item.id === fieldId
      )

      const field = prev.fieldsByCategory.find((item) => item.id === fieldId)

      if (!field) {
        return prev
      }

      return {
        ...prev,
        selectedOptionalFieldIds: exists
          ? prev.selectedOptionalFieldIds.filter((item) => item.id !== fieldId)
          : [
            ...prev.selectedOptionalFieldIds,
            {
              ...field,
              options: field.raw?.values ?? [],
            },
          ],
      }
    })
  }

  const handleSaveFieldConfig = async () => {
    if (!marketplace || !marketplaceCategoryId) {
      pushToast("error", "Selecione o marketplace e a categoria antes de configurar os campos.")
      return
    }

    try {
      setSavingFieldConfig(true)

      await api.put("/announcements/field-config", {
        marketplace,
        marketplaceCategoryId,
        basicFields: fieldConfig.basicFields,
        fieldsRequired: fieldConfig.fieldsRequired,
        fieldsByCategory: fieldConfig.fieldsByCategory,
        selectedOptionalFieldIds: fieldConfig.selectedOptionalFieldIds,
      })

      pushToast("success", "Configuração de campos salva com sucesso.")
    } catch (err: any) {
      console.error(err)
      pushToast(
        "error",
        err?.response?.data?.message ||
        "Erro ao salvar configuração de campos."
      )
    } finally {
      setSavingFieldConfig(false)
    }
  }

  return (
    <div
      onMouseDown={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 9999,
      }}
    >
      <div
        className="modal-scroll"
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 720,
          background: "#fff",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "900px",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: 20, borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>
            {link ? "Editar vínculo de categoria" : "Novo vínculo de categoria"}
          </div>
          <div style={{ marginTop: 6, color: "#64748B" }}>
            Relacione uma categoria ERP com uma categoria do marketplace.
          </div>
        </div>

        <div
          style={{
            padding: 20,
            display: "grid",
            gap: 20,
          }}
        >
          <div>
            <label style={labelStyle}>Categoria ERP</label>
            <select
              value={erpCategoryId}
              onChange={(e) => {
                const selected = erpCategories.find((item) => item.id === e.target.value)
                setErpCategoryId(e.target.value)
                setErpCategoryName(selected?.name || "")
              }}
              style={inputStyle}
              disabled={saving}
            >
              <option value="">Selecione</option>
              {erpCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Marketplace</label>
            <select
              value={marketplace}
              onChange={(e) => {
                const value = e.target.value as MarketplaceKey | ""
                setMarketplace(value)
                setMarketplaceCategoryId("")
                setMarketplaceCategoryName("")
              }}
              style={inputStyle}
              disabled={saving}
            >
              <option value="">Selecione</option>
              {MARKETPLACES.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 72px 1fr",
              gap: 16,
              alignItems: "end",
            }}
          >
            <div>
              <label style={labelStyle}>Categoria ERP</label>
              <input value={erpCategoryName} disabled style={inputStyle} />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 42,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1px solid #86EFAC",
                  background: "#F0FDF4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                🔗
              </div>
            </div>

            <div>
              <label style={labelStyle}>
                Categoria {selectedMarketplaceConfig?.label || "do marketplace"}
              </label>
              <select
                value={marketplaceCategoryId}
                onChange={(e) => {
                  const selected = marketplaceCategories.find(
                    (item) => item.id === e.target.value
                  )
                  setMarketplaceCategoryId(e.target.value)
                  setMarketplaceCategoryName(selected?.name || "")
                }}
                disabled={!marketplace || loadingMarketplaceCategories || saving}
                style={inputStyle}
              >
                <option value="">
                  {loadingMarketplaceCategories ? "Carregando categorias..." : "Selecione"}
                </option>
                {marketplaceCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {marketplace && marketplaceCategoryId && (
            <div
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                overflow: "hidden",
                background: "#fff",
              }}
            >
              <button
                type="button"
                onClick={() => setConfigOpen((prev) => !prev)}
                disabled={loadingFieldConfig || saving}
                style={{
                  width: "100%",
                  minHeight: 52,
                  border: "none",
                  background: "#F8FAFC",
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                <span>Configurar campos a serem exibidos na criação do anúncio</span>
                <span style={{ fontSize: 18 }}>{configOpen ? "▾" : "▸"}</span>
              </button>

              {configOpen && (
                <div
                  style={{
                    padding: 16,
                    display: "grid",
                    gap: 20,
                    borderTop: "1px solid #E5E7EB",
                  }}
                >
                  {loadingFieldConfig ? (
                    <div style={{ color: "#64748B" }}>Carregando configuração...</div>
                  ) : (
                    <>
                      <div>
                        <div style={sectionTitleStyle}>Campos básicos</div>

                        <div style={checkboxGridStyle}>
                          <label style={checkboxItemStyle}>
                            <input
                              type="checkbox"
                              checked={fieldConfig.basicFields.includes("title")}
                              onChange={() => toggleBasicField("title")}
                            />
                            <span>Título</span>
                          </label>

                          <label style={checkboxItemStyle}>
                            <input
                              type="checkbox"
                              checked={fieldConfig.basicFields.includes("description")}
                              onChange={() => toggleBasicField("description")}
                            />
                            <span>Descrição</span>
                          </label>

                          <label style={checkboxItemStyle}>
                            <input
                              type="checkbox"
                              checked={fieldConfig.basicFields.includes("price")}
                              onChange={() => toggleBasicField("price")}
                            />
                            <span>Preço</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <div style={sectionTitleStyle}>Campos obrigatórios da categoria</div>

                        {fieldConfig.fieldsRequired.length === 0 ? (
                          <div style={{ color: "#64748B" }}>
                            Nenhum campo obrigatório encontrado.
                          </div>
                        ) : (
                          <div style={checkboxGridStyle}>
                            {fieldConfig.fieldsRequired.map((field) => (
                              <label
                                key={field.id}
                                style={{
                                  ...checkboxItemStyle,
                                  background: "#F8FAFC",
                                  border: "1px solid #E2E8F0",
                                }}
                              >
                                <input type="checkbox" checked disabled />
                                <span>
                                  {field.name} <span style={{ color: "#DC2626" }}>*</span>
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <div style={sectionTitleStyle}>Adicionar mais campos da categoria</div>

                        {fieldConfig.fieldsByCategory.length === 0 ? (
                          <div style={{ color: "#64748B" }}>
                            Nenhum campo adicional disponível para esta categoria.
                          </div>
                        ) : (
                          <div style={checkboxGridStyle}>
                            {fieldConfig.fieldsByCategory.map((field) => {
                              const checked = fieldConfig.selectedOptionalFieldIds.some(
                                (item) => item.id === field.id
                              )

                              return (
                                <label key={field.id} style={checkboxItemStyle}>
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleOptionalField(field.id)}
                                  />
                                  <span>{field.name}</span>
                                </label>
                              )
                            })}
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button
                          type="button"
                          onClick={handleSaveFieldConfig}
                          disabled={savingFieldConfig}
                          style={{
                            height: 40,
                            padding: "0 16px",
                            borderRadius: 8,
                            border: "none",
                            background: "#0F172A",
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: 700,
                          }}
                        >
                          {savingFieldConfig ? "Salvando campos..." : "Salvar configuração dos campos"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div
          style={{
            padding: 20,
            borderTop: "1px solid #E5E7EB",
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div>
            {link && (
              <button
                onClick={handleRemove}
                disabled={saving}
                style={{
                  height: 40,
                  padding: "0 14px",
                  borderRadius: 8,
                  border: "1px solid #FCA5A5",
                  background: "#fff",
                  color: "#B91C1C",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Remover vínculo
              </button>
            )}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={onClose}
              disabled={saving}
              style={{
                height: 40,
                padding: "0 14px",
                borderRadius: 8,
                border: "1px solid #CBD5E1",
                background: "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Cancelar
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                height: 40,
                padding: "0 16px",
                borderRadius: 8,
                border: "none",
                background: "#2563EB",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              {saving ? "Salvando..." : "Salvar vínculo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 8,
  fontWeight: 600,
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 42,
  borderRadius: 8,
  border: "1px solid #CBD5E1",
  padding: "0 12px",
  outline: "none",
  background: "#fff",
}

const sectionTitleStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 14,
  marginBottom: 10,
  color: "#0F172A",
}

const checkboxGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 10,
}

const checkboxItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  minHeight: 40,
  padding: "0 12px",
  borderRadius: 8,
  border: "1px solid #CBD5E1",
  background: "#fff",
  fontSize: 14,
}