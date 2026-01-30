export type Marketplace = "meli" | "shopee"

export type OAuthContext = {
  client_id?: string
  client_secret?: string
  redirect_uri?: string
  authorization_code?: string
  refresh_token?: string
  oauth?: string
  oauthUrl?: string
  access_token?: string
  url?: string
}

export type OAuthHelpers = {
  setManyFields?: (data: Record<string, any>) => void
  setUrl?: (url: string) => void
}

export type OAuthAction = (
  context: OAuthContext,
  helpers?: OAuthHelpers
) => Promise<void>

export type MeliOAuthActionKey =
  | "authorization"
  | "generate_access_token"
  | "renew_token"
  | "oauth"

export type ShopeeOAuthActionKey =
  | "authorization"
  | "generate_access_token"
  | "oauth"

export type OAuthActionKeysByMarketplace = {
  meli: MeliOAuthActionKey
  shopee: ShopeeOAuthActionKey
}
