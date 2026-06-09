'use client'

import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
}

function normalizeVersionForFilename(version: string) {
  if (version.includes('.') || !/^\d+$/.test(version)) {
    return version
  }

  return version.split('').join('.')
}

function getVersionDisplayName(version: string) {
  if (version === 'latest') return '最新版本'
  return version
}

function getDownloadUrl(product: DownloadSelectorProps['product'], version: string, arch: string, releases: Release[]) {
  if (product === 'pclce') {
    if (version === 'latest') {
      return `https://cdn1.download.nxtcorex.top/dl/pclce/pcl2ce/PCL2_CE_Release_${arch}.exe`
    }

    return `https://cdn1.download.nxtcorex.top/dl/pclce/pcl2ce/${version}/PCL2_CE_Release_${arch}.exe`
  }

  if (product === 'fcl') {
    if (version === 'latest') {
      return `https://cdn1.download.nxtcorex.top/dl/fcl/latest/FCL-release-${arch}.apk`
    }

    return `https://cdn1.download.nxtcorex.top/dl/fcl/${version}/FCL-release-${version}-${arch}.apk`
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
        `https://cdn1.download.nxtcorex.top/dl/${targetPath}/`
      )
    }
  }

  const archSuffix = arch === 'universal' ? '' : `-${arch}`
  const normalizedVersion = normalizeVersionForFilename(version)
  return `https://cdn1.download.nxtcorex.top/dl/${targetPath}/${version}/ZalithLauncher-${normalizedVersion}${archSuffix}.apk`
}

export default function DownloadSelector({
  repo,
  product,
  initialVersion,
  initialArch,
  archOptions,
  filterBeta,
}: DownloadSelectorProps) {
  const [releases, setReleases] = useState<Release[]>([])
  const [selectedVersion, setSelectedVersion] = useState(initialVersion)
  const [selectedArch, setSelectedArch] = useState(initialArch)
  const [loading, setLoading] = useState(true)

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

  return (
    <Card className="mb-8 border bg-card/80">
      <CardContent className="p-6">
        <div className="mb-6 grid gap-4 sm:grid-cols-[minmax(0,220px)_minmax(0,200px)]">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">版本</label>
            <Select value={selectedVersion} onValueChange={setSelectedVersion} disabled={loading && !selectedVersion}>
              <SelectTrigger className="h-11 bg-background">
                <SelectValue placeholder={loading ? '加载中...' : '选择版本'} />
              </SelectTrigger>
              <SelectContent>
                {initialVersion === 'latest' && (
                  <SelectItem value="latest">最新版本</SelectItem>
                )}
                {releases.map((release) => (
                  <SelectItem key={release.tag_name} value={release.tag_name}>
                    {getVersionDisplayName(release.tag_name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">架构</label>
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
            下载 {getVersionDisplayName(selectedVersion)} - {selectedArchLabel}
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
