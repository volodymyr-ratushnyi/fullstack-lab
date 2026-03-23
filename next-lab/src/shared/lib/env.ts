const getEnv = (key: string): string => {
  const value = process.env[key]
  if (!value) throw new Error(`Missing environment variable: ${key}`)
  return value
}

export const env = {
  AUTH_GITHUB_ID: getEnv("AUTH_GITHUB_ID"),
  AUTH_GITHUB_SECRET: getEnv("AUTH_GITHUB_SECRET"),
  GOOGLE_ID: getEnv("GOOGLE_ID"),
  GOOGLE_SECRET: getEnv("GOOGLE_SECRET"),
}
