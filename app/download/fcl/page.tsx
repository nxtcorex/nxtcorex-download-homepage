import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import DownloadSelector from '@/components/download/DownloadSelector'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const archOptions = [
  { value: 'all', label: '通用架构' },
  { value: 'arm64-v8a', label: 'ARM64' },
  { value: 'armeabi-v7a', label: 'ARMv7' },
  { value: 'x86', label: 'x86' },
  { value: 'x86_64', label: 'x86_64' },
]

function getDownloadUrl(version: string, arch: string) {
  if (version === 'latest') {
    return `https://cdn1.download.nxtcorex.top/dl/fcl/latest/FCL-release-${arch}.apk`
  }

  return `https://cdn1.download.nxtcorex.top/dl/fcl/${version}/FCL-release-${version}-${arch}.apk`
}

function getVersionDisplayName(version: string) {
  if (version === 'latest') return '最新版本'
  return version
}

export default function FCLPage() {
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
            <h1 className="mb-4 text-4xl font-semibold tracking-normal text-foreground">FCL (Fold Craft Launcher)</h1>
            <p className="text-lg text-muted-foreground">Android Minecraft 启动器，支持多架构</p>
          </div>

          <DownloadSelector
            repo="FCL-Team/FoldCraftLauncher"
            product="fcl"
            initialVersion="latest"
            initialArch="all"
            archOptions={archOptions}
          />

          <Card className="mb-6 border bg-card/80">
            <CardHeader>
              <CardTitle className="text-xl font-medium">GitHub 路径转换规则</CardTitle>
              <p className="text-sm text-muted-foreground">将 GitHub 发布链接转换为加速地址</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border bg-background p-4">
                <div className="mb-3">
                  <span className="mb-1 block text-xs text-muted-foreground">GitHub 原始路径:</span>
                  <span className="block break-all font-mono text-xs text-muted-foreground">
                    https://github.com/FCL-Team/FoldCraftLauncher/releases/download/1.2.3.1/FCL-release-1.2.3.1-all.apk
                  </span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-foreground">加速地址:</span>
                  <a href="https://cdn1.download.nxtcorex.top/dl/fcl/1.2.3.1/FCL-release-1.2.3.1-all.apk" className="block break-all font-mono text-xs text-foreground underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                    https://cdn1.download.nxtcorex.top/dl/fcl/1.2.3.1/FCL-release-1.2.3.1-all.apk
                  </a>
                </div>
              </div>

              <div className="rounded-md border bg-background p-4">
                <div className="mb-3">
                  <span className="mb-1 block text-xs text-muted-foreground">GitHub 原始路径:</span>
                  <span className="block break-all font-mono text-xs text-muted-foreground">
                    https://github.com/FCL-Team/FoldCraftLauncher/releases/download/1.2.3.1/FCL-release-1.2.3.1-arm64-v8a.apk
                  </span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-foreground">加速地址:</span>
                  <a href="https://cdn1.download.nxtcorex.top/dl/fcl/1.2.3.1/FCL-release-1.2.3.1-arm64-v8a.apk" className="block break-all font-mono text-xs text-foreground underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                    https://cdn1.download.nxtcorex.top/dl/fcl/1.2.3.1/FCL-release-1.2.3.1-arm64-v8a.apk
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border bg-card/80">
            <CardHeader>
              <CardTitle className="text-xl font-medium">最新版本下载链接</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {archOptions.map((arch) => (
                <div key={arch.value} className="grid gap-2 sm:grid-cols-[100px_1fr] sm:items-center">
                  <span className="text-sm text-muted-foreground">{arch.label}:</span>
                  <a href={getDownloadUrl('latest', arch.value)} className="break-all font-mono text-sm text-foreground underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                    {getDownloadUrl('latest', arch.value)}
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
