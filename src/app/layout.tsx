"use client"

import StyledComponentsRegistry from "@/lib/registry"
import { FormProvider } from "@/app/contexts/FormContext"
import { GlobalStyle } from "./styles/global" // ajuste o caminho

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <FormProvider>{children}</FormProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
