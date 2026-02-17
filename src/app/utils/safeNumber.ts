export function safeNumber(v: any) {
    const n = Number(v)
    return Number.isFinite(n) ? n : 0
  }
