'use client'

import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type Locale } from '@/lib/i18n'

const uiText = {
  zh: {
    version: '版本',
    arch: '架构',
    loading: '加载中...',
    selectVersion: '选择版本',
    latestVersion: '最新版本',
    download: '下载',
  },
  en: {
    version: 'Version',
    arch: 'Architecture',
    loading: 'Loading...',
    selectVersion: 'Select version',
    latestVersion: 'Latest',
    download: 'Download',
  },
}

export interface Release {
  tag_name: string
  name: string
  assets: {
    name: string
    browser_download_url: string
  }[]
}

export interface ArchOption {
  value: string
  label: string
}

interface DownloadSelectorProps {
  repo: string
  product: 'pclce' | 'fcl' | 'zl' | 'zl2'
  initialVersion: string
  initialArch: string
  archOptions: ArchOption[]
  filterBeta?: boolean
  locale?: Locale
}

function normalizeVersionForFilename(version: string) {
  if (version.includes('.') || !/^\d+$/.test(version)) {
    return version
  }
  return version.split('').join('.')
}

function getDownloadUrl(product: DownloadSelectorProps['product'], version: string, arch: string, releases: Release[]) {
  if (product === 'pclce') {
    if (version === 'latest') {
      return `https://cdn.download.nxtcorex.cn/dl/pclce/pcl2ce/PCL2_CE_Release_${arch}.exe`
    }

    return `https://cdn.download.nxtcorex.cn/dl/pclce/pcl2ce/${version}/PCL2_CE_Release_${arch}.exe`
  }

  if (product === 'fcl') {
    if (version === 'latest') {
      return `https://cdn.download.nxtcorex.cn/dl/fcl/latest/FCL-release-${arch}.apk`
    }

    return `https://cdn.download.nxtcorex.cn/dl/fcl/${version}/FCL-release-${version}-${arch}.apk`
  }

  const release = releases.find((item) => item.tag_name === version)
  const sourceRepo = product === 'zl' ? 'ZalithLauncher/ZalithLauncher' : 'ZalithLauncher/ZalithLauncher2'
  const targetPath = product === 'zl' ? 'zl' : 'zl2'

  if (release) {
    const asset = release.assets.find((item) => {
      const isApk = item.name.endsWith('.apk')
      const matchesArch = arch === 'universal'
        ? /^ZalithLauncher-[^-]+\.apk$/.test(item.name)
        : item.name.includes(`-${arch}.apk`)

      return isApk && matchesArch
    })

    if (asset) {
      return asset.browser_download_url.replace(
        `https://github.com/${sourceRepo}/releases/download/`,
        `https://cdn.download.nxtcorex.cn/dl/${targetPath}/`
      )
    }
  }

  const archSuffix = arch === 'universal' ? '' : `-${arch}`
  const normalizedVersion = normalizeVersionForFilename(version)
  return `https://cdn.download.nxtcorex.cn/dl/${targetPath}/${version}/ZalithLauncher-${normalizedVersion}${archSuffix}.apk`
}

export default function DownloadSelector({
  repo,
  product,
  initialVersion,
  initialArch,
  archOptions,
  filterBeta,
  locale = 'zh',
}: DownloadSelectorProps) {
  const [releases, setReleases] = useState<Release[]>([])
  const [selectedVersion, setSelectedVersion] = useState(initialVersion)
  const [selectedArch, setSelectedArch] = useState(initialArch)
  const [loading, setLoading] = useState(true)
  const t = uiText[locale]

  useEffect(() => {
    async function fetchReleases() {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=20`)
        const data = await res.json()

        if (Array.isArray(data)) {
          const filtered = filterBeta
            ? data.filter((release: Release) => !release.tag_name.toLowerCase().includes('beta'))
            : data
          setReleases(filtered)

          if (!initialVersion && filtered.length > 0) {
            setSelectedVersion(filtered[0].tag_name)
          }
        }
      } catch (error) {
        console.error('Failed to fetch releases:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReleases()
  }, [filterBeta, initialVersion, repo])

  const selectedArchLabel = archOptions.find((arch) => arch.value === selectedArch)?.label ?? selectedArch
  const downloadUrl = getDownloadUrl(product, selectedVersion, selectedArch, releases)
  const versionDisplay = selectedVersion === 'latest' ? t.latestVersion : selectedVersion

  return (
    <Card className="mb-8 border bg-card/80">
      <CardContent className="p-6">
        <div className="mb-6 grid gap-4 sm:grid-cols-[minmax(0,220px)_minmax(0,200px)]">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">{t.version}</label>
            <Select value={selectedVersion} onValueChange={setSelectedVersion} disabled={loading && !selectedVersion}>
              <SelectTrigger className="h-11 bg-background">
                <SelectValue placeholder={loading ? t.loading : t.selectVersion} />
              </SelectTrigger>
              <SelectContent>
                {initialVersion === 'latest' && (
                  <SelectItem value="latest">{t.latestVersion}</SelectItem>
                )}
                {releases.map((release) => (
                  <SelectItem key={release.tag_name} value={release.tag_name}>
                    {release.tag_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">{t.arch}</label>
            <Select value={selectedArch} onValueChange={setSelectedArch}>
              <SelectTrigger className="h-11 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {archOptions.map((arch) => (
                  <SelectItem key={arch.value} value={arch.value}>
                    {arch.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button asChild size="lg" className="w-full justify-center sm:w-auto">
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4" />
            {t.download} {versionDisplay} - {selectedArchLabel}
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
