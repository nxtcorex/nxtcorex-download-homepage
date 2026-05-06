'use client'

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
    <div className="bg-brand-bg-secondary border-t border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="py-8 px-12 border-r border-white/[0.07] last:border-r-0 text-center"
            >
              <div className="text-4xl font-mono font-light text-brand-text tracking-tight leading-none mb-1.5">
                {stat.value}<span className="text-brand-orange">{stat.suffix}</span>
              </div>
              <div className="text-xs text-brand-text-secondary tracking-[0.05em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
