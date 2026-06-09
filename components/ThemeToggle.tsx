'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark'

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  const storedTheme = window.localStorage.getItem('theme')
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('light', theme === 'light')
}

interface ThemeToggleProps {
  showLabel?: boolean
  className?: string
}

export default function ThemeToggle({ showLabel = false, className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const nextTheme = getPreferredTheme()
    setTheme(nextTheme)
    applyTheme(nextTheme)
    setMounted(true)
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    window.localStorage.setItem('theme', nextTheme)
    applyTheme(nextTheme)
  }

  const isDark = mounted ? theme === 'dark' : true
  const label = isDark ? 'Light mode' : 'Dark mode'
  const Icon = isDark ? Sun : Moon

  return (
    <Button
      type="button"
      variant="ghost"
      size={showLabel ? 'default' : 'icon'}
      className={cn(showLabel && 'justify-start text-muted-foreground', className)}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <Icon className="h-4 w-4" />
      {showLabel && <span>{label}</span>}
    </Button>
  )
}
