import axios from "axios"

interface GenerateTokenParams {
    clientId: string
    clientSecret: string
    code: string
    redirectUri: string
}

export async function generateToken({
  clientId,
  clientSecret,
  code,
  redirectUri,
}: GenerateTokenParams) {
  const params = new URLSearchParams()
  params.append("grant_type", "authorization_code")
  params.append("client_id", clientId)
  params.append("client_secret", clientSecret)
  params.append("code", code)
  params.append("redirect_uri", redirectUri)

  const res = await axios.post(
    "https://api.mercadolibre.com/oauth/token",
    params
  )

  return res.data
}
