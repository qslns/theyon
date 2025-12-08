import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Taehyun Lee. Seoul / Tokyo.',
  openGraph: {
    title: 'About | ASKEW',
    description: 'Taehyun Lee. Seoul / Tokyo.',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | ASKEW',
    description: 'Taehyun Lee. Seoul / Tokyo.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
