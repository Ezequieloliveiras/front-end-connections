// configPath.ts
export function getByPath(obj: any, path: string) {
  return path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), obj)
}

export function setByPath(obj: any, path: string, value: any) {
  const keys = path.split(".")
  let cur = obj
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]
    if (!cur[k] || typeof cur[k] !== "object") cur[k] = {}
    cur = cur[k]
  }
  cur[keys[keys.length - 1]] = value
}
