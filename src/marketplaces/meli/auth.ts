import { generateTokenApi } from "@/app/services/meli/meliService"

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

  const response = await generateTokenApi(params)
  console.log('FRONT', response.data)

  return response.data
}
