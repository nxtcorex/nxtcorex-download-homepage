import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import WanyinDownload from '@/components/download/WanyinDownload'
import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { fetchWanyinReleases } from '@/lib/wanyin'

export const metadata: Metadata = {
  title: 'Wanyin Download - nxtcorex Download Accelerator',
  description: 'Wanyin — music player for smartwatches, APK downloads',
}

export default async function WanyinPageEn() {
  const releases = await fetchWanyinReleases()

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar locale="en" />

      <div className="flex-grow border-b pt-24 pb-16">
        <div className="section-shell max-w-4xl">
          <Link href="/en/download" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to downloads
          </Link>

          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-semibold tracking-normal text-foreground">Wanyin</h1>
            <p className="text-lg text-muted-foreground">Music player for smartwatches</p>
          </div>

          <WanyinDownload releases={releases} locale="en" />
        </div>
      </div>

      <Footer locale="en" />
    </main>
  )
}
