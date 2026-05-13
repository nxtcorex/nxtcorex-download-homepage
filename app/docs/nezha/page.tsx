import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '哪吒监控下载 - nxtcorex下载加速',
  description: '哪吒监控 - 服务器监控与运维管理工具下载',
}

export default function NezhaPage() {
  return (
    <main className="min-h-screen bg-brand-bg flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-16 px-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/docs" className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-text text-sm mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回文档列表
          </Link>

          <h1 className="text-4xl font-medium text-brand-text mb-4 tracking-tight">
            哪吒监控
          </h1>
          <p className="text-brand-text-secondary text-lg mb-8">
            服务器监控与运维管理工具
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="https://cdn1.download.anycast.ren/dl/nezhamonitoring/liunx/install.sh"
              className="btn-primary inline-flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              下载安装脚本
            </a>
          </div>

          <div className="bg-brand-bg-secondary border border-white/[0.07] rounded-lg p-6">
            <h2 className="text-xl font-medium text-brand-text mb-6">安装脚本</h2>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-brand-text-secondary text-sm min-w-[120px]">Linux 安装:</span>
              <a
                href="https://cdn1.download.anycast.ren/dl/nezhamonitoring/liunx/install.sh"
                className="text-brand-orange text-sm font-mono hover:underline break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://cdn1.download.anycast.ren/dl/nezhamonitoring/liunx/install.sh
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
