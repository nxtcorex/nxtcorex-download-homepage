import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import PageTransition from '@/components/PageTransition'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'nxtcorex下载加速 - 每一字节 极速抵达',
  description: 'nxtcorex 下载加速服务，基于全球网络的专业文件加速',
  icons: {
    icon: '/img/logo_c.webp',
  },
  alternates: {
    languages: {
      'zh-CN': '/',
      'en': '/en',
    },
  },
}

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.classList.add(t);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  } catch (e) {
    document.documentElement.classList.add('light');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
