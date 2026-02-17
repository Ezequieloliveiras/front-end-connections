import styled from "styled-components"

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 16px;
  box-shadow: 0 14px 40px rgba(2, 6, 23, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const CardTop = styled.div`
  padding: 14px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
`

export const CardTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`

export const MarketplaceName = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 950;
  letter-spacing: -0.02em;
`

export const CardBody = styled.div`
  padding: 14px;
  display: grid;
  gap: 10px;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`

export const Label = styled.div`
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
  font-weight: 800;
`

export const Value = styled.div`
  font-size: 12px;
  color: rgba(15, 23, 42, 0.88);
  font-weight: 900;
`