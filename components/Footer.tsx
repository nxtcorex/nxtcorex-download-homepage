'use client'

import Link from 'next/link'
import dict, { type Locale, localizedHref } from '@/lib/i18n'

interface FooterProps {
  locale?: Locale
}

export default function Footer({ locale = 'zh' }: FooterProps) {
  const t = dict[locale].footer
  const siteName = dict[locale].siteName
  const siteTagline = dict[locale].siteTagline

  return (
    <footer className="border-t bg-muted/20 py-14">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-12 border-b pb-12 text-center lg:grid-cols-[280px_1fr] lg:gap-20 lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <span className="mb-4 block text-base text-foreground">
              {siteName}<span className="text-muted-foreground">{siteTagline}</span>
            </span>
            <p className="max-w-[220px] text-[13px] font-light leading-[1.7] text-muted-foreground">
              {t.description}
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div>
              <h4 className="mb-5 text-[11px] uppercase tracking-normal text-muted-foreground">
                {t.docsColumn}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href={localizedHref('/download', locale)} className="text-[13px] font-light text-muted-foreground hover:text-foreground">
                    {t.quickStart}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 pt-8 text-center text-[11px] text-muted-foreground/55 lg:flex-row lg:justify-between lg:text-left">
          <p>
            {t.copyright}{' '}
            <a href="https://cloudflare.com" target="_blank" className="text-foreground/70 hover:text-foreground">
              Cloudflare
            </a>.
          </p>
          <p>
            {t.openSource}{' '}
            <a href="https://github.com/nxtcorex/nxtcorex-download-homepage" target="_blank" className="text-foreground/70 hover:text-foreground">
              GitHub
            </a>.
          </p>
        </div>
      </div>
    </footer>
  )
}
