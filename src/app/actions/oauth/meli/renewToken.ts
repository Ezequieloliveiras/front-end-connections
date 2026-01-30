import { OAuthAction } from "../types"
import { renewTokenApi, saveOAuthOnBackend } from "@/app/services/meli/meliService"

export const meliRenewToken: OAuthAction = async (
  {
    client_id,
    client_secret,
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
    refresh_token,
    access_token,
  }

  const res = await renewTokenApi(body)

  if (!res.ok) throw new Error("Erro ao renovar token")

  const data = await res.json()

  const payload = {
    client_id,
    client_secret,
    refresh_token: data.refresh_token,
    access_token: data.access_token,
    expires_in: data.expires_in,
    token_type: data.token_type,
    scope: data.scope,
  }

  // atualiza o form
  helpers?.setManyFields?.(payload)

  // SALVA NO BACKEND
  await saveOAuthOnBackend(payload)
}

