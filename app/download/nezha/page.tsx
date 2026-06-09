import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Download } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '哪吒监控下载 - nxtcorex下载加速',
  description: '哪吒监控 - 服务器监控与运维管理工具下载',
}

const downloadUrl = 'https://cdn1.download.nxtcorex.top/dl/nezhamonitoring/liunx/install.sh'

export default function NezhaPage() {
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
            <h1 className="mb-4 text-4xl font-semibold tracking-normal text-foreground">哪吒监控</h1>
            <p className="text-lg text-muted-foreground">服务器监控与运维管理工具</p>
          </div>

          <div className="mb-8">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                下载安装脚本
              </a>
            </Button>
          </div>

          <Card className="border bg-card/80">
            <CardHeader>
              <CardTitle className="text-xl font-medium">安装脚本</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-[120px_1fr] sm:items-center">
                <span className="text-sm text-muted-foreground">Linux 安装:</span>
                <a href={downloadUrl} className="break-all font-mono text-sm text-foreground underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                  {downloadUrl}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
