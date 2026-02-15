import { useEffect, useMemo, useState } from "react"
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
import { useRef } from "react"

interface Props {
  productId?: string
  days: number
}

type Channel = { name: string; value: number }

const mockChannels: Channel[] = [
  { name: "Shopee", value: 10 },
  { name: "Mercado Livre", value: 7 },
  { name: "Amazon", value: 3 },
]

// cores (ajuste como quiser)
const colorFor = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes("mercado livre")) return "#ffc116" // vermelho
  if (n.includes("shopee")) return "#ef4444"        // preto/cinza
  if (n.includes("amazon")) return "#000000"        // azul
  return "#f59e0b"                                  // amarelo
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

// calcula posição (x,y) do label no meio da fatia
function polarToCartesian(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius }
}

export function ChannelsDonut({ productId, days }: Props) {
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!Number.isFinite(days) || days <= 0) return
    setLoading(true)

    // mock
    setTimeout(() => {
      setChannels(mockChannels)
      setLoading(false)
    }, 200)
  }, [productId, days])

  const sorted = useMemo(
    () => [...channels].sort((a, b) => (b.value ?? 0) - (a.value ?? 0)),
    [channels]
  )

  const total = useMemo(
    () => sorted.reduce((acc, c) => acc + (Number(c.value) || 0), 0),
    [sorted]
  )
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return
      if (!wrapperRef.current.contains(e.target as Node)) {
        setSelected(null)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  const gradient = useMemo(() => buildConicGradient(sorted), [sorted])

  // ✅ cria “fatias” com start/end/midAngle + percent
  const slices = useMemo(() => {
    if (total <= 0) return []

    let acc = 0
    return sorted.map((c) => {
      const value = Number(c.value) || 0
      const percent = value / total
      const startAngle = acc * 360
      const endAngle = (acc + percent) * 360
      const midAngle = (startAngle + endAngle) / 2
      acc += percent

      return { name: c.name, value, percent, startAngle, endAngle, midAngle }
    })
  }, [sorted, total])
  const highlightGradient = useMemo(() => {
    if (!selected) return null
    const s = slices.find(x => x.name === selected)
    if (!s) return null

    // desenha apenas a fatia; resto transparente
    return `conic-gradient(
    transparent 0deg ${s.startAngle}deg,
    rgba(255,255,255,0.45) ${s.startAngle}deg ${s.endAngle}deg,
    transparent ${s.endAngle}deg 360deg
  )`
  }, [selected, slices])


  // ✅ tamanhos (pode ajustar)
  const outerSize = 180
  const innerSize = 120
  const ringRadius = outerSize / 2
  const labelRadius = ringRadius - 18 // joga o texto pra dentro do anel

  const handleRingClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    const x = e.clientX - cx
    const y = e.clientY - cy

    // ângulo em radianos, onde 0 é na direita. Vamos ajustar pra 0 começar “em cima”.
    let angle = Math.atan2(y, x) * (180 / Math.PI) // -180..180
    angle = (angle + 90 + 360) % 360 // 0..360, 0 no topo

    // opcional: ignorar clique dentro do “furo”
    const dist = Math.sqrt(x * x + y * y)
    const innerR = innerSize / 2
    const outerR = outerSize / 2
    if (dist < innerR || dist > outerR) return

    const hit = slices.find(s => angle >= s.startAngle && angle < s.endAngle)
    if (!hit) return

    setSelected(prev => (prev === hit.name ? null : hit.name)) // toggle
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
            background: gradient,
            position: "relative",
            display: "grid",
            placeItems: "center",
          }}
        >
          {/* ✅ camada de highlight */}
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

          {/* ✅ camada clicável (anel) */}
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

          {/* labels em cada fatia */}
          {slices.map((s) => {
            const pct = Math.round(s.percent * 100)
            if (pct < 8) return null
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

          {/* furo do donut */}
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
              {selected
                ? `${Math.round((slices.find(s => s.name === selected)?.percent ?? 0) * 100)}%`
                : total
                  ? "100%"
                  : "0%"}
            </DonutValue>

            <DonutLabel>
              {loading
                ? "Carregando..."
                : selected
                  ? selected
                  : "Total por canal"}
            </DonutLabel>
          </div>
        </div>
      </DonutWrap>

      <div style={{ margin: 14, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        {total === 0 ? (
          <Badge $tone="neutral">{loading ? "Carregando..." : "Sem dados no período"}</Badge>
        ) : (
          sorted.slice(0, 4).map((c, idx) => {
            const p = Math.round(((Number(c.value) || 0) / total) * 100)
            return (
              <Badge key={c.name} $tone={idx === 0 ? "good" : "neutral"}>
                {c.name}: {p}% ({Number(c.value || 0).toLocaleString("pt-BR")})
              </Badge>
            )
          })
        )}
      </div>
    </Card>
  )
}
