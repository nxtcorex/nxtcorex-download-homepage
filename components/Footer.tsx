'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-bg-secondary border-t border-white/[0.07] py-16 px-5 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 pb-12 border-b border-white/[0.07] mb-8 text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-base font-mono text-brand-text mb-4 block">
              nxtcorex<span className="text-brand-orange">下载加速</span>
            </span>
            <p className="text-[13px] font-light text-brand-text-secondary leading-[1.7] max-w-[220px]">
              基于 Cloudflare 全球骨干网络构建的专业文件加速下载服务。
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div>
              <h4 className="text-[11px] font-mono text-brand-text-secondary tracking-[0.1em] uppercase mb-5">
                文档
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/docs"
                    className="text-[13px] font-light text-brand-text-secondary/60 hover:text-brand-text transition-colors duration-200"
                  >
                    快速开始
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 text-[11px] font-mono text-brand-text-secondary/35 text-center lg:text-left">
          <p>
            © 2026 nxtcorex. Infrastructure by{' '}
            <a href="https://cloudflare.com" target="_blank" className="text-brand-orange/60 hover:text-brand-orange">
              Cloudflare
            </a>.
          </p>
          <p>
            此网页开源于{' '}
            <a href="https://github.com/nxtcorex/nxtcorex-download-homepage" target="_blank" className="text-brand-orange/60 hover:text-brand-orange">
              GitHub
            </a>.
          </p>
        </div>
      </div>
    </footer>
  )
}
