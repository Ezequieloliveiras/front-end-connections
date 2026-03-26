import { useMemo } from "react"
import { buildConicGradient, buildHighlightGradient } from "./useChannelsDonutStates"
import { Slice, UseChannelsDonutHandlersProps } from "./types"

export const SIZES = {
    outer: 180,
    inner: 120,
    labelRadiusOffset: 15,
    minLabelPercent: 8,
} as const

export const useChannelsDonutHandlers = ({ channels, selected, setSelected }: UseChannelsDonutHandlersProps) => {
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

    return { derived, selectedSlice, highlightGradient, outerSize, innerSize, labelRadius, handleRingClick }

}    