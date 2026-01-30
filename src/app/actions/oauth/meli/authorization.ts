import { authorizationApi } from "@/app/services/meli/meliService"
import { OAuthAction } from "../types"

export const meliAuthorization: OAuthAction = async (
  { client_id, redirect_uri } = {},
  helpers
) => {
  if (!client_id || !redirect_uri) {
    console.warn("client_id ou redirect_uri ausentes")
    return
  }

  const { url } = await authorizationApi({
    client_id,
    redirect_uri,
  })

  if (!url) {
    console.error("URL de autorização não retornada pelo backend")
    return
  }

  // aqui você decide o que fazer com a URL
  helpers?.setUrl?.(url)
}