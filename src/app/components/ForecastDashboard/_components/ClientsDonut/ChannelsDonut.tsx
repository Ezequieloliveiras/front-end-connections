import React, { useEffect, useMemo, useRef, useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardHint,
  DonutWrap,
  DonutValue,
  DonutLabel,
  Badge,
  Divider,
} from "./styles"
import { getTopChannels } from "@/app/services/forecast/forecast.service"

interface Props {
  productId?: string
  days: number
}

type Channel = { name: string; value: number }

type Slice = Channel & {
  percent: number
  startAngle: number
  endAngle: number
  midAngle: number
}

const SIZES = {
  outer: 180,
  inner: 120,
  labelRadiusOffset: 15,
  minLabelPercent: 8,
} as const

const colorFor = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes("mercado livre")) return "#ffc116"
  if (n.includes("shopee")) return "#ef4444"
  if (n.includes("amazon")) return "#000000"
  if (n.includes("magelu")) return "#3b82f6"
  return "#f59e0b"
}

function polarToCartesian(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius }
}

function buildConicGradient(channels: Channel[]) {
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

function buildHighlightGradient(slice: Slice | undefined) {
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
        const res = await getTopChannels({ productId, days})
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

export function ChannelsDonut({ productId, days }: Props) {
  const { channels, loading } = useChannels(days, productId)
  const [selected, setSelected] = useState<string | null>(null)
  const wrapperRef = useOutsideClick<HTMLDivElement>(() => setSelected(null))

  // tudo que é “derivado” fica aqui
  const derived = useMemo(() => {
    const sorted = [...channels].sort((a, b) => (b.value ?? 0) - (a.value ?? 0))
    const total = sorted.reduce((acc, c) => acc + (Number(c.value) || 0), 0)

    const slices: Slice[] = []
    if (total > 0) {
      let acc = 0
      for (const c of sorted) {
        const value = Number(c.value) || 0
        const percent = value / total
        const startAngle = acc * 360
        const endAngle = (acc + percent) * 360
        const midAngle = (startAngle + endAngle) / 2
        acc += percent
        slices.push({ ...c, value, percent, startAngle, endAngle, midAngle })
      }
    }

    return {
      sorted,
      total,
      slices,
      gradient: buildConicGradient(sorted),
    }
  }, [channels])

  const selectedSlice = useMemo(
    () => derived.slices.find(s => s.name === selected),
    [derived.slices, selected]
  )

  const highlightGradient = useMemo(
    () => buildHighlightGradient(selectedSlice),
    [selectedSlice]
  )

  const outerSize = SIZES.outer
  const innerSize = SIZES.inner
  const labelRadius = (outerSize / 2 + innerSize / 2) / 2


  const handleRingClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (derived.total <= 0) return

    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    const x = e.clientX - cx
    const y = e.clientY - cy

    let angle = Math.atan2(y, x) * (180 / Math.PI)
    angle = (angle + 90 + 360) % 360

    const dist = Math.sqrt(x * x + y * y)
    const innerR = innerSize / 2
    const outerR = outerSize / 2

    // clicou no “furo” ou fora do donut => desmarca
    if (dist < innerR || dist > outerR) {
      setSelected(null)
      return
    }

    const hit = derived.slices.find(s => angle >= s.startAngle && angle < s.endAngle)
    if (!hit) {
      setSelected(null)
      return
    }

    setSelected(prev => (prev === hit.name ? null : hit.name))
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Participação por canal</CardTitle>
          <CardHint>Pedidos no período (últimos {days} dias)</CardHint>
        </div>
      </CardHeader>

      <Divider />

      <DonutWrap ref={wrapperRef}>
        <div
          style={{
            width: outerSize,
            height: outerSize,
            borderRadius: "50%",
            background: derived.gradient,
            position: "relative",
            display: "grid",
            placeItems: "center",
          }}
        >
          {highlightGradient && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: highlightGradient,
                filter: "brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.55))",
                pointerEvents: "none",
              }}
            />
          )}

          <div
            onClick={handleRingClick}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              cursor: "pointer",
            }}
            title="Clique em uma fatia para destacar"
          />

          {derived.slices.map((s) => {
            const pct = Math.round(s.percent * 100)
            if (pct < SIZES.minLabelPercent) return null

            const { x, y } = polarToCartesian(s.midAngle - 90, labelRadius)
            const isSelected = selected === s.name

            return (
              <div
                key={s.name}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#ffffff",
                  textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                  pointerEvents: "none",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                  opacity: selected ? (isSelected ? 1 : 0.55) : 1,
                }}
              >
                {pct}%
              </div>
            )
          })}

          <div
            style={{
              width: innerSize,
              height: innerSize,
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              flexFlow: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              zIndex: 2,
            }}
          >
            <DonutValue>
              {selectedSlice
                ? `${Math.round(selectedSlice.percent * 100)}%`
                : derived.total
                  ? "100%"
                  : "0%"}
            </DonutValue>

            <DonutLabel>
              {loading ? "Carregando..." : selectedSlice ? selectedSlice.name : "Total por canal"}
            </DonutLabel>
          </div>
        </div>
      </DonutWrap>

      <div style={{ margin: 14, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        {derived.total === 0 ? (
          <Badge $tone="neutral">{loading ? "Carregando..." : "Sem dados no período"}</Badge>
        ) : (
          derived.sorted.slice(0, 4).map((c) => {
            const p = Math.round(((Number(c.value) || 0) / derived.total) * 100)
            const isSelected = selected === c.name
            return (
              <Badge
                key={c.name}
                $tone={isSelected ? "good" : "neutral"}
                onClick={() => setSelected(prev => (prev === c.name ? null : c.name))}
                style={{ cursor: "pointer" }}
              >
                {c.name}: {p}% ({Number(c.value || 0).toLocaleString("pt-BR")})
              </Badge>
            )
          })
        )}
      </div>
    </Card>
  )
}
