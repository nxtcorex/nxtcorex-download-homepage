'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const steps = [
  {
    number: '01',
    title: 'DNS 解析 Anycast IP',
    description: '用户发起下载请求时，DNS 将同一个 IP 地址通告至全球所有 PoP，BGP 路由自动将请求引导至网络拓扑最近的节点。',
  },
  {
    number: '02',
    title: 'HTTP/3 & QUIC 传输',
    description: '全链路启用 HTTP/3，消除队头阻塞，在弱网与高丢包环境下依然保持稳定的吞吐量。',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="section-shell">
        <div className="mb-12 text-center lg:text-left">
          <div className="eyebrow mb-5 justify-center lg:justify-start">工作原理</div>
          <h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl lg:text-5xl">
            请求如何在<br />毫秒内找到最近节点
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-3">
            {steps.map((step) => (
              <Card key={step.number} className="border bg-card/80">
                <CardContent className="grid grid-cols-[48px_1fr] gap-5 p-6 sm:grid-cols-[64px_1fr] sm:p-8">
                  <div className="pt-1 font-mono text-[11px] tracking-normal text-muted-foreground">{step.number}</div>
                  <div>
                    <h3 className="mb-2 text-base font-medium text-foreground">{step.title}</h3>
                    <p className="text-sm font-light leading-[1.75] text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="relative overflow-hidden border bg-card/80 shadow-panel">
            <div className="absolute inset-0 panel-grid opacity-[0.14]" />
            <CardContent className="relative p-5 sm:p-8">
              <svg viewBox="0 0 380 300" className="w-full" fill="none">
                <line x1="190" y1="50" x2="80" y2="150" stroke="hsl(var(--muted-foreground) / 0.34)" strokeWidth="1" strokeDasharray="4,3" />
                <line x1="190" y1="50" x2="190" y2="150" stroke="hsl(var(--foreground) / 0.52)" strokeWidth="1.2" />
                <line x1="190" y1="50" x2="300" y2="150" stroke="hsl(var(--muted-foreground) / 0.34)" strokeWidth="1" strokeDasharray="4,3" />
                <line x1="80" y1="150" x2="50" y2="250" stroke="hsl(var(--border))" strokeWidth="0.8" />
                <line x1="80" y1="150" x2="140" y2="250" stroke="hsl(var(--border))" strokeWidth="0.8" />
                <line x1="190" y1="150" x2="190" y2="250" stroke="hsl(var(--muted-foreground) / 0.35)" strokeWidth="1" />
                <line x1="300" y1="150" x2="250" y2="250" stroke="hsl(var(--border))" strokeWidth="0.8" />
                <line x1="300" y1="150" x2="340" y2="250" stroke="hsl(var(--border))" strokeWidth="0.8" />

                <circle cx="190" cy="50" r="22" fill="hsl(var(--muted) / 0.55)" stroke="hsl(var(--foreground) / 0.5)" strokeWidth="1" />
                <text x="190" y="46" textAnchor="middle" fill="hsl(var(--foreground))" fontFamily="monospace" fontSize="9">CF</text>
                <text x="190" y="58" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontFamily="monospace" fontSize="7">ANYCAST</text>

                <circle cx="80" cy="150" r="16" fill="hsl(var(--muted) / 0.45)" stroke="hsl(var(--muted-foreground) / 0.5)" strokeWidth="0.8" />
                <text x="80" y="154" textAnchor="middle" fill="hsl(var(--foreground) / 0.82)" fontFamily="monospace" fontSize="8">HKG</text>

                <circle cx="190" cy="150" r="16" fill="hsl(var(--foreground) / 0.08)" stroke="hsl(var(--foreground) / 0.5)" strokeWidth="0.8" />
                <text x="190" y="154" textAnchor="middle" fill="hsl(var(--foreground))" fontFamily="monospace" fontSize="8">NRT</text>

                <circle cx="300" cy="150" r="16" fill="hsl(var(--muted) / 0.35)" stroke="hsl(var(--muted-foreground) / 0.42)" strokeWidth="0.8" />
                <text x="300" y="154" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontFamily="monospace" fontSize="8">SIN</text>

                {[
                  ['50', 'SHA'],
                  ['140', 'ICN'],
                  ['190', 'TPE'],
                  ['250', 'KUL'],
                  ['340', 'CGK'],
                ].map(([x, label]) => (
                  <g key={label}>
                    <circle cx={x} cy="250" r="10" fill="hsl(var(--muted) / 0.28)" stroke="hsl(var(--border))" strokeWidth="0.7" />
                    <text x={x} y="254" textAnchor="middle" fill="hsl(var(--muted-foreground) / 0.7)" fontFamily="monospace" fontSize="7">{label}</text>
                  </g>
                ))}
              </svg>
              <Badge variant="outline" className="mt-6 bg-background/70 px-3 py-1.5 font-mono text-xs tracking-normal text-muted-foreground">
                <span className="mr-2 h-2 w-2 bg-muted-foreground" />
                Powered by Cloudflare Network — AS13335
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
