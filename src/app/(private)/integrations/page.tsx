import {
  Page,
  Header,
  Title,
  Subtitle,
  IntegrationsGrid,
  IntegrationCard,
  CardHeader,
  CardIcon,
  CardTitle,
  CardDescription,
  CardFooter,
  StatusBadge,
  ActionText,
  CardLink,
} from "./styles"

export default function Settings() {
  return (
    <Page>
      <Header>
        <Title>Integrações</Title>
        <Subtitle>Gerencie integrações e conexões com marketplaces</Subtitle>
      </Header>

      <IntegrationsGrid>
        <CardLink href="/integrations/meli">
          <IntegrationCard>
            <CardHeader>
              <CardIcon>🟡</CardIcon>
              <StatusBadge $active>Ativo</StatusBadge>
            </CardHeader>

            <CardTitle>Mercado Livre</CardTitle>
            <CardDescription>
              Configure credenciais, tokens e sincronizações da API
            </CardDescription>

            <CardFooter>
              <ActionText>Gerenciar integração →</ActionText>
            </CardFooter>
          </IntegrationCard>
        </CardLink>

        <CardLink href="/integrations/shopee">
          <IntegrationCard>
            <CardHeader>
              <CardIcon>🟠</CardIcon>
              <StatusBadge>Não configurado</StatusBadge>
            </CardHeader>

            <CardTitle>Shopee</CardTitle>
            <CardDescription>
              Conecte sua conta Shopee para sincronizar produtos
            </CardDescription>

            <CardFooter>
              <ActionText>Configurar →</ActionText>
            </CardFooter>
          </IntegrationCard>
        </CardLink>

        <IntegrationCard aria-disabled>
          <CardHeader>
            <CardIcon>🟤</CardIcon>
            <StatusBadge $disabled>Em breve</StatusBadge>
          </CardHeader>

          <CardTitle>Amazon</CardTitle>
          <CardDescription>
            Integração com Amazon Marketplace
          </CardDescription>

          <CardFooter>
            <ActionText disabled>Disponível em breve</ActionText>
          </CardFooter>
        </IntegrationCard>
      </IntegrationsGrid>
    </Page>
  )
}
