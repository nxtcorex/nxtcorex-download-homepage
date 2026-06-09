'use client'

import { Card } from '@/components/ui/card'

const stats = [
  {
    value: '310',
    suffix: '+',
    label: '全球边缘节点',
  },
  {
    value: '8',
    suffix: 'ms',
    label: '平均首字节延迟',
  },
  {
    value: '∞',
    suffix: '',
    label: '带宽上限无限制',
  },
]

export default function Stats() {
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
