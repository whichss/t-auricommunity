import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AURI Community",
  description: "다음 세대를 위한 단체, AURI Community입니다.",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/images/logo.png' },
      { url: '/images/logo-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logo-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/images/logo.png',
    apple: [
      { url: '/images/logo.png' },
      { url: '/images/logo-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/images/logo.png',
      },
      {
        rel: 'mask-icon',
        url: '/images/logo.svg',
        color: '#ffffff'
      }
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
