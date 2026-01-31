import styled from "styled-components"

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "token"
}>`
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 16px;
  transition: all 0.2s;

  background: ${({ variant }) => {
    switch (variant) {
      case "secondary":
        return "#e5e7eb"
      case "token":
        return "#16a34a" // verde
      default:
        return "#6366f1"
    }
  }};

  color: ${({ variant }) =>
    variant === "secondary" ? "#111827" : "#ffffff"};

  &:hover {
    background: ${({ variant }) => {
      switch (variant) {
        case "secondary":
          return "#d1d5db"
        case "token":
          return "#15803d"
        default:
          return "#4f46e5"
      }
    }};
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`