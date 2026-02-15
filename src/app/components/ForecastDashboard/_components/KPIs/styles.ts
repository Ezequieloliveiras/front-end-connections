import styled from "styled-components"

export const Card = styled.div`
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 16px;
  box-shadow: 0 14px 40px rgba(2, 6, 23, 0.06);
  overflow: hidden;
`

export const KpiRow = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`

export const KpiCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(180deg, rgba(15,23,42,0.02), rgba(15,23,42,0.00));
  border-radius: 14px;
  padding: 12px;
`

export const KpiLabel = styled.div`
  font-size: 12px;
  color: #64748b;
`

export const KpiValue = styled.div`
  margin-top: 8px;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.02em;
`

export const Badge = styled.span<{ $tone?: "good" | "bad" | "neutral" }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid rgba(15, 23, 42, 0.10);

  ${({ $tone }) => {
    if ($tone === "good") return `
      background: rgba(34,197,94,0.10);
      color: rgba(22,101,52,1);
    `
    if ($tone === "bad") return `
      background: rgba(239,68,68,0.10);
      color: rgba(153,27,27,1);
    `
    return `
      background: rgba(2,6,23,0.03);
      color: rgba(15,23,42,0.75);
    `
  }}
`