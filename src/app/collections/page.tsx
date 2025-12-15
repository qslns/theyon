import { Suspense } from 'react'
import Link from 'next/link'
import type { Collection } from '@/types/sanity'
import Footer from '@/components/Footer'
import { Slot, BackgroundSlot } from '@/components/deconstructivist'
import { GlitchTitle, LabelText, StickerText, SeasonLabel } from '@/components/typography'
import { getSlotImages, createSlotHelper } from '@/lib/sanity/slots'
import CollectionsClient from './collections-client'

export const revalidate = 10

async function getCollections(): Promise<Partial<Collection>[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId || projectId === 'your_project_id_here') {
    return FALLBACK_COLLECTIONS
  }
  try {
    const { client } = await import('../../../sanity/lib/client')
    const { collectionsQuery } = await import('@/lib/sanity/queries')
    const data = await client.fetch<Collection[]>(collectionsQuery)
    return data && data.length > 0 ? data : FALLBACK_COLLECTIONS
  } catch {
    return FALLBACK_COLLECTIONS
  }
}

const FALLBACK_COLLECTIONS: Partial<Collection>[] = [
  {
    _id: '1',
    title: 'DECONSTRUCTION',
    slug: 'deconstruction',
    status: 'in_progress',
    description: 'Exploring pattern deconstruction through experimental tailoring techniques.',
    techniques: ['Raw edge exposure', 'Inverted seaming', 'Visible interfacing'],
    materials: ['Japanese denim', 'Wool suiting', 'Cotton canvas'],
    featured: true,
  },
  {
    _id: '2',
    title: 'FRAGMENTS',
    slug: 'fragments',
    status: 'testing',
    description: 'Hybrid material construction with contrasting textures.',
    techniques: ['Material splicing', 'Surface manipulation'],
    materials: ['Nylon', 'Silk organza', 'Leather'],
    featured: true,
  },
  {
    _id: '3',
    title: 'VOID',
    slug: 'void',
    status: 'complete',
    description: 'Architectural volume exploration. The space between defines the form.',
    techniques: ['Draping', 'Pattern cutting'],
    materials: ['Cotton canvas', 'Horsehair'],
    featured: false,
  },
  {
    _id: '4',
    title: 'ORIGIN',
    slug: 'origin',
    status: 'complete',
    description: 'Return to fundamental shapes. Where every collection begins.',
    techniques: ['Basic construction', 'Form studies'],
    materials: ['Muslin', 'Cotton'],
    featured: false,
  },
]

export default async function CollectionsPage() {
  const slotImages = await getSlotImages('collections')
  const slot = createSlotHelper(slotImages)
  const collections = await getCollections()

  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* Background Slot */}
      <BackgroundSlot
        {...slot('collections-background-001', 'BACKGROUND')}
        opacity={0.02}
        grayscale
      />

      {/* ============================================
          HERO - Clean with 4 key slots
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ minHeight: 'calc(100vh - 56px)' }}>
        {/* Background typography */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '12%',
            left: '-8%',
            fontSize: 'clamp(14rem, 35vw, 55rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: 'var(--yon-black)',
            transform: 'rotate(-3deg)',
          }}
          aria-hidden="true"
        >
          WORKS
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '8%',
            right: '-8%',
            fontSize: 'clamp(9rem, 22vw, 38rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            color: 'var(--yon-accent)',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          04
        </span>

        {/* ===== HERO SLOTS - 4 carefully placed ===== */}

        {/* Slot 1: Hero - large left */}
        <Slot
          {...slot('collections-header-001', 'FEATURED')}
          size="hero"
          position="absolute"
          top="5%"
          left="-3%"
          rotation={-3}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={18}
          bleed="left"
          bleedAmount="lg"
          annotationNumber="001"
          texture="grain"
        />

        {/* Slot 2: Medium - right top */}
        <Slot
          {...slot('collections-header-002', 'LOOK 02')}
          size="medium"
          position="absolute"
          top="8%"
          right="6%"
          rotation={4}
          clip="torn-1"
          shadow="float"
          zIndex={20}
          decoration="tape-corner"
        />

        {/* Slot 3: Small - accent */}
        <Slot
          {...slot('collections-header-003', 'DETAIL')}
          size="small"
          position="absolute"
          bottom="25%"
          right="18%"
          rotation={-5}
          clip="organic-1"
          zIndex={22}
          decoration="pin"
        />

        {/* Slot 4: Swatch - material */}
        <Slot
          {...slot('collections-header-004', 'FABRIC')}
          size="swatch"
          position="absolute"
          bottom="18%"
          left="45%"
          rotation={10}
          border="rough"
          zIndex={24}
          decoration="tape-top"
        />

        {/* Season label */}
        <div className="absolute" style={{ top: '12%', right: '30%', zIndex: 50 }}>
          <SeasonLabel season="S/S" year="2025" rotation={-2} />
        </div>

        {/* Main title */}
        <div className="relative z-30 pt-40 pb-16 px-8 md:px-16 lg:px-24">
          <div className="max-w-5xl">
            <StickerText variant="label" rotation={-1} color="cream" size="xs">
              04 COLLECTIONS
            </StickerText>

            <GlitchTitle
              text="Collections"
              size="display"
              glitchOffset={6}
              charRotation
              rotationIntensity={3}
              className="mt-6"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: '-0.03em',
                transform: 'rotate(-2deg)',
                lineHeight: 0.9,
              }}
              as="h1"
            />

            <p
              className="font-sans text-yon-grey/60 mt-10 max-w-lg"
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.8,
                marginLeft: '3rem',
                transform: 'rotate(0.5deg)',
              }}
            >
              Experimental fashion explorations. Each collection challenges conventional construction,
              material, and form.
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
          <span className="block font-mono uppercase tracking-[0.3em] text-yon-grey/30" style={{ fontSize: '0.5rem' }}>
            View All
          </span>
          <span className="block text-yon-grey/20 mt-2 text-center">↓</span>
        </div>
      </section>

      {/* Collections Grid - Client Component */}
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <div className="w-10 h-10 border border-yon-grey/20 border-t-yon-black rounded-full animate-spin" />
          <span className="font-mono uppercase tracking-[0.2em] text-yon-grey/40" style={{ fontSize: '0.6rem' }}>
            Loading Collections
          </span>
        </div>
      }>
        <CollectionsClient collections={collections} />
      </Suspense>

      {/* ============================================
          ARCHIVE LINK - Clean Section
          ============================================ */}
      <section className="relative min-h-[55vh] py-24 px-8 md:px-16 lg:px-24 overflow-hidden texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-10%',
            fontSize: 'clamp(16rem, 40vw, 55rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            lineHeight: 0.8,
            color: 'var(--yon-black)',
          }}
          aria-hidden="true"
        >
          A
        </span>

        <div className="relative z-10 max-w-4xl">
          <StickerText variant="tape" rotation={1} size="xs">
            RESEARCH & PROCESS
          </StickerText>

          <h2
            className="font-serif text-yon-black mt-6"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              transform: 'rotate(-0.5deg)',
            }}
          >
            Archive
          </h2>

          <p
            className="font-sans text-yon-grey/60 mt-6 max-w-md"
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.8,
              marginLeft: '2rem',
            }}
          >
            Explorations, experiments, and documentation of the creative process.
          </p>

          <Link
            href="/archive"
            className="inline-block mt-10 font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.6rem' }}
          >
            Enter Archive →
          </Link>
        </div>

        {/* 2 floating slots */}
        <Slot
          {...slot('collections-archive-001', 'ARCHIVE')}
          size="medium"
          position="absolute"
          top="10%"
          right="8%"
          rotation={-4}
          clip="irregular-4"
          shadow="float"
          grayscale
          zIndex={10}
          decoration="tape-corner"
        />

        <Slot
          {...slot('collections-archive-002', 'PROCESS')}
          size="small"
          position="absolute"
          bottom="20%"
          right="20%"
          rotation={6}
          clip="torn-3"
          zIndex={12}
          sepia
        />
      </section>

      <Footer />
    </div>
  )
}
