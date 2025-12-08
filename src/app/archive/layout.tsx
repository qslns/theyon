import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Research documentation and design process archive. Explore the experiments, iterations, and creative journey behind ASKEW collections.',
  openGraph: {
    title: 'Archive | ASKEW',
    description: 'Research documentation and design process archive. Explore the experiments behind ASKEW collections.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Archive | ASKEW',
    description: 'Research and process documentation archive.',
  },
}

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
