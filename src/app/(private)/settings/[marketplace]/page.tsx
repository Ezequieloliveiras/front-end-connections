import { MARKETPLACE_REGISTRY } from "../../../components/MarketplaceSettings"

export default async function MarketplacePage({
  params,
}: {
  params: Promise<{ marketplace: string }>
}) {
  const { marketplace } = await params
  
  if (!(marketplace in MARKETPLACE_REGISTRY)) {
    return <h1>Marketplace não encontrado</h1>
  }

  const marketplaceConfig =
    MARKETPLACE_REGISTRY[
      marketplace as keyof typeof MARKETPLACE_REGISTRY
    ]

  const Settings = marketplaceConfig.SettingsComponent

  return (
    <>
      <h1>{marketplaceConfig.name}</h1>
      <Settings />
    </>
  )
}
