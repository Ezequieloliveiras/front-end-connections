import styled, { keyframes } from "styled-components"

const pulse = keyframes`
  0% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
  100% { opacity: 0.3; transform: scale(1); }
`

export const LoaderWrapper = styled.div`
  position: fixed;
  inset: 0; /* top, right, bottom, left = 0 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 9999;
`


export const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #6366f1;
  animation: ${pulse} 1.2s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.15s;
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }
`
