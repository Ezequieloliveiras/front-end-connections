import styled from "styled-components"

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