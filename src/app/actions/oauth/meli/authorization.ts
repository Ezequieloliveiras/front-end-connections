import { authorizationApi } from "@/app/services/meli/meliService"
import { OAuthAction } from "../types"

export const meliAuthorization: OAuthAction = async (
  { client_id, redirect_uri, user_id } = {},
  helpers
) => {
  if (!client_id || !redirect_uri || !user_id) {
    console.warn("client_id ou redirect_uri ausentes")
    return
  }

  const { url } = await authorizationApi({
    client_id,
    redirect_uri,
    user_id
  })

  if (!url) {
    console.error("URL de autorização não retornada pelo backend")
    return
  }

  // aqui você decide o que fazer com a URL
  helpers?.setUrl?.(url)
}