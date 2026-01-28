import { useState } from "react"
import styled from "styled-components"
import { ForecastResult } from "../ForecastResult/ForecastResult"

// Container geral com fundo branco leve
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
`

// Caixa central do formulário com sombra e borda arredondada
const Card = styled.div`
  padding: 32px 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`

const Form = styled.form`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Input = styled.input`
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  width: 240px;
  font-size: 14px;
  outline: none;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const Button = styled.button`
  padding: 14px 22px;
  border-radius: 12px;
  border: none;
  background: #6366f1;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(99, 102, 241, 0.3);
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #4f46e5;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(79, 70, 229, 0.3);
  }
`
interface ForecastFormProps {
  data?: any; // ou coloque ForecastResponse se quiser tipar
  onSubmit: (sku: string) => void;
}
export function ForecastForm( { data, onSubmit }: ForecastFormProps) {
  const [sku, setSku] = useState("")

    function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(sku);
  }
  return (
    <Container>
      <Card>
        <Form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          <Input
            placeholder="Digite o SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
          <Button type="submit">Buscar</Button>

          <ForecastResult data={data} />
        </Form>
      </Card>
    </Container>
  )
}
