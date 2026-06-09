'use client'

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
        </defs>

        <circle cx="280" cy="280" r="250" fill="url(#globeGrad)" />
        <circle cx="280" cy="280" r="250" fill="url(#rimGrad)" opacity="0.7" />

        <g className="animate-spin-y" style={{ transformOrigin: '280px 280px' }}>
          <line x1="280" y1="30" x2="280" y2="530" stroke="hsl(var(--foreground) / 0.12)" strokeWidth="0.8" />
          <path d="M280,30 Q370,280 280,530" fill="none" stroke="hsl(var(--foreground) / 0.1)" strokeWidth="0.7" />
          <path d="M280,30 Q190,280 280,530" fill="none" stroke="hsl(var(--foreground) / 0.1)" strokeWidth="0.7" />
          <path d="M280,30 Q440,280 280,530" fill="none" stroke="hsl(var(--foreground) / 0.08)" strokeWidth="0.65" />
          <path d="M280,30 Q120,280 280,530" fill="none" stroke="hsl(var(--foreground) / 0.08)" strokeWidth="0.65" />
        </g>

        <ellipse cx="280" cy="280" rx="258" ry="70" fill="none" stroke="hsl(var(--muted-foreground) / 0.08)" strokeWidth="16" />
        <ellipse cx="280" cy="280" rx="254" ry="67" fill="none" stroke="hsl(var(--foreground) / 0.38)" strokeWidth="8" />
        <ellipse cx="280" cy="280" rx="250" ry="63" fill="none" stroke="hsl(var(--foreground) / 0.2)" strokeWidth="1.5" />
        <ellipse cx="280" cy="280" rx="258" ry="70" fill="none" stroke="hsl(var(--muted-foreground) / 0.2)" strokeWidth="1" />
      </svg>
    </div>
  )
}
