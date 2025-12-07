'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Collection } from '@/types/sanity'
import { Slot, AnnotationLabel } from '@/components/deconstructivist'
import { GlitchTitle, LabelText } from '@/components/typography'

// Filter options
const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'in_progress', label: 'Current' },
  { id: 'complete', label: 'Archive' },
]

// Collection moodboard - each collection as dense scattered collage
// Note: These slots use hardcoded labels since they're generated dynamically per collection
// CMS images can be added later if needed by using collection-{slug}-{slot} pattern
function CollectionMoodboard({
  collection,
  index,
}: {
  collection: Partial<Collection>
  index: number
}) {
  // Alternate layouts for visual interest
  const isReversed = index % 2 === 1
  const baseRotation = isReversed ? 2 : -2
  const clips = ['irregular-1', 'torn-1', 'organic-1', 'torn-2'] as const
  const decorations = ['tape-corner', 'pin', 'staple', 'corner-fold'] as const

  return (
    <div className="relative min-h-screen w-full py-20 overflow-hidden">
      {/* Giant background title */}
      <span
        className="absolute pointer-events-none select-none"
        style={{
          top: isReversed ? '10%' : '15%',
          left: isReversed ? 'auto' : '-10%',
          right: isReversed ? '-10%' : 'auto',
          fontSize: 'clamp(10rem, 25vw, 40rem)',
          fontWeight: 100,
          fontFamily: 'var(--font-serif), Georgia, serif',
          opacity: 0.03,
          lineHeight: 0.85,
          letterSpacing: '-0.03em',
          color: '#0A0A0A',
          transform: `rotate(${isReversed ? 4 : -4}deg)`,
          whiteSpace: 'nowrap',
        }}
        aria-hidden="true"
      >
        {collection.title}
      </span>

      {/* Secondary background - collection number */}
      <span
        className="absolute pointer-events-none select-none"
        style={{
          bottom: '10%',
          left: isReversed ? '-5%' : 'auto',
          right: isReversed ? 'auto' : '-5%',
          fontSize: 'clamp(6rem, 15vw, 25rem)',
          fontWeight: 100,
          fontFamily: 'var(--font-mono), monospace',
          opacity: 0.02,
          color: '#8B7355',
          transform: `rotate(${isReversed ? -5 : 5}deg)`,
        }}
        aria-hidden="true"
      >
        0{index + 1}
      </span>

      {/* Main moodboard area */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24">
        {/* Dense scattered slots - 15+ per collection */}
        <div className="relative" style={{ minHeight: '85vh' }}>
          {/* Slot 1: Primary hero image - bleeding */}
          <Slot
            label={`${collection.title} / 01`}
            size="hero"
            position="absolute"
            top={isReversed ? '3%' : '0%'}
            left={isReversed ? 'auto' : '-3%'}
            right={isReversed ? '-3%' : 'auto'}
            rotation={baseRotation}
            clip={clips[index % clips.length]}
            shadow="offset-xl"
            zIndex={20}
            bleed={isReversed ? 'right' : 'left'}
            bleedAmount="lg"
            annotationNumber={`${String(index + 1).padStart(3, '0')}`}
            texture="grain"
          />

          {/* Slot 2: Large secondary */}
          <Slot
            label="LOOK 02"
            size="large"
            position="absolute"
            top={isReversed ? '20%' : '25%'}
            left={isReversed ? '8%' : 'auto'}
            right={isReversed ? 'auto' : '5%'}
            rotation={-baseRotation * 1.5}
            clip={clips[(index + 1) % clips.length]}
            shadow="float"
            zIndex={18}
            decoration={decorations[index % decorations.length]}
          />

          {/* Slot 3: Medium detail - overlapping */}
          <Slot
            label="DETAIL"
            size="medium"
            position="absolute"
            top={isReversed ? '45%' : '40%'}
            left={isReversed ? '35%' : '40%'}
            rotation={baseRotation * 2}
            clip="irregular-3"
            shadow="dramatic"
            zIndex={25}
            overlapX={80}
            overlapY={40}
            decoration="staple"
          />

          {/* Slot 4: Small accent */}
          <Slot
            label="LOOK 03"
            size="small"
            position="absolute"
            top={isReversed ? '60%' : '55%'}
            left={isReversed ? '55%' : '50%'}
            rotation={-baseRotation * 2.5}
            clip="irregular-5"
            zIndex={22}
            decoration="pin"
          />

          {/* Slot 5: Medium-wide - process */}
          <Slot
            label="PROCESS"
            size="medium-wide"
            position="absolute"
            top={isReversed ? '10%' : '65%'}
            left={isReversed ? 'auto' : '5%'}
            right={isReversed ? '25%' : 'auto'}
            rotation={baseRotation * 0.5}
            clip="wave-1"
            shadow="soft"
            zIndex={15}
            sepia
          />

          {/* Slot 6: Small-square - sketch */}
          <Slot
            label="SKETCH"
            size="small-square"
            position="absolute"
            top={isReversed ? '50%' : '8%'}
            left={isReversed ? 'auto' : 'auto'}
            right={isReversed ? '8%' : '8%'}
            rotation={5}
            clip="torn-3"
            grayscale
            zIndex={12}
            decoration="tape-top"
          />

          {/* Slot 7-9: Swatch cluster */}
          <Slot
            label={collection.materials?.[0] || 'FABRIC A'}
            size="swatch"
            position="absolute"
            top={isReversed ? '75%' : '70%'}
            left={isReversed ? '10%' : 'auto'}
            right={isReversed ? 'auto' : '35%'}
            rotation={-10}
            border="rough"
            decoration="tape-top"
            zIndex={24}
          />

          <Slot
            label={collection.materials?.[1] || 'FABRIC B'}
            size="swatch"
            position="absolute"
            top={isReversed ? '78%' : '73%'}
            left={isReversed ? '18%' : 'auto'}
            right={isReversed ? 'auto' : '28%'}
            rotation={8}
            border="accent"
            zIndex={26}
            overlapX={25}
          />

          <Slot
            label={collection.materials?.[2] || 'FABRIC C'}
            size="swatch"
            position="absolute"
            top={isReversed ? '82%' : '76%'}
            left={isReversed ? '25%' : 'auto'}
            right={isReversed ? 'auto' : '22%'}
            rotation={-5}
            border="thin"
            zIndex={28}
            overlapX={20}
          />

          {/* Slot 10: Tiny - reference */}
          <Slot
            label="REF"
            size="tiny"
            position="absolute"
            bottom="15%"
            left={isReversed ? 'auto' : '25%'}
            right={isReversed ? '45%' : 'auto'}
            rotation={-15}
            clip="notch-1"
            decoration="clip"
            zIndex={30}
          />

          {/* Slot 11: Tiny-wide - mood */}
          <Slot
            label="MOOD"
            size="tiny-wide"
            position="absolute"
            top={isReversed ? '35%' : '30%'}
            left={isReversed ? '60%' : '60%'}
            rotation={12}
            clip="irregular-4"
            zIndex={19}
            grayscale
          />

          {/* Slot 12: Micro accents */}
          <Slot
            label="01"
            size="micro"
            position="absolute"
            top="38%"
            left={isReversed ? '48%' : '70%'}
            rotation={18}
            border="thin"
            zIndex={32}
            decoration="pin-red"
          />

          <Slot
            label="02"
            size="micro"
            position="absolute"
            top="68%"
            left={isReversed ? '70%' : '35%'}
            rotation={-12}
            border="accent"
            zIndex={31}
          />

          {/* Slot 13: Medium-tall - silhouette */}
          <Slot
            label="SILHOUETTE"
            size="medium-tall"
            position="absolute"
            bottom="8%"
            left={isReversed ? '45%' : '55%'}
            rotation={-baseRotation}
            clip="corner-cut"
            shadow="deep"
            zIndex={14}
            contrast
          />

          {/* Slot 14: Small - top bleeding */}
          <Slot
            label="TOILE"
            size="small"
            position="absolute"
            top="-2%"
            left={isReversed ? '55%' : '35%'}
            rotation={baseRotation * 1.5}
            clip="trapezoid"
            shadow="offset"
            zIndex={16}
            bleed="top"
            bleedAmount="md"
          />

          {/* Slot 15: Small - technique */}
          <Slot
            label={collection.techniques?.[0] || 'TECHNIQUE'}
            size="small"
            position="absolute"
            bottom="25%"
            left={isReversed ? '5%' : 'auto'}
            right={isReversed ? 'auto' : '5%'}
            rotation={-baseRotation * 2}
            clip="organic-2"
            zIndex={17}
            decoration="corner-fold"
            bleed={isReversed ? 'left' : 'right'}
            bleedAmount="sm"
          />

          {/* Scattered Annotations */}
          <AnnotationLabel
            text={`NO. ${String(index + 1).padStart(2, '0')}`}
            position={{
              top: '5%',
              left: isReversed ? '30%' : 'auto',
              right: isReversed ? 'auto' : '25%'
            }}
            rotation={-3}
            variant="tag"
          />
          <AnnotationLabel
            text="main look"
            position={{
              top: '28%',
              left: isReversed ? '55%' : '8%'
            }}
            rotation={5}
            variant="handwritten"
          />
          <AnnotationLabel
            text={collection.status === 'in_progress' ? 'WIP' : collection.status === 'testing' ? 'TESTING' : 'COMPLETE'}
            position={{
              top: '50%',
              right: isReversed ? '55%' : '45%'
            }}
            rotation={-2}
            variant="stamp"
          />
          <AnnotationLabel
            text="materials"
            position={{
              bottom: '22%',
              left: isReversed ? '5%' : 'auto',
              right: isReversed ? 'auto' : '50%'
            }}
            rotation={4}
            variant="default"
          />

          {/* Collection info - overlaid with experimental typography */}
          <div
            className="absolute z-40"
            style={{
              bottom: '3%',
              left: isReversed ? 'auto' : '3%',
              right: isReversed ? '5%' : 'auto',
              transform: `rotate(${baseRotation * 0.3}deg)`,
            }}
          >
            <Link href={`/collections/${collection.slug}`} className="group block">
              <LabelText
                text={`NO. ${String(index + 1).padStart(2, '0')}`}
                style={{ fontSize: '0.55rem' }}
              />

              <GlitchTitle
                text={collection.title || 'COLLECTION'}
                size="heading"
                glitchOffset={5}
                charRotation
                rotationIntensity={3}
                className="mt-3 group-hover:opacity-80 transition-opacity"
                style={{
                  fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                  letterSpacing: '-0.03em',
                }}
                as="h2"
              />

              <p
                className="font-sans text-yon-grey/60 mt-4 max-w-sm"
                style={{ fontSize: '0.85rem', lineHeight: 1.7 }}
              >
                {collection.description}
              </p>

              <span
                className="inline-block mt-6 font-mono uppercase tracking-[0.2em] text-yon-grey/40 group-hover:text-yon-black transition-colors border-b border-yon-grey/20 group-hover:border-yon-black pb-1"
                style={{ fontSize: '0.6rem' }}
              >
                View Collection →
              </span>
            </Link>
          </div>

          {/* Status indicator */}
          {collection.status && (
            <div
              className="absolute z-35"
              style={{
                top: '2%',
                left: isReversed ? '3%' : 'auto',
                right: isReversed ? 'auto' : '3%',
              }}
            >
              <span
                className={`font-mono uppercase tracking-[0.2em] ${
                  collection.status === 'in_progress' ? 'text-yon-accent' :
                  collection.status === 'testing' ? 'text-yon-grey/60' : 'text-yon-grey/30'
                }`}
                style={{ fontSize: '0.5rem' }}
              >
                {collection.status === 'in_progress'
                  ? '● In Progress'
                  : collection.status === 'testing'
                    ? '● Testing'
                    : '○ Complete'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Divider - subtle gradient */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-yon-grey/15 to-transparent"
        aria-hidden="true"
      />
    </div>
  )
}

interface CollectionsClientProps {
  collections: Partial<Collection>[]
}

export default function CollectionsClient({ collections }: CollectionsClientProps) {
  const [filteredCollections, setFilteredCollections] = useState<Partial<Collection>[]>(collections)
  const [activeFilter, setActiveFilter] = useState('all')

  // Filter collections
  useEffect(() => {
    let result = [...collections]

    if (activeFilter !== 'all') {
      if (activeFilter === 'complete') {
        result = result.filter((c) => c.status === 'complete')
      } else {
        result = result.filter((c) => c.status === 'in_progress' || c.status === 'testing')
      }
    }

    setFilteredCollections(result)
  }, [activeFilter, collections])

  return (
    <section className="relative">
      {/* Filter controls */}
      <div className="relative z-30 px-8 md:px-16 lg:px-24 py-12 border-b border-yon-grey/10">
        <div className="flex flex-wrap items-center gap-8">
          {/* Status filter */}
          <div className="flex items-center gap-3">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`font-mono uppercase tracking-[0.15em] transition-all ${
                  activeFilter === option.id
                    ? 'text-yon-black border-b border-yon-black'
                    : 'text-yon-grey/40 hover:text-yon-grey/70'
                }`}
                style={{ fontSize: '0.6rem', paddingBottom: '2px' }}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Count */}
          <span
            className="ml-auto font-mono text-yon-grey/30"
            style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}
          >
            {filteredCollections.length} Projects
          </span>
        </div>
      </div>

      {/* Collections grid */}
      {filteredCollections.length === 0 ? (
        <div className="text-center py-40">
          <p className="font-mono text-yon-grey/50" style={{ fontSize: '0.8rem' }}>
            No collections found.
          </p>
          <button
            onClick={() => {
              setActiveFilter('all')
            }}
            className="mt-6 font-mono uppercase tracking-[0.15em] text-yon-black hover:text-yon-accent transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.6rem' }}
          >
            Reset Filters →
          </button>
        </div>
      ) : (
        <div
          key={activeFilter}
          className="animate-fade-in"
        >
          {filteredCollections.map((collection, index) => (
            <CollectionMoodboard key={collection._id} collection={collection} index={index} />
          ))}
        </div>
      )}
    </section>
  )
}
