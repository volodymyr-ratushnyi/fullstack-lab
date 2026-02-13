import {metaData} from "@/constants/constants";
import Header from "@UI/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@providers/Providers"
import "./globals.css";

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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <Providers>
        <Header/>
        <main
          className={"flex flex-col justify-start items-center w-full"}
          style={{height: `calc(100vh - ${metaData.headerHeight} - ${metaData.footerHeight})`}}
        >
          {children}
        </main>
        <footer
          className={"flex justify-center items-center"}
          style={{height: metaData.footerHeight}}
        >
          <p>{metaData.description}</p>
        </footer>
      </Providers>
      </body>
    </html>
  );
}
