import Link from 'next/link'
import Footer from '@/components/Footer'
import { Slot, AnnotationLabel } from '@/components/deconstructivist'
import {
  GlitchTitle,
  AnnotationText,
} from '@/components/typography'
import { getSlotImages, createSlotHelper } from '@/lib/sanity/slots'
import ArchiveClient from './archive-client'

export default async function ArchivePage() {
  // Fetch all slot images for archive page from CMS
  const slotImages = await getSlotImages('archive')
  const slot = createSlotHelper(slotImages)

  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* ============================================
          HERO - Dense Deconstructivist Header - fits single screen
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ height: 'calc(100vh - 42px)' }}>
        {/* Background typography - ARCHIVE */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            left: '-12%',
            fontSize: 'clamp(14rem, 35vw, 55rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.025,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: '#0A0A0A',
            transform: 'rotate(-4deg)',
          }}
          aria-hidden="true"
        >
          ARCHIVE
        </span>

        {/* Secondary background - DOC */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '8%',
            right: '-8%',
            fontSize: 'clamp(10rem, 25vw, 40rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            color: '#8B7355',
            transform: 'rotate(6deg)',
          }}
          aria-hidden="true"
        >
          DOC
        </span>

        {/* Third layer - vertical */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '25%',
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
          RESEARCH
        </span>

        {/* ===== HERO SLOTS - 12 scattered ===== */}

        {/* Slot 1: Hero left bleeding */}
        <Slot
          {...slot('archive-header-001', 'ARCHIVE / MAIN')}
          size="hero"
          position="absolute"
          top="5%"
          left="-5%"
          rotation={-3}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={18}
          bleed="left"
          bleedAmount="lg"
          grayscale
          annotationNumber="A-001"
          texture="grain"
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
          bleed="right"
          bleedAmount="md"
          sepia
        />

        {/* Slot 3: Medium overlapping */}
        <Slot
          {...slot('archive-header-003', 'RESEARCH')}
          size="medium"
          position="absolute"
          top="40%"
          left="35%"
          rotation={-5}
          clip="organic-1"
          shadow="dramatic"
          zIndex={22}
          overlapX={80}
          decoration="staple"
        />

        {/* Slot 4: Small */}
        <Slot
          {...slot('archive-header-004', 'STUDY')}
          size="small"
          position="absolute"
          top="55%"
          right="20%"
          rotation={6}
          clip="torn-2"
          zIndex={20}
          grayscale
          decoration="pin"
        />

        {/* Slot 5: Medium-wide */}
        <Slot
          {...slot('archive-header-005', 'DOCUMENT')}
          size="medium-wide"
          position="absolute"
          bottom="20%"
          left="5%"
          rotation={2}
          clip="wave-1"
          shadow="soft"
          zIndex={14}
          decoration="corner-fold"
        />

        {/* Slot 6-8: Swatch cluster */}
        <Slot
          {...slot('archive-header-006', 'A')}
          size="swatch"
          position="absolute"
          top="28%"
          left="55%"
          rotation={12}
          border="rough"
          zIndex={24}
          decoration="tape-top"
        />

        <Slot
          {...slot('archive-header-007', 'B')}
          size="swatch"
          position="absolute"
          top="32%"
          left="62%"
          rotation={-8}
          border="accent"
          zIndex={26}
          overlapX={20}
        />

        <Slot
          {...slot('archive-header-008', 'C')}
          size="swatch"
          position="absolute"
          top="36%"
          left="68%"
          rotation={5}
          border="thin"
          zIndex={25}
          overlapX={25}
        />

        {/* Slot 9: Tiny */}
        <Slot
          {...slot('archive-header-009', 'REF')}
          size="tiny"
          position="absolute"
          bottom="35%"
          right="35%"
          rotation={-10}
          clip="notch-1"
          zIndex={28}
          decoration="clip"
        />

        {/* Slot 10: Small bottom right bleeding */}
        <Slot
          {...slot('archive-header-010', 'NOTES')}
          size="small"
          position="absolute"
          bottom="15%"
          right="-2%"
          rotation={-4}
          clip="irregular-4"
          zIndex={15}
          bleed="right"
          bleedAmount="md"
          grayscale
        />

        {/* Slot 11: Micro accents */}
        <Slot
          {...slot('archive-header-011', '01')}
          size="micro"
          position="absolute"
          top="48%"
          left="72%"
          rotation={15}
          border="thin"
          zIndex={30}
          decoration="pin-red"
        />

        {/* Slot 12: Medium-tall */}
        <Slot
          {...slot('archive-header-012', 'HISTORY')}
          size="medium-tall"
          position="absolute"
          bottom="5%"
          left="45%"
          rotation={-1.5}
          clip="corner-cut"
          shadow="deep"
          zIndex={12}
          sepia
        />

        {/* Scattered Annotations */}
        <AnnotationLabel
          text="archive"
          position={{ top: '12%', left: '28%' }}
          rotation={-3}
          variant="tag"
        />
        <AnnotationLabel
          text="research notes"
          position={{ top: '38%', right: '8%' }}
          rotation={5}
          variant="handwritten"
        />
        <AnnotationLabel
          text="DOC"
          position={{ bottom: '28%', left: '25%' }}
          rotation={-2}
          variant="stamp"
        />
        <AnnotationLabel
          text="reference"
          position={{ top: '65%', left: '58%' }}
          rotation={8}
          variant="default"
        />

        {/* Main title */}
        <div className="relative z-35 pt-44 pb-16 px-8 md:px-16 lg:px-24">
          <div className="max-w-5xl">
            <AnnotationText
              text="THE YON — Archive"
              variant="stamp"
              className="text-yon-grey/50"
            />

            <div className="mt-6" style={{ transform: 'rotate(-2.5deg)' }}>
              <GlitchTitle
                text="Archive"
                size="display"
                glitchOffset={8}
                charRotation
                rotationIntensity={4}
                as="h1"
              />
            </div>

            <div className="mt-10 max-w-lg" style={{ marginLeft: '3rem' }}>
              <p
                className="font-sans text-yon-grey/60"
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.8,
                  transform: 'rotate(0.5deg)',
                }}
              >
                Research, process documentation, and experiments.
                Every failure is a step toward discovery. Nothing is wasted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Archive Grid - Client Component for Filtering */}
      <ArchiveClient />

      {/* ============================================
          FAILURES SECTION - Important Documentation
          ============================================ */}
      <section className="relative min-h-[80vh] w-full py-24 overflow-hidden bg-yon-ivory/30 texture-grain">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-10%',
            fontSize: 'clamp(12rem, 30vw, 45rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.025,
            lineHeight: 0.8,
            color: '#8B7355',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          FAIL
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            left: '-5%',
            fontSize: 'clamp(5rem, 12vw, 18rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            color: '#0A0A0A',
            transform: 'rotate(-90deg)',
            transformOrigin: 'left bottom',
          }}
          aria-hidden="true"
        >
          ESSENTIAL
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <AnnotationText
              text="ESSENTIAL DOCUMENTATION"
              variant="stamp"
              className="text-yon-accent/70"
            />

            <div className="mt-6" style={{ transform: 'rotate(-2deg)' }}>
              <GlitchTitle
                text="Failures"
                size="heading"
                glitchOffset={6}
                charRotation
                rotationIntensity={3}
                style={{ color: 'var(--yon-accent)' }}
                as="h2"
              />
            </div>

            <div className="mt-8 max-w-lg" style={{ marginLeft: '2rem' }}>
              <p
                className="font-sans text-yon-grey/60"
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  transform: 'rotate(0.5deg)',
                }}
              >
                Every failed experiment teaches something. Rejected ideas, broken toiles, wrong paths —
                all documented as essential steps toward discovery.
              </p>
            </div>
          </div>

          {/* Failure slots - 10 scattered grayscale */}
          <div className="relative mt-20" style={{ minHeight: '50vh' }}>
            <Slot
              {...slot('archive-failures-001', 'REJECTED / 01')}
              size="large"
              position="absolute"
              top="0%"
              left="0%"
              rotation={-3}
              clip="torn-2"
              shadow="offset"
              grayscale
              zIndex={10}
              annotationNumber="F-001"
              decoration="mark-x"
            />

            <Slot
              {...slot('archive-failures-002', 'FAILED TOILE')}
              size="medium"
              position="absolute"
              top="10%"
              right="10%"
              rotation={5}
              clip="irregular-5"
              grayscale
              zIndex={15}
              decoration="tape-corner"
            />

            <Slot
              {...slot('archive-failures-003', 'WRONG PATH')}
              size="small"
              position="absolute"
              top="30%"
              left="35%"
              rotation={-8}
              clip="organic-2"
              grayscale
              zIndex={18}
              overlapX={60}
              decoration="staple"
            />

            <Slot
              {...slot('archive-failures-004', 'ITERATION 03')}
              size="medium-wide"
              position="absolute"
              top="45%"
              left="5%"
              rotation={2}
              clip="wave-2"
              grayscale
              sepia
              zIndex={12}
              decoration="pin"
            />

            <Slot
              {...slot('archive-failures-005', 'DISCARDED')}
              size="small-square"
              position="absolute"
              top="50%"
              right="20%"
              rotation={-6}
              border="rough"
              grayscale
              zIndex={16}
              decoration="mark-x"
            />

            <Slot
              {...slot('archive-failures-006', 'X')}
              size="swatch"
              position="absolute"
              top="70%"
              left="65%"
              rotation={-10}
              border="rough"
              grayscale
              zIndex={22}
              decoration="mark-x"
            />

            <Slot
              {...slot('archive-failures-007', 'X')}
              size="swatch"
              position="absolute"
              top="75%"
              left="72%"
              rotation={8}
              border="thin"
              grayscale
              zIndex={23}
              overlapX={20}
            />

            <Slot
              {...slot('archive-failures-008', 'NO')}
              size="micro"
              position="absolute"
              top="38%"
              right="40%"
              rotation={15}
              border="accent"
              grayscale
              zIndex={25}
            />

            <Slot
              {...slot('archive-failures-009', '?')}
              size="micro"
              position="absolute"
              bottom="20%"
              left="25%"
              rotation={-12}
              border="dashed"
              grayscale
              zIndex={24}
            />

            <Slot
              {...slot('archive-failures-010', 'LESSON')}
              size="tiny"
              position="absolute"
              bottom="15%"
              right="35%"
              rotation={10}
              clip="notch-2"
              grayscale
              zIndex={20}
              decoration="corner-fold"
            />

            {/* Annotations */}
            <AnnotationLabel
              text="learn from this"
              position={{ top: '25%', left: '55%' }}
              rotation={4}
              variant="handwritten"
            />
            <AnnotationLabel
              text="REJECTED"
              position={{ top: '60%', right: '25%' }}
              rotation={-3}
              variant="stamp"
            />
            <AnnotationLabel
              text="try again"
              position={{ bottom: '25%', left: '48%' }}
              rotation={6}
              variant="default"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          CTA - Collections Link
          ============================================ */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden texture-grain">
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
            opacity: 0.015,
            color: '#0A0A0A',
          }}
          aria-hidden="true"
        >
          →
        </span>

        <div className="text-center px-8 z-10">
          <AnnotationText
            text="SEE THE RESULTS"
            variant="tag"
            className="text-yon-grey/50"
          />

          <div className="mt-6" style={{ transform: 'rotate(-2deg)' }}>
            <GlitchTitle
              text="Collections"
              size="heading"
              glitchOffset={5}
              charRotation
              rotationIntensity={3}
              as="h2"
            />
          </div>

          <Link
            href="/collections"
            className="inline-block mt-10 font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.6rem' }}
          >
            View Collections →
          </Link>
        </div>

        {/* Accent slots */}
        <Slot
          {...slot('archive-cta-001', 'RESULT')}
          size="small"
          position="absolute"
          bottom="15%"
          right="10%"
          rotation={-5}
          clip="irregular-3"
          zIndex={5}
          decoration="tape-corner"
        />

        <Slot
          {...slot('archive-cta-002', 'FINAL')}
          size="tiny"
          position="absolute"
          top="20%"
          left="15%"
          rotation={8}
          border="accent"
          zIndex={6}
        />

        <Slot
          {...slot('archive-cta-003', '→')}
          size="micro"
          position="absolute"
          bottom="30%"
          left="25%"
          rotation={-3}
          border="thin"
          zIndex={7}
        />

        <AnnotationLabel
          text="explore"
          position={{ top: '35%', right: '20%' }}
          rotation={4}
          variant="handwritten"
        />
      </section>

      <Footer />
    </div>
  )
}
