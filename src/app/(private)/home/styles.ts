import styled from "styled-components"

export const Page = styled.main`
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

export const Hero = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 14px;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`

export const HeroText = styled.div`
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  box-shadow: 0 14px 40px rgba(2, 6, 23, 0.06);
  padding: 18px;
`

export const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 900;
  color: rgba(15, 23, 42, 0.76);
  background: rgba(2, 6, 23, 0.03);
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 7px 10px;
  border-radius: 999px;
`

export const H1 = styled.h1`
  margin-top: 12px;
  font-size: 34px;
  line-height: 40px;
  letter-spacing: -0.03em;
  font-weight: 950;

  @media (max-width: 520px) {
    font-size: 28px;
    line-height: 34px;
  }
`

export const H1Accent = styled.span`
  color: #2563eb;
`

export const P = styled.p`
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: rgba(15, 23, 42, 0.72);
  max-width: 720px;
`

export const CtaRow = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

export const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
  font-weight: 900;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    filter: brightness(1.02);
  }

  &:active {
    transform: translateY(1px);
  }
`

export const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: rgba(255, 255, 255, 0.9);
  color: rgba(15, 23, 42, 0.86);
  font-weight: 900;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }

  &:active {
    transform: translateY(1px);
  }
`

export const Bullets = styled.div`
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`

export const Bullet = styled.div`
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.02),
    rgba(15, 23, 42, 0)
  );
  border-radius: 14px;
  padding: 12px;
`

export const BulletTitle = styled.div`
  font-weight: 950;
  letter-spacing: -0.02em;
`

export const BulletText = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #64748b;
  line-height: 16px;
`

export const VideoCard = styled.aside`
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  box-shadow: 0 14px 40px rgba(2, 6, 23, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const VideoHeader = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
`

export const VideoTitle = styled.div`
  font-weight: 950;
  letter-spacing: -0.02em;
`

export const VideoHint = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #64748b;
`

export const Badge = styled.span`
  font-size: 12px;
  font-weight: 900;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: rgba(2, 6, 23, 0.03);
  color: rgba(15, 23, 42, 0.78);
  white-space: nowrap;
`

export const VideoWrap = styled.div`
  padding: 16px;
`

export const VideoPlaceholder = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  border: 1px dashed rgba(15, 23, 42, 0.2);
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.02),
    rgba(15, 23, 42, 0)
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 16px;
`

export const PlayCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  box-shadow: 0 14px 24px rgba(37, 117, 252, 0.18);
  margin-bottom: 10px;
  position: relative;
`

export const VideoPlaceholderText = styled.div`
  font-weight: 950;
  letter-spacing: -0.02em;
`

export const VideoPlaceholderSub = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #64748b;
`

export const Iframe = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  border-radius: 14px;
`

export const VideoFooter = styled.div`
  margin-top: auto;
  padding: 16px;
  border-top: 1px solid rgba(15, 23, 42, 0.06);
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
`

export const SmallNote = styled.div`
  font-size: 12px;
  color: rgba(15, 23, 42, 0.72);
  line-height: 16px;
`

export const PrimaryBtnSmall = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
  font-weight: 900;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    filter: brightness(1.02);
  }

  &:active {
    transform: translateY(1px);
  }
`

export const Section = styled.section`
  margin-top: 14px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  box-shadow: 0 14px 40px rgba(2, 6, 23, 0.06);
  padding: 18px;
`

export const H2 = styled.h2`
  font-size: 16px;
  font-weight: 950;
  letter-spacing: -0.02em;
`

export const Steps = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`

export const StepCard = styled.div`
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.02),
    rgba(15, 23, 42, 0)
  );
  border-radius: 14px;
  padding: 12px;
  display: flex;
  gap: 10px;
`

export const StepNum = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: rgba(2, 6, 23, 0.06);
  border: 1px solid rgba(15, 23, 42, 0.1);
  display: grid;
  place-items: center;
  font-weight: 950;
`

export const StepTitle = styled.div`
  font-weight: 950;
  letter-spacing: -0.02em;
`

export const StepText = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #64748b;
  line-height: 16px;
`

export const Footer = styled.footer`
  margin-top: 14px;
  padding: 8px 6px 18px;
`

export const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  color: rgba(15, 23, 42, 0.65);
  font-size: 12px;
`

export const FooterBrand = styled.span`
  font-weight: 950;
  color: rgba(15, 23, 42, 0.85);
`

export const FooterText = styled.span``