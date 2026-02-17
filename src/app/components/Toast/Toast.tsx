'use client'
import{ createContext, useContext, useState, ReactNode } from "react"
import { ToastContainer, ToastItem } from "./styles"

export type ToastType = "success" | "error" | "info" | "warning"

export type Toast = {
  id: string
  type: ToastType
  message: string
}

type ToastContextType = {
  pushToast: (type: ToastType, message: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used inside ToastProvider")
  return ctx
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toastList, setToastList] = useState<Toast[]>([])

  const pushToast = (type: ToastType, message: string) => {
    const id = String(Date.now() + Math.random())

    setToastList((prev) => [{ id, type, message }, ...prev].slice(0, 3))

    setTimeout(() => {
      setToastList((prev) => prev.filter((t) => t.id !== id))
    }, 2500)
  }

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <ToastContainer>
        {toastList.map((t) => (
          <ToastItem key={t.id} $type={t.type}>
            {t.message}
          </ToastItem>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  )
}
