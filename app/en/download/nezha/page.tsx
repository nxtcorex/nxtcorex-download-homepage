import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Download } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nezha Monitor Download - nxtcorex Download Accelerator',
  description: 'Nezha Monitor — server monitoring tool, accelerated Linux install script',
}

const downloadUrl = 'https://cdn.download.nxtcorex.cn/dl/nezhamonitoring/liunx/install.sh'

export default function NezhaPageEn() {
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
            <h1 className="mb-4 text-4xl font-semibold tracking-normal text-foreground">Nezha Monitor</h1>
            <p className="text-lg text-muted-foreground">Server monitoring and operations management tool</p>
          </div>

          <div className="mb-8">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                Download install script
              </a>
            </Button>
          </div>

          <Card className="border bg-card/80">
            <CardHeader>
              <CardTitle className="text-xl font-medium">Install Script</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-[120px_1fr] sm:items-center">
                <span className="text-sm text-muted-foreground">Linux install:</span>
                <a href={downloadUrl} className="break-all font-mono text-sm text-foreground underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                  {downloadUrl}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer locale="en" />
    </main>
  )
}
