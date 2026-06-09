'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle'

const menuItems = [
  { label: '原理', href: '#how-it-works' },
  { label: '功能', href: '#features' },
  { label: '文档', href: '/docs' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const anchor = href.replace('#', '')

    if (pathname !== '/') {
      router.push('/' + href)
    } else {
      const element = document.getElementById(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-baseline text-sm font-medium tracking-normal">
            <span className="text-foreground">nxtcorex</span>
            <span className="ml-2 text-muted-foreground">下载加速</span>
          </Link>

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
              <Link href="/download">开始使用</Link>
            </Button>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
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
                <Link href="/download">开始使用</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
