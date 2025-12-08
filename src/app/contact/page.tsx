import Footer from '@/components/Footer'
import { Slot, AnnotationLabel } from '@/components/deconstructivist'
import BackgroundSlot from '@/components/BackgroundSlot'
import { getBackgroundSlotProps } from '@/lib/background-slot'
import { getSlotImages, createSlotHelper } from '@/lib/sanity/slots'
import ContactForm from './contact-form'

export default async function ContactPage() {
  // Fetch all slot images for contact page from CMS
  const slotImages = await getSlotImages('contact')
  const slot = createSlotHelper(slotImages)

  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* PAGE BACKGROUND - CMS Controlled */}
      <BackgroundSlot
        {...getBackgroundSlotProps(slotImages, 'contact-background-001')}
        opacity={0.04}
        grayscale
      />

      {/* ============================================
          CONTACT - Dense Deconstructivist Collage - fits single screen
          15+ scattered slots around minimal form
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ height: 'calc(100vh - 48px)' }}>
        {/* Background typography - @ symbol massive */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '20%',
            right: '-20%',
            fontSize: 'clamp(20rem, 50vw, 80rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            lineHeight: 0.8,
            color: '#0A0A0A',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          @
        </span>

        {/* Secondary background text - MAIL */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            left: '-10%',
            fontSize: 'clamp(10rem, 25vw, 40rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            letterSpacing: '-0.03em',
            color: '#0A0A0A',
            transform: 'rotate(-8deg)',
          }}
          aria-hidden="true"
        >
          MAIL
        </span>

        {/* Third layer - vertical */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '15%',
            left: '3%',
            fontSize: 'clamp(4rem, 10vw, 12rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            letterSpacing: '0.3em',
            color: '#8B7355',
            writingMode: 'vertical-rl',
          }}
          aria-hidden="true"
        >
          CONTACT
        </span>

        {/* ===== SCATTERED SLOTS - 15 slots around the page ===== */}

        {/* Slot 1: Hero top left - bleeding */}
        <Slot
          {...slot('contact-hero-001', 'STUDIO')}
          size="large"
          position="absolute"
          top="-3%"
          left="-5%"
          rotation={-3}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={15}
          bleed="left"
          bleedAmount="lg"
          grayscale
          annotationNumber="001"
        />

        {/* Slot 2: Medium right top */}
        <Slot
          {...slot('contact-hero-002', 'CONTACT')}
          size="medium"
          position="absolute"
          top="5%"
          right="8%"
          rotation={4}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
          bleed="right"
          bleedAmount="md"
        />

        {/* Slot 3: Small - left side */}
        <Slot
          {...slot('contact-hero-003', 'SEOUL')}
          size="small"
          position="absolute"
          top="35%"
          left="3%"
          rotation={-6}
          clip="organic-1"
          shadow="offset"
          zIndex={20}
          decoration="pin"
        />

        {/* Slot 4: Swatch cluster 1 */}
        <Slot
          {...slot('contact-hero-004', 'A')}
          size="swatch"
          position="absolute"
          top="15%"
          left="35%"
          rotation={12}
          border="rough"
          zIndex={22}
          decoration="tape-top"
        />

        {/* Slot 5: Swatch cluster 2 */}
        <Slot
          {...slot('contact-hero-005', 'B')}
          size="swatch"
          position="absolute"
          top="18%"
          left="42%"
          rotation={-8}
          border="accent"
          zIndex={24}
          overlapX={20}
        />

        {/* Slot 6: Tiny - right upper */}
        <Slot
          {...slot('contact-hero-006', 'REF')}
          size="tiny"
          position="absolute"
          top="28%"
          right="15%"
          rotation={-10}
          clip="notch-1"
          zIndex={25}
          decoration="clip"
        />

        {/* Slot 7: Medium-wide - bottom left bleeding */}
        <Slot
          {...slot('contact-hero-007', 'PROCESS')}
          size="medium-wide"
          position="absolute"
          bottom="25%"
          left="-4%"
          rotation={3}
          clip="wave-1"
          shadow="soft"
          zIndex={12}
          bleed="left"
          bleedAmount="md"
          sepia
        />

        {/* Slot 8: Small-square - right middle */}
        <Slot
          {...slot('contact-hero-008', 'MAIL')}
          size="small-square"
          position="absolute"
          top="55%"
          right="5%"
          rotation={-5}
          clip="diagonal-1"
          shadow="dramatic"
          zIndex={16}
          bleed="right"
          bleedAmount="sm"
        />

        {/* Slot 9: Tiny-wide - scattered */}
        <Slot
          {...slot('contact-hero-009', 'INQUIRY')}
          size="tiny-wide"
          position="absolute"
          top="45%"
          left="60%"
          rotation={8}
          clip="irregular-4"
          zIndex={19}
          grayscale
        />

        {/* Slot 10: Micro - accent */}
        <Slot
          {...slot('contact-hero-010', '01')}
          size="micro"
          position="absolute"
          top="60%"
          left="25%"
          rotation={15}
          border="thin"
          zIndex={28}
          decoration="pin-red"
        />

        {/* Slot 11: Small - bottom right */}
        <Slot
          {...slot('contact-hero-011', 'WORK')}
          size="small"
          position="absolute"
          bottom="15%"
          right="12%"
          rotation={-4}
          clip="torn-2"
          zIndex={14}
          decoration="staple"
        />

        {/* Slot 12: Medium-tall - right edge bleeding */}
        <Slot
          {...slot('contact-hero-012', 'COLLAB')}
          size="medium-tall"
          position="absolute"
          bottom="30%"
          right="-3%"
          rotation={2}
          clip="corner-cut"
          shadow="deep"
          zIndex={10}
          bleed="right"
          bleedAmount="lg"
          contrast
        />

        {/* Slot 13: Tiny - bottom scattered */}
        <Slot
          {...slot('contact-hero-013', 'KR')}
          size="tiny"
          position="absolute"
          bottom="8%"
          left="45%"
          rotation={-12}
          border="rough"
          zIndex={21}
        />

        {/* Slot 14: Swatch - bottom */}
        <Slot
          {...slot('contact-hero-014', '2024')}
          size="swatch"
          position="absolute"
          bottom="12%"
          left="58%"
          rotation={6}
          border="accent"
          zIndex={23}
          decoration="corner-fold"
        />

        {/* Slot 15: Micro - far corner */}
        <Slot
          {...slot('contact-hero-015', '→')}
          size="micro"
          position="absolute"
          top="75%"
          right="35%"
          rotation={-5}
          border="dashed"
          zIndex={26}
        />

        {/* Scattered Annotations */}
        <AnnotationLabel
          text="get in touch"
          position={{ top: '10%', left: '55%' }}
          rotation={-3}
          variant="handwritten"
        />
        <AnnotationLabel
          text="OPEN"
          position={{ top: '40%', right: '5%' }}
          rotation={5}
          variant="stamp"
        />
        <AnnotationLabel
          text="collaboration"
          position={{ bottom: '35%', left: '10%' }}
          rotation={-2}
          variant="tag"
        />
        <AnnotationLabel
          text="studio"
          position={{ top: '65%', left: '50%' }}
          rotation={8}
          variant="default"
        />
        <AnnotationLabel
          text="press welcome"
          position={{ bottom: '20%', right: '40%' }}
          rotation={-4}
          variant="handwritten"
        />

        {/* Main content - Form - Client Component */}
        <ContactForm />
      </section>

      {/* ============================================
          LOCATION SECTION - New Dense Section
          ============================================ */}
      <section className="relative min-h-[70vh] w-full py-24 overflow-hidden bg-yon-ivory/30 texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-8%',
            fontSize: 'clamp(10rem, 25vw, 35rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            color: '#0A0A0A',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          SEOUL
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            left: '-5%',
            fontSize: 'clamp(5rem, 12vw, 18rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            color: '#8B7355',
            transform: 'rotate(-90deg)',
            transformOrigin: 'left bottom',
          }}
          aria-hidden="true"
        >
          STUDIO
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <span
              className="block font-mono uppercase tracking-[0.3em] text-yon-grey/40"
              style={{ fontSize: '0.55rem' }}
            >
              Location
            </span>

            <h2
              className="font-serif text-yon-black mt-6"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.02em',
                transform: 'rotate(-0.5deg)',
              }}
            >
              Studio
            </h2>

            <p
              className="font-sans text-yon-grey/60 mt-6 max-w-md"
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.8,
                marginLeft: '2rem',
                transform: 'rotate(0.3deg)',
              }}
            >
              Based in Seoul, working globally. Open for studio visits by appointment.
            </p>

            <span
              className="block font-mono text-yon-grey/30 mt-4"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                marginLeft: '2rem',
              }}
            >
              By appointment only
            </span>
          </div>

          {/* Location slots - scattered */}
          <div className="relative mt-16" style={{ minHeight: '40vh' }}>
            <Slot
              {...slot('contact-location-001', 'SEOUL')}
              size="large"
              position="absolute"
              top="0"
              right="5%"
              rotation={-3}
              clip="irregular-2"
              shadow="offset"
              zIndex={15}
              annotationNumber="KR"
              decoration="tape-corner"
            />

            <Slot
              {...slot('contact-location-002', 'STUDIO')}
              size="medium"
              position="absolute"
              top="20%"
              left="10%"
              rotation={5}
              clip="torn-3"
              shadow="float"
              zIndex={18}
              sepia
            />

            <Slot
              {...slot('contact-location-003', 'SPACE')}
              size="small"
              position="absolute"
              bottom="20%"
              right="25%"
              rotation={-8}
              clip="organic-2"
              zIndex={20}
              decoration="pin"
            />

            <Slot
              {...slot('contact-location-004', 'VISIT')}
              size="tiny"
              position="absolute"
              top="50%"
              left="45%"
              rotation={12}
              border="thin"
              zIndex={22}
              decoration="clip"
            />

            <Slot
              {...slot('contact-location-005', 'MAP')}
              size="swatch"
              position="absolute"
              bottom="10%"
              left="25%"
              rotation={-5}
              border="rough"
              zIndex={16}
              grayscale
            />

            <Slot
              {...slot('contact-location-006', 'BY APPT')}
              size="micro"
              position="absolute"
              top="35%"
              right="40%"
              rotation={10}
              border="accent"
              zIndex={24}
            />

            <AnnotationLabel
              text="by appointment"
              position={{ top: '15%', left: '40%' }}
              rotation={-3}
              variant="handwritten"
            />
            <AnnotationLabel
              text="OPEN"
              position={{ bottom: '30%', right: '10%' }}
              rotation={5}
              variant="stamp"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          SOCIAL SECTION - Additional Dense Area
          ============================================ */}
      <section className="relative min-h-[50vh] w-full py-20 overflow-hidden texture-grain">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(8rem, 20vw, 30rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            color: '#0A0A0A',
          }}
          aria-hidden="true"
        >
          FOLLOW
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24 text-center">
          <span
            className="block font-mono uppercase tracking-[0.3em] text-yon-grey/40"
            style={{ fontSize: '0.55rem' }}
          >
            Social
          </span>

          <h2
            className="font-serif text-yon-black mt-6"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
              transform: 'rotate(-1deg)',
            }}
          >
            Follow
          </h2>

          <div className="mt-10 flex justify-center gap-12">
            <a
              href="https://instagram.com/theyon_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-transparent hover:border-yon-black pb-1"
              style={{ fontSize: '0.6rem' }}
            >
              Instagram
            </a>

            <a
              href="mailto:hello@theyon.com"
              className="font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-transparent hover:border-yon-black pb-1"
              style={{ fontSize: '0.6rem' }}
            >
              Email
            </a>
          </div>
        </div>

        {/* Accent slots */}
        <Slot
          {...slot('contact-social-001', 'IG')}
          size="small"
          position="absolute"
          bottom="15%"
          right="10%"
          rotation={-5}
          clip="irregular-3"
          zIndex={5}
          decoration="tape-top"
        />

        <Slot
          {...slot('contact-social-002', '@')}
          size="tiny"
          position="absolute"
          top="20%"
          left="15%"
          rotation={8}
          border="accent"
          zIndex={6}
        />

        <Slot
          {...slot('contact-social-003', 'DM')}
          size="micro"
          position="absolute"
          bottom="30%"
          left="25%"
          rotation={-3}
          border="thin"
          zIndex={7}
          decoration="pin-red"
        />

        <AnnotationLabel
          text="say hi"
          position={{ top: '35%', right: '20%' }}
          rotation={4}
          variant="handwritten"
        />
      </section>

      <Footer />
    </div>
  )
}
