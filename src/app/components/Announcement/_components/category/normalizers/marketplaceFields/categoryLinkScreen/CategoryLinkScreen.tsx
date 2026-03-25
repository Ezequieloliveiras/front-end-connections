import { CategoryLinkTable } from "../../../CategoryLinkTable/CategoryLinkTable"
import { EditCategoryLinkModal } from "../../../EditCategoryLinkModal/EditCategoryLinkModal"
import { useCategoryLinkScreenStates } from "@/app/hooks/category/categoryLinkScreen/useCategoryLinkScreenStates"
import { useHandlersCategoryLinkScreen } from "@/app/hooks/category/categoryLinkScreen/useHandlersCategoryLinkScreen"

export function CategoryLinkScreen() {

  const states = useCategoryLinkScreenStates()
  const {
    links,
    loading,
    openCreate,
    selectedLink,
    setOpenCreate,
    setSelectedLink,
    fetchLinks
  } = states

  const {
    handleEdit, 
    handleCloseModal,
    handleSaved
  } = useHandlersCategoryLinkScreen({ setSelectedLink, setOpenCreate, fetchLinks })

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