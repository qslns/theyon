import Link from 'next/link'
import Footer from '@/components/Footer'
import { Slot } from '@/components/deconstructivist'
import BackgroundSlot from '@/components/BackgroundSlot'
import { getBackgroundSlotProps } from '@/lib/background-slot'
import { getSlotImages, createSlotHelper } from '@/lib/sanity/slots'
import ProcessStages from './process-stages'

export default async function ProcessPage() {
  // Fetch all slot images for process page from CMS
  const slotImages = await getSlotImages('process')
  const slot = createSlotHelper(slotImages)

  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* PAGE BACKGROUND - CMS Controlled */}
      <BackgroundSlot
        {...getBackgroundSlotProps(slotImages, 'process-background-001')}
        opacity={0.06}
        grayscale
      />

      {/* ============================================
          HERO - Sketchbook Cover - fits single screen
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ height: 'calc(100vh - 48px)' }}>
        {/* Background typography */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '25%',
            left: '-8%',
            fontSize: 'clamp(12rem, 30vw, 45rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: '#0A0A0A',
            transform: 'rotate(-3deg)',
          }}
          aria-hidden="true"
        >
          PROCESS
        </span>

        {/* Scattered hero slots */}
        <Slot
          {...slot('process-hero-001', 'SKETCH')}
          size="medium"
          position="absolute"
          top="15%"
          right="10%"
          rotation={-3}
          clip="torn-1"
          shadow="offset"
          zIndex={15}
        />

        <Slot
          {...slot('process-hero-002', 'TOILE')}
          size="small"
          position="absolute"
          top="55%"
          right="25%"
          rotation={5}
          clip="irregular-2"
          shadow="float"
          zIndex={12}
        />

        <Slot
          {...slot('process-hero-003', 'FABRIC')}
          size="swatch"
          position="absolute"
          top="35%"
          left="60%"
          rotation={-12}
          border="rough"
          decoration="tape-top"
          zIndex={18}
        />

        <Slot
          {...slot('process-hero-004', 'REF')}
          size="tiny"
          position="absolute"
          bottom="30%"
          left="75%"
          rotation={8}
          border="thin"
          decoration="pin"
          zIndex={20}
        />

        {/* Additional hero slots */}
        <Slot
          {...slot('process-hero-005', 'MOOD')}
          size="small-square"
          position="absolute"
          top="25%"
          left="5%"
          rotation={-4}
          clip="irregular-1"
          shadow="soft"
          zIndex={14}
          grayscale
        />

        <Slot
          {...slot('process-hero-006', 'DETAIL')}
          size="tiny"
          position="absolute"
          top="70%"
          left="15%"
          rotation={10}
          border="accent"
          zIndex={16}
        />

        <Slot
          {...slot('process-hero-007', 'A')}
          size="swatch"
          position="absolute"
          bottom="20%"
          right="45%"
          rotation={-6}
          border="rough"
          zIndex={17}
        />

        <Slot
          {...slot('process-hero-008', 'B')}
          size="swatch"
          position="absolute"
          bottom="23%"
          right="38%"
          rotation={4}
          border="thin"
          zIndex={19}
          overlapX={15}
        />

        {/* Main title */}
        <div className="relative z-20 pt-40 pb-20 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <span
              className="block font-mono uppercase tracking-[0.4em] text-yon-grey/40"
              style={{ fontSize: '0.55rem' }}
            >
              THE YON — Process
            </span>

            <h1
              className="font-serif text-yon-black mt-6"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: '-0.03em',
                transform: 'rotate(-1.5deg)',
                lineHeight: 0.9,
              }}
            >
              Process
            </h1>

            <p
              className="font-serif italic text-yon-grey/60 mt-8"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                maxWidth: '35ch',
                marginLeft: '3rem',
                transform: 'rotate(0.5deg)',
              }}
            >
              &ldquo;The journey from concept to garment, documented in raw form&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          PROCESS STAGES - Client Component
          ============================================ */}
      <ProcessStages />

      {/* ============================================
          END CTA - Collections Link
          ============================================ */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '20%',
            right: '-10%',
            fontSize: 'clamp(10rem, 25vw, 35rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            lineHeight: 0.8,
            color: '#0A0A0A',
          }}
          aria-hidden="true"
        >
          →
        </span>

        <div className="relative z-10 text-center px-8">
          <span
            className="block font-mono uppercase tracking-[0.3em] text-yon-grey/40"
            style={{ fontSize: '0.55rem' }}
          >
            View the Results
          </span>

          <h2
            className="font-serif text-yon-black mt-6"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              transform: 'rotate(-1deg)',
            }}
          >
            Collections
          </h2>

          <Link
            href="/collections"
            className="inline-block mt-8 font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.6rem' }}
          >
            View Collections →
          </Link>
        </div>

        {/* Floating accent slots */}
        <Slot
          {...slot('process-cta-001', 'FINAL')}
          size="small"
          position="absolute"
          bottom="20%"
          left="15%"
          rotation={-5}
          clip="irregular-3"
          grayscale
          zIndex={5}
        />

        <Slot
          {...slot('process-cta-002', 'RESULT')}
          size="tiny"
          position="absolute"
          top="25%"
          right="20%"
          rotation={8}
          border="accent"
          zIndex={6}
        />

        <Slot
          {...slot('process-cta-003', '→')}
          size="micro"
          position="absolute"
          bottom="35%"
          right="30%"
          rotation={-3}
          border="thin"
          zIndex={7}
        />
      </section>

      <Footer />
    </div>
  )
}
