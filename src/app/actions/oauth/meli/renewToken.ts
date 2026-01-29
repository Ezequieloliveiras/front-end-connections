import { OAuthAction } from "../types"
import { saveOAuthOnBackend } from "@/app/services/meli/meliService"

export const meliRenewToken: OAuthAction = async (
  {
    client_id,
    client_secret,
    refresh_token,
  },
  helpers
) => {
  if (!client_id || !client_secret || !refresh_token) return

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id,
    client_secret,
    refresh_token,
  })

  const res = await fetch("https://api.mercadolibre.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  })

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

