import axios from "axios"
import { OAuthAction } from "../types"

export const meliGenerateAccessToken: OAuthAction = async (
  {
    client_id,
    client_secret,
    authorization_code,
    redirect_uri,
  } = {},
  helpers?: {
    setManyFields?: (data: Record<string, any>) => void
  }
) => {

  if (!client_id || !client_secret || !authorization_code || !redirect_uri) {
    console.warn("Dados obrigatórios ausentes")
    return
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id,
    client_secret,
    code: authorization_code,
    redirect_uri,
  })

  const res = await axios.post("https://api.mercadolibre.com/oauth/token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  })

  const data = await res.data

  console.log("TOKEN RESPONSE", data)

  // devolve pro React atualizar
  helpers?.setManyFields?.({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
    token_type: data.token_type,
    scope: data.scope,
    user_id: data.user_id,
  })
}
