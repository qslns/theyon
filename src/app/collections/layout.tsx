import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore wearable sculpture collections by ASKEW. Twisted yet harmonious. Structure woven in silence, beauty caught in light.',
  openGraph: {
    title: 'Collections | ASKEW',
    description: 'Explore wearable sculpture collections by ASKEW. Twisted yet harmonious.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collections | ASKEW',
    description: 'Wearable sculpture collections by ASKEW.',
  },
}

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
