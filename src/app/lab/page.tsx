import Link from 'next/link'
import Footer from '@/components/Footer'
import { Slot, AnnotationLabel, BackgroundSlot } from '@/components/deconstructivist'
import {
  GlitchTitle,
  LabelText,
  WhisperText,
  ExperimentalText,
} from '@/components/typography'
import { getSlotImages, createSlotHelper } from '@/lib/sanity/slots'
import LabExperiments from './lab-experiments'

export default async function LabPage() {
  // Fetch all slot images for lab page from CMS
  const slotImages = await getSlotImages('lab')
  const slot = createSlotHelper(slotImages)

  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* CMS Background Slot */}
      <BackgroundSlot
        {...slot('lab-background-001', 'BACKGROUND')}
        opacity={0.03}
        grayscale
      />

      {/* ============================================
          HERO - Lab Introduction - fits single screen
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ height: 'calc(100vh - 48px)' }}>
        {/* Background typography - LAB */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            left: '-12%',
            fontSize: 'clamp(18rem, 40vw, 60rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.025,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: '#0A0A0A',
            transform: 'rotate(-3deg)',
          }}
          aria-hidden="true"
        >
          LAB
        </span>

        {/* Secondary background text */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '15%',
            right: '-8%',
            fontSize: 'clamp(8rem, 20vw, 30rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            color: '#8B7355',
            transform: 'rotate(8deg)',
          }}
          aria-hidden="true"
        >
          EXP
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
          2024
        </span>

        {/* ===== HERO SLOTS - 12 slots scattered ===== */}

        {/* Slot 1: Hero primary - left bleeding */}
        <Slot
          {...slot('lab-hero-001', 'EXP / MAIN')}
          size="hero"
          position="absolute"
          top="8%"
          left="-5%"
          rotation={-3}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={20}
          bleed="left"
          bleedAmount="lg"
          annotationNumber="001"
          texture="grain"
        />

        {/* Slot 2: Large - right top */}
        <Slot
          {...slot('lab-hero-002', 'TEST 001')}
          size="large"
          position="absolute"
          top="5%"
          right="3%"
          rotation={4}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
          bleed="right"
          bleedAmount="md"
        />

        {/* Slot 3: Medium - center overlapping */}
        <Slot
          {...slot('lab-hero-003', 'SAMPLE')}
          size="medium"
          position="absolute"
          top="35%"
          left="45%"
          rotation={-5}
          clip="organic-1"
          shadow="dramatic"
          zIndex={25}
          overlapX={80}
          decoration="staple"
        />

        {/* Slot 4: Small - bottom left */}
        <Slot
          {...slot('lab-hero-004', 'ITERATION')}
          size="small"
          position="absolute"
          bottom="20%"
          left="8%"
          rotation={7}
          clip="torn-2"
          shadow="offset"
          zIndex={22}
          grayscale
          decoration="pin"
        />

        {/* Slot 5: Medium-wide - right center */}
        <Slot
          {...slot('lab-hero-005', 'PROCESS')}
          size="medium-wide"
          position="absolute"
          top="55%"
          right="10%"
          rotation={-2}
          clip="wave-1"
          shadow="soft"
          zIndex={16}
          sepia
        />

        {/* Slot 6: Swatch cluster 1 */}
        <Slot
          {...slot('lab-hero-006', 'A')}
          size="swatch"
          position="absolute"
          top="25%"
          left="30%"
          rotation={12}
          border="rough"
          zIndex={24}
          decoration="tape-top"
        />

        {/* Slot 7: Swatch cluster 2 */}
        <Slot
          {...slot('lab-hero-007', 'B')}
          size="swatch"
          position="absolute"
          top="28%"
          left="37%"
          rotation={-8}
          border="accent"
          zIndex={26}
          overlapX={25}
        />

        {/* Slot 8: Tiny - scattered */}
        <Slot
          {...slot('lab-hero-008', 'REF')}
          size="tiny"
          position="absolute"
          top="70%"
          left="25%"
          rotation={-15}
          clip="notch-1"
          zIndex={28}
          decoration="clip"
        />

        {/* Slot 9: Tiny-wide - top */}
        <Slot
          {...slot('lab-hero-009', 'MOOD')}
          size="tiny-wide"
          position="absolute"
          top="15%"
          left="55%"
          rotation={5}
          clip="irregular-4"
          zIndex={19}
          grayscale
        />

        {/* Slot 10: Micro - accent */}
        <Slot
          {...slot('lab-hero-010', '01')}
          size="micro"
          position="absolute"
          top="48%"
          left="72%"
          rotation={18}
          border="thin"
          zIndex={30}
          decoration="pin-red"
        />

        {/* Slot 11: Small - right bleeding */}
        <Slot
          {...slot('lab-hero-011', 'DATA')}
          size="small"
          position="absolute"
          bottom="35%"
          right="-3%"
          rotation={-6}
          clip="trapezoid"
          zIndex={17}
          bleed="right"
          bleedAmount="md"
        />

        {/* Slot 12: Medium-tall - bottom */}
        <Slot
          {...slot('lab-hero-012', 'RESULT')}
          size="medium-tall"
          position="absolute"
          bottom="5%"
          left="50%"
          rotation={2}
          clip="corner-cut"
          shadow="deep"
          zIndex={15}
          contrast
        />

        {/* Scattered Annotations */}
        <AnnotationLabel
          text="EXPERIMENTAL"
          position={{ top: '12%', left: '25%' }}
          rotation={-3}
          variant="stamp"
        />
        <AnnotationLabel
          text="test batch"
          position={{ top: '45%', right: '35%' }}
          rotation={5}
          variant="handwritten"
        />
        <AnnotationLabel
          text="R&D"
          position={{ bottom: '25%', left: '68%' }}
          rotation={-2}
          variant="tag"
        />
        <AnnotationLabel
          text="prototype"
          position={{ top: '75%', right: '20%' }}
          rotation={8}
          variant="default"
        />

        {/* Main title */}
        <div className="relative z-30 pt-40 pb-20 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <LabelText text="ASKEW — Experiments" style={{ fontSize: '0.55rem' }} />

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
              text="Experiments in construction, material, and form. Work in progress, failures included."
              variant="body"
              effect="scatter"
              intensity="subtle"
              className="mt-10"
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
                maxWidth: '40ch',
                marginLeft: '3rem',
                fontStyle: 'italic',
              }}
            />

            <WhisperText
              text="Work in progress"
              className="mt-4"
              style={{
                fontSize: '0.55rem',
                marginLeft: '3rem',
              }}
            />
          </div>
        </div>

        {/* Status legend */}
        <div className="relative z-30 px-8 md:px-16 lg:px-24 pb-12">
          <div className="flex flex-wrap gap-8">
            <span
              className="font-mono uppercase tracking-[0.15em] text-yon-accent"
              style={{ fontSize: '0.5rem' }}
            >
              ● Active
            </span>
            <span
              className="font-mono uppercase tracking-[0.15em] text-yon-grey/60"
              style={{ fontSize: '0.5rem' }}
            >
              ● Testing
            </span>
            <span
              className="font-mono uppercase tracking-[0.15em] text-yon-grey/40"
              style={{ fontSize: '0.5rem' }}
            >
              ● Paused
            </span>
            <span
              className="font-mono uppercase tracking-[0.15em] text-yon-black/40"
              style={{ fontSize: '0.5rem' }}
            >
              ● Complete
            </span>
          </div>
        </div>
      </section>

      {/* ============================================
          EXPERIMENTS LIST - Client Component
          ============================================ */}
      <LabExperiments />

      {/* ============================================
          FAILURES SECTION - Dense Scattered Layout
          ============================================ */}
      <section className="relative min-h-screen w-full py-24 overflow-hidden bg-yon-ivory/30 texture-grain">
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
            fontSize: 'clamp(6rem, 15vw, 20rem)',
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
            <span
              className="block font-mono uppercase tracking-[0.3em] text-yon-accent/60"
              style={{ fontSize: '0.55rem' }}
            >
              Essential Documentation
            </span>

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

          {/* Failure slots - 12 scattered slots */}
          <div className="relative mt-20" style={{ minHeight: '70vh' }}>
            {/* Row 1 */}
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
              top="5%"
              right="8%"
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
              top="15%"
              left="40%"
              rotation={-8}
              clip="organic-2"
              grayscale
              zIndex={18}
              overlapX={60}
              decoration="staple"
            />

            {/* Row 2 */}
            <Slot
              {...slot('lab-failures-004', 'ITERATION 03')}
              size="medium-wide"
              position="absolute"
              top="35%"
              left="5%"
              rotation={2}
              clip="wave-2"
              grayscale
              sepia
              zIndex={12}
              decoration="pin"
            />

            <Slot
              {...slot('lab-failures-005', 'DISCARDED')}
              size="small-square"
              position="absolute"
              top="40%"
              right="20%"
              rotation={-6}
              border="rough"
              grayscale
              zIndex={16}
              decoration="mark-x"
            />

            <Slot
              {...slot('lab-failures-006', 'STUDY')}
              size="tiny"
              position="absolute"
              top="50%"
              left="55%"
              rotation={12}
              clip="notch-2"
              grayscale
              zIndex={20}
            />

            {/* Row 3 */}
            <Slot
              {...slot('lab-failures-007', 'BROKEN')}
              size="medium"
              position="absolute"
              bottom="25%"
              left="25%"
              rotation={-4}
              clip="torn-3"
              grayscale
              zIndex={14}
              decoration="corner-fold"
            />

            <Slot
              {...slot('lab-failures-008', 'ABANDONED')}
              size="small"
              position="absolute"
              bottom="20%"
              right="5%"
              rotation={7}
              clip="irregular-3"
              grayscale
              zIndex={17}
              bleed="right"
              bleedAmount="sm"
            />

            {/* Swatches - rejected materials */}
            <Slot
              {...slot('lab-failures-009', 'X')}
              size="swatch"
              position="absolute"
              top="60%"
              left="70%"
              rotation={-10}
              border="rough"
              grayscale
              zIndex={22}
              decoration="mark-x"
            />

            <Slot
              {...slot('lab-failures-010', 'X')}
              size="swatch"
              position="absolute"
              top="65%"
              left="76%"
              rotation={8}
              border="thin"
              grayscale
              zIndex={23}
              overlapX={20}
            />

            {/* Micro accents */}
            <Slot
              {...slot('lab-failures-011', 'NO')}
              size="micro"
              position="absolute"
              top="28%"
              right="40%"
              rotation={15}
              border="accent"
              grayscale
              zIndex={25}
            />

            <Slot
              {...slot('lab-failures-012', '?')}
              size="micro"
              position="absolute"
              bottom="35%"
              left="10%"
              rotation={-12}
              border="dashed"
              grayscale
              zIndex={24}
            />

            {/* Annotations */}
            <AnnotationLabel
              text="learn from this"
              position={{ top: '25%', left: '60%' }}
              rotation={4}
              variant="handwritten"
            />
            <AnnotationLabel
              text="REJECTED"
              position={{ top: '55%', right: '30%' }}
              rotation={-3}
              variant="stamp"
            />
            <AnnotationLabel
              text="try again"
              position={{ bottom: '15%', left: '45%' }}
              rotation={6}
              variant="default"
            />
            <AnnotationLabel
              text="F-012"
              position={{ top: '8%', left: '65%' }}
              rotation={-5}
              variant="tag"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          METHODOLOGY SECTION - New Addition
          ============================================ */}
      <section className="relative min-h-[80vh] w-full py-24 overflow-hidden texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            left: '-8%',
            fontSize: 'clamp(8rem, 18vw, 25rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            color: '#0A0A0A',
            transform: 'rotate(-5deg)',
          }}
          aria-hidden="true"
        >
          METHOD
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <span
              className="block font-mono uppercase tracking-[0.3em] text-yon-grey/40"
              style={{ fontSize: '0.55rem' }}
            >
              Research Methodology
            </span>

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

            {/* Method steps with slots */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
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
                <p
                  className="font-sans text-yon-grey/60 mt-6"
                  style={{ fontSize: '0.8rem', lineHeight: 1.7 }}
                >
                  Research and observation. Finding unexpected connections.
                </p>
              </div>

              {/* Step 2 */}
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
                <p
                  className="font-sans text-yon-grey/60 mt-6"
                  style={{ fontSize: '0.8rem', lineHeight: 1.7 }}
                >
                  Rapid prototyping. Embracing failures as data.
                </p>
              </div>

              {/* Step 3 */}
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
                <p
                  className="font-sans text-yon-grey/60 mt-6"
                  style={{ fontSize: '0.8rem', lineHeight: 1.7 }}
                >
                  Iteration toward the essential. Removing excess.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating accents */}
        <Slot
          {...slot('lab-method-004', 'NOTE')}
          size="tiny"
          position="absolute"
          top="15%"
          right="10%"
          rotation={8}
          border="thin"
          zIndex={5}
          decoration="clip"
        />

        <Slot
          {...slot('lab-method-005', 'REF')}
          size="swatch"
          position="absolute"
          bottom="20%"
          left="5%"
          rotation={-6}
          border="rough"
          zIndex={6}
          grayscale
        />

        <AnnotationLabel
          text="process"
          position={{ top: '40%', right: '5%' }}
          rotation={-4}
          variant="handwritten"
        />
      </section>

      {/* ============================================
          CTA - Collections
          ============================================ */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden">
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
            opacity: 0.015,
            color: '#0A0A0A',
          }}
          aria-hidden="true"
        >
          →
        </span>

        <div className="text-center px-8 z-10">
          <span
            className="block font-mono uppercase tracking-[0.3em] text-yon-grey/40"
            style={{ fontSize: '0.55rem' }}
          >
            See the results
          </span>

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

        {/* Accent slots */}
        <Slot
          {...slot('lab-cta-001', 'FINAL')}
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
          {...slot('lab-cta-002', 'RESULT')}
          size="tiny"
          position="absolute"
          top="20%"
          left="15%"
          rotation={8}
          border="accent"
          zIndex={6}
        />

        <Slot
          {...slot('lab-cta-003', '→')}
          size="micro"
          position="absolute"
          bottom="30%"
          left="25%"
          rotation={-3}
          border="thin"
          zIndex={7}
        />
      </section>

      <Footer />
    </div>
  )
}
