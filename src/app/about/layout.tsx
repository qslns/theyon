import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Taehyun Lee. Fashion Designer.',
  openGraph: {
    title: 'About | ASKEW',
    description: 'Taehyun Lee. Fashion Designer.',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | ASKEW',
    description: 'Taehyun Lee. Fashion Designer.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
