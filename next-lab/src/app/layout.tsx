import { sizes } from "@/config/layouts.config";
import { metaData } from "@/config/seo.config";
import AppLoader from "@/hoc/AppLoader";
import ServerProviders from "@/providers/ServerProviders";
import Header from "@UI/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientProviders from "@/providers/ClientProviders"
import "./globals.css";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = metaData;

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
      <ServerProviders>
        <ClientProviders>
          <AppLoader>
            <Header/>
            <main
              className={"flex flex-col justify-start items-center w-full"}
              style={{height: `calc(100vh - ${sizes.headerHeight} - ${sizes.footerHeight})`}}
            >
              {children}
            </main>
            <footer
              className={"flex justify-center items-center"}
              style={{height: sizes.footerHeight}}
            >
              <p>{metaData.description}</p>
            </footer>
          </AppLoader>
        </ClientProviders>
      </ServerProviders>
      </body>
    </html>
  );
}
