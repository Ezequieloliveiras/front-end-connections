import { OAuthAction } from "../types"
import { renewTokenApi, saveOAuthOnBackend } from "@/app/services/meli/meliService"

export const meliRenewToken: OAuthAction = async (
  {
    client_id,
    client_secret,
    redirect_uri,
    user_id,
    refresh_token,
    access_token
  },
  helpers
) => {
  if (!client_id || !client_secret || !refresh_token) return

  const body = {
    grant_type: "refresh_token",
    client_id,
    client_secret,
    redirect_uri,
    user_id,
    refresh_token,
    access_token,
  }

  const res = await renewTokenApi(body)

  if (!res) throw new Error("Erro ao renovar token")

  const payload = {
    client_id,
    client_secret,
    redirect_uri,
    user_id: user_id,
    refresh_token: res.refresh_token,
    access_token: res.access_token,
    expires_in: res.expires_in,
    token_type: res.token_type,
    scope: res.scope,
  }

  // atualiza o form
  helpers?.setManyFields?.(payload)

  // SALVA NO BACKEND
  await saveOAuthOnBackend(payload)
}

