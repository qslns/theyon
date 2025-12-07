import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'THE YON Studio',
  description: 'Content management for THE YON',
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
