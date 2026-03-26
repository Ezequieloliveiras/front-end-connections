import { useEffect, useRef, useState } from "react"
import { getTopChannels } from "@/app/services/forecast/forecast.service"
import { Channel, Slice } from "./types"

const colorFor = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes("mercado livre")) return "#ffc116"
    if (n.includes("shopee")) return "#ef4444"
    if (n.includes("amazon")) return "#000000"
    if (n.includes("magelu")) return "#3b82f6"
    return "#f59e0b"
}

export function polarToCartesian(angleDeg: number, radius: number) {
    const rad = (angleDeg * Math.PI) / 180
    return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius }
}

export function buildConicGradient(channels: Channel[]) {
    const total = channels.reduce((acc, c) => acc + (Number(c.value) || 0), 0)
    if (total <= 0) return "conic-gradient(#e5e7eb 0 100%)"

    let accPercent = 0
    const parts: string[] = []

    for (const c of channels) {
        const p = (Number(c.value) || 0) / total * 100
        const start = accPercent
        const end = accPercent + p
        parts.push(`${colorFor(c.name)} ${start.toFixed(2)}% ${end.toFixed(2)}%`)
        accPercent = end
    }

    return `conic-gradient(${parts.join(", ")})`
}

export function buildHighlightGradient(slice: Slice | undefined) {
    if (!slice) return null
    return `conic-gradient(
    transparent 0deg ${slice.startAngle}deg,
    rgba(255,255,255,0.45) ${slice.startAngle}deg ${slice.endAngle}deg,
    transparent ${slice.endAngle}deg 360deg
  )`
}

function useOutsideClick<T extends HTMLElement>(onOutside: () => void) {
    const ref = useRef<T | null>(null)

    useEffect(() => {
        const handler = (e: PointerEvent) => {
            const el = ref.current
            if (!el) return

            // se clicou dentro, não faz nada
            if (el.contains(e.target as Node)) return

            onOutside()
        }

        // capture=true evita “pisca” por ordem de eventos
        document.addEventListener("pointerdown", handler, true)
        return () => document.removeEventListener("pointerdown", handler, true)
    }, [onOutside])

    return ref
}

function useChannels(days: number, productId?: string) {
    const [channels, setChannels] = useState<Channel[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!Number.isFinite(days) || days <= 0) return
        setLoading(true)
        const fetch = async () => {
            try {
                setLoading(true)
                const res = await getTopChannels({ productId, days })
                setChannels(res.topChannels ?? [])
            } catch (err) {
                console.error("Erro ao buscar canais:", err)
                setChannels([])
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [days, productId])

    return { channels, loading, setChannels }
}

export const useChannelsDonutStates = ({ productId, days }: { productId?: string, days: number }) => {
    const { channels, loading } = useChannels(days, productId)
    const [selected, setSelected] = useState<string | null>(null)
    const wrapperRef = useOutsideClick<HTMLDivElement>(() => setSelected(null))

    return { channels, loading, selected, setSelected, wrapperRef }
}