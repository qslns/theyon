'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import Footer from '@/components/Footer'
import { Slot, AnnotationLabel } from '@/components/deconstructivist'
import {
  GlitchTitle,
  LabelText,
  WhisperText,
  NumberTag,
  ExperimentalText,
} from '@/components/typography'

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


// Slot sizes for gallery
const slotSizes = ['large', 'medium', 'small', 'medium-wide', 'small-square'] as const
const slotClips = ['irregular-1', 'torn-1', 'organic-1', 'torn-2', 'irregular-3', 'wave-1'] as const
const rotations = [-2.5, 3, -1.5, 4, -3, 2]
const decorations = ['tape-corner', 'pin', 'staple', 'corner-fold', 'tape-top', 'clip'] as const

export default function CollectionDetailPage() {
  const params = useParams()
  const slug = params.id as string
  const collection = collectionsData[slug]

  if (!collection) {
    return (
      <div className="min-h-screen bg-yon-white flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="font-serif text-6xl md:text-7xl text-yon-platinum leading-none">404</h1>
          <p className="mt-4 text-lg text-yon-grey">Collection not found</p>
          <Link
            href="/collections"
            className="inline-block mt-8 font-mono text-sm text-yon-black border-b border-yon-black pb-1 hover:text-yon-accent hover:border-yon-accent transition-colors"
          >
            ← Back to Collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-yon-white overflow-x-hidden">
      {/* ============================================
          HERO SECTION - Dense Deconstructivist Collage
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ height: 'calc(100vh - 42px)' }}>
        {/* Background typography */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            right: '-15%',
            fontSize: 'clamp(18rem, 45vw, 60rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.025,
            lineHeight: 0.8,
            color: '#0A0A0A',
          }}
          aria-hidden="true"
        >
          {collection.title.charAt(0)}
        </span>

        {/* Secondary background - index */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '15%',
            left: '-5%',
            fontSize: 'clamp(12rem, 30vw, 45rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            letterSpacing: '0.2em',
            color: '#8B7355',
          }}
          aria-hidden="true"
        >
          {collection.index}
        </span>

        {/* Hero Slots - 8 scattered */}
        <Slot
          label={`${collection.title} / MAIN`}
          size="hero"
          position="absolute"
          top="5%"
          left="-3%"
          rotation={-2.5}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={20}
          bleed="left"
          bleedAmount="lg"
          annotationNumber={`${collection.index}-001`}
          texture="grain"
        />

        <Slot
          label="DETAIL"
          size="large"
          position="absolute"
          top="8%"
          right="5%"
          rotation={3}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
          bleed="right"
          bleedAmount="md"
        />

        <Slot
          label="PROCESS"
          size="medium"
          position="absolute"
          top="45%"
          right="15%"
          rotation={-4}
          clip="organic-1"
          shadow="dramatic"
          zIndex={25}
          overlapX={80}
          decoration="staple"
        />

        <Slot
          label="TEXTURE"
          size="small"
          position="absolute"
          bottom="25%"
          left="8%"
          rotation={6}
          clip="torn-2"
          shadow="offset"
          zIndex={22}
          grayscale
          decoration="pin"
        />

        <Slot
          label="MATERIAL"
          size="swatch"
          position="absolute"
          top="65%"
          left="35%"
          rotation={-10}
          border="rough"
          zIndex={28}
          decoration="tape-top"
        />

        <Slot
          label="SAMPLE"
          size="swatch"
          position="absolute"
          top="70%"
          left="42%"
          rotation={8}
          border="accent"
          zIndex={29}
          overlapX={25}
        />

        <Slot
          label="REF"
          size="tiny"
          position="absolute"
          top="55%"
          right="-2%"
          rotation={-12}
          clip="irregular-4"
          zIndex={15}
          bleed="right"
          bleedAmount="md"
        />

        <Slot
          label={collection.index}
          size="micro"
          position="absolute"
          top="35%"
          left="50%"
          rotation={15}
          border="thin"
          zIndex={30}
          decoration="pin-red"
        />

        {/* Annotations */}
        <AnnotationLabel
          text={collection.title}
          position={{ top: '12%', left: '25%' }}
          rotation={-3}
          variant="tag"
        />
        <AnnotationLabel
          text="in progress"
          position={{ top: '50%', left: '5%' }}
          rotation={5}
          variant="handwritten"
        />
        <AnnotationLabel
          text={`NO.${collection.index}`}
          position={{ bottom: '35%', right: '30%' }}
          rotation={-2}
          variant="number"
        />

        {/* Title card - bottom left */}
        <div
          className="absolute z-40"
          style={{
            bottom: '8%',
            left: '6%',
            transform: 'rotate(-2deg)',
          }}
        >
          <LabelText text="Collection" style={{ fontSize: '0.55rem' }} />

          <GlitchTitle
            text={collection.title}
            size="heading"
            glitchOffset={5}
            charRotation
            rotationIntensity={3}
            className="mt-3"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
              letterSpacing: '-0.03em',
            }}
            as="h1"
          />

          <div className="mt-4 flex items-center gap-3">
            <NumberTag index={parseInt(collection.index)} />
            <span className="w-6 h-px bg-yon-accent/40" />
            <ExperimentalText
              text={collection.description.split('.')[0]}
              variant="caption"
              effect="scatter"
              intensity="subtle"
              style={{ maxWidth: '280px', fontSize: '0.65rem' }}
            />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
          <WhisperText text="Scroll" style={{ fontSize: '0.5rem' }} />
          <span className="block text-yon-grey/30 mt-2 text-center">↓</span>
        </div>
      </section>


      {/* ============================================
          IMAGE GALLERY - Dense Moodboard Style
          ============================================ */}
      <section className="relative py-24 px-8 md:px-16 overflow-hidden texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            left: '-10%',
            fontSize: 'clamp(10rem, 25vw, 35rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            color: '#0A0A0A',
            transform: 'rotate(-5deg)',
          }}
          aria-hidden="true"
        >
          LOOKS
        </span>

        <div className="max-w-7xl mx-auto">
          <LabelText text="Gallery" className="mb-12" style={{ fontSize: '0.55rem' }} />

          {/* Image grid with Slots */}
          <div className="relative" style={{ minHeight: '150vh' }}>
            {collection.images.map((image, index) => {
              const positions = [
                { top: '0', left: '0' },
                { top: '5%', right: '10%' },
                { top: '25%', left: '25%' },
                { top: '35%', right: '5%' },
                { top: '55%', left: '5%' },
                { top: '65%', right: '20%' },
              ]
              const pos = positions[index % positions.length]

              return (
                <Slot
                  key={image.id}
                  label={image.caption || `LOOK ${String(image.id).padStart(2, '0')}`}
                  size={slotSizes[index % slotSizes.length]}
                  position="absolute"
                  top={pos.top}
                  left={pos.left}
                  right={pos.right}
                  rotation={rotations[index % rotations.length]}
                  clip={slotClips[index % slotClips.length]}
                  shadow={index === 0 ? 'offset-lg' : index % 2 === 0 ? 'float' : 'offset'}
                  zIndex={15 + index}
                  decoration={decorations[index % decorations.length]}
                  annotationNumber={`${collection.index}-${String(image.id).padStart(3, '0')}`}
                  grayscale={index % 4 === 3}
                  sepia={index % 5 === 4}
                />
              )
            })}
          </div>

          {/* Concept section */}
          <div className="mt-32 max-w-2xl" style={{ transform: 'rotate(-0.5deg)' }}>
            <LabelText text="Concept" style={{ fontSize: '0.55rem', color: 'rgba(139, 115, 85, 0.6)' }} />
            <p
              className="font-sans text-yon-grey/70 mt-6 leading-relaxed"
              style={{ fontSize: '0.95rem' }}
            >
              {collection.concept}
            </p>
          </div>

          {/* Techniques & Materials */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div style={{ transform: 'rotate(0.3deg)' }}>
              <LabelText text="Techniques" style={{ fontSize: '0.55rem', color: 'rgba(139, 115, 85, 0.6)' }} />
              <ul className="mt-4 space-y-2">
                {collection.techniques.map((technique, i) => (
                  <li key={i} className="font-mono text-yon-grey/60" style={{ fontSize: '0.75rem' }}>
                    {technique}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ transform: 'rotate(-0.3deg)' }}>
              <LabelText text="Materials" style={{ fontSize: '0.55rem', color: 'rgba(139, 115, 85, 0.6)' }} />
              <ul className="mt-4 space-y-2">
                {collection.materials.map((material, i) => (
                  <li key={i} className="font-mono text-yon-grey/60" style={{ fontSize: '0.75rem' }}>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Scattered annotations */}
        <AnnotationLabel
          text="final"
          position={{ top: '15%', right: '25%' }}
          rotation={-4}
          variant="handwritten"
        />
        <AnnotationLabel
          text="APPROVED"
          position={{ top: '45%', left: '55%' }}
          rotation={5}
          variant="stamp"
        />
      </section>


      {/* ============================================
          NAVIGATION
          ============================================ */}
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

      <Footer />
    </div>
  )
}
