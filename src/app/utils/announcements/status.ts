type AnnouncementStatus = "active" | "paused" | "inactive" | "draft" | "error"

export const STATUS_LABEL: Record<AnnouncementStatus, string> = {
  active: "Publicado",
  paused: "Pausado",
  inactive: "Não publicado",
  draft: "Rascunho",
  error: "Erro",
}

export function statusLabel(status: AnnouncementStatus) {
  return STATUS_LABEL[status] ?? status
}
