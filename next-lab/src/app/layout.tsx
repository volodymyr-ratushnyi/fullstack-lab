import {ClientProviders} from "@/app/api/(providers)/client-providers"
import { sizes } from "@/shared/config/layouts.config"
import { metaData } from "@/shared/config/seo.config"
import Header from "@/widgets/Header/ui/Header"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.scss"
import { ReactNode } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = metaData

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          <Header/>
          <main>
            {children}
          </main>
          <footer
            className={"flex justify-center items-center"}
            style={{height: sizes.footerHeight}}
          >
            <p>{metaData.description}</p>
          </footer>
        </ClientProviders>
      </body>
    </html>
  )
}
