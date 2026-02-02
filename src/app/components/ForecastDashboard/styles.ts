import styled from "styled-components"

export const Page = styled.div`
  padding: 22px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #0f172a;
`

export const Topbar = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Title = styled.h1`
  font-size: 20px;
  letter-spacing: -0.02em;
  line-height: 1.1;
`

export const Subtitle = styled.p`
  font-size: 13px;
  color: #475569;
`

export const Filters = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  flex-wrap: wrap;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Label = styled.label`
  font-size: 12px;
  color: #64748b;
`

export const Select = styled.select`
  height: 40px;
  min-width: 220px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.10);
  background: #fff;
  outline: none;
  font-size: 14px;
  color: #0f172a;
  transition: all 0.18s;

  &:focus {
    border-color: rgba(37, 99, 235, 0.45);
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
  }
`

export const Input = styled.input`
  height: 40px;
  width: 160px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.10);
  background: #fff;
  outline: none;
  font-size: 14px;
  color: #0f172a;
  transition: all 0.18s;

  &:focus {
    border-color: rgba(37, 99, 235, 0.45);
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
  }

  &:disabled {
    cursor: not-allowed;
    background: rgba(15, 23, 42, 0.03);
  }
`

export const Button = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.10);
  background: linear-gradient(135deg, rgba(37,99,235,1), rgba(99,102,241,1));
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.12s, filter 0.18s, opacity 0.18s;
  box-shadow: 0 8px 22px rgba(2, 6, 23, 0.10);

  &:hover { filter: brightness(1.02); transform: translateY(-1px); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.65; cursor: not-allowed; }
`

export const ContentGrid = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: 1.35fr 0.65fr;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 16px;
  box-shadow: 0 14px 40px rgba(2, 6, 23, 0.06);
  overflow: hidden;
`

export const CardHeader = styled.div`
  padding: 16px 16px 12px 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`

export const CardTitle = styled.h2`
  font-size: 14px;
  font-weight: 800;
  letter-spacing: -0.02em;
`

export const CardHint = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #64748b;

  b { color: #0f172a; font-weight: 700; }
`

export const Divider = styled.div`
  height: 1px;
  background: rgba(15, 23, 42, 0.08);
`

export const KpiRow = styled.div`
  padding: 0 16px 16px 16px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 980px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`

export const KpiCard = styled.div`
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

export const KpiSub = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #64748b;
`

export const ChartWrap = styled.div`
  padding: 14px 16px 16px 16px;
`

export const BarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const BarItem = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr 64px;
  gap: 10px;
  align-items: center;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`

export const BarLabel = styled.div`
  font-size: 13px;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const BarTrack = styled.div`
  height: 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.08);
  overflow: hidden;
`

export const BarFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(37,99,235,1), rgba(99,102,241,1));
`

export const DonutWrap = styled.div`
  padding: 18px 16px 10px 16px;
  display: grid;
  place-items: center;
  position: relative;
`

export const DonutRing = styled.div<{ $percent: number }>`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: conic-gradient(
    rgba(37,99,235,1) ${({ $percent }) => Math.round($percent * 360)}deg,
    rgba(15,23,42,0.10) 0deg
  );
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 18px;
    background: #fff;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.06);
  }
`

export const DonutCenter = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  gap: 4px;
  pointer-events: none;
`

export const DonutValue = styled.div`
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.02em;
`

export const DonutLabel = styled.div`
  font-size: 12px;
  color: #64748b;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`

export const Tr = styled.tr`
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
`

export const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  color: #64748b;
  font-weight: 700;
`

export const Td = styled.td`
  padding: 12px 16px;
  color: #0f172a;
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

export const EmptyState = styled.div`
  margin-top: 14px;
  padding: 18px;
  border-radius: 16px;
  border: 1px dashed rgba(15, 23, 42, 0.18);
  background: rgba(2, 6, 23, 0.02);
  color: #475569;
  font-size: 13px;
`
