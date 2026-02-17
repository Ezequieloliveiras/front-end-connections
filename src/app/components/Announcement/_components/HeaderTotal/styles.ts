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

export const StatusBadge = styled.span<{ $status: string }>`
  font-size: 12px;
  font-weight: 900;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  white-space: nowrap;

  background: ${({ $status }) =>
    $status === "active"
      ? "rgba(16,185,129,0.12)"
      : $status === "paused"
        ? "rgba(245,158,11,0.14)"
        : $status === "draft"
          ? "rgba(59,130,246,0.12)"
          : $status === "error"
            ? "rgba(239,68,68,0.14)"
            : "rgba(2,6,23,0.05)"};

  color: ${({ $status }) =>
    $status === "active"
      ? "rgba(6,95,70,0.95)"
      : $status === "paused"
        ? "rgba(146,64,14,0.95)"
        : $status === "draft"
          ? "rgba(30,64,175,0.95)"
          : $status === "error"
            ? "rgba(127,29,29,0.95)"
            : "rgba(15,23,42,0.75)"};
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

export const CardActions = styled.div`
  padding: 14px;
  border-top: 1px solid rgba(15, 23, 42, 0.06);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`

export const Btn = styled.button`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.9);
  color: rgba(15, 23, 42, 0.88);
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
  &:active {
    transform: translateY(1px);
  }
`

export const BtnGhost = styled(Btn)`
  background: rgba(2, 6, 23, 0.03);
  color: rgba(15, 23, 42, 0.78);
`