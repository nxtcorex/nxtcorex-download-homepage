import dict, { type Locale } from '@/lib/i18n'

interface FooterProps {
  locale?: Locale
}

export default function Footer({ locale = 'zh' }: FooterProps) {
  const t = dict[locale].footer

  return (
    <footer className="border-t px-4 py-4 text-sm text-muted-foreground">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
        <span>{t.copyright}</span>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-end">
          <a
            href="https://beian.miit.gov.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            京ICP备2025138063号-2
          </a>
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=11011402056544"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/备案图标.png" alt="" className="h-4 w-4" />
            京公网安备11011402056544号
          </a>
        </div>
      </div>
    </footer>
  )
}
