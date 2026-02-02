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
