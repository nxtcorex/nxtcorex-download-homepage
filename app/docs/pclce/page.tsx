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

const archLabels: Record<string, string> = {
  'x64': 'X64',
  'ARM64': 'ARM64',
}

export default function PCLCEPage() {
  const [releases, setReleases] = useState<Release[]>([])
  const [selectedVersion, setSelectedVersion] = useState<string>('latest')
  const [selectedArch, setSelectedArch] = useState<string>('x64')
  const [showVersionDropdown, setShowVersionDropdown] = useState(false)
  const [loading, setLoading] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchReleases()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowVersionDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function fetchReleases() {
    try {
      const res = await fetch('https://api.github.com/repos/PCL-Community/PCL-CE/releases?per_page=20')
      const data = await res.json()
      if (Array.isArray(data)) {
        setReleases(data)
      }
    } catch (error) {
      console.error('Failed to fetch releases:', error)
    } finally {
      setLoading(false)
    }
  }

  function getDownloadUrl(version: string, arch: string): string {
    if (version === 'latest') {
      return `https://cdn1.download.anycast.ren/dl/pclce/pcl2ce/PCL2_CE_Release_${arch}.exe`
    }
    return `https://cdn1.download.anycast.ren/dl/pclce/pcl2ce/${version}/PCL2_CE_Release_${arch}.exe`
  }

  function getVersionDisplayName(version: string): string {
    if (version === 'latest') return '最新版本'
    return version
  }

  const archOptions = ['x64', 'ARM64']

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
            PCLCE
          </h1>
          <p className="text-brand-text-secondary text-lg mb-8">
            PCL2启动器社区版
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
                    <button
                      onClick={() => {
                        setSelectedVersion('latest')
                        setShowVersionDropdown(false)
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-brand-bg-tertiary ${selectedVersion === 'latest' ? 'text-brand-orange' : 'text-brand-text'}`}
                    >
                      最新版本
                    </button>
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

              <div>
                <label className="text-sm text-brand-text-secondary block mb-2">架构</label>
                <select
                  value={selectedArch}
                  onChange={(e) => setSelectedArch(e.target.value)}
                  className="w-full sm:w-40 bg-brand-bg border border-white/[0.12] rounded px-4 py-2.5 text-sm text-brand-text"
                >
                  {archOptions.map((arch) => (
                    <option key={arch} value={arch}>{archLabels[arch]}</option>
                  ))}
                </select>
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
              下载 {getVersionDisplayName(selectedVersion)} - {archLabels[selectedArch]}
            </a>
          </div>

          <div className="bg-brand-bg-secondary border border-white/[0.07] rounded-lg p-6 mb-6">
            <h2 className="text-xl font-medium text-brand-text mb-4">GitHub 路径转换规则</h2>
            <p className="text-brand-text-secondary text-sm mb-4">
              将 GitHub 发布链接转换为加速地址
            </p>

            <div className="space-y-4">
              <div className="bg-brand-bg border border-white/[0.05] rounded p-4">
                <div className="mb-3">
                  <span className="text-brand-text-secondary text-xs block mb-1">GitHub 原始路径:</span>
                  <span className="text-brand-text-secondary text-xs font-mono break-all block">
                    https://github.com/PCL-Community/PCL-CE/releases/download/v2.14.6/PCL2_CE_Release_x64.exe
                  </span>
                </div>
                <div>
                  <span className="text-brand-orange text-xs block mb-1">加速地址:</span>
                  <a
                    href="https://cdn1.download.anycast.ren/dl/pclce/pcl2ce/v2.14.6/PCL2_CE_Release_x64.exe"
                    className="text-brand-orange text-xs font-mono break-all hover:underline block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://cdn1.download.anycast.ren/dl/pclce/pcl2ce/v2.14.6/PCL2_CE_Release_x64.exe
                  </a>
                </div>
              </div>

              <div className="bg-brand-bg border border-white/[0.05] rounded p-4">
                <div className="mb-3">
                  <span className="text-brand-text-secondary text-xs block mb-1">GitHub 原始路径:</span>
                  <span className="text-brand-text-secondary text-xs font-mono break-all block">
                    https://github.com/PCL-Community/PCL-CE/releases/download/v2.14.6/PCL2_CE_Release_ARM64.exe
                  </span>
                </div>
                <div>
                  <span className="text-brand-orange text-xs block mb-1">加速地址:</span>
                  <a
                    href="https://cdn1.download.anycast.ren/dl/pclce/pcl2ce/v2.14.6/PCL2_CE_Release_ARM64.exe"
                    className="text-brand-orange text-xs font-mono break-all hover:underline block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://cdn1.download.anycast.ren/dl/pclce/pcl2ce/v2.14.6/PCL2_CE_Release_ARM64.exe
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-bg-secondary border border-white/[0.07] rounded-lg p-6">
            <h2 className="text-xl font-medium text-brand-text mb-6">最新版本下载链接</h2>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-brand-text-secondary text-sm min-w-[100px]">X64:</span>
                <a
                  href="https://cdn1.download.anycast.ren/dl/pclce/pcl2ce/PCL2_CE_Release_x64.exe"
                  className="text-brand-orange text-sm font-mono hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://cdn1.download.anycast.ren/dl/pclce/pcl2ce/PCL2_CE_Release_x64.exe
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-brand-text-secondary text-sm min-w-[100px]">ARM64:</span>
                <a
                  href="https://cdn1.download.anycast.ren/dl/pclce/pcl2ce/PCL2_CE_Release_ARM64.exe"
                  className="text-brand-orange text-sm font-mono hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://cdn1.download.anycast.ren/dl/pclce/pcl2ce/PCL2_CE_Release_ARM64.exe
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
