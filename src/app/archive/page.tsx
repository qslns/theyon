import Link from 'next/link'
import Footer from '@/components/Footer'
import {
  Slot,
  BackgroundSlot,
  ScrollingBackgroundSlot,
  SectionNumber,
  DecoLine,
  CrossMarker,
  BracketDeco,
  VerticalText,
  NoiseOverlay,
  DecoDivider,
} from '@/components/deconstructivist'
import { GlitchTitle, StickerText, LabelText } from '@/components/typography'
import { getSlotImages, createSlotHelper } from '@/lib/sanity/slots'
import ArchiveClient from './archive-client'

export const revalidate = 10

export default async function ArchivePage() {
  const slotImages = await getSlotImages('archive')
  const slot = createSlotHelper(slotImages)

  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* Background Slot */}
      <BackgroundSlot
        {...slot('archive-background-001', 'BACKGROUND')}
        opacity={0.02}
        grayscale
      />

      {/* Scrolling Background */}
      <ScrollingBackgroundSlot
        {...slot('archive-background-002', 'SCROLLING BG')}
        scrollSpeed={0.5}
        opacity={0.025}
        grayscale
        zIndex={1}
      />

      {/* Global noise overlay */}
      <NoiseOverlay opacity={0.02} />

      {/* ============================================
          HERO - Clean with 4 key slots
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ minHeight: 'calc(100vh - 56px)' }}>
        {/* Background typography */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            left: '-10%',
            fontSize: 'clamp(14rem, 35vw, 55rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: 'var(--yon-black)',
            transform: 'rotate(-4deg)',
          }}
          aria-hidden="true"
        >
          ARCHIVE
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '8%',
            right: '-6%',
            fontSize: 'clamp(10rem, 25vw, 40rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            color: 'var(--yon-accent)',
            transform: 'rotate(6deg)',
          }}
          aria-hidden="true"
        >
          DOC
        </span>

        {/* Section decorative elements */}
        <SectionNumber number="01" position="top-left" style={{ top: '10%', left: '3%' }} />
        <DecoLine direction="vertical" position="left" length={100} style={{ top: '25%', left: '2%' }} />
        <CrossMarker position="bottom-right" style={{ bottom: '30%', right: '5%' }} />
        <VerticalText text="ARCHIVE" position="right" style={{ right: '2%', top: '30%' }} />

        {/* ===== HERO SLOTS - 4 carefully placed ===== */}

        {/* Slot 1: Hero left */}
        <Slot
          {...slot('archive-header-001', 'ARCHIVE / MAIN')}
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
          grayscale
          annotationNumber="A-001"
          texture="grain"
          frameStyle="contact-sheet"
          frameNumber="01"
          filmFilter="faded"
        />

        {/* Slot 2: Large right */}
        <Slot
          {...slot('archive-header-002', 'PROCESS')}
          size="large"
          position="absolute"
          top="8%"
          right="5%"
          rotation={4}
          clip="torn-1"
          shadow="float"
          zIndex={16}
          decoration="tape-corner"
          sepia
          frameStyle="sketchbook"
          filmFilter="vintage"
        />

        {/* Slot 3: Medium overlap */}
        <Slot
          {...slot('archive-header-003', 'RESEARCH')}
          size="medium"
          position="absolute"
          top="42%"
          left="38%"
          rotation={-5}
          clip="organic-1"
          shadow="dramatic"
          zIndex={22}
          overlapX={60}
          decoration="staple"
          frameStyle="crumpled"
          filmFilter="vintage"
        />

        {/* Slot 4: Small accent */}
        <Slot
          {...slot('archive-header-004', 'STUDY')}
          size="small"
          position="absolute"
          bottom="25%"
          right="18%"
          rotation={6}
          clip="torn-2"
          zIndex={20}
          grayscale
          decoration="pin"
          frameStyle="torn"
          filmFilter="faded"
        />

        {/* Main title */}
        <div className="relative z-30 pt-40 pb-16 px-8 md:px-16 lg:px-24">
          <div className="max-w-5xl">
            <StickerText variant="archive" rotation={-1} color="transparent" size="xs">
              DOCUMENTATION
            </StickerText>

            <GlitchTitle
              text="Archive"
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
              Research, process documentation, and experiments.
              Every failure is a step toward discovery.
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
          <span className="block font-mono uppercase tracking-[0.3em] text-yon-grey/30" style={{ fontSize: '0.5rem' }}>
            Explore
          </span>
          <span className="block text-yon-grey/20 mt-2 text-center">↓</span>
        </div>
      </section>

      {/* Archive Grid - Client Component */}
      <ArchiveClient />

      {/* ============================================
          CTA - Collections Link
          ============================================ */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(12rem, 30vw, 45rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.012,
            color: 'var(--yon-black)',
          }}
          aria-hidden="true"
        >
          →
        </span>

        <div className="text-center px-8 z-10">
          <LabelText text="See the results" style={{ fontSize: '0.55rem' }} />

          <GlitchTitle
            text="Collections"
            size="heading"
            glitchOffset={4}
            charRotation
            rotationIntensity={2}
            className="mt-6"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
              transform: 'rotate(-1.5deg)',
            }}
            as="h2"
          />

          <Link
            href="/collections"
            className="inline-block mt-10 font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.6rem' }}
          >
            View Collections →
          </Link>
        </div>

        {/* Section decorative elements */}
        <SectionNumber number="02" position="bottom-left" style={{ bottom: '10%', left: '5%' }} />
        <BracketDeco position="top-right" style={{ top: '15%', right: '8%' }} />
        <DecoDivider style={{ top: '5%', left: '50%', transform: 'translateX(-50%)' }} />

        {/* 2 accent slots */}
        <Slot
          {...slot('archive-cta-001', 'RESULT')}
          size="small"
          position="absolute"
          bottom="18%"
          right="12%"
          rotation={-5}
          clip="irregular-3"
          zIndex={5}
          decoration="tape-corner"
          frameStyle="vintage"
          filmFilter="faded"
        />

        <Slot
          {...slot('archive-cta-002', 'FINAL')}
          size="swatch"
          position="absolute"
          top="22%"
          left="15%"
          rotation={8}
          border="rough"
          zIndex={6}
          grayscale
          frameStyle="polaroid"
          filmFilter="faded"
        />
      </section>

      <Footer />
    </div>
  )
}
