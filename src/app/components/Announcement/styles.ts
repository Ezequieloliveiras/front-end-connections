import styled from "styled-components"

export const Page = styled.main`
  min-height: 100vh;
  padding: 18px;
  background: radial-gradient(
      1200px 600px at 10% 0%,
      rgba(37, 117, 252, 0.12),
      transparent 60%
    ),
    radial-gradient(
      900px 500px at 80% 20%,
      rgba(106, 17, 203, 0.1),
      transparent 55%
    ),
    #f8fafc;
  color: #0f172a;
`

export const Container = styled.section`
  max-width: 1100px;
  margin: 0 auto;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`

export const HeaderLeft = styled.div``

export const Title = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 950;
  letter-spacing: -0.02em;
`

export const SubTitle = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: rgba(15, 23, 42, 0.68);
`

export const MetaRow = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

export const MetaPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  color: rgba(15, 23, 42, 0.8);
  font-weight: 800;
`

export const Divider = styled.div`
  margin: 14px 0;
  height: 1px;
  background: rgba(15, 23, 42, 0.08);
`

export const EmptyHint = styled.div`
  font-size: 12px;
  color: rgba(15, 23, 42, 0.65);
  line-height: 16px;
`