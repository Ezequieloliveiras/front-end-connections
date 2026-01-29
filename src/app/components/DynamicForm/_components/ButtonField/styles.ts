// components/DynamicForm/styles.ts
import styled from "styled-components"

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 16px;
  transition: all 0.2s;
  background: ${({ variant }) => (variant === "secondary" ? "#e5e7eb" : "#6366f1")};
  color: ${({ variant }) => (variant === "secondary" ? "#111827" : "#ffffff")};

  &:hover {
    background: ${({ variant }) => (variant === "secondary" ? "#d1d5db" : "#4f46e5")};
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;