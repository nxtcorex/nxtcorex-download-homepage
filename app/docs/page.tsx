import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const docsItems = [
  {
    title: 'PCLCE',
    description: 'PCL2启动器社区版。',
    href: '/docs/pclce',
  },
  {
    title: '哪吒监控',
    description: '服务器监控与运维管理工具，提供 Linux 安装脚本加速下载。',
    href: '/docs/nezha',
  },
  {
    title: 'FCL (Fold Craft Launcher)',
    description: 'Android Minecraft 启动器，支持通用架构、ARM64、ARMv7、x86、x86_64 多种架构。',
    href: '/docs/fcl',
  },
  {
    title: 'ZL (Zalith Launcher)',
    description: 'Android Minecraft 启动器。',
    href: '/docs/zl',
  },
  {
    title: 'ZL2 (Zalith Launcher 2)',
    description: 'Zalith Launcher 第二代，全新架构设计。',
    href: '/docs/zl2',
  },
  {
    title: 'MG (MobileGlues)',
    description: 'MG渲染器。',
    href: '/docs/mg',
  },
]

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-brand-bg flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-16 px-5 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[11px] text-brand-orange font-mono tracking-[0.12em] uppercase">下载文档</span>
            <span className="flex-1 h-px max-w-10 bg-brand-orange/40"></span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif font-normal leading-tight mb-5">
            选择项目<br />查看下载链接
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.12] border border-white/[0.12]">
            {docsItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="bg-brand-bg-secondary p-10 card-hover"
              >
                <h3 className="text-lg font-medium text-brand-text mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-brand-text-secondary leading-[1.7]">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
