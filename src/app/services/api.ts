import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios"

const API_URL = "http://localhost:4000/api"

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true, // envia cookies HttpOnly
})

type FailedQueueItem = {
  resolve: (value?: any) => void
  reject: (reason?: any) => void
}

let isRefreshing = false
let failedQueue: FailedQueueItem[] = []

function processQueue(error: any) {
  failedQueue.forEach(p => (error ? p.reject(error) : p.resolve(true)))
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean })

    const status = error.response?.status
    const is401 = status === 401

    // Se não tem resposta, é erro de rede
    if (!error.response) return Promise.reject(error)

    // Evita loop e evita tentar refresh na própria rota de refresh/login
    const url = originalRequest?.url || ""
    const isAuthRoute = url.includes("/auth/login") || url.includes("/auth/refresh")

    if (!is401 || !originalRequest || originalRequest._retry || isAuthRoute) {
      return Promise.reject(error)
    }

    // Marca que já tentou uma vez
    originalRequest._retry = true

    // Se já tem refresh em andamento, espera ele terminar e reexecuta a request
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
      // chama refresh (cookies vão junto por withCredentials)
      await api.post("/auth/refresh")

      processQueue(null)
      return api(originalRequest) // repete a request original
    } catch (refreshErr) {
      processQueue(refreshErr)

      // Aqui você pode deslogar/redirect se quiser
      // window.location.href = "/login"

      return Promise.reject(refreshErr)
    } finally {
      isRefreshing = false
    }
  }
)
