import {
    Card,
    CardTitleRow,
    CardTop,
    CardBody,
    FieldGrid,
    Field,
    FieldLabel,
    Select,
    Input,
    CardActions,
    MarketplaceName,
    BtnGhost,
    MetaPill,
} from "./styles"

import { useToast } from "../../../Toast/Toast"
import { MARKETPLACES, STATUS_OPTIONS, Marketplace, AnnouncementStatus } from "../../constants"
import { useEffect, useMemo, useState } from "react"
import { LuSearch } from "react-icons/lu"

type MarketplaceFilter = Marketplace | "all"
type StatusFilter = AnnouncementStatus | "all"

type FiltersProps = {
    mpFilter: MarketplaceFilter
    setMpFilter: React.Dispatch<React.SetStateAction<MarketplaceFilter>>

    statusFilter: StatusFilter
    setStatusFilter: React.Dispatch<React.SetStateAction<StatusFilter>>

    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>

    filtered: unknown[] // se você tiver o tipo Announcement, troque pra Announcement[]
}

export function Filters({
    mpFilter,
    setMpFilter,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    filtered,
}: FiltersProps) {
    const { pushToast } = useToast()
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
    }, [mpFilter, statusFilter, search])

    const pageSize = 20
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))

    const pageItems = useMemo(() => {
        const start = (page - 1) * pageSize
        return filtered.slice(start, start + pageSize)
    }, [filtered, page])

    return (
        <Card>
            <CardTop>
                <CardTitleRow>
                    <MarketplaceName>
                        <LuSearch size={18} style={{ marginRight: 6 }} />
                        Filtros
                    </MarketplaceName>
                </CardTitleRow>
            </CardTop>

            <CardBody>
                <FieldGrid>
                    <Field>
                        <FieldLabel>Marketplace</FieldLabel>
                        <Select
                            value={mpFilter}
                            onChange={(e) => setMpFilter(e.target.value as MarketplaceFilter)}
                        >
                            <option value="all">Todos</option>
                            {MARKETPLACES.map((m) => (
                                <option key={m.key} value={m.key}>
                                    {m.label}
                                </option>
                            ))}
                        </Select>
                    </Field>

                    <Field>
                        <FieldLabel>Status</FieldLabel>
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                        >
                            {STATUS_OPTIONS.map((s) => (
                                <option key={s.key} value={s.key}>
                                    {s.label}
                                </option>
                            ))}
                        </Select>
                    </Field>

                    <Field>
                        <FieldLabel>Buscar (id, productId, marketplaceProductId…)</FieldLabel>
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Ex: 65f... ou ML123..."
                        />
                    </Field>
                </FieldGrid>
            </CardBody>

            <CardActions>
                <BtnGhost onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
                    ◀ Anterior
                </BtnGhost>

                <MetaPill>
                    Página {page} / {totalPages}
                </MetaPill>

                <BtnGhost onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
                    Próxima ▶
                </BtnGhost>

                <BtnGhost
                    onClick={() => {
                        setMpFilter("all")
                        setStatusFilter("all")
                        setSearch("")
                        pushToast("info", "Filtros limpos.")
                    }}
                >
                    Limpar filtros
                </BtnGhost>
            </CardActions>
        </Card>
    )
}
