import type { Metadata } from 'next'
import { DM_Mono, DM_Sans, Playfair_Display } from 'next/font/google'
import PageTransition from '@/components/PageTransition'
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
  title: 'nxtcorex下载加速 - 每一字节 极速抵达',
  description: 'nxtcorex 下载加速服务，基于全球网络的专业文件加速',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${dmSans.variable} ${dmMono.variable} ${playfair.variable}`}>
      <body className="bg-brand-bg text-brand-text font-sans antialiased">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
