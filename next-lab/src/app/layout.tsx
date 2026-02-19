import {ClientProviders} from "@/app/(providers)/client-providers"
import { metaData } from "@/shared/config/seo.config"
import Footer from "@/widgets/Footer/ui/Footer"
import Header from "@/widgets/Header/ui/Header"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.scss"
import { ReactNode } from "react"

const geistSans = Geist({
  weight: '400',
  subsets: ["latin"]
})

export const metadata: Metadata = metaData

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className}>
      <body>
        <ClientProviders>
          <Header/>
          <main>
            {children}
          </main>
          <Footer/>
        </ClientProviders>
      </body>
    </html>
  )
}
