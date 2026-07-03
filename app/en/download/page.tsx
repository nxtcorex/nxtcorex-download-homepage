import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Downloads - nxtcorex Download Accelerator',
  description: 'Choose a project to view accelerated download links.',
}

const downloadItems = [
  {
    title: 'PCLCE',
    description: 'PCL2 Launcher Community Edition.',
    href: '/en/download/pclce',
  },
  {
    title: 'Nezha Monitor',
    description: 'Server monitoring and operations tool — accelerated Linux install script.',
    href: '/en/download/nezha',
  },
  {
    title: 'FCL (Fold Craft Launcher)',
    description: 'Android Minecraft launcher supporting Universal, ARM64, ARMv7, x86, and x86_64.',
    href: '/en/download/fcl',
  },
  {
    title: 'ZL (Zalith Launcher)',
    description: 'Android Minecraft launcher.',
    href: '/en/download/zl',
  },
  {
    title: 'ZL2 (Zalith Launcher 2)',
    description: 'Second generation Zalith Launcher with a completely new architecture.',
    href: '/en/download/zl2',
  },
  {
    title: 'MG (MobileGlues)',
    description: 'MobileGlues renderer.',
    href: '/en/download/mg',
  },
]

export default function DownloadPageEn() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar locale="en" />

      <div className="relative flex-grow overflow-hidden border-b pt-16">
        <div className="absolute inset-0 panel-grid opacity-[0.12]" />
        <div className="section-shell relative py-12 sm:py-16 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <Badge variant="secondary" className="mb-5 rounded-md px-2.5 py-1 font-mono text-[11px] uppercase tracking-normal text-muted-foreground">
              Downloads
            </Badge>
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-foreground lg:text-5xl">
              Choose a project<br />to get download links
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {downloadItems.map((item) => (
              <Link key={item.href} href={item.href} className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <Card className="flex min-h-[220px] flex-col border bg-card/80 transition-colors group-hover:bg-accent/60">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-lg font-medium leading-snug text-foreground">
                        {item.title}
                      </CardTitle>
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 pb-6">
                    <p className="text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer locale="en" />
    </main>
  )
}
