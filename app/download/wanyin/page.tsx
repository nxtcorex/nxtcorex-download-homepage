import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import WanyinDownload from '@/components/download/WanyinDownload'
import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { fetchWanyinReleases } from '@/lib/wanyin'

export const metadata: Metadata = {
  title: '腕音下载 - nxtcorex下载加速',
  description: '腕音 (Wanyin) 手表音乐播放器 APK 下载',
}

export default async function WanyinPage() {
  const releases = await fetchWanyinReleases()

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <div className="flex-grow border-b pt-24 pb-16">
        <div className="section-shell max-w-4xl">
          <Link href="/download" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            返回下载列表
          </Link>

          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-semibold tracking-normal text-foreground">腕音 (Wanyin)</h1>
            <p className="text-lg text-muted-foreground">手表音乐播放器</p>
          </div>

          <WanyinDownload releases={releases} />
        </div>
      </div>

      <Footer />
    </main>
  )
}
