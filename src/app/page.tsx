import Link from 'next/link'
import Footer from '@/components/Footer'
import { Slot, AnnotationLabel, BackgroundSlot } from '@/components/deconstructivist'
import {
  LayeredTitle,
  GlitchTitle,
  ExperimentalText,
  NumberTag,
  LabelText,
  WhisperText,
  HandwrittenNote,
  GrainDisplay,
  StickerText,
  SeasonLabel,
  MargielaTag,
} from '@/components/typography'
import { getSlotImages, createSlotHelper } from '@/lib/sanity/slots'

// Revalidate every 10 seconds for ISR
export const revalidate = 10

export default async function HomePage() {
  const slotImages = await getSlotImages('home')
  const slot = createSlotHelper(slotImages)

  return (
    <div className="relative bg-yon-white min-h-screen overflow-x-hidden">
      {/* Background Slot - subtle texture */}
      <BackgroundSlot
        {...slot('home-background-001', 'BACKGROUND')}
        opacity={0.02}
        grayscale
      />

      {/* ============================================
          SECTION 1: HERO - Impactful with fewer elements
          Inspired by: Maison Margiela, GEDOKU/Sakiyama
          Target: 4 slots maximum for maximum impact
          ============================================ */}
      <section
        className="relative w-full overflow-hidden texture-grain"
        style={{ minHeight: 'calc(100vh - 56px)' }}
      >
        {/* Background typography - ASKEW massive */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '20%',
            left: '-5%',
            fontSize: 'clamp(16rem, 35vw, 50rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.025,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: 'var(--yon-black)',
            zIndex: 1,
          }}
          aria-hidden="true"
        >
          ASKEW
        </span>

        {/* Echo shadow layer for depth */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: 'calc(20% + 6px)',
            left: 'calc(-5% + 6px)',
            fontSize: 'clamp(16rem, 35vw, 50rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.01,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: 'var(--yon-accent)',
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          ASKEW
        </span>

        {/* ===== HERO SLOTS - 4 carefully placed slots ===== */}

        {/* Slot 1: Hero - Primary large image (60% width, left bleeding) */}
        <Slot
          {...slot('home-hero-001', 'LOOK 01')}
          size="hero"
          position="absolute"
          top="8%"
          left="-2%"
          rotation={-2}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={20}
          bleed="left"
          bleedAmount="md"
          annotationNumber="001"
          texture="grain"
        />

        {/* Slot 2: Supporting - Right side (25% width) */}
        <Slot
          {...slot('home-hero-002', 'LOOK 02')}
          size="medium"
          position="absolute"
          top="5%"
          right="6%"
          rotation={3}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
        />

        {/* Slot 3: Accent - Bottom right detail */}
        <Slot
          {...slot('home-hero-003', 'DETAIL')}
          size="small"
          position="absolute"
          bottom="25%"
          right="15%"
          rotation={-5}
          clip="irregular-5"
          shadow="dramatic"
          zIndex={25}
          decoration="pin"
        />

        {/* Slot 4: Swatch - Material sample */}
        <Slot
          {...slot('home-hero-004', 'FABRIC')}
          size="swatch"
          position="absolute"
          bottom="18%"
          left="45%"
          rotation={12}
          border="rough"
          zIndex={22}
          decoration="tape-top"
        />

        {/* Sticker label - Season */}
        <div
          className="absolute"
          style={{ top: '12%', right: '35%', zIndex: 50 }}
        >
          <SeasonLabel season="S/S" year="2025" rotation={-2} />
        </div>

        {/* Margiela-style number tag */}
        <div
          className="absolute"
          style={{ bottom: '35%', right: '8%', zIndex: 50 }}
        >
          <MargielaTag current={1} total={4} rotation={3} />
        </div>

        {/* Brand mark - top left */}
        <div className="absolute top-8 left-8 z-40">
          <GlitchTitle
            text="ASKEW"
            size="small"
            glitchOffset={2}
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.35em',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
            }}
            as="span"
          />
          <ExperimentalText
            text="Twisted"
            variant="micro"
            effect="scatter"
            intensity="medium"
            className="block mt-1"
          />
        </div>

        {/* Year - top right */}
        <div className="absolute top-8 right-8 z-40 text-right">
          <LabelText text="Portfolio" style={{ fontSize: '0.55rem' }} />
          <WhisperText
            text="2024—25"
            className="block mt-1"
            style={{ fontSize: '0.5rem' }}
          />
        </div>

        {/* Navigation hint - bottom center */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 text-center"
        >
          <Link href="/collections" className="group">
            <span
              className="block font-mono uppercase tracking-[0.3em] text-yon-grey/50 group-hover:text-yon-black transition-colors"
              style={{ fontSize: '0.55rem' }}
            >
              View Collections
            </span>
            <span className="block text-yon-grey/30 mt-2 text-lg group-hover:text-yon-black transition-colors">
              ↓
            </span>
          </Link>
        </div>
      </section>

      {/* ============================================
          SECTION 2: Philosophy Statement
          Clean typography with 2 floating accent slots
          ============================================ */}
      <section className="relative min-h-[85vh] w-full flex items-center overflow-hidden texture-paper">
        {/* Background letter */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-12%',
            fontSize: 'clamp(28rem, 65vw, 85rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            lineHeight: 0.8,
            color: 'var(--yon-black)',
          }}
          aria-hidden="true"
        >
          Y
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-4xl">
          {/* Section label */}
          <div style={{ marginBottom: '2rem' }}>
            <StickerText variant="label" rotation={-1} color="cream" size="xs">
              PHILOSOPHY
            </StickerText>
          </div>

          {/* Philosophy text */}
          <GlitchTitle
            text="Twisted yet harmonious"
            size="display"
            glitchOffset={5}
            charRotation
            rotationIntensity={2}
            style={{
              fontStyle: 'italic',
              transform: 'rotate(-1.5deg)',
            }}
            as="h2"
          />

          <p
            className="font-sans text-yon-grey/60 mt-12 max-w-md leading-relaxed"
            style={{
              fontSize: '0.9rem',
              marginLeft: '4rem',
              transform: 'rotate(0.5deg)',
            }}
          >
            Every element slightly askew, yet together they form perfect beauty.
            Fashion that exists beyond time—unreachable, ideal.
          </p>
        </div>

        {/* Floating slots - 2 accent slots */}
        <Slot
          {...slot('home-philosophy-001', 'MOOD')}
          size="medium"
          position="absolute"
          top="12%"
          right="8%"
          rotation={6}
          clip="irregular-6"
          shadow="float"
          zIndex={8}
          grayscale
          decoration="tape-top"
        />

        <Slot
          {...slot('home-philosophy-002', 'SKETCH')}
          size="small"
          position="absolute"
          bottom="18%"
          right="12%"
          rotation={-4}
          clip="torn-3"
          zIndex={9}
          sepia
        />

        {/* Handwritten note */}
        <div
          className="absolute"
          style={{ bottom: '35%', right: '28%', transform: 'rotate(4deg)', zIndex: 50 }}
        >
          <HandwrittenNote text="essential" />
        </div>
      </section>

      {/* ============================================
          SECTION 3: Collections Preview
          4 slots representing key collections
          ============================================ */}
      <section className="relative min-h-screen w-full py-28 overflow-hidden texture-grain">
        {/* Section background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            left: '-8%',
            fontSize: 'clamp(9rem, 20vw, 28rem)',
            fontWeight: 200,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.025,
            letterSpacing: '-0.03em',
            color: 'var(--yon-black)',
            transform: 'rotate(-4deg)',
          }}
          aria-hidden="true"
        >
          COLLECTIONS
        </span>

        {/* Section label */}
        <div className="px-8 md:px-16 mb-16">
          <StickerText variant="archive" rotation={-0.5} color="transparent" size="xs">
            04 COLLECTIONS
          </StickerText>
        </div>

        {/* Collections Grid - 4 key slots */}
        <div className="px-8 md:px-16 lg:px-24">
          <div className="flex flex-wrap items-start gap-8 md:gap-6">
            {/* Collection 1: Main highlight */}
            <div className="relative" style={{ transform: 'rotate(-1deg)' }}>
              <Slot
                {...slot('home-collections-001', 'DECONSTRUCTION')}
                size="large"
                rotation={-2}
                clip="irregular-1"
                shadow="offset-lg"
                zIndex={15}
                annotationNumber="D-001"
                decoration="tape-corner"
              />
              <div className="mt-6 ml-2">
                <Link href="/collections/deconstruction" className="group">
                  <GrainDisplay
                    text="DECONSTRUCTION"
                    variant="photocopy"
                    className="group-hover:opacity-60 transition-opacity"
                    style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}
                  />
                </Link>
              </div>
            </div>

            {/* Collection 2: Secondary */}
            <div className="relative" style={{ marginTop: '5rem', transform: 'rotate(1.5deg)' }}>
              <Slot
                {...slot('home-collections-002', 'FRAGMENTS')}
                size="medium"
                rotation={3}
                clip="organic-2"
                shadow="float"
                zIndex={14}
                decoration="pin"
              />
              <div className="mt-4">
                <Link href="/collections/fragments" className="group">
                  <span className="font-mono text-xs uppercase tracking-widest text-yon-grey/50 group-hover:text-yon-black transition-colors">
                    FRAGMENTS →
                  </span>
                </Link>
              </div>
            </div>

            {/* Collection 3: Accent */}
            <Slot
              {...slot('home-collections-003', 'VOID')}
              size="small"
              rotation={-5}
              clip="corner-cut"
              shadow="dramatic"
              zIndex={16}
              grayscale
              style={{ marginTop: '10rem' }}
            />

            {/* Collection 4: Swatch/texture */}
            <Slot
              {...slot('home-collections-004', 'MATERIAL')}
              size="swatch"
              rotation={10}
              border="rough"
              zIndex={18}
              style={{ marginTop: '3rem' }}
            />
          </div>
        </div>

        {/* View all link */}
        <div className="text-center mt-24">
          <Link
            href="/collections"
            className="inline-block font-mono uppercase tracking-[0.25em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.6rem' }}
          >
            View All Collections
          </Link>
        </div>
      </section>

      {/* ============================================
          SECTION 4: Process Teaser
          3 slots showing sketch-to-finish journey
          ============================================ */}
      <section className="relative min-h-[75vh] w-full py-24 overflow-hidden bg-yon-ivory/20 texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            right: '-6%',
            fontSize: 'clamp(11rem, 28vw, 38rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            color: 'var(--yon-black)',
            transform: 'rotate(4deg)',
          }}
          aria-hidden="true"
        >
          PROCESS
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          {/* Section label */}
          <div className="mb-12">
            <StickerText variant="tape" rotation={2} size="xs">
              BEHIND THE SCENES
            </StickerText>
          </div>

          {/* Process slots - 3 showing journey */}
          <div className="flex flex-wrap gap-8 items-start">
            <Slot
              {...slot('home-process-001', 'SKETCH')}
              size="medium"
              rotation={-3}
              border="rough"
              decoration="tape-top"
              zIndex={15}
              annotationNumber="S-001"
              texture="paper"
            />

            <Slot
              {...slot('home-process-002', 'TOILE')}
              size="small"
              rotation={5}
              clip="torn-3"
              zIndex={18}
              sepia
              decoration="pin"
              style={{ marginTop: '4rem' }}
            />

            <Slot
              {...slot('home-process-003', 'FINAL')}
              size="small-square"
              rotation={-2}
              border="brutal"
              zIndex={20}
              decoration="mark-check"
            />
          </div>

          {/* Process link */}
          <div className="mt-16" style={{ transform: 'rotate(-0.5deg)' }}>
            <Link href="/process" className="group">
              <span className="font-mono uppercase tracking-[0.2em] text-yon-grey/50 group-hover:text-yon-black transition-colors" style={{ fontSize: '0.6rem' }}>
                Explore Process →
              </span>
            </Link>
          </div>
        </div>

        {/* Handwritten note */}
        <div
          className="absolute"
          style={{ bottom: '25%', right: '15%', transform: 'rotate(-3deg)', zIndex: 50 }}
        >
          <HandwrittenNote text="needs revision" />
        </div>

        {/* Number tag */}
        <div
          className="absolute"
          style={{ top: '25%', right: '10%', zIndex: 50 }}
        >
          <NumberTag index={3} />
        </div>
      </section>

      {/* ============================================
          SECTION 5: Contact CTA
          Minimal with 1 accent slot
          ============================================ */}
      <section className="relative min-h-[55vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background symbol */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(16rem, 38vw, 55rem)',
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
          <GlitchTitle
            text="Get in Touch"
            size="heading"
            glitchOffset={4}
            charRotation
            rotationIntensity={2}
            style={{ transform: 'rotate(-1.5deg)' }}
            as="h2"
          />

          <div className="mt-10">
            <Link href="/contact" className="inline-block group">
              <ExperimentalText
                text="Contact →"
                variant="caption"
                effect="scatter"
                intensity="medium"
                className="group-hover:opacity-60 transition-opacity"
              />
            </Link>
          </div>

          <div className="mt-10">
            <a
              href="mailto:hello@askew.studio"
              className="font-mono text-yon-grey/35 hover:text-yon-black transition-colors"
              style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
            >
              hello@askew.studio
            </a>
          </div>
        </div>

        {/* Single accent slot */}
        <Slot
          {...slot('home-contact-001', 'STUDIO')}
          size="small"
          position="absolute"
          bottom="20%"
          right="10%"
          rotation={-6}
          clip="irregular-6"
          zIndex={5}
          grayscale
          decoration="tape-corner"
        />
      </section>

      <Footer />
    </div>
  )
}
