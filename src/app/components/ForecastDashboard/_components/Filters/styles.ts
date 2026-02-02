import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Label = styled.label`
  font-size: 12px;
  color: #64748b;
`

export const Select = styled.select`
  height: 40px;
  min-width: 220px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.10);
  background: #fff;
  outline: none;
  font-size: 14px;
  color: #0f172a;
  transition: all 0.18s;

  &:focus {
    border-color: rgba(37, 99, 235, 0.45);
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
  }
`

export const Input = styled.input`
  height: 40px;
  width: 160px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.10);
  background: #fff;
  outline: none;
  font-size: 14px;
  color: #0f172a;
  transition: all 0.18s;

  &:focus {
    border-color: rgba(37, 99, 235, 0.45);
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
  }

  &:disabled {
    cursor: not-allowed;
    background: rgba(15, 23, 42, 0.03);
  }
`

export const Button = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.10);
  background: linear-gradient(135deg, rgba(37,99,235,1), rgba(99,102,241,1));
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.12s, filter 0.18s, opacity 0.18s;
  box-shadow: 0 8px 22px rgba(2, 6, 23, 0.10);

  &:hover { filter: brightness(1.02); transform: translateY(-1px); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.65; cursor: not-allowed; }
`
