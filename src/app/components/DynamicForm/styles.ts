import styled from "styled-components"

export const Container = styled.div`
  padding: 32px 32px;
  max-width: 650px;
  margin: 0 auto;

  max-height: calc(100vh - 120px); /* não estoura a tela */
  overflow-y: auto;

  font-family: "Inter", sans-serif;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  /* scroll moderno */
  scrollbar-width: thin;
  scrollbar-color: #c7d2fe transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c7d2fe;
    border-radius: 999px;
  }
`

export const FieldGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  label {
    font-size: 14px;
    color: #374151;
    margin-bottom: 6px;
    font-weight: 500;
  }

  input,
  textarea {
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;

    &:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    }
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }
`
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
`