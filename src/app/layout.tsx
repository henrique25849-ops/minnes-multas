import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BottomMenu from '@/components/BottomMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Minnes Multas',
  description: 'App para multas de trânsito',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-white pb-20">
          {children}
          <BottomMenu />
        </div>
      </body>
    </html>
  )
}