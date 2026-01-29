import { OAuthAction } from "../types"

export const meliAuthorization: OAuthAction = async (
  { client_id, redirect_uri } = {}
) => {
  if (!client_id || !redirect_uri) {
    console.warn("client_id ou redirect_uri ausentes")
    return
  }

  const url =
    `https://auth.mercadolivre.com.br/authorization` +
    `?response_type=code` +
    `&client_id=${client_id}` +
    `&redirect_uri=${encodeURIComponent(redirect_uri)}`

  window.location.href = url
}