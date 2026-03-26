import { ForecastResponse } from "../../types"

export interface KPIsProps {
    data: ForecastResponse
    preset: number | string
}

export type Tone = "good" | "bad" | "neutral"