'use client'

const features = [
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
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
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
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
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
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
    <section id="features" className="bg-brand-bg-secondary py-32 px-5 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] text-brand-orange font-mono tracking-[0.12em] uppercase">核心能力</span>
          <span className="flex-1 h-px max-w-10 bg-brand-orange/40"></span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-serif font-normal leading-tight mb-5">
          为大文件传输<br />专门设计
        </h2>
        <p className="text-base font-light text-brand-text-secondary leading-[1.75] max-w-[480px] mb-16">
          从固件包到数据集，anycast.ren 在 Cloudflare 基础设施之上构建了专属的加速层。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.07] border border-white/[0.07]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-brand-bg-secondary p-10 card-hover"
            >
              <div className="w-10 h-10 mb-6 text-brand-orange">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-brand-text mb-3 leading-snug">
                {feature.title}
              </h3>
              <p className="text-sm font-light text-brand-text-secondary leading-[1.7]">
                {feature.description}
              </p>
              <div className="mt-5 text-[11px] font-mono text-brand-orange tracking-[0.08em]">
                {feature.metric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
