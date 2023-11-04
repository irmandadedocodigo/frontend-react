import 'dotenv/config'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Irmandade do código',
  description: 'Site da irmandade do código, uma comunidade de desenvolvedores',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
