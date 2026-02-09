import styled from "styled-components"

/* ===================== PAGE / BACKDROP ===================== */

export const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 34px 18px;
  background:
    radial-gradient(900px 520px at 15% 10%, rgba(37,99,235,.12), transparent 60%),
    radial-gradient(900px 520px at 85% 15%, rgba(14,165,233,.10), transparent 62%),
    linear-gradient(180deg, #F8FAFF, #F5F7FC);
  color: var(--text);
`

export const Bg = styled.div`
  width: min(1200px, 96vw);
  min-height: min(780px, 92vh);
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid rgba(15,23,42,.08);
  background: rgba(255,255,255,.70);
  backdrop-filter: blur(14px);
  box-shadow:
    0 30px 90px rgba(15,23,42,0.12),
    0 1px 0 rgba(255,255,255,0.75) inset;

  &::before{
    content:"";
    position:absolute;
    inset:-1px;
    pointer-events:none;
    background:
      radial-gradient(800px 240px at 65% 0%, rgba(37,99,235,.10), transparent 60%),
      radial-gradient(800px 240px at 10% 0%, rgba(14,165,233,.08), transparent 60%);
    opacity: .95;
  }
`

export const GlowA = styled.div`
  position: absolute;
  inset: -45%;
  background: radial-gradient(circle at 20% 20%, rgba(37,99,235,.10), transparent 55%);
  filter: blur(34px);
  pointer-events: none;
  opacity: .85;
`

export const GlowB = styled.div`
  position: absolute;
  inset: -45%;
  background: radial-gradient(circle at 80% 10%, rgba(14,165,233,.08), transparent 58%);
  filter: blur(38px);
  pointer-events: none;
  opacity: .85;
`

export const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 44px;
  padding: 44px;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 22px;
  }
`

/* ===================== LEFT ===================== */

export const Left = styled.div`
  padding: 28px;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(15,23,42,.08);
  box-shadow: 0 18px 50px rgba(15,23,42,0.06);
  backdrop-filter: blur(10px);

  @media (max-width: 980px) {
    display: none;
  }
`

export const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const LogoMark = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(37,99,235,0.95), rgba(14,165,233,0.92));
  box-shadow: 0 14px 30px rgba(37,99,235,0.16);
`

export const BrandText = styled.div`
  display: grid;
  gap: 2px;
`

export const BrandName = styled.div`
  font-weight: 800;
  letter-spacing: -0.02em;
  font-size: 15px;
  color: var(--text);
`

export const BrandTag = styled.div`
  font-size: 12px;
  color: var(--muted);
`

export const Hero = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 12px;
`

export const HeroTitle = styled.h1`
  margin: 0;
  font-size: 40px;
  line-height: 1.05;
  letter-spacing: -0.045em;
  color: var(--text);
`

export const HeroSub = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.75;
  color: var(--muted);
  max-width: 60ch;
`

export const Pills = styled.div`
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(15,23,42,.74);
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid rgba(15,23,42,.10);
  background: rgba(255,255,255,.82);
  box-shadow: 0 8px 18px rgba(15,23,42,.04);

  svg { opacity: .9; }
`

export const MarketplacePanel = styled.div`
  margin-top: 22px;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(15,23,42,.08);
  background: rgba(255,255,255,.66);
`

export const PanelTitle = styled.div`
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--text);
`

export const PanelSub = styled.div`
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--muted);
`

export const MarketIcons = styled.div`
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
`

export const MarketIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255,255,255,.92);
  border: 1px solid rgba(15,23,42,.08);
  color: rgba(15,23,42,.72);
  transition: transform 140ms ease, box-shadow 180ms ease, border-color 180ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(37,99,235,.18);
    box-shadow: 0 12px 24px rgba(15,23,42,.06);
  }

  span {
    font-size: 13px;
    color: rgba(15,23,42,.78);
  }

  svg { opacity: .9; }
`

export const MiniStats = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
`

export const Stat = styled.div`
  padding: 14px;
  border-radius: 16px;
  background: rgba(255,255,255,.92);
  border: 1px solid rgba(15,23,42,.08);
`

export const StatTop = styled.div`
  font-size: 12px;
  color: var(--muted2);
`

export const StatValue = styled.div`
  margin-top: 6px;
  font-size: 16px;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--text);
`

export const StatHint = styled.div`
  margin-top: 3px;
  font-size: 12px;
  color: var(--muted);
`

export const FooterNote = styled.div`
  margin-top: 18px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 12px;
  line-height: 1.55;
  color: var(--muted);
`

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 99px;
  margin-top: 7px;
  background: rgba(37,99,235,.90);
  box-shadow: 0 0 0 4px rgba(37,99,235,.16);
`

/* ===================== RIGHT ===================== */

export const Right = styled.div`
  display: grid;
  align-content: start;
  gap: 16px;
  padding-top: 10px;

  @media (max-width: 980px) {
    padding-top: 0;
  }
`

export const Card = styled.div`
  position: relative;
  padding: 28px;
  border-radius: 24px;
  background: rgba(255,255,255,.92);
  border: 1px solid rgba(15,23,42,.10);
  box-shadow:
    0 30px 70px rgba(15,23,42,.12),
    0 1px 0 rgba(255,255,255,0.85) inset;
`

export const CardGlow = styled.div`
  position: absolute;
  inset: -1px;
  border-radius: 24px;
  pointer-events: none;
  background: radial-gradient(800px 240px at 30% 0%, rgba(37,99,235,.10), transparent 60%);
  mask: linear-gradient(#000, transparent 70%);
`

export const CardHeader = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 18px;
`

export const CardEyebrow = styled.div`
  font-size: 12px;
  color: var(--muted2);
`

export const CardTitle = styled.div`
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -0.035em;
  color: var(--text);
`

export const CardSub = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: var(--muted);
`

export const FormSlot = styled.div`
  margin-top: 4px;
`

export const Form = styled.form`
  display: grid;
  gap: 14px;
`

export const Field = styled.div`
  display: grid;
  gap: 8px;
`

export const Label = styled.div`
  font-size: 12px;
  color: var(--muted2);
`

export const InputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 14px;
  padding: 13px 14px;
  background: rgba(255,255,255,.97);
  border: 1px solid rgba(15,23,42,.10);
  transition: 180ms ease;

  &:hover {
    border-color: rgba(37,99,235,.18);
  }

  &:focus-within {
    border-color: rgba(37,99,235,.40);
    box-shadow: 0 0 0 4px var(--ring);
  }
`

export const Icon = styled.div`
  color: rgba(15,23,42,.45);
  display: grid;
  place-items: center;
`

export const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text);
  font-size: 14px;

  &::placeholder {
    color: rgba(15,23,42,.35);
  }
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 4px;

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const Remember = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--muted);

  input {
    width: 14px;
    height: 14px;
    accent-color: var(--primary);
  }
`

export const LinkBtn = styled.button`
  border: none;
  background: transparent;
  color: var(--primary);
  font-size: 12px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const PrimaryBtn = styled.button`
  margin-top: 6px;
  width: 100%;
  border: none;
  cursor: pointer;
  padding: 12px 14px;
  border-radius: 14px;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--primary2));
  box-shadow: 0 16px 34px rgba(37,99,235,0.18);
  transition: transform 120ms ease, box-shadow 180ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 38px rgba(37,99,235,0.22);
  }

  &:active {
    transform: translateY(0px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const Divider = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  margin: 12px 0 6px;

  span {
    font-size: 12px;
    color: rgba(15,23,42,.45);
    padding: 0 10px;
    background: rgba(255,255,255,.92);
    z-index: 1;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(15,23,42,.10);
  }
`

export const SecondaryBtn = styled.button`
  width: 100%;
  border-radius: 14px;
  padding: 12px 14px;
  cursor: pointer;
  background: rgba(255,255,255,.90);
  border: 1px solid rgba(15,23,42,.10);
  color: rgba(15,23,42,.82);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    border-color: rgba(37,99,235,.22);
    box-shadow: 0 0 0 4px rgba(37,99,235,.08);
  }
`

export const Badge = styled.span`
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(37,99,235,.08);
  border: 1px solid rgba(37,99,235,.16);
  color: rgba(15,23,42,.70);
`

export const BottomText = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: var(--muted);
  text-align: center;

  a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 900;
  }
  a:hover { text-decoration: underline; }
`

export const ErrorBox = styled.div`
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(239, 68, 68, 0.22);
  background: rgba(239, 68, 68, 0.08);
  color: rgba(127, 29, 29, 0.95);
  font-size: 12px;
`

export const RightHint = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(15,23,42,.08);
  background: rgba(255,255,255,.74);
  color: var(--muted);
  font-size: 12px;
  line-height: 1.45;
`

export const HintIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(37,99,235,.10);
  border: 1px solid rgba(37,99,235,.16);
`
