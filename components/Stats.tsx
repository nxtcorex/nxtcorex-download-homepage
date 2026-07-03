'use client'

import { Card } from '@/components/ui/card'
import dict, { type Locale } from '@/lib/i18n'

interface StatsProps {
  locale?: Locale
}

export default function Stats({ locale = 'zh' }: StatsProps) {
  const stats = dict[locale].stats

  return (
    <section className="border-b bg-muted/20 py-6">
      <div className="mx-auto max-w-6xl px-5">
        <Card className="grid grid-cols-1 overflow-hidden border bg-card/80 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="border-b p-7 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <div className="mb-2 font-mono text-4xl font-medium leading-none tracking-normal text-foreground">
                {stat.value}<span className="text-muted-foreground">{stat.suffix}</span>
              </div>
              <div className="text-xs uppercase tracking-normal text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </Card>
      </div>
    </section>
  )
}
