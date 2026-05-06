import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import Terminal from '@/components/Terminal'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <Terminal />
      <Footer />
    </main>
  )
}
