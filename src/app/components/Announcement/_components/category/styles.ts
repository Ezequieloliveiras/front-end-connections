import styled from "styled-components"

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 9999;
`

export const ModalScroll = styled.div`
  width: 100%;
  max-width: 720px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  max-height: 900px;
  overflow-y: auto;
`

export const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
`

export const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`

export const Subtitle = styled.div`
  margin-top: 6px;
  color: #64748b;
`

export const Content = styled.div`
  padding: 20px;
  display: grid;
  gap: 20px;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
`

export const InputField = styled.input`
  width: 100%;
  height: 42px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  padding: 0 12px;
  outline: none;
  background: #fff;
`

export const SelectField = styled.select`
  width: 100%;
  height: 42px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  padding: 0 12px;
  outline: none;
  background: #fff;
`

export const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 72px 1fr;
  gap: 16px;
  align-items: end;
`

export const LinkIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
`

export const LinkIconCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #86efac;
  background: #f0fdf4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`

export const ConfigCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
`

export const ConfigToggleButton = styled.button`
  width: 100%;
  min-height: 52px;
  border: none;
  background: #f8fafc;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
`

export const ToggleIcon = styled.span`
  font-size: 18px;
`

export const ConfigBody = styled.div`
  padding: 16px;
  display: grid;
  gap: 20px;
  border-top: 1px solid #e5e7eb;
`

export const SectionTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 10px;
  color: #0f172a;
`

export const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
`

export const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: #fff;
  font-size: 14px;
`

export const CheckboxItemRequired = styled(CheckboxItem)`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
`

export const RequiredMark = styled.span`
  color: #dc2626;
`

export const MutedText = styled.div`
  color: #64748b;
`

export const ActionsRight = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const SaveFieldConfigButton = styled.button`
  height: 40px;
  padding: 0 16px;
  border-radius: 8px;
  border: none;
  background: #0f172a;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
`

export const Footer = styled.div`
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`

export const FooterActions = styled.div`
  display: flex;
  gap: 12px;
`

export const RemoveButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid #fca5a5;
  background: #fff;
  color: #b91c1c;
  cursor: pointer;
  font-weight: 600;
`

export const CancelButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: #fff;
  cursor: pointer;
  font-weight: 600;
`

export const SaveButton = styled.button`
  height: 40px;
  padding: 0 16px;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
`