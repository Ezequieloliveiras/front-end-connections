import { authorizationApi } from "@/app/services/meli/meliService"
import { OAuthAction } from "../types"

export const meliAuthorization: OAuthAction = async (
  { client_id, redirect_uri } = {}
) => {
  if (!client_id || !redirect_uri) {
    console.warn("client_id ou redirect_uri ausentes")
    return
  }

  const res = await authorizationApi({ client_id, redirect_uri })

  const { url } = res

  if (!url) {
    console.error("URL de autorização não retornada pelo backend")
    return
  }

  window.location.href = url
}