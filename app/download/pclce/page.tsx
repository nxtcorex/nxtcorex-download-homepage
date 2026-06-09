import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import DownloadSelector from '@/components/download/DownloadSelector'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const archOptions = [
  { value: 'x64', label: 'X64' },
  { value: 'ARM64', label: 'ARM64' },
]

function getDownloadUrl(version: string, arch: string) {
  if (version === 'latest') {
    return `https://cdn1.download.nxtcorex.top/dl/pclce/pcl2ce/PCL2_CE_Release_${arch}.exe`
  }

  return `https://cdn1.download.nxtcorex.top/dl/pclce/pcl2ce/${version}/PCL2_CE_Release_${arch}.exe`
}

function getVersionDisplayName(version: string) {
  if (version === 'latest') return '最新版本'
  return version
}

export default function PCLCEPage() {
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
            <h1 className="mb-4 text-4xl font-semibold tracking-normal text-foreground">PCLCE</h1>
            <p className="text-lg text-muted-foreground">PCL2启动器社区版</p>
          </div>

          <DownloadSelector
            repo="PCL-Community/PCL-CE"
            product="pclce"
            initialVersion="latest"
            initialArch="x64"
            archOptions={archOptions}
            filterBeta
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
                    https://github.com/PCL-Community/PCL-CE/releases/download/v2.14.6/PCL2_CE_Release_x64.exe
                  </span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-foreground">加速地址:</span>
                  <a href="https://cdn1.download.nxtcorex.top/dl/pclce/pcl2ce/v2.14.6/PCL2_CE_Release_x64.exe" className="block break-all font-mono text-xs text-foreground underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                    https://cdn1.download.nxtcorex.top/dl/pclce/pcl2ce/v2.14.6/PCL2_CE_Release_x64.exe
                  </a>
                </div>
              </div>

              <div className="rounded-md border bg-background p-4">
                <div className="mb-3">
                  <span className="mb-1 block text-xs text-muted-foreground">GitHub 原始路径:</span>
                  <span className="block break-all font-mono text-xs text-muted-foreground">
                    https://github.com/PCL-Community/PCL-CE/releases/download/v2.14.6/PCL2_CE_Release_ARM64.exe
                  </span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-foreground">加速地址:</span>
                  <a href="https://cdn1.download.nxtcorex.top/dl/pclce/pcl2ce/v2.14.6/PCL2_CE_Release_ARM64.exe" className="block break-all font-mono text-xs text-foreground underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                    https://cdn1.download.nxtcorex.top/dl/pclce/pcl2ce/v2.14.6/PCL2_CE_Release_ARM64.exe
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border bg-card/80">
            <CardHeader>
              <CardTitle className="text-xl font-medium">最新版本下载链接</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
