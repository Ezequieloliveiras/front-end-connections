import { PeriodPreset, ProductOption } from "../../types"
import { Container, Field, Label, Select, Input, Button } from "./styles"

interface Props {
  products: ProductOption[]
  productId: string
  period: PeriodPreset
  customDays: string
  loading: boolean
  onProductChange: (id: string) => void
  onPeriodChange: (p: PeriodPreset) => void
  onCustomDaysChange: (v: string) => void
  onSubmit: () => void
}

export function Filters({
  products,
  productId,
  period,
  customDays,
  loading,
  onProductChange,
  onPeriodChange,
  onCustomDaysChange,
  onSubmit,
}: Props) {
  return (
    <Container>
      <Field>
        <Label>Produto</Label>
        <Select value={productId} onChange={e => onProductChange(e.target.value)}>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </Select>
      </Field>

      <Field>
        <Label>Período</Label>
        <Select value={period} onChange={e => onPeriodChange(e.target.value as PeriodPreset)}>
          <option value="7">7 dias</option>
          <option value="30">30 dias</option>
          <option value="90">90 dias</option>
          <option value="custom">Personalizado</option>
        </Select>
      </Field>

      <Field>
        <Label>Dias</Label>
        <Input
          disabled={period !== "custom"}
          value={customDays}
          onChange={e => onCustomDaysChange(e.target.value.replace(/\D/g, ""))}
        />
      </Field>

      <Button onClick={onSubmit} disabled={loading}>
        {loading ? "Carregando..." : "Atualizar"}
      </Button>
    </Container>
  )
}
