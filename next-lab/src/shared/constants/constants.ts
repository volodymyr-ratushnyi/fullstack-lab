export enum AuthStatuses {
  LOADING = "loading",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
}
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
