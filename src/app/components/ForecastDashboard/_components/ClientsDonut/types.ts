
export interface ChannelsDonutProps {
  productId?: string
  days: number
}

export type Channel = { name: string; value: number }

export type Slice = Channel & {
  percent: number
  startAngle: number
  endAngle: number
  midAngle: number
}