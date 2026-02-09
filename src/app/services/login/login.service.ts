import { api } from "../api"

export async function login(payload: Record<string, any>) {
    const { data } = await api.post("/login", payload)
    return data
}

export async function logout() {
    const { data } = await api.post("/logout")
    return data
}