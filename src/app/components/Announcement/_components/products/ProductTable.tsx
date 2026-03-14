import { ProductItem } from "./ProductCategoryLinkScreen"

type Props = {
  products: ProductItem[]
  loading?: boolean
  onEdit: (product: ProductItem) => void
}

export function ProductTable({ products, loading, onEdit }: Props) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.2fr 1.5fr 1fr 120px",
          gap: 12,
          padding: "14px 16px",
          background: "#F9FAFB",
          borderBottom: "1px solid #E5E7EB",
          fontWeight: 700,
        }}
      >
        <div>Produto</div>
        <div>SKU</div>
        <div>Categoria ERP</div>
        <div>Mercado Livre</div>
        <div>Ações</div>
      </div>

      {loading ? (
        <div style={{ padding: 16 }}>Carregando produtos...</div>
      ) : products.length === 0 ? (
        <div style={{ padding: 16 }}>Nenhum produto encontrado.</div>
      ) : (
        products.map((product) => {
          const linked = Boolean(product.meliCategoryId)

          return (
            <div
              key={product._id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.2fr 1.5fr 1fr 120px",
                gap: 12,
                padding: "14px 16px",
                borderBottom: "1px solid #F1F5F9",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{product.name}</div>
              </div>

              <div>{product.sku || "-"}</div>

              <div>{product.erpCategoryName || "-"}</div>

              <div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "6px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    background: linked ? "#DCFCE7" : "#FEE2E2",
                    color: linked ? "#166534" : "#991B1B",
                  }}
                >
                  {linked ? "Vinculado" : "Não vinculado"}
                </span>

                {linked && product.meliCategoryName && (
                  <div style={{ marginTop: 6, fontSize: 12, color: "#475569" }}>
                    {product.meliCategoryName}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => onEdit(product)}
                  style={{
                    height: 36,
                    padding: "0 14px",
                    borderRadius: 8,
                    border: "1px solid #CBD5E1",
                    background: "#fff",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}