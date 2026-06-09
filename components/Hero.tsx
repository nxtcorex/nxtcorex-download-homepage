'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Globe from './Globe'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden border-b pt-16">
      <div className="absolute inset-0 panel-grid opacity-[0.18]" />
      <div className="absolute inset-x-0 top-16 h-px bg-border" />
      <div className="section-shell relative grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-8 py-14 lg:grid-cols-[0.86fr_1.14fr] lg:py-20">
        <div className="relative z-10 text-center lg:text-left">
          <Badge variant="secondary" className="mb-6 rounded-md px-2.5 py-1 font-mono text-[11px] uppercase tracking-normal text-muted-foreground">
            Powered by Cloudflare Network
          </Badge>

          <h1 className="mx-auto mb-5 max-w-[720px] text-4xl font-semibold leading-[1.05] tracking-normal text-foreground sm:text-6xl lg:mx-0 lg:text-[72px]">
            每一字节<br />
            <em className="not-italic text-muted-foreground">极速</em>抵达
          </h1>

          <p className="mx-auto mb-8 max-w-[470px] text-sm leading-7 text-muted-foreground sm:text-base lg:mx-0">
            依托 Cloudflare 全球 Anycast 骨干网络，文件下载请求在毫秒内路由至最近节点，带宽不再是瓶颈。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button asChild size="lg" className="font-medium">
              <Link href="/download">立即体验</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group bg-background/70 text-muted-foreground hover:text-foreground">
              <Link href="/download">
                了解工作原理
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[620px]">
          <Card className="absolute inset-x-4 top-8 h-[76%] border bg-card/70 shadow-panel lg:inset-x-10" />
          <div className="relative z-10">
            <Globe />
          </div>
        </div>
      </div>
    </section>
  )
}
