'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface Release {
  tag_name: string
  name: string
  assets: {
    name: string
    browser_download_url: string
  }[]
}

const archOptions = [
  { value: 'universal', label: '通用版' },
  { value: 'arm64-v8a', label: 'ARM64-V8A' },
  { value: 'armeabi-v7a', label: 'ARMv7' },
  { value: 'x86', label: 'X86' },
  { value: 'x86_64', label: 'X86_64' },
]

export default function ZLPage() {
  const [releases, setReleases] = useState<Release[]>([])
  const [selectedVersion, setSelectedVersion] = useState<string>('')
  const [selectedArch, setSelectedArch] = useState<string>('universal')
  const [showVersionDropdown, setShowVersionDropdown] = useState(false)
  const [showArchDropdown, setShowArchDropdown] = useState(false)
  const [loading, setLoading] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const archDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchReleases()
    document.title = 'ZL启动器下载 - nxtcorex下载加速'
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowVersionDropdown(false)
      }
      if (archDropdownRef.current && !archDropdownRef.current.contains(event.target as Node)) {
        setShowArchDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function fetchReleases() {
    try {
      const res = await fetch('https://api.github.com/repos/ZalithLauncher/ZalithLauncher/releases?per_page=20')
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        setReleases(data)
        setSelectedVersion(data[0].tag_name)
      }
    } catch (error) {
      console.error('Failed to fetch releases:', error)
    } finally {
      setLoading(false)
    }
  }

  function getDownloadUrl(version: string, arch: string): string {
    const archSuffix = arch === 'universal' ? '' : `-${arch}`
    return `https://cdn1.download.anycast.ren/dl/zl/${version}/ZalithLauncher-${version}${archSuffix}.apk`
  }

  function getArchDisplayName(arch: string): string {
    const selected = archOptions.find(opt => opt.value === arch)
    return selected ? selected.label : '通用版'
  }

  function getVersionDisplayName(version: string): string {
    return version
  }

  return (
    <main className="min-h-screen bg-brand-bg flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-16 px-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/docs" className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-text text-sm mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回文档列表
          </Link>

          <h1 className="text-4xl font-medium text-brand-text mb-4 tracking-tight">
            ZL (Zalith Launcher)
          </h1>
          <p className="text-brand-text-secondary text-lg mb-8">
            Android Minecraft 启动器
          </p>

          <div className="bg-brand-bg-secondary border border-white/[0.07] rounded-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative" ref={dropdownRef}>
                <label className="text-sm text-brand-text-secondary block mb-2">版本</label>
                <button
                  onClick={() => setShowVersionDropdown(!showVersionDropdown)}
                  className="w-full sm:w-48 bg-brand-bg border border-white/[0.12] rounded px-4 py-2.5 text-sm text-brand-text flex items-center justify-between"
                >
                  <span>{getVersionDisplayName(selectedVersion)}</span>
                  <svg className={`w-4 h-4 transition-transform ${showVersionDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showVersionDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-brand-bg-secondary border border-white/[0.12] rounded shadow-lg max-h-60 overflow-y-auto">
                    {loading ? (
                      <div className="px-4 py-2 text-sm text-brand-text-secondary">加载中...</div>
                    ) : (
                      releases.map((release) => (
                        <button
                          key={release.tag_name}
                          onClick={() => {
                            setSelectedVersion(release.tag_name)
                            setShowVersionDropdown(false)
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-brand-bg-tertiary ${selectedVersion === release.tag_name ? 'text-brand-orange' : 'text-brand-text'}`}
                        >
                          {release.tag_name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="relative" ref={archDropdownRef}>
                <label className="text-sm text-brand-text-secondary block mb-2">架构</label>
                <button
                  onClick={() => setShowArchDropdown(!showArchDropdown)}
                  className="w-full sm:w-48 bg-brand-bg border border-white/[0.12] rounded px-4 py-2.5 text-sm text-brand-text flex items-center justify-between"
                >
                  <span>{getArchDisplayName(selectedArch)}</span>
                  <svg className={`w-4 h-4 transition-transform ${showArchDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showArchDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-brand-bg-secondary border border-white/[0.12] rounded shadow-lg max-h-60 overflow-y-auto">
                    {archOptions.map((arch) => (
                      <button
                        key={arch.value}
                        onClick={() => {
                          setSelectedArch(arch.value)
                          setShowArchDropdown(false)
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-brand-bg-tertiary ${selectedArch === arch.value ? 'text-brand-orange' : 'text-brand-text'}`}
                      >
                        {arch.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <a
              href={getDownloadUrl(selectedVersion, selectedArch)}
              className="btn-primary inline-flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              下载 {getVersionDisplayName(selectedVersion)} - {getArchDisplayName(selectedArch)}
            </a>
          </div>

          <div className="bg-brand-bg-secondary border border-white/[0.07] rounded-lg p-6">
            <h2 className="text-xl font-medium text-brand-text mb-4">GitHub 路径转换规则</h2>
            <p className="text-brand-text-secondary text-sm mb-4">
              将 GitHub 发布链接转换为加速地址
            </p>

            <div className="space-y-4">
              <div className="bg-brand-bg border border-white/[0.05] rounded p-4">
                <div className="mb-3">
                  <span className="text-brand-text-secondary text-xs block mb-1">GitHub 原始路径:</span>
                  <span className="text-brand-text-secondary text-xs font-mono break-all block">
                    https://github.com/ZalithLauncher/ZalithLauncher/releases/download/140600/ZalithLauncher-1.4.0.6.apk
                  </span>
                </div>
                <div>
                  <span className="text-brand-orange text-xs block mb-1">加速地址:</span>
                  <a
                    href="https://cdn1.download.anycast.ren/dl/zl/140600/ZalithLauncher-1.4.0.6.apk"
                    className="text-brand-orange text-xs font-mono break-all hover:underline block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://cdn1.download.anycast.ren/dl/zl/140600/ZalithLauncher-1.4.0.6.apk
                  </a>
                </div>
              </div>

              <div className="bg-brand-bg border border-white/[0.05] rounded p-4">
                <div className="mb-3">
                  <span className="text-brand-text-secondary text-xs block mb-1">GitHub 原始路径:</span>
                  <span className="text-brand-text-secondary text-xs font-mono break-all block">
                    https://github.com/ZalithLauncher/ZalithLauncher/releases/download/140600/ZalithLauncher-1.4.0.6-x86.apk
                  </span>
                </div>
                <div>
                  <span className="text-brand-orange text-xs block mb-1">加速地址:</span>
                  <a
                    href="https://cdn1.download.anycast.ren/dl/zl/140600/ZalithLauncher-1.4.0.6-x86.apk"
                    className="text-brand-orange text-xs font-mono break-all hover:underline block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://cdn1.download.anycast.ren/dl/zl/140600/ZalithLauncher-1.4.0.6-x86.apk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
