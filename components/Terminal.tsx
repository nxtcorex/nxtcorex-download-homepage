'use client'

export default function Terminal() {
  return (
    <section id="network" className="py-20 md:py-32 px-5 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 bg-brand-bg-secondary/80 border border-white/[0.12] px-4 py-2.5">
            <span className="w-2 h-2 bg-[#f6821f]"></span>
            <span className="text-xs font-mono text-brand-text-secondary tracking-wide">
              基础设施由 Cloudflare Workers & Cloudflare CDN 驱动
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
