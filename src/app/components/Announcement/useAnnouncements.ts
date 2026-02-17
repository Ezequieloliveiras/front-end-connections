import { useMemo } from "react"
// import { Announcement, Marketplace, AnnouncementStatus } from "./types"
type Marketplace = "mercado_livre" | "shopee" | "magalu"
type AnnouncementStatus = "active" | "paused" | "inactive" | "draft" | "error"

type Announcement = {
    _id?: string
    entityId: string
    productId?: string
    marketplace: Marketplace
    marketplaceProductId?: string
    price: number
    stock: number
    status: AnnouncementStatus
    lastSyncAt?: string
    syncError?: string | null
    config?: Record<string, any>
    createdAt?: string
    updatedAt?: string
}

export function useAnnouncementsView(
  announcements: Announcement[],
  mpFilter: Marketplace | "all",
  statusFilter: AnnouncementStatus | "all",
  search: string
) {

  const summaryByMarketplace = useMemo(() => {
    const base: Record<
      Marketplace,
      { total: number; counts: Record<AnnouncementStatus, number> }
    > = {
      mercado_livre: { total: 0, counts: { active: 0, paused: 0, inactive: 0, draft: 0, error: 0 } },
      shopee: { total: 0, counts: { active: 0, paused: 0, inactive: 0, draft: 0, error: 0 } },
      magalu: { total: 0, counts: { active: 0, paused: 0, inactive: 0, draft: 0, error: 0 } },
    }

    for (const a of announcements) {
      const mp = a.marketplace
      base[mp].total += 1
      base[mp].counts[a.status] = (base[mp].counts[a.status] ?? 0) + 1
    }

    return base
  }, [announcements])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()

    const items = announcements.filter((a) => {
      if (mpFilter !== "all" && a.marketplace !== mpFilter) return false
      if (statusFilter !== "all" && a.status !== statusFilter) return false

      if (!q) return true

      const hay = [
        a._id,
        a.marketplaceProductId,
        a.productId,
        a.entityId,
        a.status,
        a.marketplace,
        String(a.price),
        String(a.stock),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()

      return hay.includes(q)
    })

    const scoreStatus = (s: AnnouncementStatus) =>
      s === "error" ? 0 :
      s === "draft" ? 1 :
      s === "inactive" ? 2 :
      s === "paused" ? 3 : 4

    items.sort((a, b) => {
      const sa = scoreStatus(a.status)
      const sb = scoreStatus(b.status)
      if (sa !== sb) return sa - sb

      const da = new Date(a.updatedAt ?? a.createdAt ?? 0).getTime()
      const db = new Date(b.updatedAt ?? b.createdAt ?? 0).getTime()
      return db - da
    })

    return items
  }, [announcements, mpFilter, statusFilter, search])

  return {
    summaryByMarketplace,
    filtered,
  }
}
