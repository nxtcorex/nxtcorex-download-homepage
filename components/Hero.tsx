'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import Globe from './Globe'
import dict, { type Locale, localizedHref } from '@/lib/i18n'

interface HeroProps {
  locale?: Locale
}

export default function Hero({ locale = 'zh' }: HeroProps) {
  const t = dict[locale].hero

  return (
    <section className="border-b pt-16">
      <div className="section-shell grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {t.headline1}
            <br />
            <span className="text-muted-foreground">{t.headline2}</span>
            {t.headline3}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {t.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={localizedHref('/download', locale)}>{t.cta}</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
          <Globe size={520} />
        </div>
      </div>
    </section>
  )
}
