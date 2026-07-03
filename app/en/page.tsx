import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Features from '@/components/Features'
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
    <main className="min-h-screen bg-background text-foreground">
      <Navbar locale="en" />
      <Hero locale="en" />
      <Stats locale="en" />
      <Features locale="en" />
      <Terminal />
      <Footer locale="en" />
    </main>
  )
}
