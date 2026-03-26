
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

export interface UseChannelsDonutHandlersProps {
    selected: string | null
    setSelected: React.Dispatch<React.SetStateAction<string | null>>
    channels: Channel[]
}
