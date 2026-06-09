'use client'

import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
        <path d="M20 6 L20 34 M6 20 L34 20" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
        <circle cx="32" cy="14" r="2" fill="currentColor" opacity="0.7" />
        <circle cx="10" cy="28" r="2" fill="currentColor" opacity="0.6" />
        <line x1="20" y1="20" x2="32" y2="14" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
      </svg>
    ),
    title: 'Anycast 智能路由',
    description: '同一 IP 多地通告，BGP 层面自动选路，用户始终连接到物理距离最近的 PoP，无需客户端任何配置。',
    metric: 'RTT 降低最高 73%',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
        <path d="M8 32 L8 16 Q8 8 16 8 L24 8 Q32 8 32 16 L32 32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="4" y1="32" x2="36" y2="32" stroke="currentColor" strokeWidth="1.2" />
        <path d="M20 24 L20 16 M17 19 L20 16 L23 19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: '断点续传 & 并发分片',
    description: '支持 HTTP Range 请求，客户端可并发多线程分片下载，异常中断后无需从头重传，节省带宽与时间。',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
        <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.7" />
        <circle cx="28" cy="16" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="24" cy="28" r="2" fill="currentColor" opacity="0.7" />
      </svg>
    ),
    title: '全球节点覆盖',
    description: '依托 Cloudflare 全球 300+ 边缘节点，文件就近分发，无论用户身处何地都能获得极速下载体验。',
    metric: '覆盖 100+ 国家',
  },
]

export default function Features() {
  return (
    <section id="features" className="border-y bg-muted/20 py-16 md:py-24">
      <div className="section-shell">
        <div className="mb-12 text-center lg:text-left">
          <div className="eyebrow mb-5 justify-center lg:justify-start">核心能力</div>
          <h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl lg:text-5xl">
            为大文件传输<br />专门设计
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="group min-h-[300px] border bg-card/80 transition-colors hover:bg-accent/60">
              <CardContent className="flex h-full flex-col p-8 sm:p-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-md border bg-muted text-muted-foreground transition-colors group-hover:text-foreground">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-lg font-medium leading-snug text-foreground">{feature.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{feature.description}</p>
                <div className="mt-auto pt-7 font-mono text-[11px] tracking-normal text-muted-foreground">{feature.metric}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
