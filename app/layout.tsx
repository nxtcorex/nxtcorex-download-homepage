import type { Metadata } from 'next'
import { DM_Sans, DM_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'anycast.ren - 每一字节 极速抵达',
  description: '基于 Cloudflare 网络的全球加速服务，310+ 边缘节点，99.99% 服务可用性',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${dmSans.variable} ${dmMono.variable} ${playfair.variable}`}>
      <body className="bg-brand-bg text-brand-text font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
