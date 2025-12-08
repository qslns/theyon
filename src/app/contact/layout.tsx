import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with ASKEW. For collaborations, exhibitions, press inquiries, and more.',
  openGraph: {
    title: 'Contact | ASKEW',
    description: 'Get in touch with ASKEW. For collaborations, exhibitions, press inquiries, and more.',
  },
  twitter: {
    card: 'summary',
    title: 'Contact | ASKEW',
    description: 'Get in touch with ASKEW.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
