import { Copy, Check, Clock } from "lucide-react"
import { Container, LinkText, CopyButton, TimerText } from "./styles"
import { AuthorizationLinkProps } from "./types"
import { useAuthorizationStates } from "@/app/hooks/dynamicForm/authorizationLink/useAuthorizationStates"

export function AuthorizationLink({ url, setUrl }: AuthorizationLinkProps) {
    const states = useAuthorizationStates({ url, setUrl })

    const { expired, maskedUrl, timeLeft, copied, setCopied, handleCopy } = states

    return (
        <Container>
            <LinkText title={expired ? "Link expirado" : url}>
                {expired ? "Link expirado" : maskedUrl}
            </LinkText>

            {!expired && (
                <TimerText>
                    <Clock size={14} />
                    expira em {timeLeft}s
                </TimerText>
            )}

            <CopyButton
                type="button"
                onClick={handleCopy}
                disabled={expired}
            >
                {copied ? <Check size={16} /> : <Copy size={16} />}
            </CopyButton>
        </Container>
    )
}
