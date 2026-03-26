import { useEffect, useState } from "react"
const EXPIRATION_TIME = 30

export const useAuthorizationStates = ({ url, setUrl }: { url: string; setUrl: (url: string) => void }) => {
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

    return { 
        copied,
        setCopied,
        timeLeft,
        setTimeLeft,
        expired,
        maskedUrl,
        handleCopy
     }
}