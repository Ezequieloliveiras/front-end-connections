import styled from "styled-components";

export const Badge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  color: ${({ status }) =>
    status === "active" ? "#1a7f37" :
    status === "expired" ? "#a50f0f" :
    "#333"};
`