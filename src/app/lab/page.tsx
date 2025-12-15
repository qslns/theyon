import Link from 'next/link'
import Footer from '@/components/Footer'
import { Slot, BackgroundSlot } from '@/components/deconstructivist'
import {
  GlitchTitle,
  LabelText,
  WhisperText,
  ExperimentalText,
  StickerText,
  StatusLabel,
} from '@/components/typography'
import { getSlotImages, createSlotHelper } from '@/lib/sanity/slots'
import LabExperiments from './lab-experiments'

export const revalidate = 10

export default async function LabPage() {
  const slotImages = await getSlotImages('lab')
  const slot = createSlotHelper(slotImages)

  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* Background Slot */}
      <BackgroundSlot
        {...slot('lab-background-001', 'BACKGROUND')}
        opacity={0.02}
        grayscale
      />

      {/* ============================================
          HERO - Lab Introduction - 4 key slots
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ minHeight: 'calc(100vh - 56px)' }}>
        {/* Background typography */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '8%',
            left: '-10%',
            fontSize: 'clamp(16rem, 38vw, 58rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: 'var(--yon-black)',
            transform: 'rotate(-3deg)',
          }}
          aria-hidden="true"
        >
          LAB
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '12%',
            right: '-6%',
            fontSize: 'clamp(9rem, 22vw, 35rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            color: 'var(--yon-accent)',
            transform: 'rotate(6deg)',
          }}
          aria-hidden="true"
        >
          EXP
        </span>

        {/* ===== HERO SLOTS - 4 carefully placed ===== */}

        {/* Slot 1: Hero - large left */}
        <Slot
          {...slot('lab-hero-001', 'EXP / MAIN')}
          size="hero"
          position="absolute"
          top="5%"
          left="-3%"
          rotation={-3}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={20}
          bleed="left"
          bleedAmount="lg"
          annotationNumber="001"
          texture="grain"
        />

        {/* Slot 2: Large - right */}
        <Slot
          {...slot('lab-hero-002', 'TEST 001')}
          size="large"
          position="absolute"
          top="8%"
          right="5%"
          rotation={4}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
        />

        {/* Slot 3: Medium - center overlap */}
        <Slot
          {...slot('lab-hero-003', 'SAMPLE')}
          size="medium"
          position="absolute"
          top="40%"
          left="40%"
          rotation={-5}
          clip="organic-1"
          shadow="dramatic"
          zIndex={25}
          overlapX={60}
          decoration="staple"
        />

        {/* Slot 4: Small - bottom */}
        <Slot
          {...slot('lab-hero-004', 'ITERATION')}
          size="small"
          position="absolute"
          bottom="22%"
          left="10%"
          rotation={6}
          clip="torn-2"
          shadow="offset"
          zIndex={22}
          grayscale
          decoration="pin"
        />

        {/* Main title */}
        <div className="relative z-30 pt-40 pb-20 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <StickerText variant="stamp" rotation={-2} color="accent" size="xs">
              EXPERIMENTAL
            </StickerText>

            <GlitchTitle
              text="Lab"
              size="display"
              glitchOffset={6}
              charRotation
              rotationIntensity={3}
              className="mt-6"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                transform: 'rotate(-1.5deg)',
              }}
              as="h1"
            />

            <ExperimentalText
              text="Experiments in construction, material, and form. Failures documented."
              variant="body"
              effect="scatter"
              intensity="subtle"
              className="mt-10"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                maxWidth: '38ch',
                marginLeft: '3rem',
                fontStyle: 'italic',
              }}
            />

            <WhisperText
              text="Work in progress"
              className="mt-4"
              style={{ fontSize: '0.55rem', marginLeft: '3rem' }}
            />
          </div>
        </div>

        {/* Status legend */}
        <div className="relative z-30 px-8 md:px-16 lg:px-24 pb-12">
          <div className="flex flex-wrap gap-6">
            <StatusLabel status="in_progress" />
            <StatusLabel status="testing" />
            <StatusLabel status="complete" />
          </div>
        </div>
      </section>

      {/* Experiments List - Client Component */}
      <LabExperiments />

      {/* ============================================
          FAILURES SECTION - Simplified
          ============================================ */}
      <section className="relative min-h-[80vh] w-full py-24 overflow-hidden bg-yon-ivory/30 texture-grain">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-8%',
            fontSize: 'clamp(12rem, 30vw, 45rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            lineHeight: 0.8,
            color: 'var(--yon-accent)',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          FAIL
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <StickerText variant="archive" rotation={-1} color="transparent" size="xs">
              ESSENTIAL DOCUMENTATION
            </StickerText>

            <h2
              className="font-serif text-yon-accent mt-6"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                letterSpacing: '-0.02em',
                transform: 'rotate(-1deg)',
              }}
            >
              Failures
            </h2>

            <p
              className="font-sans text-yon-grey/60 mt-8 max-w-lg"
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.8,
                marginLeft: '2rem',
                transform: 'rotate(0.5deg)',
              }}
            >
              Every failed experiment teaches something. Rejected ideas, broken toiles, wrong paths —
              all documented as essential steps toward discovery.
            </p>
          </div>

          {/* Failure slots - 4 key slots */}
          <div className="relative mt-20" style={{ minHeight: '50vh' }}>
            <Slot
              {...slot('lab-failures-001', 'REJECTED / 01')}
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
              {...slot('lab-failures-002', 'FAILED TOILE')}
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
              {...slot('lab-failures-003', 'WRONG PATH')}
              size="small"
              position="absolute"
              bottom="20%"
              left="30%"
              rotation={-6}
              clip="organic-2"
              grayscale
              zIndex={18}
              decoration="staple"
            />

            <Slot
              {...slot('lab-failures-004', 'ITERATION 03')}
              size="small-square"
              position="absolute"
              bottom="15%"
              right="25%"
              rotation={4}
              border="rough"
              grayscale
              zIndex={16}
              decoration="mark-x"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          METHODOLOGY - Simplified
          ============================================ */}
      <section className="relative min-h-[60vh] w-full py-24 overflow-hidden texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            left: '-6%',
            fontSize: 'clamp(8rem, 18vw, 25rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            color: 'var(--yon-black)',
            transform: 'rotate(-5deg)',
          }}
          aria-hidden="true"
        >
          METHOD
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <StickerText variant="tape" rotation={1.5} size="xs">
              RESEARCH METHODOLOGY
            </StickerText>

            <h2
              className="font-serif text-yon-black mt-6"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.02em',
                transform: 'rotate(-0.5deg)',
              }}
            >
              How We Work
            </h2>

            {/* Method steps with 3 slots */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="relative">
                <Slot
                  {...slot('lab-method-001', 'OBSERVE')}
                  size="small"
                  rotation={-3}
                  clip="irregular-2"
                  shadow="float"
                  zIndex={10}
                  annotationNumber="01"
                  decoration="pin"
                />
                <p className="font-sans text-yon-grey/60 mt-6" style={{ fontSize: '0.8rem', lineHeight: 1.7 }}>
                  Research and observation. Finding unexpected connections.
                </p>
              </div>

              <div className="relative" style={{ marginTop: '2rem' }}>
                <Slot
                  {...slot('lab-method-002', 'EXPERIMENT')}
                  size="small"
                  rotation={4}
                  clip="torn-1"
                  shadow="offset"
                  zIndex={10}
                  annotationNumber="02"
                  decoration="tape-top"
                />
                <p className="font-sans text-yon-grey/60 mt-6" style={{ fontSize: '0.8rem', lineHeight: 1.7 }}>
                  Rapid prototyping. Embracing failures as data.
                </p>
              </div>

              <div className="relative" style={{ marginTop: '1rem' }}>
                <Slot
                  {...slot('lab-method-003', 'REFINE')}
                  size="small"
                  rotation={-2}
                  clip="organic-1"
                  shadow="soft"
                  zIndex={10}
                  annotationNumber="03"
                  decoration="staple"
                />
                <p className="font-sans text-yon-grey/60 mt-6" style={{ fontSize: '0.8rem', lineHeight: 1.7 }}>
                  Iteration toward the essential. Removing excess.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA - Collections
          ============================================ */}
      <section className="relative min-h-[45vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '30%',
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

          <h2
            className="font-serif text-yon-black mt-6"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
              transform: 'rotate(-1deg)',
            }}
          >
            Collections
          </h2>

          <Link
            href="/collections"
            className="inline-block mt-10 font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.6rem' }}
          >
            View Collections →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
