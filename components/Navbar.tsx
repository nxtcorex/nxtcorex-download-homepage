'use client'

import { useState } from 'react'
import Link from 'next/link'

const menuItems = [
  { label: '原理', href: '#how-it-works' },
  { label: '功能', href: '#features' },
  { label: '网络', href: '#network' },
  { label: '文档', href: '/docs' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/85 backdrop-blur-lg border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-base font-mono tracking-wide">
              <span className="text-brand-text">anycast</span>
              <span className="text-brand-orange">.</span>
              <span className="text-brand-text">ren</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-9">
            {menuItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[13px] text-brand-text-secondary hover:text-brand-text transition-colors duration-200 tracking-wide"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[13px] text-brand-text-secondary hover:text-brand-text transition-colors duration-200 tracking-wide"
                >
                  {item.label}
                </Link>
              )
            ))}
            <Link
              href="/docs"
              className="border border-brand-orange/40 text-brand-orange px-5 py-2 text-xs font-mono tracking-wider transition-all duration-200 hover:bg-brand-orange hover:text-brand-bg"
            >
              开始使用
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-text-secondary hover:text-brand-text p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/[0.07]">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm text-brand-text-secondary hover:text-brand-text transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-brand-text-secondary hover:text-brand-text transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <Link
                href="/docs"
                className="border border-brand-orange/40 text-brand-orange px-5 py-2 text-xs font-mono tracking-wider text-center transition-all duration-200 hover:bg-brand-orange hover:text-brand-bg"
                onClick={() => setIsMenuOpen(false)}
              >
                开始使用
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
