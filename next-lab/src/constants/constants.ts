export const metaData = {
  title: "Next lab",
  description: "For learning next.js",
  icons: {
    icon: '/cool_wolf_sunglasses.svg',
  },
  headerHeight: "60px",
  footerHeight: "80px",

} as const;

export enum AuthStatuses {
  LOADING = "loading",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
}
