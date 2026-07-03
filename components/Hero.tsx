'use client'

import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Globe from './Globe'
import dict, { type Locale, localizedHref } from '@/lib/i18n'

interface HeroProps {
  locale?: Locale
}

export default function Hero({ locale = 'zh' }: HeroProps) {
  const t = dict[locale].hero

  return (
    <section className="relative min-h-screen overflow-hidden border-b pt-16">
      <div className="absolute inset-0 panel-grid opacity-[0.18]" />
      <div className="absolute inset-x-0 top-16 h-px bg-border" />
      <div className="section-shell relative grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-8 py-14 lg:grid-cols-[0.86fr_1.14fr] lg:py-20">
        <div className="relative z-10 text-center lg:text-left">
          <Badge variant="secondary" className="mb-6 rounded-md px-2.5 py-1 font-mono text-[11px] uppercase tracking-normal text-muted-foreground">
            {t.badge}
          </Badge>

          <h1 className="mx-auto mb-5 max-w-[720px] text-4xl font-semibold leading-[1.05] tracking-normal text-foreground sm:text-6xl lg:mx-0 lg:text-[72px]">
            {t.headline1}<br />
            <em className="not-italic text-muted-foreground">{t.headline2}</em>{t.headline3}
          </h1>

          <p className="mx-auto mb-8 max-w-[470px] text-sm leading-7 text-muted-foreground sm:text-base lg:mx-0">
            {t.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button asChild size="lg" className="font-medium">
              <Link href={localizedHref('/download', locale)}>{t.cta}</Link>
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
