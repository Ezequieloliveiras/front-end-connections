import Link from "next/link"
import {
  Page,
  Header,
  Title,
  Subtitle,
  Section,
  Grid,
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
  ActionButton,
} from "./styles"

export default function Pages() {
  return (
    <Page>
      <Header>
        <Title>Mercado Livre</Title>
        <Subtitle>
          Gerencie todas as configurações e integrações do Mercado Livre
        </Subtitle>
      </Header>

      <Section>
        <Grid>
          <Card>
            <CardTitle>Integração</CardTitle>
            <CardDescription>
              Configure credenciais, tokens e permissões da API
            </CardDescription>

            <CardFooter>
              <Link href="/settings/meli">
                <ActionButton>Configurar</ActionButton>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardTitle>Categorias</CardTitle>
            <CardDescription>
              Sincronize e gerencie categorias do Mercado Livre
            </CardDescription>

            <CardFooter>
              <Link href="/settings/integrations/meli/categories">
                <ActionButton>Gerenciar</ActionButton>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardTitle>Anúncios</CardTitle>
            <CardDescription>
              Controle anúncios, status e publicações
            </CardDescription>

            <CardFooter>
              <Link href="/settings/integrations/meli/listings">
                <ActionButton>Ver anúncios</ActionButton>
              </Link>
            </CardFooter>
          </Card>

          <Card aria-disabled>
            <CardTitle>Pedidos</CardTitle>
            <CardDescription>
              Integração de pedidos (em breve)
            </CardDescription>

            <CardFooter>
              <ActionButton disabled>Em breve</ActionButton>
            </CardFooter>
          </Card>
        </Grid>
      </Section>
    </Page>
  )
}
