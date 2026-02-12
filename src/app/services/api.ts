import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

const API_URL = "http://localhost:4000/api"

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
})

// instância SEM interceptors pra refresh/logout
const authApi = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
})

type FailedQueueItem = { resolve: () => void; reject: (reason?: any) => void }

let isRefreshing = false
let failedQueue: FailedQueueItem[] = []

function processQueue(error: any) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()))
  failedQueue = []
}

function forceLogout() {
  if (typeof window === "undefined") return
  // você pode também limpar react-query/local state aqui se quiser
  window.location.href = "/" // ou "/login"
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    if (!error.response) return Promise.reject(error)

    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean })
    const status = error.response.status
    const url = originalRequest?.url || ""

    const is401 = status === 401
    const isRefreshRoute = url.includes("/auth/refresh")
    const isLoginRoute = url.includes("/auth/login")
    const isAuthRoute = isRefreshRoute || isLoginRoute

    // Se o próprio refresh deu 401 => acabou: manda pro login
    if (isRefreshRoute && is401) {
      forceLogout()
      return Promise.reject(error)
    }

    // Se não for 401, ou já tentou, ou é rota de auth => não tenta refresh
    if (!is401 || !originalRequest || originalRequest._retry || isAuthRoute) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(api(originalRequest)),
          reject,
        })
      })
    }

    isRefreshing = true

    try {
      await authApi.post("/auth/refresh")
      processQueue(null)
      return api(originalRequest)
    } catch (refreshErr: any) {
      processQueue(refreshErr)
      forceLogout()
      return Promise.reject(refreshErr)
    } finally {
      isRefreshing = false
    }
  }
)
