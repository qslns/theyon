import { Suspense } from 'react'
import Link from 'next/link'
import type { Collection } from '@/types/sanity'
import Footer from '@/components/Footer'
import { Slot, AnnotationLabel, BackgroundSlot } from '@/components/deconstructivist'
import { GlitchTitle, LabelText } from '@/components/typography'
import { getSlotImages, createSlotHelper } from '@/lib/sanity/slots'
import CollectionsClient from './collections-client'

// Fetch collections from Sanity or use fallback
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

// Fallback data for THE YON
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
  // Fetch slot images for collections page from CMS
  const slotImages = await getSlotImages('collections')
  const slot = createSlotHelper(slotImages)

  // Fetch collections data
  const collections = await getCollections()

  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* CMS Background Slot */}
      <BackgroundSlot
        {...slot('collections-background-001', 'BACKGROUND')}
        opacity={0.03}
        grayscale
      />

      {/* ============================================
          HERO HEADER - Dense Deconstructivist - fits single screen
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ height: 'calc(100vh - 48px)' }}>
        {/* Background typography */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '15%',
            left: '-8%',
            fontSize: 'clamp(12rem, 30vw, 50rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.025,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: '#0A0A0A',
            transform: 'rotate(-3deg)',
          }}
          aria-hidden="true"
        >
          WORKS
        </span>

        {/* Secondary background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            right: '-10%',
            fontSize: 'clamp(8rem, 20vw, 35rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            color: '#8B7355',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          04
        </span>

        {/* Third layer - vertical */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '20%',
            right: '5%',
            fontSize: 'clamp(4rem, 10vw, 12rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            letterSpacing: '0.3em',
            color: '#0A0A0A',
            writingMode: 'vertical-rl',
          }}
          aria-hidden="true"
        >
          COLLECTIONS
        </span>

        {/* ===== HEADER SLOTS - 10 scattered ===== */}

        {/* Slot 1: Hero left bleeding */}
        <Slot
          {...slot('collections-header-001', 'FEATURED')}
          size="large"
          position="absolute"
          top="8%"
          left="-4%"
          rotation={-3}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={15}
          bleed="left"
          bleedAmount="lg"
          annotationNumber="001"
        />

        {/* Slot 2: Medium right */}
        <Slot
          {...slot('collections-header-002', 'AW25')}
          size="medium"
          position="absolute"
          top="10%"
          right="8%"
          rotation={4}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
        />

        {/* Slot 3: Small overlapping */}
        <Slot
          {...slot('collections-header-003', 'PROCESS')}
          size="small"
          position="absolute"
          top="45%"
          right="20%"
          rotation={-5}
          clip="organic-1"
          zIndex={22}
          overlapX={60}
          decoration="pin"
        />

        {/* Slot 4: Tiny accent */}
        <Slot
          {...slot('collections-header-004', 'REF')}
          size="tiny"
          position="absolute"
          top="60%"
          left="15%"
          rotation={-10}
          clip="notch-1"
          zIndex={25}
          decoration="clip"
        />

        {/* Slot 5-7: Swatch cluster */}
        <Slot
          {...slot('collections-header-005', 'A')}
          size="swatch"
          position="absolute"
          top="30%"
          left="35%"
          rotation={12}
          border="rough"
          zIndex={20}
          decoration="tape-top"
        />

        <Slot
          {...slot('collections-header-006', 'B')}
          size="swatch"
          position="absolute"
          top="33%"
          left="42%"
          rotation={-8}
          border="accent"
          zIndex={21}
          overlapX={20}
        />

        <Slot
          {...slot('collections-header-007', 'C')}
          size="swatch"
          position="absolute"
          top="36%"
          left="49%"
          rotation={5}
          border="thin"
          zIndex={23}
          overlapX={25}
        />

        {/* Slot 8: Medium-wide bottom */}
        <Slot
          {...slot('collections-header-008', 'ARCHIVE')}
          size="medium-wide"
          position="absolute"
          bottom="20%"
          left="5%"
          rotation={2}
          clip="wave-1"
          shadow="soft"
          zIndex={12}
          sepia
        />

        {/* Slot 9: Small right bleeding */}
        <Slot
          {...slot('collections-header-009', 'SKETCH')}
          size="small"
          position="absolute"
          bottom="30%"
          right="-2%"
          rotation={-6}
          clip="torn-2"
          zIndex={16}
          bleed="right"
          bleedAmount="md"
          grayscale
        />

        {/* Slot 10: Micro */}
        <Slot
          {...slot('collections-header-010', '04')}
          size="micro"
          position="absolute"
          top="50%"
          left="55%"
          rotation={15}
          border="accent"
          zIndex={28}
          decoration="pin-red"
        />

        {/* Annotations */}
        <AnnotationLabel
          text="collections"
          position={{ top: '12%', left: '50%' }}
          rotation={-3}
          variant="tag"
        />
        <AnnotationLabel
          text="view all"
          position={{ top: '55%', right: '35%' }}
          rotation={5}
          variant="handwritten"
        />
        <AnnotationLabel
          text="2024-25"
          position={{ bottom: '25%', left: '40%' }}
          rotation={-2}
          variant="stamp"
        />

        {/* Main title with experimental typography */}
        <div className="relative z-30 pt-44 pb-16 px-8 md:px-16 lg:px-24">
          <div className="max-w-5xl">
            <LabelText
              text="THE YON — Collections"
              style={{ fontSize: '0.55rem' }}
            />

            <GlitchTitle
              text="Collections"
              size="display"
              glitchOffset={8}
              charRotation
              rotationIntensity={4}
              className="mt-6"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                letterSpacing: '-0.04em',
                transform: 'rotate(-2.5deg)',
                lineHeight: 0.9,
              }}
              as="h1"
            />

            <p
              className="font-sans text-yon-grey/60 mt-10 max-w-lg"
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.8,
                marginLeft: '3rem',
                transform: 'rotate(0.5deg)',
              }}
            >
              Experimental fashion explorations. Each collection challenges conventional construction,
              material, and form. Work in progress, failures documented.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          COLLECTIONS - Client Component for Filtering
          ============================================ */}
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <div className="w-10 h-10 border border-yon-grey/20 border-t-yon-black rounded-full animate-spin" />
          <span
            className="font-mono uppercase tracking-[0.2em] text-yon-grey/40"
            style={{ fontSize: '0.6rem' }}
          >
            Loading Collections
          </span>
        </div>
      }>
        <CollectionsClient collections={collections} />
      </Suspense>

      {/* ============================================
          ARCHIVE LINK - Dense Section
          ============================================ */}
      <section className="relative min-h-[60vh] py-24 px-8 md:px-16 lg:px-24 overflow-hidden texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-12%',
            fontSize: 'clamp(18rem, 45vw, 60rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            lineHeight: 0.8,
            color: '#0A0A0A',
          }}
          aria-hidden="true"
        >
          A
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            left: '-5%',
            fontSize: 'clamp(6rem, 15vw, 22rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            color: '#8B7355',
            transform: 'rotate(-90deg)',
            transformOrigin: 'left bottom',
          }}
          aria-hidden="true"
        >
          ARCHIVE
        </span>

        <div className="relative z-10 max-w-4xl">
          <span
            className="block font-mono uppercase tracking-[0.3em] text-yon-grey/40"
            style={{ fontSize: '0.55rem' }}
          >
            Research & Process
          </span>

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
            Failures are documented as essential steps toward discovery.
          </p>

          <Link
            href="/archive"
            className="inline-block mt-10 font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.6rem' }}
          >
            Enter Archive →
          </Link>
        </div>

        {/* Floating slots */}
        <Slot
          {...slot('collections-archive-001', 'ARCHIVE')}
          size="medium"
          position="absolute"
          top="10%"
          right="10%"
          rotation={-4}
          clip="irregular-4"
          shadow="float"
          grayscale
          zIndex={10}
          annotationNumber="A-001"
          decoration="tape-corner"
        />

        <Slot
          {...slot('collections-archive-002', 'DOC')}
          size="small"
          position="absolute"
          top="45%"
          right="25%"
          rotation={6}
          clip="torn-3"
          zIndex={12}
          sepia
        />

        <Slot
          {...slot('collections-archive-003', 'PROCESS')}
          size="tiny"
          position="absolute"
          bottom="25%"
          right="35%"
          rotation={-8}
          border="thin"
          zIndex={14}
          decoration="pin"
        />

        <Slot
          {...slot('collections-archive-004', 'REF')}
          size="swatch"
          position="absolute"
          bottom="15%"
          right="10%"
          rotation={10}
          border="rough"
          zIndex={11}
          grayscale
        />

        <Slot
          {...slot('collections-archive-005', '→')}
          size="micro"
          position="absolute"
          top="30%"
          right="45%"
          rotation={-5}
          border="accent"
          zIndex={15}
        />

        <AnnotationLabel
          text="explore"
          position={{ top: '25%', right: '30%' }}
          rotation={4}
          variant="handwritten"
        />
        <AnnotationLabel
          text="RESEARCH"
          position={{ bottom: '35%', right: '20%' }}
          rotation={-3}
          variant="stamp"
        />
      </section>

      <Footer />
    </div>
  )
}
