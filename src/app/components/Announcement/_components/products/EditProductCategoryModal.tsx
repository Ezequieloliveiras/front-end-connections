import { useEffect, useState } from "react"
import { api } from "@/app/services/api"
import { useToast } from "@/app/components/Toast/Toast"
import { ProductItem } from "./ProductCategoryLinkScreen"

type CategoryOption = {
  id: string
  name: string
}

type AttributeOption = {
  id: string
  name: string
}

type MarketplaceAttribute = {
  id: string
  name: string
  value_type?: "string" | "number" | "list" | "boolean"
  tags?: {
    required?: boolean
  }
  values?: AttributeOption[]
}

type Props = {
  product: ProductItem
  onClose: () => void
  onUpdated: (product: ProductItem) => void
}

export function EditProductCategoryModal({
  product,
  onClose,
  onUpdated,
}: Props) {
  const { pushToast } = useToast()

  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [saving, setSaving] = useState(false)

  const [fields, setFields] = useState<MarketplaceAttribute[]>([])
  const [formConfig, setFormConfig] = useState<Record<string, string>>({})

  const [meliCategoryId, setMeliCategoryId] = useState(product.meliCategoryId || "")
  const [meliCategoryName, setMeliCategoryName] = useState(
    product.meliCategoryName || ""
  )

  const handleAttributeChange = (fieldId: string, value: string) => {
    setFormConfig((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
  }

  const handleCategoryChange = async (value: string) => {
    setFields([])
    setFormConfig({})

    try {
      setMeliCategoryId(value)

      const selected = categories.find((item) => item.id === value)
      setMeliCategoryName(selected?.name || "")

      if (!selected?.id) return

      const { data } = await api.get(`/meli/categories/${selected.id}/attributes`)

      const requiredFields = Array.isArray(data)
        ? data.filter((field) => field?.tags?.required)
        : []

      setFields(requiredFields)
    } catch (err: any) {
      console.error(err)
      pushToast(
        "error",
        err?.response?.data?.message || "Erro ao buscar atributos da categoria."
      )
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true)

        const { data } = await api.get<CategoryOption[]>("/meli/categories")

        setCategories(Array.isArray(data) ? data : [])
      } catch (err: any) {
        console.error(err)
        pushToast(
          "error",
          err?.response?.data?.message || "Erro ao buscar categorias do Mercado Livre."
        )
      } finally {
        setLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [pushToast])

  const validateRequiredFields = () => {
    const missingFields = fields.filter(
      (field) => field.tags?.required && !formConfig[field.id]?.trim()
    )

    if (missingFields.length > 0) {
      pushToast(
        "error",
        `Preencha os campos obrigatórios: ${missingFields
          .map((field) => field.name)
          .join(", ")}`
      )
      return false
    }

    return true
  }

  const handleSave = async () => {
    if (!meliCategoryId) {
      pushToast("error", "Selecione uma categoria do Mercado Livre.")
      return
    }

    if (!validateRequiredFields()) {
      return
    }

    try {
      setSaving(true)

      const payload = {
        marketplace: "mercado_livre",
        categoryId: meliCategoryId,
        categoryName: meliCategoryName,
        attributes: formConfig,
      }

    //   const { data } = await api.patch<ProductItem>(
    //     `/products/${product.id}/category-link/mercado-livre`,
    //     payload
    //   )

    //   onUpdated(data)
    //   pushToast("success", "Categoria vinculada com sucesso.")
    //   onClose()
    } catch (err: any) {
      console.error(err)
      pushToast(
        "error",
        err?.response?.data?.message || "Erro ao vincular categoria."
      )
    } finally {
      setSaving(false)
    }
  }

  const handleRemoveLink = async () => {
    try {
      setSaving(true)

    //   const { data } = await api.patch<ProductItem>(
    //     `/products/${product.id}/category-link/mercado-livre`,
    //     {
    //       marketplace: "mercado_livre",
    //       categoryId: null,
    //       categoryName: null,
    //       attributes: {},
    //     }
    //   )

    //   onUpdated(data)
    //   pushToast("success", "Vínculo removido com sucesso.")
    //   onClose()
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

  const renderDynamicField = (field: MarketplaceAttribute) => {
    const value = formConfig[field.id] || ""

    const hasOptions = Array.isArray(field.values) && field.values.length > 0

    if (hasOptions) {
      return (
        <select
          value={value}
          onChange={(e) => handleAttributeChange(field.id, e.target.value)}
          disabled={saving}
          style={inputStyle}
        >
          <option value="">Selecione</option>
          {field.values?.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      )
    }

    if (field.value_type === "number") {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => handleAttributeChange(field.id, e.target.value)}
          disabled={saving}
          style={inputStyle}
        />
      )
    }

    if (field.value_type === "boolean") {
      return (
        <select
          value={value}
          onChange={(e) => handleAttributeChange(field.id, e.target.value)}
          disabled={saving}
          style={inputStyle}
        >
          <option value="">Selecione</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      )
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleAttributeChange(field.id, e.target.value)}
        disabled={saving}
        style={inputStyle}
      />
    )
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
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 720,
          maxHeight: "90vh",
          background: "#fff",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: 20, borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>
            Editar produto
          </div>
          <div style={{ marginTop: 6, color: "#64748B" }}>
            Faça o vínculo da categoria do seu produto com a categoria do Mercado Livre.
          </div>
        </div>

        <div
          style={{
            padding: 20,
            display: "grid",
            gap: 20,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                Produto
              </label>
              <input
                value={product.name}
                disabled
                style={inputStyle}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                Categoria ERP
              </label>
              <input
                value={product.erpCategoryName || ""}
                disabled
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              Categoria Mercado Livre
            </label>

            <select
              value={meliCategoryId}
              onChange={(e) => handleCategoryChange(e.target.value)}
              disabled={loadingCategories || saving}
              style={inputStyle}
            >
              <option value="">
                {loadingCategories ? "Carregando categorias..." : "Selecione"}
              </option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {fields.length > 0 && (
            <div
              style={{
                padding: 16,
                borderRadius: 12,
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 16 }}>
                Campos obrigatórios da categoria
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {fields.map((field) => (
                  <div key={field.id}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: 8,
                        fontWeight: 600,
                      }}
                    >
                      {field.name}{" "}
                      {field.tags?.required && (
                        <span style={{ color: "#DC2626" }}>*</span>
                      )}
                    </label>

                    {renderDynamicField(field)}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              padding: 14,
              borderRadius: 12,
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              Status atual
            </div>

            {product.meliCategoryId ? (
              <div style={{ color: "#166534" }}>
                Vinculado em: <b>{product.meliCategoryName}</b>
              </div>
            ) : (
              <div style={{ color: "#991B1B" }}>
                Este produto ainda não está vinculado.
              </div>
            )}
          </div>
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
            <button
              onClick={handleRemoveLink}
              disabled={saving || !product.meliCategoryId}
              style={{
                height: 40,
                padding: "0 14px",
                borderRadius: 8,
                border: "1px solid #FCA5A5",
                background: "#fff",
                color: "#B91C1C",
                cursor: saving || !product.meliCategoryId ? "not-allowed" : "pointer",
                opacity: saving || !product.meliCategoryId ? 0.6 : 1,
                fontWeight: 600,
              }}
            >
              Remover vínculo
            </button>
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
              disabled={saving || loadingCategories}
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

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 42,
  borderRadius: 8,
  border: "1px solid #CBD5E1",
  padding: "0 12px",
  outline: "none",
  background: "#fff",
}