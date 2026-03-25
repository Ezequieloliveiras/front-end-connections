import { useState } from "react"
import { BtnPrimary } from "../styles"
import { CreateAnnouncementModal } from "./CreateAnnouncementModal"
import { CreateAnnouncementBarProps } from "./types"

export function CreateAnnouncementBar({ productId, setAnnouncements }: CreateAnnouncementBarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div style={{ marginTop: 16, marginBottom: 16, display: "flex", justifyContent: "flex-end" }}>
        <BtnPrimary onClick={() => setOpen(true)}>+ Criar anúncio</BtnPrimary>
      </div>

      {open && (
        <CreateAnnouncementModal
          productId={productId}
          closeModal={() => setOpen(false)}
          setAnnouncements={setAnnouncements}
        />
      )}
    </>
  )
}