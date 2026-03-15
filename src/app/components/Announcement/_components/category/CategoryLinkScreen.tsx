import { useEffect, useState } from "react"
import { api } from "@/app/services/api"
import { useToast } from "@/app/components/Toast/Toast"
import { CategoryLinkTable } from "./CategoryLinkTable"
import { EditCategoryLinkModal } from "./EditCategoryLinkModal"

export type MarketplaceKey =
  | "mercado_livre"
  | "shopee"
  | "amazon"
  | "magalu"

export type CategoryLinkItem = {
  _id: string
  erpCategoryId: string
  erpCategoryName: string
  marketplace: MarketplaceKey
  marketplaceCategoryId: string
  marketplaceCategoryName: string
}

export function CategoryLinkScreen() {
  const { pushToast } = useToast()

  const [links, setLinks] = useState<CategoryLinkItem[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedLink, setSelectedLink] = useState<CategoryLinkItem | null>(null)
  const [openCreate, setOpenCreate] = useState(false)

  const fetchLinks = async () => {
    try {
      setLoading(true)

      const { data } = await api.get<CategoryLinkItem[]>("/category/links")

      setLinks(Array.isArray(data) ? data : [])
    } catch (err: any) {
      console.error(err)
      pushToast(
        "error",
        err?.response?.data?.message || "Erro ao listar vínculos de categoria."
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const handleEdit = (link: CategoryLinkItem) => {
    setSelectedLink(link)
  }

  const handleCloseModal = () => {
    setSelectedLink(null)
    setOpenCreate(false)
  }

  const handleSaved = async () => {
    await fetchLinks()
    handleCloseModal()
  }

  return (
    <>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => setOpenCreate(true)}
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
          + Novo vínculo
        </button>
      </div>

      <CategoryLinkTable
        links={links}
        loading={loading}
        onEdit={handleEdit}
      />

      {(selectedLink || openCreate) && (
        <EditCategoryLinkModal
          link={selectedLink}
          onClose={handleCloseModal}
          onSaved={handleSaved}
        />
      )}
    </>
  )
}