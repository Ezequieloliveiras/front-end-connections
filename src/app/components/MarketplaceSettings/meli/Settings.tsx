// 'use client'

// import { useState } from "react"
// import axios from "axios"

// import { Container, Title, FieldGroup, Button, Status } from "./styles"

// export default function MeliSettings() {
//   const [clientId, setClientId] = useState("8913040778729826") // seu client_id
//   const [clientSecret, setClientSecret] = useState("jYouwNRbBg2NYGSFm4DlRojfy7CfTXCh") // seu client_secret
//   const [redirectUri, setRedirectUri] = useState("https://treonengenharia.com.br")
//   const [authCode, setAuthCode] = useState("")
//   const [accessToken, setAccessToken] = useState("")
//   const [refreshToken, setRefreshToken] = useState("")
//   const [expiresIn, setExpiresIn] = useState(0)
//   const [status, setStatus] = useState("")

//   // 1️⃣ Abrir link de autorização
//   const handleAuthorize = () => {
//     const url = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`
//     window.open(url, "_blank")
//   }

//   // 2️⃣ Gerar Access Token usando o authCode
//   const handleGenerateToken = async () => {
//     if (!authCode) return alert("Coloque o Authorization Code")
//     try {
//       setStatus("Gerando token...")
//       const params = new URLSearchParams()
//       params.append("grant_type", "authorization_code")
//       params.append("client_id", clientId)
//       params.append("client_secret", clientSecret)
//       params.append("code", authCode)
//       params.append("redirect_uri", redirectUri)

//       const res = await axios.post("https://api.mercadolibre.com/oauth/token", params)
//       setAccessToken(res.data.access_token)
//       setRefreshToken(res.data.refresh_token)
//       setExpiresIn(res.data.expires_in)
//       setStatus("Token gerado com sucesso!")
//     } catch (err: any) {
//       console.error(err.response?.data || err.message)
//       setStatus("Erro ao gerar token")
//     }
//   }

//   // 3️⃣ Renovar Access Token usando refresh token
//   const handleRefreshToken = async () => {
//     if (!refreshToken) return alert("Não há refresh token")
//     try {
//       setStatus("Renovando token...")
//       const params = new URLSearchParams()
//       params.append("grant_type", "refresh_token")
//       params.append("client_id", clientId)
//       params.append("client_secret", clientSecret)
//       params.append("refresh_token", refreshToken)

//       const res = await axios.post("https://api.mercadolibre.com/oauth/token", params)
//       setAccessToken(res.data.access_token)
//       setRefreshToken(res.data.refresh_token)
//       setExpiresIn(res.data.expires_in)
//       setStatus("Token renovado com sucesso!")
//     } catch (err: any) {
//       console.error(err.response?.data || err.message)
//       setStatus("Erro ao renovar token")
//     }
//   }

// return (
//     <Container>
//       <Title>Configuração Mercado Livre</Title>

//       <FieldGroup>
//         <label>Client ID:</label>
//         <input value={clientId} onChange={e => setClientId(e.target.value)} />
//       </FieldGroup>

//       <FieldGroup>
//         <label>Client Secret:</label>
//         <input value={clientSecret} onChange={e => setClientSecret(e.target.value)} />
//       </FieldGroup>

//       <FieldGroup>
//         <label>Redirect URI:</label>
//         <input value={redirectUri} onChange={e => setRedirectUri(e.target.value)} />
//       </FieldGroup>

//       <Button onClick={handleAuthorize}>Autorizar Mercado Livre</Button>

//       <FieldGroup>
//         <label>Authorization Code:</label>
//         <input value={authCode} onChange={e => setAuthCode(e.target.value)} />
//       </FieldGroup>

//       <Button onClick={handleGenerateToken}>Gerar Access Token</Button>

//       <FieldGroup>
//         <label>Access Token:</label>
//         <input value={accessToken} readOnly />
//       </FieldGroup>

//       <FieldGroup>
//         <label>Refresh Token:</label>
//         <input value={refreshToken} readOnly />
//       </FieldGroup>

//       <FieldGroup>
//         <label>Expira em (segundos):</label>
//         <input value={expiresIn} readOnly />
//       </FieldGroup>

//       <Button variant="secondary" onClick={handleRefreshToken}>Renovar Token</Button>

//       <Status>Status: {status}</Status>
//     </Container>
//   )
// }

'use client'

import { DynamicForm } from "../../DynamicForm"
import { generateToken } from "../../../../marketplaces/meli/auth"
import { useMarketplaceFields } from "@/app/hooks/useMarketplaceFields"
import { useState } from "react"

export default function MeliSettings() {
  const { fields, loading, error } = useMarketplaceFields("meli")
  const [status, setStatus] = useState("")

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      setStatus("Gerando token...")

      await generateToken({
        clientId: data.clientId,
        clientSecret: data.clientSecret,
        redirectUri: data.redirectUri,
        code: data.authCode,
      })

      setStatus("Token gerado com sucesso!")
    } catch (err) {
      console.error(err)
      setStatus("Erro ao gerar token")
    }
  }

  if (loading) return <p>Carregando campos...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <h2>Configuração Mercado Livre</h2>

      <DynamicForm
        fields={fields}
        onSubmit={handleSubmit}
      />

      {status && <p>{status}</p>}
    </>
  )
}
