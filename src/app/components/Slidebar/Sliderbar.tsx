"use client"

import { FaHome, FaChartLine, FaCog, FaUser, FaPlug, FaSignOutAlt } from "react-icons/fa"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { ToggleButton, Menu, MenuItemContainer, SidebarContainer, LogoutContainer } from "./styles"
import { logout } from "@/app/services/login/login.service"
import { api } from "@/app/services/api"


interface MenuItem {
  label: string
  icon: React.ReactNode
  path: string
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <FaHome />, path: "/home" },
  { label: "Previsões", icon: <FaChartLine />, path: "/prediction" },
  { label: "Usuários", icon: <FaUser />, path: "/users" },
  { label: "Integrações", icon: <FaPlug />, path: "/integrations" },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    try {
      await api.post('/auth/logout')
      window.location.href = '/login'
    } catch {
      router.push("/login")
    }
  }

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
      <LogoutContainer
        $collapsed={collapsed}
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        <span>Sair</span>
      </LogoutContainer>
    </SidebarContainer>
  )
}
