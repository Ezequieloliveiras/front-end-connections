import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  margin-bottom: 30px;
`

export const LinkText = styled.span`
  max-width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #334155;
`

export const TimerText = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #f97316;
`

export const CopyButton = styled.button<{ disabled?: boolean }>`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ disabled }) => (disabled ? "#94a3b8" : "#2563eb")};

  &:disabled {
    cursor: not-allowed;
  }
`
