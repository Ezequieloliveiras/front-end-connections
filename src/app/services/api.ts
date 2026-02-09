import axios from "axios"

const API_URL = "http://localhost:4000/api"

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10s de timeout
  withCredentials: true, // manda/recebe cookies
})

// Interceptor de request: adiciona token automaticamente
api.interceptors.request.use(
  (config) => {
    // Exemplo: pegar token do localStorage
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de response: tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network Error: O servidor não respondeu")
    } else {
      console.error(
        `Erro ${error.response.status}:`,
        error.response.data || error.message
      )
    }
    return Promise.reject(error)
  }
)
