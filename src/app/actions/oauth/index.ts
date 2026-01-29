import { meliOAuthActions } from "./meli"
import { OAuthAction, Marketplace } from "./types"

export const oauthActions: Record<
  Marketplace,
  Record<string, OAuthAction>
> = {
  meli: meliOAuthActions,
  shopee: {},
}
