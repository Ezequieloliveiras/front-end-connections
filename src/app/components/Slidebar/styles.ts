import styled from "styled-components"

export const SidebarContainer = styled.div<{ $collapsed: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ $collapsed }) => ($collapsed ? "72px" : "220px")};
  background: #ffffff;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  z-index: 100;
`

export const ToggleButton = styled.button`
  margin: 16px auto;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  width: 80%;
  transition: background 0.2s;

  &:hover {
    background: #4f46e5;
  }
`

export const Menu = styled.ul`
  list-style: none;
  margin-top: 40px;
  padding: 0;
  flex: 1;
`

export const MenuItemContainer = styled.li<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f3f4f6;
  }

  svg {
    font-size: 20px;
    margin-right: ${({ $collapsed }) => ($collapsed ? "0" : "12px")};
  }

  span {
    display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
    font-size: 14px;
    color: #111827;
    font-weight: 500;
  }
`
export const LogoutContainer = styled.div<{ $collapsed: boolean }>`
  margin-top: auto;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: #ef4444;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  span {
    display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
    font-size: 14px;
    font-weight: 500;
  }

  &:hover {
    background: rgba(239, 68, 68, 0.08);
  }
`
