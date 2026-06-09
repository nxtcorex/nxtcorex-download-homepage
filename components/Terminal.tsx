'use client'

import { Button } from '@/components/ui/button'

const providers = [
  {
    name: 'Cloudflare',
    href: 'https://www.cloudflare.com/',
    className: 'text-[#F38020]',
    icon: (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="h-12 w-12 fill-current sm:h-14 sm:w-14">
        <path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727" />
      </svg>
    ),
  },
  {
    name: 'Alibaba Cloud',
    href: 'https://www.alibabacloud.com/',
    className: 'text-[#FF6A00]',
    icon: (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="h-12 w-12 fill-current sm:h-14 sm:w-14">
        <path d="M3.996 4.517h5.291L8.01 6.324 4.153 7.506a1.668 1.668 0 0 0-1.165 1.601v5.786a1.668 1.668 0 0 0 1.165 1.6l3.857 1.183 1.277 1.807H3.996A3.996 3.996 0 0 1 0 15.487V8.513a3.996 3.996 0 0 1 3.996-3.996m16.008 0h-5.291l1.277 1.807 3.857 1.182c.715.227 1.17.889 1.165 1.601v5.786a1.668 1.668 0 0 1-1.165 1.6l-3.857 1.183-1.277 1.807h5.291A3.996 3.996 0 0 0 24 15.487V8.513a3.996 3.996 0 0 0-3.996-3.996m-4.007 8.345H8.002v-1.804h7.995Z" />
      </svg>
    ),
  },
]

export default function Terminal() {
  return (
    <section id="network" className="py-16 md:py-24">
      <div className="section-shell">
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            {providers.map((provider) => (
              <Button
                key={provider.name}
                asChild
                variant="outline"
                className="group h-24 w-24 rounded-lg bg-background/70 p-0 text-muted-foreground shadow-none transition-all hover:bg-accent hover:text-foreground hover:shadow-provider-hover focus-visible:text-foreground sm:h-28 sm:w-28"
              >
                <a href={provider.href} target="_blank" rel="noreferrer" aria-label={provider.name} title={provider.name}>
                  <span className={`${provider.className} opacity-55 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-125 group-focus-visible:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:brightness-125`}>
                    {provider.icon}
                  </span>
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
