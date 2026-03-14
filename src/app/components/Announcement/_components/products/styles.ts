import styled, { css } from "styled-components"

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 9999;
`

export const ModalCard = styled.div`
  width: 100%;
  max-width: 920px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
`

export const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
`

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
`

export const ModalDescription = styled.p`
  margin: 6px 0 0;
  color: #64748b;
  font-size: 14px;
`

export const ModalBody = styled.div`
  padding: 20px;
  display: grid;
  gap: 20px;
`

export const GridTwoColumns = styled.div<{ $singleColumnOnMobile?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  ${({ $singleColumnOnMobile }) =>
    $singleColumnOnMobile &&
    css`
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    `}
`

export const FieldBlock = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #0f172a;
`

const baseInput = css`
  width: 100%;
  min-height: 42px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  padding: 0 12px;
  outline: none;
  background: #fff;
  color: #0f172a;
  font-size: 14px;

  &:disabled {
    background: #f8fafc;
    color: #64748b;
    cursor: not-allowed;
  }
`

export const Input = styled.input`
  ${baseInput}
`

export const Select = styled.select`
  ${baseInput}
`

export const StatusBox = styled.div`
  padding: 14px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
`

export const StatusTitle = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
  color: #0f172a;
`

export const StatusTextSuccess = styled.div`
  color: #166534;
`

export const StatusTextDanger = styled.div`
  color: #991b1b;
`

export const EmptyBox = styled.div`
  padding: 14px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #475569;
`

export const DynamicFieldsCard = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
`

export const DynamicFieldsTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #0f172a;
`

export const DynamicFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const ModalFooter = styled.div`
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`

export const FooterLeft = styled.div`
  display: flex;
  gap: 12px;
`

export const FooterRight = styled.div`
  display: flex;
  gap: 12px;
`

const baseButton = css`
  height: 40px;
  padding: 0 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const BtnDanger = styled.button`
  ${baseButton}
  border: 1px solid #fca5a5;
  background: #fff;
  color: #b91c1c;
`

export const BtnSecondary = styled.button`
  ${baseButton}
  border: 1px solid #cbd5e1;
  background: #fff;
  color: #0f172a;
`

export const BtnPrimary = styled.button`
  ${baseButton}
  border: none;
  background: #2563eb;
  color: #fff;
`