import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import DownloadSelector from '@/components/download/DownloadSelector'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const archOptions = [
  { value: 'universal', label: '通用版' },
  { value: 'arm64-v8a', label: 'ARM64-V8A' },
  { value: 'armeabi-v7a', label: 'ARMv7' },
  { value: 'x86', label: 'X86' },
  { value: 'x86_64', label: 'X86_64' },
]

export default function ZL2Page() {
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
            <h1 className="mb-4 text-4xl font-semibold tracking-normal text-foreground">ZL2 (Zalith Launcher 2)</h1>
            <p className="text-lg text-muted-foreground">Zalith Launcher 第二代，全新架构设计</p>
          </div>

          <DownloadSelector
            repo="ZalithLauncher/ZalithLauncher2"
            product="zl2"
            initialVersion=""
            initialArch="universal"
            archOptions={archOptions}
          />

          <Card className="border bg-card/80">
            <CardHeader>
              <CardTitle className="text-xl font-medium">GitHub 路径转换规则</CardTitle>
              <p className="text-sm text-muted-foreground">将 GitHub 发布链接转换为加速地址</p>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border bg-background p-4">
                <div className="mb-3">
                  <span className="mb-1 block text-xs text-muted-foreground">GitHub 原始路径:</span>
                  <span className="block break-all font-mono text-xs text-muted-foreground">
                    https://github.com/ZalithLauncher/ZalithLauncher2/releases/download/2.0.0_beta-20250920a/ZalithLauncher-2.0.0_beta-20250920a-x86_64.apk
                  </span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-foreground">加速地址:</span>
                  <a href="https://cdn1.download.nxtcorex.top/dl/zl2/2.0.0_beta-20250920a/ZalithLauncher-2.0.0_beta-20250920a-x86_64.apk" className="block break-all font-mono text-xs text-foreground underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                    https://cdn1.download.nxtcorex.top/dl/zl2/2.0.0_beta-20250920a/ZalithLauncher-2.0.0_beta-20250920a-x86_64.apk
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
