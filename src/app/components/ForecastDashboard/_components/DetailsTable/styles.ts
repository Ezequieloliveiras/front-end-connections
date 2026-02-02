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