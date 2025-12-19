import Footer from '@/components/Footer'
import {
  Slot,
  BackgroundSlot,
  ScrollingBackgroundSlot,
  SectionNumber,
  DecoLine,
  CrossMarker,
  VerticalText,
  NoiseOverlay,
} from '@/components/deconstructivist'
import { LabelText, StickerText } from '@/components/typography'
import { getSlotImages, createSlotHelper } from '@/lib/sanity/slots'
import ContactForm from './contact-form'

export const revalidate = 10

export default async function ContactPage() {
  const slotImages = await getSlotImages('contact')
  const slot = createSlotHelper(slotImages)

  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* Background Slot */}
      <BackgroundSlot
        {...slot('contact-background-001', 'BACKGROUND')}
        opacity={0.02}
        grayscale
      />

      {/* Scrolling Background */}
      <ScrollingBackgroundSlot
        {...slot('contact-background-002', 'SCROLLING BG')}
        scrollSpeed={0.4}
        opacity={0.02}
        grayscale
        zIndex={1}
      />

      {/* Global noise overlay */}
      <NoiseOverlay opacity={0.02} />

      {/* ============================================
          CONTACT - Minimal with form - 4 key slots
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ minHeight: 'calc(100vh - 56px)' }}>
        {/* Background typography - @ symbol */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '15%',
            right: '-15%',
            fontSize: 'clamp(18rem, 45vw, 70rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            lineHeight: 0.8,
            color: 'var(--yon-black)',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          @
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '8%',
            left: '-8%',
            fontSize: 'clamp(10rem, 25vw, 40rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.012,
            letterSpacing: '-0.03em',
            color: 'var(--yon-black)',
            transform: 'rotate(-8deg)',
          }}
          aria-hidden="true"
        >
          MAIL
        </span>

        {/* Section decorative elements */}
        <SectionNumber number="01" position="top-left" style={{ top: '10%', left: '3%' }} />
        <DecoLine direction="vertical" position="left" length={100} style={{ top: '25%', left: '2%' }} />
        <CrossMarker position="bottom-right" style={{ bottom: '30%', right: '5%' }} />
        <VerticalText text="CONTACT" position="right" style={{ right: '2%', top: '30%' }} />

        {/* ===== 4 key slots ===== */}

        {/* Slot 1: Hero top left */}
        <Slot
          {...slot('contact-hero-001', 'STUDIO')}
          size="large"
          position="absolute"
          top="0%"
          left="-3%"
          rotation={-3}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={15}
          bleed="left"
          bleedAmount="lg"
          grayscale
          annotationNumber="001"
          frameStyle="film-strip"
          frameNumber="01"
          filmFilter="faded"
        />

        {/* Slot 2: Medium right */}
        <Slot
          {...slot('contact-hero-002', 'CONTACT')}
          size="medium"
          position="absolute"
          top="8%"
          right="6%"
          rotation={4}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
          frameStyle="polaroid"
          filmFilter="vintage"
        />

        {/* Slot 3: Small accent */}
        <Slot
          {...slot('contact-hero-003', 'SEOUL')}
          size="small"
          position="absolute"
          bottom="30%"
          right="15%"
          rotation={-5}
          clip="organic-1"
          shadow="offset"
          zIndex={20}
          decoration="pin"
          frameStyle="vintage"
          filmFilter="warm"
        />

        {/* Slot 4: Swatch */}
        <Slot
          {...slot('contact-hero-004', 'MAIL')}
          size="swatch"
          position="absolute"
          bottom="20%"
          left="40%"
          rotation={8}
          border="rough"
          zIndex={22}
          decoration="tape-top"
          frameStyle="torn"
          filmFilter="faded"
        />

        {/* Contact Form - Client Component */}
        <ContactForm />
      </section>

      {/* ============================================
          LOCATION & SOCIAL - Simplified
          ============================================ */}
      <section className="relative min-h-[50vh] w-full py-24 overflow-hidden bg-yon-ivory/30 texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-6%',
            fontSize: 'clamp(10rem, 25vw, 35rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            color: 'var(--yon-black)',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          SEOUL
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <StickerText variant="tape" rotation={1} size="xs">
              LOCATION
            </StickerText>

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

          {/* 2 location slots */}
          <div className="relative mt-16" style={{ minHeight: '30vh' }}>
            <Slot
              {...slot('contact-location-001', 'SEOUL')}
              size="medium"
              position="absolute"
              top="0"
              right="10%"
              rotation={-3}
              clip="irregular-2"
              shadow="offset"
              zIndex={15}
              decoration="tape-corner"
              frameStyle="polaroid"
              filmFilter="warm"
            />

            <Slot
              {...slot('contact-location-002', 'STUDIO')}
              size="small"
              position="absolute"
              top="25%"
              left="15%"
              rotation={5}
              clip="torn-3"
              shadow="float"
              zIndex={18}
              sepia
              frameStyle="vintage"
              filmFilter="vintage"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          SOCIAL LINKS
          ============================================ */}
      <section className="relative min-h-[40vh] w-full py-20 overflow-hidden texture-grain">
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
            opacity: 0.012,
            color: 'var(--yon-black)',
          }}
          aria-hidden="true"
        >
          FOLLOW
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24 text-center">
          <LabelText text="Social" style={{ fontSize: '0.55rem' }} />

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
              href="https://instagram.com/askew_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-transparent hover:border-yon-black pb-1"
              style={{ fontSize: '0.6rem' }}
            >
              Instagram
            </a>

            <a
              href="mailto:hello@askew.studio"
              className="font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-transparent hover:border-yon-black pb-1"
              style={{ fontSize: '0.6rem' }}
            >
              Email
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
