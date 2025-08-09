import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../styles/globals.css'
import { RootProvider } from './root-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Jarvis Visitor System',
  description: 'Sistema de Gerenciamento de Visitantes - Stark Industries',
  openGraph: {
    title: 'Jarvis Visitor System',
    description: 'Sistema de Gerenciamento de Visitantes - Stark Industries',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
