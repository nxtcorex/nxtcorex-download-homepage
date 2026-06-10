'use client'

const CENTER = 280
const RADIUS = 250
const MERIDIANS = 32
const FRAMES = 48
const PATH_POINTS = 24
const ROTATION_SECONDS = 18

function normalizeDegrees(degrees: number) {
  return ((((degrees + 180) % 360) + 360) % 360) - 180
}

function meridianPath(degrees: number) {
  const angle = (normalizeDegrees(degrees) * Math.PI) / 180
  const xRadius = RADIUS * Math.sin(angle)
  const points = Array.from({ length: PATH_POINTS + 1 }, (_, index) => {
    const latitude = Math.PI / 2 - (Math.PI * index) / PATH_POINTS
    const x = CENTER + xRadius * Math.cos(latitude)
    const y = CENTER - RADIUS * Math.sin(latitude)

    return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
  })

  return points.join(' ')
}

function meridianOpacity(degrees: number) {
  const angle = (normalizeDegrees(degrees) * Math.PI) / 180
  const depth = Math.cos(angle)

  if (depth <= 0) return '0'

  return (0.035 + 0.105 * depth).toFixed(3)
}

function meridianFrames(baseDegrees: number) {
  return Array.from({ length: FRAMES + 1 }, (_, frame) => normalizeDegrees(baseDegrees + (360 * frame) / FRAMES))
}

function joinedFrameValues(baseDegrees: number, mapper: (degrees: number) => string) {
  return meridianFrames(baseDegrees)
    .map(mapper)
    .join(';')
}

export default function Globe() {
  return (
    <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[560px] lg:h-[560px] lg:translate-x-20 lg:translate-y-5" style={{ perspective: '1000px' }}>
      <div className="absolute w-[320px] h-[320px] border border-border/60 animate-[pulse-expand_4s_ease-out_infinite]" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
      <div className="absolute w-[320px] h-[320px] border border-border/45 animate-[pulse-expand_4s_ease-out_infinite_1.3s]" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
      <div className="absolute w-[320px] h-[320px] border border-border/30 animate-[pulse-expand_4s_ease-out_infinite_2.6s]" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
      
      <svg
        viewBox="0 0 560 560"
        className="w-full h-full"
        style={{ filter: 'var(--globe-filter)' }}
      >
        <defs>
          <radialGradient id="globeGrad" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="hsl(var(--muted))" />
            <stop offset="100%" stopColor="hsl(var(--background))" />
          </radialGradient>
          <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
            <stop offset="75%" stopColor="transparent" />
            <stop offset="100%" stopColor="hsl(var(--foreground) / 0.12)" />
          </radialGradient>
          <clipPath id="globeClip">
            <circle cx="280" cy="280" r="250" />
          </clipPath>
        </defs>

        <circle cx="280" cy="280" r="250" fill="url(#globeGrad)" />
        <circle cx="280" cy="280" r="250" fill="url(#rimGrad)" opacity="0.7" />

        <g clipPath="url(#globeClip)">
          {Array.from({ length: MERIDIANS }, (_, index) => (360 * index) / MERIDIANS).map((baseDegrees) => (
            <path
              key={baseDegrees}
              d={meridianPath(baseDegrees)}
              fill="none"
              opacity={meridianOpacity(baseDegrees)}
              stroke="hsl(var(--foreground))"
              strokeLinecap="round"
              strokeWidth="0.75"
            >
              <animate attributeName="d" values={joinedFrameValues(baseDegrees, meridianPath)} dur={`${ROTATION_SECONDS}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values={joinedFrameValues(baseDegrees, meridianOpacity)} dur={`${ROTATION_SECONDS}s`} repeatCount="indefinite" />
            </path>
          ))}
        </g>

        <circle cx="280" cy="280" r="250" fill="none" stroke="hsl(var(--foreground) / 0.1)" strokeWidth="1" />
      </svg>
    </div>
  )
}
