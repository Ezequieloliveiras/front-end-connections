import styled from "styled-components"
import { ToastType } from "./Toast"

export const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
`

export const ToastItem = styled.div<{ $type: ToastType }>`
  min-width: 240px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  background: ${({ $type }) => {
    switch ($type) {
      case "success":
        return "#16a34a"
      case "error":
        return "#dc2626"
      case "warning":
        return "#f59e0b"
      case "info":
      default:
        return "#2563eb"
    }
  }};
`
