import Link from 'next/link'
import type { ComponentProps } from 'react'

type InternalLinkProps = ComponentProps<typeof Link>

export default function InternalLink({ prefetch = false, ...props }: InternalLinkProps) {
  return <Link prefetch={prefetch} {...props} />
}
