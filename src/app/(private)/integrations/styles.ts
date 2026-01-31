import Link from "next/link"
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
  color: #6b7280;
  margin-top: 6px;
`

export const IntegrationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`

export const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`

export const IntegrationCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.25s ease;
  

  &:hover {
    transform: translateY(-3px);
    border-color: #6366f1;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }

  &[aria-disabled="true"] {
    opacity: 0.45;
    pointer-events: none;
  }
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`

export const CardIcon = styled.div`
  font-size: 22px;
`

export const StatusBadge = styled.span<{
  $active?: boolean
  $disabled?: boolean
}>`
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 600;

  ${({ $active }) =>
    $active &&
    `
    background: #e0e7ff;
    color: #4338ca;
  `}

  ${({ $disabled }) =>
    $disabled &&
    `
    background: #f3f4f6;
    color: #6b7280;
  `}

  ${({ $active, $disabled }) =>
    !$active &&
    !$disabled &&
    `
    background: #fef3c7;
    color: #92400e;
  `}
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

export const ActionText = styled.span<{ disabled?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ disabled }) => (disabled ? "#9ca3af" : "#6366f1")};
`
