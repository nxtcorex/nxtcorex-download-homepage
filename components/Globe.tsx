'use client'

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'
import { cn } from '@/lib/utils'

type Rgb = [number, number, number]

const DEFAULT_MARKERS: [number, number][] = [
  [37.7595, -122.4367],
  [40.7128, -74.006],
  [51.5074, -0.1278],
  [35.6762, 139.6503],
  [31.2304, 121.4737],
  [25.2048, 55.2708],
  [-33.8688, 151.2093],
  [-23.5505, -46.6333],
]

const BASE_THETA = 0.2
const THETA_LIMIT = 0.35

function clamp(value: number, max: number) {
  return Math.max(-max, Math.min(max, value))
}

// 本站的 shadcn 变量存的是 HSL 通道，WebGL 需要 0~1 的 rgb：
// 先让浏览器解析颜色，再交给 canvas 栅格化成 sRGB 像素读回来。
function cssColor(varName: string): Rgb {
  const probe = document.createElement('div')
  probe.style.color = `hsl(var(${varName}))`
  probe.style.position = 'fixed'
  probe.style.opacity = '0'
  probe.style.pointerEvents = 'none'
  document.body.appendChild(probe)
  const color = getComputedStyle(probe).color
  probe.remove()

  const surface = document.createElement('canvas')
  surface.width = 1
  surface.height = 1
  const ctx = surface.getContext('2d', { willReadFrequently: true })
  if (!ctx) return [0.5, 0.5, 0.5]
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const pixel = ctx.getImageData(0, 0, 1, 1).data
  return [pixel[0] / 255, pixel[1] / 255, pixel[2] / 255]
}

function dim(rgb: Rgb, factor: number): Rgb {
  return [
    Math.min(1, rgb[0] * factor),
    Math.min(1, rgb[1] * factor),
    Math.min(1, rgb[2] * factor),
  ]
}

function palette(isDark: boolean) {
  if (isDark) {
    return {
      dark: 1,
      mapBrightness: 20,
      opacity: 1,
      baseColor: cssColor('--muted'),
      markerColor: cssColor('--primary'),
      glowColor: dim(cssColor('--muted-foreground'), 0.5),
    }
  }
  return {
    dark: 0,
    mapBrightness: 11,
    opacity: 0.85,
    baseColor: cssColor('--card'),
    markerColor: cssColor('--primary'),
    glowColor: cssColor('--border'),
  }
}

function useIsDark() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const sync = () =>
      setIsDark(document.documentElement.classList.contains('dark'))
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  return isDark
}

export interface GlobeProps {
  className?: string
  /** WebGL 绘制的逻辑边长（CSS 像素），实际显示尺寸由 className 控制 */
  size?: number
  markers?: [number, number][]
}

export function Globe({
  className,
  size = 420,
  markers = DEFAULT_MARKERS,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null)
  const isDark = useIsDark()
  const [inView, setInView] = useState(false)

  const motion = useRef({
    autoPhi: 0,
    phiOffset: 0,
    thetaOffset: 0,
    dragPhi: 0,
    dragTheta: 0,
    velocityPhi: 0,
    velocityTheta: 0,
    pointer: null as { x: number; y: number } | null,
    last: null as { x: number; y: number; t: number } | null,
    inView: false,
    reduceMotion: false,
  })

  useEffect(() => {
    motion.current.inView = inView
  }, [inView])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px' }
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      motion.current.reduceMotion = query.matches
    }
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: size,
      height: size,
      phi: 0,
      theta: BASE_THETA,
      diffuse: 1.5,
      mapSamples: 16000,
      markerElevation: 0.01,
      ...palette(document.documentElement.classList.contains('dark')),
      markers: markers.map((location) => ({ location, size: 0.025 })),
    })
    globeRef.current = globe

    let raf = 0
    const tick = () => {
      const m = motion.current
      if (m.inView) {
        if (!m.pointer) {
          if (!m.reduceMotion) m.autoPhi += 0.0028
          m.phiOffset += m.velocityPhi
          m.thetaOffset += m.velocityTheta
          m.velocityPhi *= 0.94
          m.velocityTheta *= 0.94
          if (m.thetaOffset < -THETA_LIMIT) {
            m.thetaOffset += (-THETA_LIMIT - m.thetaOffset) * 0.1
          } else if (m.thetaOffset > THETA_LIMIT) {
            m.thetaOffset += (THETA_LIMIT - m.thetaOffset) * 0.1
          }
        }
        globe.update({
          phi: m.autoPhi + m.phiOffset + m.dragPhi,
          theta: BASE_THETA + m.thetaOffset + m.dragTheta,
        })
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      globe.destroy()
      globeRef.current = null
    }
  }, [size, markers])

  useEffect(() => {
    globeRef.current?.update(palette(isDark))
  }, [isDark])

  const commitDrag = () => {
    const m = motion.current
    m.phiOffset += m.dragPhi
    m.thetaOffset += m.dragTheta
    m.dragPhi = 0
    m.dragTheta = 0
    m.pointer = null
    m.last = null
  }

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    const m = motion.current
    m.pointer = { x: e.clientX, y: e.clientY }
    m.velocityPhi = 0
    m.velocityTheta = 0
  }

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const m = motion.current
    if (!m.pointer) return
    m.dragPhi = (e.clientX - m.pointer.x) / 300
    m.dragTheta = (e.clientY - m.pointer.y) / 1200

    const now = performance.now()
    if (m.last) {
      const dt = Math.max(now - m.last.t, 1)
      m.velocityPhi = clamp(((e.clientX - m.last.x) / dt) * 0.3, 0.12)
      m.velocityTheta = clamp(((e.clientY - m.last.y) / dt) * 0.08, 0.08)
    }
    m.last = { x: e.clientX, y: e.clientY, t: now }
  }

  return (
    <div ref={rootRef} className={cn('relative aspect-square w-full', className)}>
      <canvas
        ref={canvasRef}
        className="size-full cursor-grab touch-pan-y active:cursor-grabbing"
        onPointerCancel={commitDrag}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={commitDrag}
      />
    </div>
  )
}

export default Globe
