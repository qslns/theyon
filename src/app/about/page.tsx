import Link from 'next/link'
import Footer from '@/components/Footer'
import {
  Slot,
  BackgroundSlot,
  ScrollingBackgroundSlot,
  Watermark,
  SectionNumber,
  DecoLine,
  DotsPattern,
  CrossMarker,
  BracketDeco,
  VerticalText,
  NoiseOverlay,
  DecoDivider,
} from '@/components/deconstructivist'
import {
  LayeredTitle,
  GlitchTitle,
  ExperimentalText,
  AnnotationText,
  LabelText,
  WhisperText,
  StickerText,
  HandwrittenNote,
} from '@/components/typography'
import { getSlotImages, createSlotHelper } from '@/lib/sanity/slots'

export const revalidate = 10

export default async function AboutPage() {
  const slotImages = await getSlotImages('about')
  const slot = createSlotHelper(slotImages)

  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* Background Slot - subtle texture */}
      <BackgroundSlot
        {...slot('about-background-001', 'BACKGROUND')}
        opacity={0.02}
        grayscale
      />

      {/* Scrolling Background */}
      <ScrollingBackgroundSlot
        {...slot('about-background-002', 'SCROLLING BG')}
        scrollSpeed={0.5}
        opacity={0.025}
        grayscale
        zIndex={1}
      />

      {/* Global noise overlay */}
      <NoiseOverlay opacity={0.02} />

      {/* Decorative watermark */}
      <Watermark text="ASKEW" position="top-right" style={{ top: '5%', right: '3%' }} />

      {/* ============================================
          SECTION 1: Portrait Hero
          Clean, impactful - 3 key slots
          ============================================ */}
      <section
        className="relative w-full overflow-hidden texture-grain"
        style={{ minHeight: 'calc(100vh - 56px)' }}
      >
        {/* Background typography - Name */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '15%',
            left: '-12%',
            fontSize: 'clamp(15rem, 38vw, 58rem)',
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
          TAEHYUN
        </span>

        {/* Secondary background - LEE */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '8%',
            right: '-8%',
            fontSize: 'clamp(11rem, 28vw, 42rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            letterSpacing: '0.1em',
            color: 'var(--yon-accent)',
            transform: 'rotate(6deg)',
          }}
          aria-hidden="true"
        >
          LEE
        </span>

        {/* ===== HERO SLOTS - 3 carefully placed ===== */}

        {/* Section decorative elements */}
        <SectionNumber number="01" position="top-left" style={{ top: '10%', left: '3%' }} />
        <DecoLine direction="vertical" position="left" length={100} style={{ top: '25%', left: '2%' }} />
        <CrossMarker position="bottom-right" style={{ bottom: '25%', right: '5%' }} />

        {/* Slot 1: Main portrait - large, left bleeding */}
        <Slot
          {...slot('about-hero-001', 'PORTRAIT')}
          size="hero"
          position="absolute"
          top="5%"
          left="-3%"
          rotation={-2}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={20}
          bleed="left"
          bleedAmount="md"
          annotationNumber="001"
          texture="grain"
          frameStyle="film-strip"
          frameNumber="01"
        />

        {/* Slot 2: Studio shot - right side */}
        <Slot
          {...slot('about-hero-002', 'STUDIO')}
          size="medium"
          position="absolute"
          top="8%"
          right="6%"
          rotation={3}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
          frameStyle="polaroid"
        />

        {/* Slot 3: Working hands - accent */}
        <Slot
          {...slot('about-hero-003', 'HANDS')}
          size="small"
          position="absolute"
          bottom="25%"
          right="18%"
          rotation={-5}
          clip="organic-1"
          shadow="dramatic"
          zIndex={25}
          decoration="pin"
          frameStyle="slide-mount"
          filmFilter="warm"
        />

        {/* Brand label */}
        <div
          className="absolute"
          style={{ top: '12%', right: '32%', zIndex: 50 }}
        >
          <StickerText variant="stamp" rotation={-2} color="accent" size="xs">
            ASKEW
          </StickerText>
        </div>

        {/* Name and info - positioned asymmetrically */}
        <div
          className="absolute z-40"
          style={{
            bottom: '10%',
            left: '6%',
            transform: 'rotate(-1.5deg)',
          }}
        >
          <StickerText variant="stamp" rotation={-2} color="accent" size="xs">
            DESIGNER
          </StickerText>

          <GlitchTitle
            text="Taehyun Lee"
            size="heading"
            glitchOffset={4}
            charRotation
            rotationIntensity={2}
            className="mt-4"
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              letterSpacing: '-0.03em',
            }}
            as="h1"
          />

          <div className="mt-5 flex items-center gap-4">
            <ExperimentalText
              text="Seoul"
              variant="caption"
              effect="scatter"
              intensity="medium"
            />
            <span className="w-8 h-px bg-yon-accent/40" />
            <ExperimentalText
              text="Fashion Designer"
              variant="caption"
              effect="wave"
              intensity="medium"
            />
          </div>
        </div>

        {/* Contact - bottom right */}
        <div
          className="absolute z-40"
          style={{
            bottom: '10%',
            right: '6%',
            textAlign: 'right',
            transform: 'rotate(0.5deg)',
          }}
        >
          <a
            href="mailto:hello@askew.studio"
            className="block font-mono text-yon-grey/50 hover:text-yon-black transition-colors"
            style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
          >
            hello@askew.studio
          </a>
          <a
            href="https://instagram.com/askew_studio"
            target="_blank"
            rel="noopener noreferrer"
            className="block font-mono text-yon-grey/30 hover:text-yon-black transition-colors mt-2"
            style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}
          >
            @askew_studio
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
          <span
            className="block font-mono uppercase tracking-[0.3em] text-yon-grey/30"
            style={{ fontSize: '0.5rem' }}
          >
            Scroll
          </span>
          <span className="block text-yon-grey/20 mt-2 text-center">↓</span>
        </div>
      </section>

      {/* ============================================
          SECTION 2: Philosophy / Statement
          Clean typography with 2 floating slots
          ============================================ */}
      <section className="relative min-h-[85vh] w-full flex items-center overflow-hidden texture-paper">
        {/* Background letter */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-15%',
            fontSize: 'clamp(28rem, 68vw, 90rem)',
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

          <GlitchTitle
            text="Twisted yet harmonious"
            size="display"
            glitchOffset={5}
            charRotation
            rotationIntensity={2}
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(1.6rem, 4.5vw, 3rem)',
              transform: 'rotate(-1.5deg)',
              maxWidth: '42ch',
            }}
            as="h2"
          />

          <p
            className="font-sans text-yon-grey/60 mt-12 max-w-lg leading-relaxed"
            style={{
              fontSize: '0.9rem',
              marginLeft: '4rem',
              transform: 'rotate(0.5deg)',
            }}
          >
            Every element slightly askew, yet together they form perfect beauty.
            Fashion that exists beyond time and space—unreachable, ideal.
          </p>
        </div>

        {/* Section decorative elements */}
        <SectionNumber number="02" position="top-right" style={{ top: '5%', right: '5%' }} />
        <BracketDeco position="top-left" style={{ top: '40%', left: '3%' }} />
        <DotsPattern rows={4} cols={6} style={{ bottom: '15%', right: '40%' }} />

        {/* Floating slots - 2 accent slots */}
        <Slot
          {...slot('about-philosophy-001', 'MOOD')}
          size="medium"
          position="absolute"
          top="10%"
          right="8%"
          rotation={5}
          clip="irregular-6"
          shadow="float"
          zIndex={8}
          grayscale
          decoration="tape-top"
          frameStyle="vintage"
          filmFilter="faded"
        />

        <Slot
          {...slot('about-philosophy-002', 'SKETCH')}
          size="small"
          position="absolute"
          bottom="18%"
          right="15%"
          rotation={-4}
          clip="torn-3"
          zIndex={10}
          sepia
          frameStyle="sketchbook"
        />

        {/* Handwritten note */}
        <div
          className="absolute"
          style={{ bottom: '35%', right: '30%', transform: 'rotate(3deg)', zIndex: 50 }}
        >
          <HandwrittenNote text="essential" />
        </div>
      </section>

      {/* ============================================
          SECTION 3: Education / Background
          Clean documentation with 3 slots
          ============================================ */}
      <section className="relative min-h-[80vh] py-28 px-8 md:px-16 lg:px-24 overflow-hidden texture-grain">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '5%',
            left: '-8%',
            fontSize: 'clamp(11rem, 25vw, 38rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.018,
            lineHeight: 0.8,
            color: 'var(--yon-black)',
            transform: 'rotate(-3deg)',
          }}
          aria-hidden="true"
        >
          WORK
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            right: '-6%',
            fontSize: 'clamp(9rem, 20vw, 30rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.012,
            color: 'var(--yon-accent)',
            transform: 'rotate(4deg)',
          }}
          aria-hidden="true"
        >
          FORM
        </span>

        <div className="relative z-10 max-w-4xl">
          {/* Section label */}
          <StickerText variant="archive" rotation={-0.5} color="transparent" size="xs">
            APPROACH
          </StickerText>

          <div className="mt-14 space-y-14">
            {/* Philosophy */}
            <div style={{ transform: 'rotate(-0.5deg)' }}>
              <AnnotationText text="PHILOSOPHY" variant="label" style={{ color: 'rgba(139, 115, 85, 0.5)' }} />
              <LayeredTitle
                text="Twisted yet Harmonious"
                size="small"
                layerStyle="offset"
                offsetX={2}
                offsetY={2}
                layerOpacity={0.06}
                className="mt-3"
                style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', fontStyle: 'italic' }}
                as="h3"
              />
              <WhisperText
                text="Structure woven in silence"
                className="block mt-2"
                style={{ fontSize: '0.6rem' }}
              />
            </div>

            {/* Approach */}
            <div style={{ marginLeft: '4rem', transform: 'rotate(0.3deg)' }}>
              <AnnotationText text="METHODOLOGY" variant="label" style={{ color: 'rgba(139, 115, 85, 0.5)' }} />
              <p className="font-sans text-yon-grey/55 mt-3" style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>
                Research-driven experimentation. Embracing imperfection.
              </p>
              <WhisperText text="Beauty caught in light" className="block mt-2" style={{ fontSize: '0.5rem' }} />
            </div>

            {/* Focus */}
            <div style={{ transform: 'rotate(-0.3deg)' }}>
              <AnnotationText text="FOCUS" variant="label" style={{ color: 'rgba(139, 115, 85, 0.5)' }} />
              <p
                className="font-sans text-yon-grey/55 mt-3"
                style={{ fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '40ch' }}
              >
                Experimental construction, material exploration, form studies
              </p>
            </div>
          </div>
        </div>

        {/* Section decorative elements */}
        <SectionNumber number="03" position="top-right" style={{ top: '5%', right: '3%' }} />
        <VerticalText text="APPROACH" position="left" style={{ left: '2%', top: '30%' }} />
        <DecoLine direction="horizontal" length={100} style={{ bottom: '12%', left: '10%' }} />

        {/* Side slots - 3 carefully placed */}
        <Slot
          {...slot('about-education-001', 'SKETCH')}
          size="large"
          position="absolute"
          top="8%"
          right="5%"
          rotation={-3}
          clip="torn-1"
          shadow="offset"
          zIndex={10}
          annotationNumber="S-001"
          decoration="tape-corner"
          frameStyle="contact-sheet"
          frameNumber="01"
        />

        <Slot
          {...slot('about-education-002', 'TOILE')}
          size="medium"
          position="absolute"
          top="42%"
          right="12%"
          rotation={4}
          clip="irregular-2"
          shadow="float"
          zIndex={12}
          sepia
          frameStyle="crumpled"
          filmFilter="vintage"
        />

        <Slot
          {...slot('about-education-003', 'PATTERN')}
          size="small"
          position="absolute"
          bottom="18%"
          right="20%"
          rotation={-5}
          clip="organic-1"
          zIndex={14}
          grayscale
          decoration="pin"
          frameStyle="torn"
        />
      </section>

      {/* ============================================
          SECTION 4: Work Process
          3 slots showing sketch-to-finish
          ============================================ */}
      <section className="relative min-h-[70vh] w-full py-24 overflow-hidden bg-yon-ivory/20 texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            left: '-6%',
            fontSize: 'clamp(9rem, 20vw, 30rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.018,
            color: 'var(--yon-black)',
            transform: 'rotate(-4deg)',
          }}
          aria-hidden="true"
        >
          WORK
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            {/* Section label */}
            <StickerText variant="tape" rotation={1.5} size="xs">
              HOW I WORK
            </StickerText>

            <LayeredTitle
              text="Process"
              size="medium"
              layerStyle="offset"
              offsetX={2}
              offsetY={2}
              layerOpacity={0.08}
              layerColor="#8B7355"
              className="mt-6"
              style={{
                fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
                letterSpacing: '-0.02em',
                transform: 'rotate(-0.5deg)',
              }}
              as="h2"
            />

            <p
              className="font-sans text-yon-grey/55 mt-8 max-w-md"
              style={{
                fontSize: '0.85rem',
                lineHeight: 1.8,
                marginLeft: '2rem',
                transform: 'rotate(0.3deg)',
              }}
            >
              Research-driven design. From concept to toile to final piece.
              Embracing mistakes as creative opportunities.
            </p>
          </div>

          {/* Section decorative elements */}
          <SectionNumber number="04" position="top-left" style={{ position: 'absolute', top: '5%', left: '5%' }} />
          <CrossMarker position="bottom-right" style={{ position: 'absolute', bottom: '20%', right: '5%' }} />

          {/* Process slots - 3 showing journey */}
          <div className="flex flex-wrap gap-8 items-start mt-16">
            <Slot
              {...slot('about-process-001', 'RESEARCH')}
              size="medium"
              rotation={-2}
              clip="irregular-1"
              shadow="offset"
              zIndex={15}
              annotationNumber="01"
              decoration="pin"
              frameStyle="sketchbook"
              filmFilter="vintage"
            />

            <Slot
              {...slot('about-process-002', 'PROTOTYPE')}
              size="small"
              rotation={4}
              clip="torn-2"
              zIndex={18}
              decoration="tape-top"
              style={{ marginTop: '5rem' }}
              frameStyle="crumpled"
            />

            <Slot
              {...slot('about-process-003', 'FINAL')}
              size="small-square"
              rotation={-3}
              clip="organic-2"
              shadow="float"
              zIndex={16}
              annotationNumber="02"
              frameStyle="film-strip"
              frameNumber="03"
            />
          </div>

          {/* Handwritten note */}
          <div
            className="absolute"
            style={{ bottom: '20%', right: '15%', transform: 'rotate(-3deg)', zIndex: 50 }}
          >
            <HandwrittenNote text="iterate" />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: CTA - Contact
          Minimal with 1 accent slot
          ============================================ */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden texture-grain">
        {/* Section decorative elements */}
        <SectionNumber number="05" position="bottom-left" style={{ bottom: '8%', left: '5%' }} />
        <BracketDeco position="top-right" style={{ top: '10%', right: '8%' }} />
        <DecoDivider style={{ top: '5%', left: '50%', transform: 'translateX(-50%)' }} />

        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(13rem, 32vw, 48rem)',
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
          <LabelText text="Get in touch" style={{ fontSize: '0.55rem' }} />

          <LayeredTitle
            text="Contact"
            size="medium"
            layerStyle="offset"
            offsetX={3}
            offsetY={3}
            layerOpacity={0.08}
            layerColor="#8B7355"
            charRotation
            rotationIntensity={1.5}
            className="mt-5"
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
              transform: 'rotate(-1deg)',
            }}
            as="h2"
          />

          <Link
            href="/contact"
            className="inline-block mt-10 font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.55rem' }}
          >
            Send Message →
          </Link>
        </div>

        {/* Single accent slot */}
        <Slot
          {...slot('about-contact-001', 'STUDIO')}
          size="small"
          position="absolute"
          bottom="18%"
          right="10%"
          rotation={-6}
          clip="irregular-4"
          zIndex={5}
          grayscale
          decoration="tape-corner"
          frameStyle="vintage"
          filmFilter="faded"
        />
      </section>

      <Footer />
    </div>
  )
}
