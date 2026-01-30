import { meliAuthorization } from "./authorization"
import { meliGenerateAccessToken } from "./generateAccessToken"
import { meliRenewToken } from "./renewToken"
import { OAuthAction } from "../types"

export const meliOAuthActions: Record<string, OAuthAction> = {
    authorization: meliAuthorization,
    generate_access_token: meliGenerateAccessToken,
    renew_token: meliRenewToken,
}