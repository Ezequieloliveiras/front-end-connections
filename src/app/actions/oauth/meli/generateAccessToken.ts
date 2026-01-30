import { OAuthAction } from "../types"
import { generateTokenApi } from "@/app/services/meli/meliService"

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

  const body = {
    grant_type: "authorization_code",
    client_id,
    client_secret,
    code: authorization_code,
    redirect_uri
  }

  const res = await generateTokenApi(body)

  // devolve pro React atualizar
  helpers?.setManyFields?.({
    access_token: res.access_token,
    refresh_token: res.refresh_token,
    expires_in: res.expires_in,
    token_type: res.token_type,
    scope: res.scope,
    user_id: res.user_id,
  })
}
