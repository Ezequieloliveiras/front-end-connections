import { useEffect, useMemo, useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardHint,
  Divider,
  ChartWrap,
  BarList,
  BarItem,
  BarLabel,
  BarTrack,
  BarFill,
} from "./styles"

import { getTopChannels } from "@/app/services/forecast/forecast.service"

type Channel = {
  name: string
  value: number
}

interface Props {
  entityId: string
  productId?: string
  days: number
}

export function PlannedVsRealized({ entityId, productId, days }: Props) {
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!entityId || !days) return

    const fetch = async () => {
      try {
        setLoading(true)
        const res = await getTopChannels({
          entityId,
          productId,
          days,
        })
        setChannels(res.topChannels ?? [])
      } catch (err) {
        console.error("Erro ao buscar canais:", err)
        setChannels([])
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [entityId, productId, days])

  const maxChannel = useMemo(
    () => Math.max(...channels.map(c => c.value), 1),
    [channels]
  )

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Venda por canal</CardTitle>
          <CardHint>Comparativo rápido por canal</CardHint>
        </div>
      </CardHeader>

      <Divider />

      <ChartWrap>
        {loading && <span>Carregando...</span>}

        {!loading && channels.length === 0 && (
          <span style={{ fontSize: 13, color: "#64748b" }}>
            Nenhum dado encontrado para o período
          </span>
        )}

        <BarList>
          {channels.map(c => (
            <BarItem key={c.name}>
              <BarLabel>{c.name}</BarLabel>

              <BarTrack>
                <BarFill
                  style={{
                    width: `${Math.round((c.value / maxChannel) * 100)}%`,
                  }}
                />
              </BarTrack>

              <span style={{ width: 64, textAlign: "right" }}>
                {c.value.toLocaleString("pt-BR")}
              </span>
            </BarItem>
          ))}
        </BarList>
      </ChartWrap>
    </Card>
  )
}
