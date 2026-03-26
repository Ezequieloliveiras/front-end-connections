import { SIZES, useChannelsDonutHandlers } from "@/app/hooks/forecastDashboard/clientsDonut/useChannelsDonutHandlers"
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
import { ChannelsDonutProps } from "./types"
import { polarToCartesian, useChannelsDonutStates } from "@/app/hooks/forecastDashboard/clientsDonut/useChannelsDonutStates"

export function ChannelsDonut({ productId, days }: ChannelsDonutProps) {

  const states = useChannelsDonutStates({ days, productId })
  const { channels, loading, wrapperRef, selected, setSelected } = states

  const {
    derived,
    selectedSlice,
    highlightGradient,
    outerSize,
    innerSize,
    labelRadius,
    handleRingClick
  } = useChannelsDonutHandlers({ channels, selected, setSelected })

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
