import styled from "styled-components"

export const Page = styled.main`
  min-height: 100vh;
  padding: 18px;
  background: radial-gradient(
      1200px 600px at 10% 0%,
      rgba(37, 117, 252, 0.12),
      transparent 60%
    ),
    radial-gradient(
      900px 500px at 80% 20%,
      rgba(106, 17, 203, 0.1),
      transparent 55%
    ),
    #f8fafc;
  color: #0f172a;
`

export const Container = styled.section`
  max-width: 1100px;
  margin: 0 auto;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`

export const HeaderLeft = styled.div``

export const Title = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 950;
  letter-spacing: -0.02em;
`

export const SubTitle = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: rgba(15, 23, 42, 0.68);
`

export const MetaRow = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

export const MetaPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  color: rgba(15, 23, 42, 0.8);
  font-weight: 800;
`

export const Divider = styled.div`
  margin: 14px 0;
  height: 1px;
  background: rgba(15, 23, 42, 0.08);
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`

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

export const EmptyHint = styled.div`
  font-size: 12px;
  color: rgba(15, 23, 42, 0.65);
  line-height: 16px;
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

export const BtnPrimary = styled(Btn)`
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
  border-color: rgba(15, 23, 42, 0.08);

  &:hover {
    filter: brightness(1.02);
  }
`

export const BtnDanger = styled(Btn)`
  background: rgba(239, 68, 68, 0.12);
  color: rgba(127, 29, 29, 0.95);
`

export const BtnGhost = styled(Btn)`
  background: rgba(2, 6, 23, 0.03);
  color: rgba(15, 23, 42, 0.78);
`

/** =========================
 * Modal
========================= */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.5);
  display: grid;
  place-items: center;
  padding: 18px;
  z-index: 999;
`

export const ModalCard = styled.div`
  width: 100%;
  max-width: 720px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 18px;
  box-shadow: 0 30px 80px rgba(2, 6, 23, 0.28);
  overflow: hidden;
`

export const ModalHeader = styled.div`
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
`

export const ModalTitle = styled.div`
  font-weight: 950;
  letter-spacing: -0.02em;
`

export const ModalClose = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  font-weight: 950;

  &:active {
    transform: translateY(1px);
  }
`

export const ModalBody = styled.div`
  padding: 16px;
  display: grid;
  gap: 12px;
`

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`

export const Field = styled.div`
  display: grid;
  gap: 6px;
`

export const FieldLabel = styled.div`
  font-size: 12px;
  font-weight: 900;
  color: rgba(15, 23, 42, 0.72);
`

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 1);
  outline: none;

  &:focus {
    border-color: rgba(37, 117, 252, 0.5);
    box-shadow: 0 0 0 4px rgba(37, 117, 252, 0.14);
  }
`

export const Select = styled.select`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 1);
  outline: none;

  &:focus {
    border-color: rgba(37, 117, 252, 0.5);
    box-shadow: 0 0 0 4px rgba(37, 117, 252, 0.14);
  }
`

export const ModalFooter = styled.div`
  padding: 14px 16px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
`

/** =========================
 * Toast simples
========================= */
export const ToastArea = styled.div`
  position: fixed;
  right: 18px;
  bottom: 18px;
  display: grid;
  gap: 10px;
  z-index: 1000;
`

export const ToastItem = styled.div<{ $type: "success" | "error" | "info" }>`
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: ${({ $type }) =>
    $type === "success"
      ? "rgba(37, 117, 252, 0.2)"
      : $type === "error"
      ? "rgba(127, 29, 29, 0.2)"
      : "rgba(255, 255, 255, 0.9)"};
  color: ${({ $type }) =>
    $type === "success"
      ? "rgba(37, 117, 252, 0.9)"
      : $type === "error"
      ? "rgba(127, 29, 29, 0.9)"
      : "rgba(15, 23, 42, 0.9)"};
  box-shadow: 0 14px 40px rgba(2, 6, 23, 0.06);
  font-weight: 900;
  text-align: center;
`
