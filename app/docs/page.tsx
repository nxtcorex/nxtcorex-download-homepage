import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const cdnRows = [
  {
    domain: 'cdn1.download.nxtcorex.top',
    provider: 'Alibaba Cloud ESA',
    region: 'Global',
    status: 'Active',
  },
]

export default function DocsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <div className="relative flex-grow overflow-hidden border-b pt-16">
        <div className="absolute inset-0 panel-grid opacity-[0.12]" />
        <div className="section-shell relative py-12 sm:py-16 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <Badge variant="secondary" className="mb-5 rounded-md px-2.5 py-1 font-mono text-[11px] uppercase tracking-normal text-muted-foreground">
              CDN 服务对照表
            </Badge>
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-foreground lg:text-5xl">
              CDN 服务对照表
            </h1>
          </div>

          <Card className="overflow-hidden border bg-card/80">
            <CardHeader className="border-b">
              <CardTitle className="text-lg font-medium">服务域名</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="hidden grid-cols-[1.5fr_1fr_0.7fr_0.6fr] border-b bg-muted/30 px-4 py-3 font-mono text-[11px] uppercase tracking-normal text-muted-foreground md:grid">
                <div>Domain</div>
                <div>Provider</div>
                <div>Region</div>
                <div>Status</div>
              </div>
              {cdnRows.map((row) => (
                <div key={row.domain} className="grid grid-cols-1 gap-3 border-b px-4 py-4 last:border-b-0 md:grid-cols-[1.5fr_1fr_0.7fr_0.6fr] md:items-center">
                  <div className="font-mono text-sm text-foreground">{row.domain}</div>
                  <div className="text-sm text-muted-foreground">{row.provider}</div>
                  <div className="text-sm text-muted-foreground">{row.region}</div>
                  <div>
                    <Badge variant="outline" className="font-mono text-[11px] text-muted-foreground">
                      {row.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
