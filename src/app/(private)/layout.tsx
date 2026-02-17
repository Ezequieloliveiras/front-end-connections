import Sidebar from "@/app/components/Slidebar/Sliderbar"
import { GlobalStyle } from "../styles/global"
import { ToastProvider } from "../components/Toast/Toast"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyle />

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <div style={{ width: 260, flexShrink: 0 }}>
          <Sidebar />
        </div>

        {/* Conteúdo */}
        <main style={{ flex: 1, padding: 24 }}>
         <ToastProvider> {children}</ToastProvider>
        </main>
      </div>
    </>
  )
}
