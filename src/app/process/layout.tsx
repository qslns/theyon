import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Process',
  description: 'The journey from concept to wearable sculpture. Explore the creative process behind ASKEW collections - research, experimentation, and refinement.',
  openGraph: {
    title: 'Process | ASKEW',
    description: 'The journey from concept to wearable sculpture. Explore the creative process behind ASKEW collections.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Process | ASKEW',
    description: 'The journey from concept to wearable sculpture.',
  },
}

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
