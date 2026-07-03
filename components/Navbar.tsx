'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Globe } from 'lucide-react'

import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle'
import dict, { type Locale, localizedHref, switchLocalePath } from '@/lib/i18n'

interface NavbarProps {
  locale?: Locale
}

interface LangDropdownProps {
  locale: Locale
  zhHref: string
  enHref: string
}

function LanguageDropdown({ locale, zhHref, enHref }: LangDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click / tap
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  const langOptions = [
    { locale: 'zh' as Locale, label: '简体中文', href: zhHref },
    { locale: 'en' as Locale, label: 'English', href: enHref },
  ]

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
        aria-label="Switch language"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Globe className="h-4 w-4" />
      </Button>

      {/*
        pt-1 creates a transparent bridge between the button and the panel
        so the mouse never leaves the container while traveling downward.
      */}
      {open && (
        <div className="absolute right-0 top-full z-50 pt-1">
          <div className="min-w-[140px] overflow-hidden rounded-md border bg-popover py-1 shadow-panel">
            {langOptions.map((opt) => {
              const isCurrent = opt.locale === locale
              return isCurrent ? (
                <span
                  key={opt.locale}
                  className="flex w-full cursor-default select-none items-center px-3 py-2 text-sm text-muted-foreground/50"
                  aria-current="true"
                >
                  {opt.label}
                </span>
              ) : (
                <Link
                  key={opt.locale}
                  href={opt.href}
                  className="flex w-full items-center px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  {opt.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar({ locale = 'zh' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const t = dict[locale]

  const menuItems = [
    { label: t.nav.features, href: '#features' },
    { label: t.nav.docs, href: localizedHref('/docs', locale) },
  ]

  const homeHref = locale === 'en' ? '/en' : '/'
  const homePath = locale === 'en' ? '/en' : '/'

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const anchor = href.replace('#', '')
    if (pathname !== homePath) {
      router.push(homePath + '#' + anchor)
    } else {
      const element = document.getElementById(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  const zhHref = switchLocalePath(pathname, 'zh')
  const enHref = switchLocalePath(pathname, 'en')

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={homeHref} className="flex items-baseline text-sm font-medium tracking-normal">
            <span className="text-foreground">{t.siteName}</span>
            <span className="ml-2 text-muted-foreground">{t.siteTagline}</span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-2 md:flex">
            {menuItems.map((item) =>
              item.href.startsWith('#') ? (
                <Button key={item.label} asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <a href={item.href} onClick={(e) => handleAnchorClick(e, item.href)}>
                    {item.label}
                  </a>
                </Button>
              ) : (
                <Button key={item.label} asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              )
            )}
            <Button asChild size="sm" className="ml-3 tracking-normal">
              <Link href={localizedHref('/download', locale)}>{t.nav.getStarted}</Link>
            </Button>
            <LanguageDropdown locale={locale} zhHref={zhHref} enHref={enHref} />
            <ThemeToggle />
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <LanguageDropdown locale={locale} zhHref={zhHref} enHref={enHref} />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {menuItems.map((item) =>
                item.href.startsWith('#') ? (
                  <Button key={item.label} asChild variant="ghost" className="justify-start text-muted-foreground">
                    <a href={item.href} onClick={(e) => handleAnchorClick(e, item.href)}>
                      {item.label}
                    </a>
                  </Button>
                ) : (
                  <Button key={item.label} asChild variant="ghost" className="justify-start text-muted-foreground">
                    <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                      {item.label}
                    </Link>
                  </Button>
                )
              )}
              <Button asChild className="mt-2 tracking-normal" onClick={() => setIsMenuOpen(false)}>
                <Link href={localizedHref('/download', locale)}>{t.nav.getStarted}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
