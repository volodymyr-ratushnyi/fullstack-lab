export const config: {
  google: {
    app_password: string
    app_email: string
  }
} = {
  google: {
    app_password: process.env.GOOGLE_APP_PASSWORD as string,
    app_email: process.env.GOOGLE_APP_EMAIL as string
  }
} as const
