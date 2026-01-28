import styled from "styled-components"

export const Card = styled.div`
margin-top: 40px;
display: flex;
flex-direction: column;
gap: 24px;
justify-content: center;
align-items: center;
padding: 32px 24px;
border-radius: 16px;
border: 1px solid #f0f0f0;
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
min-width: 600px;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const Sku = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #1747a8;
  background: #f3f4f6;
  padding: 6px 10px;
  border-radius: 999px;
`

export const MainValue = styled.div`
  margin-bottom: 24px;
`

export const Label = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
`

export const Value = styled.p`
  font-size: 36px;
  font-weight: 700;
  color: #111827;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
`

export const Metric = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
`

export const MetricLabel = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
`

export const MetricValue = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`

export const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 16px 0;
`

export const History = styled.p`
  font-size: 13px;
  color: #374151;
  line-height: 1.6;
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
`
