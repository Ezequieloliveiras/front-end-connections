"use client"

import { FaHome, FaChartLine, FaCog, FaUser } from "react-icons/fa"
import { useState } from "react"

import { ToggleButton, Menu, MenuItemContainer, SidebarContainer } from "./styles"


interface MenuItem {
  label: string
  icon: React.ReactNode
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <FaHome /> },
  { label: "Previsões", icon: <FaChartLine /> },
  { label: "Usuários", icon: <FaUser /> },
  { label: "Configurações", icon: <FaCog /> },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <SidebarContainer collapsed={collapsed}>
      <ToggleButton onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "Expand" : "Collapse"}
      </ToggleButton>
      <Menu>
        {menuItems.map((item) => (
          <MenuItemContainer key={item.label} $collapsed={collapsed}>
            {item.icon}
            <span>{item.label}</span>
          </MenuItemContainer>
        ))}
      </Menu>
    </SidebarContainer>
  )
}
