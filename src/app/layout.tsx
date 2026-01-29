"use client"

import StyledComponentsRegistry from "@/lib/registry"
import { FormProvider } from "@/app/contexts/FormContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <FormProvider>
            {children}
          </FormProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
