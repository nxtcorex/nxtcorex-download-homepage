import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Terminal from '@/components/Terminal'
import Footer from '@/components/Footer'
import dict from '@/lib/i18n'

export const metadata: Metadata = {
  title: dict.en.meta.title,
  description: dict.en.meta.description,
  alternates: {
    languages: {
      'zh-CN': '/',
      'en': '/en',
    },
  },
}

export default function HomeEn() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar locale="en" />
      <div className="flex-1">
        <Hero locale="en" />
        <Terminal />
      </div>
      <Footer locale="en" />
    </main>
  )
}
