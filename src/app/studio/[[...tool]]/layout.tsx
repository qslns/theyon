import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ASKEW Studio',
  description: 'Content management for ASKEW',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
