'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Languages, Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ThemeToggle from '@/components/ThemeToggle'
import dict, { type Locale, localizedHref, locales, switchLocalePath } from '@/lib/i18n'

interface NavbarProps {
  locale?: Locale
}

const languageNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
}

function LanguageDropdown({ locale }: { locale: Locale }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        title={languageNames[locale]}
        className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg bg-transparent text-foreground outline-none transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-expanded:bg-muted"
      >
        <Languages className="h-5 w-5" />
        <span className="sr-only">Language / 语言</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((target) => (
          <DropdownMenuItem
            key={target}
            onClick={() => router.push(switchLocalePath(pathname, target))}
            className={target === locale ? 'font-medium' : ''}
          >
            {languageNames[target]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Navbar({ locale = 'zh' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = dict[locale]

  const menuItems = [
    { label: t.nav.docs, href: localizedHref('/docs', locale) },
  ]

  const homeHref = locale === 'en' ? '/en' : '/'

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-6">
          <Link href={homeHref} className="flex shrink-0 items-center space-x-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/logo_c.webp"
              alt="nxtcorex"
              className="h-6 w-6 rounded object-contain"
            />
            <span className="text-lg font-bold">nxtcorex</span>
          </Link>

          <div className="hidden items-center space-x-6 md:flex">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center space-x-1">
          <ThemeToggle />
          <LanguageDropdown locale={locale} />
          <Button asChild size="sm" className="ml-1 hidden sm:inline-flex">
            <Link href={localizedHref('/download', locale)}>{t.nav.getStarted}</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="border md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2 justify-start" onClick={() => setIsMenuOpen(false)}>
              <Link href={localizedHref('/download', locale)}>{t.nav.getStarted}</Link>
            </Button>
          </nav>
        </div>
      )}
    </nav>
  )
}
