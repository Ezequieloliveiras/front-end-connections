import { useEffect, useState } from "react"
import { Copy, Check, Clock } from "lucide-react"

import { Container, LinkText, CopyButton, TimerText } from "./styles"

interface Props {
    url: string
    setUrl: (url: string) => void
}

const EXPIRATION_TIME = 30

export function AuthorizationLink({ url, setUrl }: Props) {
    const [copied, setCopied] = useState(false)
    const [timeLeft, setTimeLeft] = useState(EXPIRATION_TIME)

    const expired = timeLeft <= 0

    const maskedUrl = url.replace(/^(.{40}).*(.{10})$/, "$1...$2")

    // contador regressivo
    useEffect(() => {
        if (expired) return

        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [expired])

    useEffect(() => {
        if (expired) {
            setUrl("")
        }
    }, [expired, setUrl])

    async function handleCopy() {
        if (expired) return

        await navigator.clipboard.writeText(url)
        setCopied(true)

        setTimeout(() => setCopied(false), 2000)
    }

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
