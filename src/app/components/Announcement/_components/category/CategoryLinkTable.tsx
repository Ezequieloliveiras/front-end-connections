import { CategoryLinkItem } from "./CategoryLinkScreen"

type Props = {
  links: CategoryLinkItem[]
  loading?: boolean
  onEdit: (link: CategoryLinkItem) => void
}

const marketplaceLabels: Record<string, string> = {
  mercado_livre: "Mercado Livre",
  shopee: "Shopee",
  amazon: "Amazon",
  magalu: "Magalu",
}

export function CategoryLinkTable({ links, loading, onEdit }: Props) {
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
          gridTemplateColumns: "1.5fr 1fr 1.5fr 1fr 120px",
          gap: 12,
          padding: "14px 16px",
          background: "#F9FAFB",
          borderBottom: "1px solid #E5E7EB",
          fontWeight: 700,
        }}
      >
        <div>Categoria RP</div>
        <div>Marketplace</div>
        <div>Categoria marketplace</div>
        <div>Status</div>
        <div>Ações</div>
      </div>

      {loading ? (
        <div style={{ padding: 16 }}>Carregando vínculos...</div>
      ) : links.length === 0 ? (
        <div style={{ padding: 16 }}>Nenhum vínculo encontrado.</div>
      ) : (
        links.map((link) => (
          <div
            key={link._id}
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1.5fr 1fr 120px",
              gap: 12,
              padding: "14px 16px",
              borderBottom: "1px solid #F1F5F9",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 600 }}>{link.erpCategoryName || "-"}</div>

            <div>{marketplaceLabels[link.marketplace] || link.marketplace}</div>

            <div>{link.marketplaceCategoryName || "-"}</div>

            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "6px 10px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  background: "#DCFCE7",
                  color: "#166534",
                }}
              >
                Vinculado
              </span>
            </div>

            <div>
              <button
                onClick={() => onEdit(link)}
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
        ))
      )}
    </div>
  )
}