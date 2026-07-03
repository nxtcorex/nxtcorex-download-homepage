export type Locale = 'zh' | 'en'

export const locales: Locale[] = ['zh', 'en']

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname.startsWith('/en')) return 'en'
  return 'zh'
}

export function localizedHref(href: string, locale: Locale): string {
  if (locale === 'en') {
    if (href === '/') return '/en'
    return `/en${href}`
  }
  return href
}

/**
 * Given the current pathname and a target locale, return the equivalent URL
 * in that locale. e.g. /en/download/fcl → zh → /download/fcl
 */
export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const isCurrentlyEn = pathname.startsWith('/en')

  if (targetLocale === 'en') {
    // zh → en: prefix with /en (avoid double prefix)
    return isCurrentlyEn ? pathname : `/en${pathname === '/' ? '' : pathname}`
  } else {
    // en → zh: strip /en prefix
    if (!isCurrentlyEn) return pathname
    const stripped = pathname.slice(3) // remove "/en"
    return stripped === '' ? '/' : stripped
  }
}

const dict = {
  zh: {
    siteName: 'nxtcorex',
    siteTagline: '下载加速',
    nav: {
      features: '功能',
      docs: '文档',
      getStarted: '开始使用',
    },
    hero: {
      badge: 'Powered by Cloudflare Network',
      headline1: '每一字节',
      headline2: '极速',
      headline3: '抵达',
      description: '依托 Cloudflare 全球 Anycast 骨干网络，文件下载请求在毫秒内路由至最近节点，带宽不再是瓶颈。',
      cta: '立即体验',
    },
    stats: [
      { value: '310', suffix: '+', label: '全球边缘节点' },
      { value: '8', suffix: 'ms', label: '平均首字节延迟' },
      { value: '∞', suffix: '', label: '带宽上限无限制' },
    ],
    features: {
      eyebrow: '核心能力',
      heading1: '为大文件传输',
      heading2: '专门设计',
      items: [
        {
          title: 'Anycast 智能路由',
          description: '同一 IP 多地通告，BGP 层面自动选路，用户始终连接到物理距离最近的 PoP，无需客户端任何配置。',
          metric: 'RTT 降低最高 73%',
        },
        {
          title: '断点续传 & 并发分片',
          description: '支持 HTTP Range 请求，客户端可并发多线程分片下载，异常中断后无需从头重传，节省带宽与时间。',
        },
        {
          title: '全球节点覆盖',
          description: '依托 Cloudflare 全球 300+ 边缘节点，文件就近分发，无论用户身处何地都能获得极速下载体验。',
          metric: '覆盖 100+ 国家',
        },
      ],
    },
    footer: {
      description: '基于 Cloudflare 全球骨干网络构建的专业文件加速下载服务。',
      docsColumn: '文档',
      quickStart: '快速开始',
      copyright: '© 2026 nxtcorex. Infrastructure by',
      openSource: '此网页开源于',
    },
    meta: {
      title: 'nxtcorex下载加速 - 每一字节 极速抵达',
      description: 'nxtcorex 下载加速服务，基于全球网络的专业文件加速',
    },
  },
  en: {
    siteName: 'nxtcorex',
    siteTagline: 'Download Accelerator',
    nav: {
      features: 'Features',
      docs: 'Docs',
      getStarted: 'Get Started',
    },
    hero: {
      badge: 'Powered by Cloudflare Network',
      headline1: 'Every Byte,',
      headline2: 'Blazing',
      headline3: 'Fast',
      description: 'Built on Cloudflare\'s global Anycast backbone — download requests are routed to the nearest PoP in milliseconds. Bandwidth is no longer the bottleneck.',
      cta: 'Try It Now',
    },
    stats: [
      { value: '310', suffix: '+', label: 'Global Edge Nodes' },
      { value: '8', suffix: 'ms', label: 'Avg. Time to First Byte' },
      { value: '∞', suffix: '', label: 'Unlimited Bandwidth' },
    ],
    features: {
      eyebrow: 'Core Capabilities',
      heading1: 'Engineered for',
      heading2: 'Large File Transfers',
      items: [
        {
          title: 'Anycast Smart Routing',
          description: 'One IP announced from multiple locations. BGP automatically picks the nearest PoP — no client configuration needed.',
          metric: 'Up to 73% RTT reduction',
        },
        {
          title: 'Resume & Parallel Chunking',
          description: 'Full HTTP Range support lets clients download concurrently in multiple threads. Interrupted transfers resume without starting over.',
        },
        {
          title: 'Global Node Coverage',
          description: 'Powered by 300+ Cloudflare edge nodes, files are served from the nearest location so users everywhere get maximum speed.',
          metric: '100+ countries covered',
        },
      ],
    },
    footer: {
      description: 'Professional file download acceleration built on the Cloudflare global backbone.',
      docsColumn: 'Docs',
      quickStart: 'Quick Start',
      copyright: '© 2026 nxtcorex. Infrastructure by',
      openSource: 'This site is open source on',
    },
    meta: {
      title: 'nxtcorex Download Accelerator - Every Byte, Blazing Fast',
      description: 'nxtcorex download acceleration service — professional file delivery on a global network.',
    },
  },
} as const

export type Dict = (typeof dict)['zh']
export default dict
