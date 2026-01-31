"use client"

import { FaHome, FaChartLine, FaCog, FaUser, FaPlug } from "react-icons/fa"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { ToggleButton, Menu, MenuItemContainer, SidebarContainer } from "./styles"


interface MenuItem {
  label: string
  icon: React.ReactNode
  path: string
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <FaHome />, path: "/home" },
  { label: "Previsões", icon: <FaChartLine />, path: "/predictions" },
  { label: "Usuários", icon: <FaUser />, path: "/users" },
  { label: "Integrações", icon: <FaPlug />, path: "/integrations" },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()

  return (
    <SidebarContainer $collapsed={collapsed}>
      <ToggleButton onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "Expand" : "Collapse"}
      </ToggleButton>
      <Menu>
        {menuItems.map((item) => (
          <MenuItemContainer
            key={item.path} // chave única
            $collapsed={collapsed}
            onClick={() => router.push(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </MenuItemContainer>
        ))}
      </Menu>
    </SidebarContainer>
  )
}
