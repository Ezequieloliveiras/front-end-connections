'use client'

import { useState } from "react"
import { generateToken } from "./auth"

export default function MeliSettings() {
  const [clientId, setClientId] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const [redirectUri, setRedirectUri] = useState("")
  const [authCode, setAuthCode] = useState("")
  const [status, setStatus] = useState("")

  const handleGenerate = async () => {
    try {
      setStatus("Gerando token...")
      await generateToken({
        clientId,
        clientSecret,
        code: authCode,
        redirectUri,
      })
      setStatus("Sucesso!")
    } catch {
      setStatus("Erro")
    }
  }

  return (
    <>
      <h2>Configuração Mercado Livre</h2>
      {/* seus inputs */}
      <button onClick={handleGenerate}>Gerar Token</button>
      <p>{status}</p>
    </>
  )
}
