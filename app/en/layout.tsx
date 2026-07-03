import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'nxtcorex Download Accelerator - Every Byte, Blazing Fast',
  description: 'nxtcorex download acceleration service — professional file delivery on a global network.',
  alternates: {
    languages: {
      'zh-CN': '/',
      'en': '/en',
    },
  },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children
}
