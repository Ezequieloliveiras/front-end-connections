export function formatBRL(value: number) {
    try {
        return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    } catch {
        return `R$ ${value}`
    }
}
