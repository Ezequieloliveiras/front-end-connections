import styled from "styled-components"

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

export const Badge = styled.span<{ $tone?: "good" | "bad" | "neutral" | "stable" }>`
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