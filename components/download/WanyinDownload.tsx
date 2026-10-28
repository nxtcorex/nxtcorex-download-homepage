'use client'

import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type Locale } from '@/lib/i18n'
import { fetchWanyinReleases, type WanyinRelease } from '@/lib/wanyin'

const uiText = {
  zh: {
    version: '版本',
    versionCode: '版本号',
    selectVersion: '选择版本',
    latestVersion: '最新版本',
    download: '下载',
    link: '下载链接',
    directUrl: '直连地址',
  },
  en: {
    version: 'Version',
    versionCode: 'Version code',
    selectVersion: 'Select version',
    latestVersion: 'Latest',
    download: 'Download',
    link: 'Download Link',
    directUrl: 'Direct URL',
  },
}

interface WanyinDownloadProps {
  releases: WanyinRelease[]
  locale?: Locale
}

export default function WanyinDownload({ releases: bakedReleases, locale = 'zh' }: WanyinDownloadProps) {
  const [releases, setReleases] = useState(bakedReleases)
  const [selectedVersion, setSelectedVersion] = useState(bakedReleases[0]?.version ?? '')
  const t = uiText[locale]

  useEffect(() => {
    fetchWanyinReleases().then((fresh) => {
      if (fresh.length === 0) return
      setReleases(fresh)
      setSelectedVersion((current) =>
        fresh.some((release) => release.version === current) ? current : fresh[0].version
      )
    })
  }, [])

  const selected = releases.find((release) => release.version === selectedVersion) ?? releases[0]

  if (!selected) return null

  return (
    <div className="mb-8 space-y-8">
      <Card className="border bg-card/80">
        <CardContent className="p-6">
          <div className="mb-6 max-w-[220px] space-y-2">
            <label className="text-sm text-muted-foreground">{t.version}</label>
            <Select value={selected.version} onValueChange={setSelectedVersion}>
              <SelectTrigger className="h-11 bg-background">
                <SelectValue placeholder={t.selectVersion} />
              </SelectTrigger>
              <SelectContent>
                {releases.map((release, index) => (
                  <SelectItem key={release.version} value={release.version}>
                    {index === 0 ? `${release.version} (${t.latestVersion})` : release.version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button asChild size="lg" className="w-full justify-center sm:w-auto">
            <a href={selected.url} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" />
              {t.download} {selected.version}
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card className="border bg-card/80">
        <CardHeader>
          <CardTitle className="text-xl font-medium">{t.link}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-[120px_1fr] sm:items-center">
            <span className="text-sm text-muted-foreground">{t.versionCode}</span>
            <span className="font-mono text-sm text-foreground">{selected.versionCode}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-[120px_1fr] sm:items-center">
            <span className="text-sm text-muted-foreground">{t.directUrl}</span>
            <a
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all font-mono text-sm text-foreground underline-offset-4 hover:underline"
            >
              {selected.url}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
