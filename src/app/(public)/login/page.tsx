'use client'
import React from "react"
import { Mail, Lock, LineChart, Boxes, ShoppingBag, Store, Globe, Sparkles, ShieldCheck } from "lucide-react"

import {
  Page,
  Bg,
  GlowA,
  GlowB,
  Grid,
  Left,
  BrandRow,
  LogoMark,
  BrandText,
  BrandName,
  BrandTag,
  Hero,
  HeroTitle,
  HeroSub,
  Pills,
  Pill,
  MarketplacePanel,
  PanelTitle,
  PanelSub,
  MarketIcons,
  MarketIcon,
  MiniStats,
  Stat,
  StatTop,
  StatValue,
  StatHint,
  FooterNote,
  Dot,
  Right,
  Card,
  CardGlow,
  CardHeader,
  CardEyebrow,
  CardTitle,
  CardSub,
  FormSlot,
  Form,
  Field,
  Label,
  InputWrap,
  Icon,
  Input,
  Row,
  Remember,
  LinkBtn,
  PrimaryBtn,
  Divider,
  SecondaryBtn,
  Badge,
  BottomText,
  ErrorBox,
  RightHint,
  HintIcon,
} from "./styles"
import { login } from "@/app/services/login/login.service"
import { useRouter } from "next/navigation"

type Props = {
  // Pluga no que você já tem:
  email?: string
  password?: string
  loading?: boolean
  error?: string | null
  onChangeEmail?: (v: string) => void
  onChangePassword?: (v: string) => void
  onSubmit?: () => void

  // Alternativa: se você usa Formik/Yup, só renderiza seu <Formik> aqui dentro:
  renderForm?: () => React.ReactNode
}

export default function Login({
  loading = false,
  error = null,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  renderForm,
}: Props) {

  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [localLoading, setLocalLoading] = React.useState(false)
  const [localError, setLocalError] = React.useState<string | null>(null)
  const router = useRouter()
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLocalError(null)

    try {
      setLocalLoading(true)

      await login({ email, password })

      router.push("/home")
    } catch (err: any) {

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Falha no login"

      setLocalError(message)
    } finally {
      setLocalLoading(false)
    }
  }

  return (
    <Page>
      <Bg>
        <GlowA />
        <GlowB />
        <Grid>
          {/* LEFT: Branding + value */}
          <Left>
            <BrandRow>
              <LogoMark aria-hidden>
                <Sparkles size={18} />
              </LogoMark>
              <BrandText>
                <BrandName>Forecast Hub</BrandName>
                <BrandTag>Previsão • Estoque • Multi-marketplace</BrandTag>
              </BrandText>
            </BrandRow>

            <Hero>
              <HeroTitle>
                Centralize marketplaces e antecipe suas decisões com previsões inteligentes.
              </HeroTitle>
              <HeroSub>
                Um hub único para conectar Shopee, Mercado Livre, Magalu e outros — com visão consolidada,
                previsão de vendas e previsão de estoque.
              </HeroSub>
            </Hero>

            <Pills>
              <Pill>
                <LineChart size={16} />
                <span>Previsão de Vendas</span>
              </Pill>
              <Pill>
                <Boxes size={16} />
                <span>Previsão de Estoque</span>
              </Pill>
              <Pill>
                <Globe size={16} />
                <span>Multi Marketplace</span>
              </Pill>
              <Pill>
                <ShieldCheck size={16} />
                <span>Dados Seguros</span>
              </Pill>
            </Pills>

            <MarketplacePanel>
              <PanelTitle>Conecte seus canais</PanelTitle>
              <PanelSub>Visualize e compare performance por marketplace — ou tudo junto.</PanelSub>

              <MarketIcons>
                <MarketIcon title="Mercado Livre">
                  <Store size={18} />
                  <span>Mercado Livre</span>
                </MarketIcon>
                <MarketIcon title="Shopee">
                  <ShoppingBag size={18} />
                  <span>Shopee</span>
                </MarketIcon>
                <MarketIcon title="Magalu">
                  <Store size={18} />
                  <span>Magalu</span>
                </MarketIcon>
                <MarketIcon title="Outros">
                  <Globe size={18} />
                  <span>Outros</span>
                </MarketIcon>
              </MarketIcons>

              <MiniStats>
                <Stat>
                  <StatTop>Consolidação</StatTop>
                  <StatValue>1 painel</StatValue>
                  <StatHint>por entidadeId</StatHint>
                </Stat>
                <Stat>
                  <StatTop>Visão</StatTop>
                  <StatValue>360°</StatValue>
                  <StatHint>vendas/estoque</StatHint>
                </Stat>
                <Stat>
                  <StatTop>Confiabilidade</StatTop>
                  <StatValue>Alta</StatValue>
                  <StatHint>por histórico</StatHint>
                </Stat>
              </MiniStats>
            </MarketplacePanel>

            <FooterNote>
              <Dot /> Dica: use um e-mail de acesso da sua operação para conectar múltiplas lojas com segurança.
            </FooterNote>
          </Left>

          {/* RIGHT: Login Card */}
          <Right>
            <Card>
              <CardHeader>
                <CardEyebrow>Bem-vindo de volta</CardEyebrow>
                <CardTitle>Entrar</CardTitle>
                <CardSub>Faça login para acessar seu painel de previsões.</CardSub>
              </CardHeader>

              {/* Se você já tem Formik/Yup, passa renderForm */}
              {renderForm ? (
                <FormSlot>{renderForm()}</FormSlot>
              ) : (
                <Form onSubmit={handleSubmit}
                >
                  <Field>
                    <Label>E-mail</Label>
                    <InputWrap>
                      <Icon>
                        <Mail size={18} />
                      </Icon>
                      <Input
                        value={email}
                        onChange={(e) => {
                          const v = e.target.value
                          setEmail(v)            // ✅ isso libera digitar
                          onChangeEmail?.(v)     // opcional: mantém compatível com props
                        }}
                        placeholder="seuemail@empresa.com"
                        autoComplete="email"
                        inputMode="email"
                      />
                    </InputWrap>
                  </Field>

                  <Field>
                    <Label>Senha</Label>
                    <InputWrap>
                      <Icon>
                        <Lock size={18} />
                      </Icon>
                      <Input
                        value={password}
                        onChange={(e) => {
                          const v = e.target.value
                          setPassword(v)         // ✅ isso libera digitar
                          onChangePassword?.(v)  // opcional
                        }}
                        placeholder="••••••••••"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                      />
                    </InputWrap>
                  </Field>

                  {error ? <ErrorBox>{error}</ErrorBox> : null}

                  <Row>
                    <Remember>
                      <input type="checkbox" />
                      <span>Manter conectado</span>
                    </Remember>
                    <LinkBtn type="button">Esqueci a senha</LinkBtn>
                  </Row>

                  <PrimaryBtn type="submit" disabled={loading || !email || !password}>
                    {loading ? "Entrando..." : "Entrar no Hub"}
                  </PrimaryBtn>

                  <Divider>
                    <span>ou</span>
                  </Divider>

                  <SecondaryBtn type="button">
                    <span>Continuar com Google</span>
                    <Badge>Em breve</Badge>
                  </SecondaryBtn>

                  <BottomText>
                    Não tem conta? <a href="/register">Criar agora</a>
                  </BottomText>
                </Form>
              )}

              <CardGlow aria-hidden />
            </Card>

            <RightHint>
              <HintIcon aria-hidden>
                <Sparkles size={16} />
              </HintIcon>
              <span>
                Previsões mais assertivas quando você integra mais marketplaces e mantém o histórico completo.
              </span>
            </RightHint>
          </Right>
        </Grid>
      </Bg>
    </Page>
  )
}