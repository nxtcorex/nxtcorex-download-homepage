import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Terminal from '@/components/Terminal'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex-1">
        <Hero />
        <Terminal />
      </div>
      <Footer />
    </main>
  )
}
