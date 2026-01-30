import { Badge } from "./styles"

interface StatusProps {
  status: string
  formData: {
    expires_in?: number
    [key: string]: any
  }
}

export const LiveStatus = ({ status, formData }: StatusProps) => {
  return (
    <Badge status={status}>
      Expira em {formData.expires_in}s
    </Badge>
  )
}
