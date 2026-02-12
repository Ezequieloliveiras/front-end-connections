// middleware.ts
import type { MiddlewareConfig } from "next/server"
import { NextRequest, NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode"

type JwtPayload = { exp: number }

function isExpired(token?: string) {
  if (!token) return true
  try {
    const { exp } = jwtDecode<JwtPayload>(token)
    return !exp || exp < Date.now() / 1000
  } catch {
    return true
  }
}

const PUBLIC = new Set(["/", "/login", "/register", "/reset"])
const LOGIN = "/login"
const HOME = "/home"

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // DEBUG (aparece no terminal do Next)
  // console.log("[MW] path:", path)

  // ignora assets e api do next
  if (
    path.startsWith("/api") ||
    path.startsWith("/_next") ||
    path === "/favicon.ico" ||
    path === "/sitemap.xml" ||
    path === "/robots.txt"
  ) {
    return NextResponse.next()
  }

  const access = req.cookies.get("access_token")?.value
  const refresh = req.cookies.get("refresh_token")?.value

  const accessValid = !!access && !isExpired(access)
  const refreshValid = !!refresh && !isExpired(refresh)

  const isPublic = PUBLIC.has(path)

  // Rotas públicas: se já estiver logado, manda pra home (opcional)
  if (isPublic) {
    if (refreshValid && (path === "/" || path === "/login")) {
      const url = req.nextUrl.clone()
      url.pathname = HOME
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Rotas privadas: se faltar token/refresh ou estiver expirado, manda pro login
  if (!accessValid || !refreshValid) {
    const url = req.nextUrl.clone()
    url.pathname = LOGIN
    url.searchParams.set("next", path) // opcional: volta depois do login
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
}
