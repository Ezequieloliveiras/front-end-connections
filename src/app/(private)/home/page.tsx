
import {
  Page,
  Container,
  Hero,
  HeroText,
  Pill,
  H1,
  H1Accent,
  P,
  CtaRow,
  PrimaryBtn,
  SecondaryBtn,
  Bullets,
  Bullet,
  BulletTitle,
  BulletText,
  VideoCard,
  VideoHeader,
  VideoTitle,
  VideoHint,
  Badge,
  VideoWrap,
  VideoPlaceholder,
  PlayCircle,
  VideoPlaceholderText,
  VideoPlaceholderSub,
  Iframe,
  VideoFooter,
  SmallNote,
  PrimaryBtnSmall,
  Section,
  H2,
  Steps,
  StepCard,
  StepNum,
  StepTitle,
  StepText,
  Footer,
  FooterInner,
  FooterBrand,
  FooterText,
} from "./styles"


export default function Home() {
  return (
    <Page>
      <Container>
        {/* Hero / Boas-vindas */}
        <Hero>
          <HeroText>
            <Pill>Bem-vindo à Forecast</Pill>

            <H1>
              Sua plataforma de previsão de vendas e planejamento de estoque
              <H1Accent> multi-marketplace</H1Accent>.
            </H1>

            <P>
              A Forecast conecta seus marketplaces, consolida pedidos em um único
              painel e transforma vendas reais em insights claros: previsão por
              produto, tendência, confiança e detalhamento diário — para você
              decidir estoque com mais segurança.
            </P>
          
            {/* Bullets do que faz */}
            <Bullets>
              <Bullet>
                <BulletTitle>Previsão por produto</BulletTitle>
                <BulletText>
                  Estime vendas para 7/30/90 dias (ou personalizado) e visualize
                  tendência e confiança.
                </BulletText>
              </Bullet>

              <Bullet>
                <BulletTitle>Detalhamento por dia</BulletTitle>
                <BulletText>
                  Entenda picos, sazonalidade e consistência com série diária
                  (inclui dias zerados).
                </BulletText>
              </Bullet>

              <Bullet>
                <BulletTitle>Canais (marketplaces)</BulletTitle>
                <BulletText>
                  Compare o volume de pedidos por canal no período e identifique
                  onde vender mais.
                </BulletText>
              </Bullet>
            </Bullets>
          </HeroText>

          {/* Vídeo de apresentação */}
          <VideoCard>
            <VideoHeader>
              <div>
                <VideoTitle>Vídeo de Boas-Vindas</VideoTitle>
                <VideoHint>
                  Assista para entender como usar a Forecast em 2 minutos.
                </VideoHint>
              </div>
              <Badge>Apresentação</Badge>
            </VideoHeader>

            <VideoWrap>
              {/* Troque este placeholder por um <video> ou <iframe> */}
              <VideoPlaceholder>
                <PlayCircle aria-hidden />
                <VideoPlaceholderText>
                  Coloque aqui o seu vídeo de apresentação
                </VideoPlaceholderText>
                <VideoPlaceholderSub>
                  (pode ser MP4 via &lt;video&gt; ou YouTube via &lt;iframe&gt;)
                </VideoPlaceholderSub>
              </VideoPlaceholder>

              {/* Exemplo rápido (descomente quando tiver URL):
              <Iframe
                src="https://www.youtube.com/embed/SEU_ID"
                title="Boas-vindas Forecast"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              */}
            </VideoWrap>

            <VideoFooter>
              <SmallNote>
                Dica: comece conectando um marketplace e escolhendo um produto no
                Dashboard.
              </SmallNote>
              <PrimaryBtnSmall href="/dashboard">Começar agora</PrimaryBtnSmall>
            </VideoFooter>
          </VideoCard>
        </Hero>

        {/* Seção “Como funciona” */}
        <Section>
          <H2>Como a Forecast funciona</H2>

          <Steps>
            <StepCard>
              <StepNum>1</StepNum>
              <div>
                <StepTitle>Conecte seus marketplaces</StepTitle>
                <StepText>
                  Integre canais como Mercado Livre, Shopee, Amazon e Magalu
                  para capturar pedidos.
                </StepText>
              </div>
            </StepCard>

            <StepCard>
              <StepNum>2</StepNum>
              <div>
                <StepTitle>Centralize e normalize os dados</StepTitle>
                <StepText>
                  Unificamos os pedidos em um esquema único para análise
                  consistente por produto/canal.
                </StepText>
              </div>
            </StepCard>

            <StepCard>
              <StepNum>3</StepNum>
              <div>
                <StepTitle>Acompanhe previsão e realizado</StepTitle>
                <StepText>
                  Veja tendência, confiança, detalhamento diário e top canais no
                  período selecionado.
                </StepText>
              </div>
            </StepCard>
          </Steps>
        </Section>

        {/* Rodapé simples */}
        <Footer>
          <FooterInner>
            <FooterBrand>Forecast</FooterBrand>
            <FooterText>
              © {new Date().getFullYear()} • Previsão de vendas • Multi-marketplace
            </FooterText>
          </FooterInner>
        </Footer>
      </Container>
    </Page>
  )
}
