'use client'

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
    <section id="how-it-works" className="py-32 px-5 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] text-brand-orange font-mono tracking-[0.12em] uppercase">工作原理</span>
          <span className="flex-1 h-px max-w-10 bg-brand-orange/40"></span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-serif font-normal leading-tight mb-16">
          请求如何在<br />毫秒内找到最近节点
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div key={step.number} className="grid grid-cols-[64px_1fr] gap-6 py-8 border-t border-white/[0.07] first:border-t-0">
                <div className="text-[11px] font-mono text-brand-text-secondary tracking-[0.08em] pt-1">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-base font-medium text-brand-text mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm font-light text-brand-text-secondary leading-[1.65]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-bg-secondary border border-white/[0.12] p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(232,97,26,0.05)_0%,transparent_60%)] pointer-events-none"></div>
            <svg viewBox="0 0 380 300" className="w-full" fill="none">
              <line x1="190" y1="50" x2="80" y2="150" stroke="rgba(232,97,26,0.35)" strokeWidth="1" strokeDasharray="4,3" />
              <line x1="190" y1="50" x2="190" y2="150" stroke="rgba(232,97,26,0.5)" strokeWidth="1.2" />
              <line x1="190" y1="50" x2="300" y2="150" stroke="rgba(232,97,26,0.35)" strokeWidth="1" strokeDasharray="4,3" />
              <line x1="80" y1="150" x2="50" y2="250" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
              <line x1="80" y1="150" x2="140" y2="250" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
              <line x1="190" y1="150" x2="190" y2="250" stroke="rgba(88,166,255,0.3)" strokeWidth="1" />
              <line x1="300" y1="150" x2="250" y2="250" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
              <line x1="300" y1="150" x2="340" y2="250" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
              
              <circle cx="190" cy="50" r="22" fill="rgba(246,130,31,0.12)" stroke="rgba(246,130,31,0.6)" strokeWidth="1" />
              <text x="190" y="46" textAnchor="middle" fill="#f6821f" fontFamily="monospace" fontSize="9">CF</text>
              <text x="190" y="58" textAnchor="middle" fill="rgba(246,130,31,0.7)" fontFamily="monospace" fontSize="7">ANYCAST</text>
              
              <circle cx="80" cy="150" r="16" fill="rgba(232,97,26,0.1)" stroke="rgba(232,97,26,0.4)" strokeWidth="0.8" />
              <text x="80" y="154" textAnchor="middle" fill="rgba(232,97,26,0.9)" fontFamily="monospace" fontSize="8">HKG</text>
              
              <circle cx="190" cy="150" r="16" fill="rgba(88,166,255,0.1)" stroke="rgba(88,166,255,0.4)" strokeWidth="0.8" />
              <text x="190" y="154" textAnchor="middle" fill="rgba(88,166,255,0.9)" fontFamily="monospace" fontSize="8">NRT</text>
              
              <circle cx="300" cy="150" r="16" fill="rgba(232,97,26,0.08)" stroke="rgba(232,97,26,0.3)" strokeWidth="0.8" />
              <text x="300" y="154" textAnchor="middle" fill="rgba(232,97,26,0.7)" fontFamily="monospace" fontSize="8">SIN</text>
              
              <circle cx="50" cy="250" r="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7" />
              <text x="50" y="254" textAnchor="middle" fill="rgba(200,196,187,0.5)" fontFamily="monospace" fontSize="7">SHA</text>
              
              <circle cx="140" cy="250" r="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7" />
              <text x="140" y="254" textAnchor="middle" fill="rgba(200,196,187,0.5)" fontFamily="monospace" fontSize="7">ICN</text>
              
              <circle cx="190" cy="250" r="10" fill="rgba(88,166,255,0.08)" stroke="rgba(88,166,255,0.3)" strokeWidth="0.7" />
              <text x="190" y="254" textAnchor="middle" fill="rgba(88,166,255,0.6)" fontFamily="monospace" fontSize="7">TPE</text>
              
              <circle cx="250" cy="250" r="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7" />
              <text x="250" y="254" textAnchor="middle" fill="rgba(200,196,187,0.5)" fontFamily="monospace" fontSize="7">KUL</text>
              
              <circle cx="340" cy="250" r="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7" />
              <text x="340" y="254" textAnchor="middle" fill="rgba(200,196,187,0.5)" fontFamily="monospace" fontSize="7">CGK</text>
            </svg>
            <div className="inline-flex items-center gap-2.5 bg-brand-bg-secondary/80 border border-white/[0.12] px-4 py-2.5 mt-6">
              <span className="w-2 h-2 bg-[#f6821f]"></span>
              <span className="text-xs font-mono text-brand-text-secondary tracking-wide">
                Powered by Cloudflare Network — AS13335
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
