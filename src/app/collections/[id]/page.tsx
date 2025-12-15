import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'
import {
  Slot,
  BackgroundSlot,
  SectionNumber,
  DecoLine,
  DotsPattern,
  CrossMarker,
  BracketDeco,
  VerticalText,
  NoiseOverlay,
} from '@/components/deconstructivist'
import { GlitchTitle, LabelText, WhisperText } from '@/components/typography'
import { getSlotImages, createSlotHelper } from '@/lib/sanity/slots'

// Revalidate every 10 seconds for ISR
export const revalidate = 10

// Collection data with enhanced image layouts
const collectionsData: Record<string, {
  title: string
  index: string
  description: string
  concept: string
  images: {
    id: number
    caption?: string
    layout: 'full' | 'left' | 'right' | 'center' | 'overlap-left' | 'overlap-right'
    size: 'large' | 'medium' | 'small'
    variant: 'light' | 'medium' | 'dark'
  }[]
  techniques: string[]
  materials: string[]
  prevSlug?: string
  nextSlug?: string
}> = {
  'deconstruction': {
    title: 'DECONSTRUCTION',
    index: '01',
    description: 'Exploring pattern deconstruction through experimental tailoring techniques. Every seam exposed, every structure questioned.',
    concept: 'This collection questions the fundamental assumptions of garment construction. By exposing the hidden architecture of clothing, we reveal the beauty in structure itself. Seams become decorative elements, interfacing becomes visible texture, and the process of making becomes the final design.',
    images: [
      { id: 1, caption: 'Look 01', layout: 'left', size: 'large', variant: 'light' },
      { id: 2, caption: 'Detail', layout: 'overlap-right', size: 'small', variant: 'dark' },
      { id: 3, caption: 'Look 02', layout: 'full', size: 'large', variant: 'medium' },
      { id: 4, caption: 'Process', layout: 'right', size: 'medium', variant: 'light' },
      { id: 5, caption: 'Look 03', layout: 'center', size: 'large', variant: 'dark' },
      { id: 6, caption: 'Material study', layout: 'left', size: 'small', variant: 'light' },
    ],
    techniques: ['Raw edge exposure', 'Inverted seaming', 'Visible interfacing', 'Deconstructed tailoring'],
    materials: ['Japanese denim', 'Wool suiting', 'Cotton canvas', 'Horsehair interfacing'],
    nextSlug: 'fragments',
  },
  'fragments': {
    title: 'FRAGMENTS',
    index: '02',
    description: 'Hybrid material construction with contrasting textures. Beauty in the broken pieces.',
    concept: 'Fragments explores the poetry of incompleteness. Each piece is constructed from seemingly disparate elements that find unexpected harmony. The collection celebrates the beauty of juxtaposition - rough against smooth, structured against fluid, opacity against transparency.',
    images: [
      { id: 1, caption: 'Look 01', layout: 'right', size: 'large', variant: 'medium' },
      { id: 2, caption: 'Texture detail', layout: 'overlap-left', size: 'small', variant: 'light' },
      { id: 3, caption: 'Look 02', layout: 'full', size: 'large', variant: 'dark' },
      { id: 4, caption: 'Material splice', layout: 'center', size: 'medium', variant: 'light' },
    ],
    techniques: ['Material splicing', 'Surface manipulation', 'Hybrid construction'],
    materials: ['Nylon', 'Silk organza', 'Leather', 'Technical mesh'],
    prevSlug: 'deconstruction',
    nextSlug: 'void',
  },
  'void': {
    title: 'VOID',
    index: '03',
    description: 'Architectural volume exploration. The space between defines the form.',
    concept: 'VOID investigates negative space as a design element. The collection is built around the idea that what is absent is as important as what is present. Sculptural volumes are created not by adding, but by careful subtraction and the strategic placement of emptiness.',
    images: [
      { id: 1, caption: 'Look 01', layout: 'full', size: 'large', variant: 'dark' },
      { id: 2, caption: 'Volume study', layout: 'left', size: 'medium', variant: 'light' },
      { id: 3, caption: 'Look 02', layout: 'overlap-right', size: 'large', variant: 'medium' },
    ],
    techniques: ['Draping', 'Pattern cutting', 'Sculptural construction'],
    materials: ['Cotton canvas', 'Horsehair', 'Organza'],
    prevSlug: 'fragments',
    nextSlug: 'origin',
  },
  'origin': {
    title: 'ORIGIN',
    index: '04',
    description: 'Return to fundamental shapes. Where every collection begins.',
    concept: 'ORIGIN strips away complexity to find the essential. This collection returns to the basic geometric forms that underlie all garment construction - the circle, the rectangle, the line. From these simple elements, we build towards complexity.',
    images: [
      { id: 1, caption: 'Look 01', layout: 'center', size: 'large', variant: 'light' },
      { id: 2, caption: 'Form study', layout: 'right', size: 'medium', variant: 'dark' },
    ],
    techniques: ['Basic construction', 'Form studies', 'Minimal pattern making'],
    materials: ['Muslin', 'Cotton', 'Linen'],
    prevSlug: 'void',
  },
}

// Generate static params for all known collections
export function generateStaticParams() {
  return Object.keys(collectionsData).map((slug) => ({
    id: slug,
  }))
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { id: slug } = await params
  const collection = collectionsData[slug]

  if (!collection) {
    notFound()
  }

  // Fetch slot images for this specific collection
  // Use collection-{slug} as the page identifier for CMS
  const slotImages = await getSlotImages(`collection-${slug}`)
  const slot = createSlotHelper(slotImages)

  return (
    <div className="min-h-screen bg-yon-white overflow-x-hidden">
      {/* Background Slot */}
      <BackgroundSlot
        {...slot(`collection-${slug}-background-001`, 'BACKGROUND')}
        opacity={0.02}
        grayscale
      />

      {/* Global noise overlay */}
      <NoiseOverlay opacity={0.02} />

      {/* ============================================
          HERO SECTION - Simplified with 4 key slots
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ minHeight: 'calc(100vh - 56px)' }}>
        {/* Background typography */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            right: '-10%',
            fontSize: 'clamp(14rem, 35vw, 50rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            color: 'var(--yon-black)',
          }}
          aria-hidden="true"
        >
          {collection.title.charAt(0)}
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '15%',
            left: '-5%',
            fontSize: 'clamp(10rem, 25vw, 35rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            color: 'var(--yon-accent)',
          }}
          aria-hidden="true"
        >
          {collection.index}
        </span>

        {/* Section decorative elements */}
        <SectionNumber number={collection.index} position="top-left" style={{ top: '10%', left: '3%' }} />
        <DecoLine direction="vertical" position="left" length={100} style={{ top: '25%', left: '2%' }} />
        <CrossMarker position="bottom-right" style={{ bottom: '30%', right: '5%' }} />
        <VerticalText text={collection.title} position="right" style={{ right: '2%', top: '30%' }} />

        {/* 4 key slots */}
        <Slot
          {...slot(`collection-${slug}-hero-001`, `${collection.title} / MAIN`)}
          size="hero"
          position="absolute"
          top="5%"
          left="-3%"
          rotation={-2}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={20}
          bleed="left"
          bleedAmount="lg"
          annotationNumber={collection.index}
          frameStyle="film-strip"
          frameNumber={collection.index}
        />

        <Slot
          {...slot(`collection-${slug}-hero-002`, 'DETAIL')}
          size="medium"
          position="absolute"
          top="10%"
          right="8%"
          rotation={3}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
          frameStyle="polaroid"
        />

        <Slot
          {...slot(`collection-${slug}-hero-003`, 'PROCESS')}
          size="small"
          position="absolute"
          top="50%"
          right="20%"
          rotation={-4}
          clip="organic-1"
          zIndex={22}
          decoration="pin"
          frameStyle="slide-mount"
          filmFilter="warm"
        />

        <Slot
          {...slot(`collection-${slug}-hero-004`, 'MATERIAL')}
          size="swatch"
          position="absolute"
          bottom="25%"
          left="40%"
          rotation={-8}
          border="rough"
          zIndex={24}
          decoration="tape-top"
          frameStyle="torn"
        />

        {/* Title card */}
        <div
          className="absolute z-30"
          style={{
            bottom: '10%',
            left: '6%',
            transform: 'rotate(-1.5deg)',
          }}
        >
          <LabelText text="Collection" style={{ fontSize: '0.55rem' }} />

          <GlitchTitle
            text={collection.title}
            size="heading"
            glitchOffset={4}
            charRotation
            rotationIntensity={2}
            className="mt-3"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
            }}
            as="h1"
          />

          <p
            className="font-sans text-yon-grey/60 mt-4 max-w-sm"
            style={{ fontSize: '0.85rem', lineHeight: 1.6 }}
          >
            {collection.description}
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
          <WhisperText text="Scroll" style={{ fontSize: '0.5rem' }} />
          <span className="block text-yon-grey/20 mt-2 text-center">↓</span>
        </div>
      </section>


      {/* ============================================
          GALLERY & INFO - Simplified with 2 slots
          ============================================ */}
      <section className="relative py-20 px-8 md:px-16 lg:px-24 overflow-hidden texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            left: '-8%',
            fontSize: 'clamp(8rem, 20vw, 28rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            color: 'var(--yon-black)',
            transform: 'rotate(-4deg)',
          }}
          aria-hidden="true"
        >
          LOOKS
        </span>

        <div className="max-w-5xl mx-auto">
          <LabelText text="Gallery" style={{ fontSize: '0.55rem' }} />

          {/* Section decorative elements */}
          <SectionNumber number="02" position="top-right" style={{ position: 'absolute', top: '0', right: '0' }} />
          <BracketDeco position="bottom-left" style={{ position: 'absolute', bottom: '10%', left: '0' }} />
          <DotsPattern rows={4} cols={6} style={{ position: 'absolute', bottom: '5%', right: '20%' }} />

          {/* 2 gallery slots */}
          <div className="relative mt-10" style={{ minHeight: '50vh' }}>
            <Slot
              {...slot(`collection-${slug}-gallery-001`, 'LOOK 01')}
              size="large"
              position="absolute"
              top="0"
              left="0"
              rotation={-2}
              clip="irregular-1"
              shadow="offset-lg"
              zIndex={15}
              annotationNumber={`${collection.index}-01`}
              frameStyle="contact-sheet"
              frameNumber="01"
            />

            <Slot
              {...slot(`collection-${slug}-gallery-002`, 'LOOK 02')}
              size="medium"
              position="absolute"
              top="20%"
              right="5%"
              rotation={3}
              clip="torn-1"
              shadow="float"
              zIndex={18}
              decoration="tape-corner"
              frameStyle="vintage"
              filmFilter="faded"
            />
          </div>

          {/* Concept */}
          <div className="mt-16 max-w-2xl" style={{ transform: 'rotate(-0.3deg)' }}>
            <LabelText text="Concept" style={{ fontSize: '0.55rem', color: 'var(--yon-accent)' }} />
            <p
              className="font-sans text-yon-grey/60 mt-5 leading-relaxed"
              style={{ fontSize: '0.9rem' }}
            >
              {collection.concept}
            </p>
          </div>

          {/* Techniques & Materials */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <LabelText text="Techniques" style={{ fontSize: '0.55rem', color: 'var(--yon-accent)' }} />
              <ul className="mt-4 space-y-2">
                {collection.techniques.map((technique, i) => (
                  <li key={i} className="font-mono text-yon-grey/50" style={{ fontSize: '0.7rem' }}>
                    {technique}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <LabelText text="Materials" style={{ fontSize: '0.55rem', color: 'var(--yon-accent)' }} />
              <ul className="mt-4 space-y-2">
                {collection.materials.map((material, i) => (
                  <li key={i} className="font-mono text-yon-grey/50" style={{ fontSize: '0.7rem' }}>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          NAVIGATION
          ============================================ */}
      <Suspense fallback={null}>
        <section className="py-16 md:py-24 px-6 md:px-12 border-t border-yon-platinum">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
              {/* Previous */}
              <div>
                {collection.prevSlug ? (
                  <Link
                    href={`/collections/${collection.prevSlug}`}
                    className="group flex items-center gap-4 outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4 rounded"
                  >
                    <span className="font-mono text-xs text-yon-grey group-hover:text-yon-black group-focus-visible:text-yon-black transition-colors">←</span>
                    <div>
                      <span className="block font-mono text-[10px] text-yon-grey tracking-wider uppercase">Previous</span>
                      <span className="block font-serif text-lg text-yon-black group-hover:text-yon-accent group-focus-visible:text-yon-accent transition-colors">
                        {collectionsData[collection.prevSlug]?.title}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <Link
                    href="/collections"
                    className="font-mono text-sm text-yon-grey hover:text-yon-black focus-visible:text-yon-black transition-colors outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4 rounded"
                  >
                    ← All Collections
                  </Link>
                )}
              </div>

              {/* Next */}
              <div>
                {collection.nextSlug ? (
                  <Link
                    href={`/collections/${collection.nextSlug}`}
                    className="group flex items-center gap-4 text-right outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4 rounded"
                  >
                    <div>
                      <span className="block font-mono text-[10px] text-yon-grey tracking-wider uppercase">Next</span>
                      <span className="block font-serif text-lg text-yon-black group-hover:text-yon-accent group-focus-visible:text-yon-accent transition-colors">
                        {collectionsData[collection.nextSlug]?.title}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-yon-grey group-hover:text-yon-black group-focus-visible:text-yon-black transition-colors">→</span>
                  </Link>
                ) : (
                  <Link
                    href="/archive"
                    className="font-mono text-sm text-yon-black hover:text-yon-accent focus-visible:text-yon-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4 rounded"
                  >
                    View Archive →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </Suspense>

      <Footer />
    </div>
  )
}
