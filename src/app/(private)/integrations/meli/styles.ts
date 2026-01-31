import styled from "styled-components"

export const Page = styled.div`
  padding: 32px;
  max-width: 1200px;
`

export const Header = styled.div`
  margin-bottom: 32px;
`

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
`

export const Subtitle = styled.p`
  margin-top: 6px;
  color: #6b7280;
`

export const Section = styled.section`
  h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
`

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease;

  &:hover {
    border-color: #6366f1;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }

  &[aria-disabled="true"] {
    opacity: 0.5;
    pointer-events: none;
  }
`

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
`

export const CardDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
`

export const CardFooter = styled.div`
  margin-top: 20px;
`

export const ActionButton = styled.button`
  width: 100%;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background: #6366f1;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #4f46e5;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`
