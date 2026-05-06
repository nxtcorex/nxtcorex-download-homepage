'use client'

import Link from 'next/link'
import Globe from './Globe'

export default function Hero() {
  return (
    <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center pt-16">
      <div className="py-20 px-5 lg:px-0 lg:pl-20 relative z-10">
        <div className="inline-flex items-center gap-2.5 text-[11px] text-brand-text-secondary font-mono tracking-widest uppercase mb-8">
          <span className="w-7 h-px bg-brand-orange"></span>
          Powered by Cloudflare Network
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-serif font-normal leading-[1.08] tracking-tight mb-3">
          每一字节<br />
          <em className="text-brand-orange">极速</em>抵达
        </h1>

        <p className="text-base font-light text-brand-text-secondary leading-[1.7] max-w-[400px] mb-12">
          依托 Cloudflare 全球 Anycast 骨干网络，文件下载请求在毫秒内路由至最近节点，带宽不再是瓶颈。
        </p>

        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/docs" className="btn-primary">
            立即体验
          </Link>
          <Link href="/docs" className="btn-ghost inline-flex items-center gap-2 group">
            了解工作原理
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="relative flex items-center justify-center h-full overflow-hidden">
        <Globe />
      </div>
    </section>
  )
}
