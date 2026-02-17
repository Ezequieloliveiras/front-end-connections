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
    MetaPill
} from "./styles"

import { useToast } from "../../../Toast/Toast"

export function Filters({ MARKETPLACES, STATUS_OPTIONS, page, setPage, totalPages, mpFilter, setMpFilter, statusFilter, setStatusFilter, search, setSearch }: any) {
    const { pushToast } = useToast()

    return (
        <Card>
            <CardTop>
                <CardTitleRow>
                    <MarketplaceName>🔎 Filtros</MarketplaceName>
                </CardTitleRow>
            </CardTop>

            <CardBody>
                <FieldGrid>
                    <Field>
                        <FieldLabel>Marketplace</FieldLabel>
                        <Select value={mpFilter} onChange={(e) => setMpFilter(e.target.value as any)}>
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
                        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
                            {STATUS_OPTIONS.map((s) => (
                                <option key={s.key} value={s.key}>
                                    {s.label}
                                </option>
                            ))}
                        </Select>
                    </Field>

                    <Field>
                        <FieldLabel>Buscar (id, productId, marketplaceProductId…)</FieldLabel>
                        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ex: 65f... ou ML123..." />
                    </Field>
                </FieldGrid>
            </CardBody>

            <CardActions>
                <BtnGhost
                    onClick={() => {
                        setPage((p) => Math.max(1, p - 1))
                    }}
                    disabled={page <= 1}
                >
                    ◀ Anterior
                </BtnGhost>

                <MetaPill>
                    Página {page} / {totalPages}
                </MetaPill>

                <BtnGhost
                    onClick={() => {
                        setPage((p) => Math.min(totalPages, p + 1))
                    }}
                    disabled={page >= totalPages}
                >
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