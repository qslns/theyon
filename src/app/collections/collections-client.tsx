'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Collection } from '@/types/sanity'
import { Slot } from '@/components/deconstructivist'
import { GlitchTitle, LabelText } from '@/components/typography'

// Filter options
const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'in_progress', label: 'Current' },
  { id: 'complete', label: 'Archive' },
]

// Collection moodboard - simplified with 4 key slots per collection
function CollectionMoodboard({
  collection,
  index,
}: {
  collection: Partial<Collection>
  index: number
}) {
  const isReversed = index % 2 === 1
  const baseRotation = isReversed ? 2 : -2
  const clips = ['irregular-1', 'torn-1', 'organic-1', 'torn-2'] as const

  return (
    <div className="relative min-h-[80vh] w-full py-16 overflow-hidden">
      {/* Background title */}
      <span
        className="absolute pointer-events-none select-none"
        style={{
          top: '15%',
          left: isReversed ? 'auto' : '-8%',
          right: isReversed ? '-8%' : 'auto',
          fontSize: 'clamp(8rem, 20vw, 30rem)',
          fontWeight: 100,
          fontFamily: 'var(--font-serif), Georgia, serif',
          opacity: 0.02,
          color: 'var(--yon-black)',
          transform: `rotate(${isReversed ? 3 : -3}deg)`,
        }}
        aria-hidden="true"
      >
        {collection.title}
      </span>

      <div className="relative z-10 px-8 md:px-16 lg:px-24">
        {/* 4 key slots only */}
        <div className="relative" style={{ minHeight: '60vh' }}>
          {/* Slot 1: Primary hero */}
          <Slot
            label={`${collection.title} / 01`}
            size="large"
            position="absolute"
            top="0%"
            left={isReversed ? 'auto' : '0%'}
            right={isReversed ? '0%' : 'auto'}
            rotation={baseRotation}
            clip={clips[index % clips.length]}
            shadow="offset-lg"
            zIndex={20}
            annotationNumber={String(index + 1).padStart(2, '0')}
            frameStyle="film-strip"
            frameNumber={String(index + 1).padStart(2, '0')}
            filmFilter="warm"
          />

          {/* Slot 2: Medium secondary */}
          <Slot
            label="LOOK 02"
            size="medium"
            position="absolute"
            top="25%"
            left={isReversed ? '15%' : 'auto'}
            right={isReversed ? 'auto' : '10%'}
            rotation={-baseRotation * 1.5}
            clip={clips[(index + 1) % clips.length]}
            shadow="float"
            zIndex={18}
            decoration="tape-corner"
            frameStyle="polaroid"
            filmFilter="vintage"
          />

          {/* Slot 3: Small detail */}
          <Slot
            label="DETAIL"
            size="small"
            position="absolute"
            top="55%"
            left={isReversed ? '45%' : '40%'}
            rotation={baseRotation * 2}
            clip="irregular-3"
            zIndex={22}
            decoration="pin"
            frameStyle="slide-mount"
            filmFilter="faded"
          />

          {/* Slot 4: Swatch */}
          <Slot
            label={collection.materials?.[0] || 'FABRIC'}
            size="swatch"
            position="absolute"
            bottom="15%"
            left={isReversed ? '10%' : 'auto'}
            right={isReversed ? 'auto' : '25%'}
            rotation={-8}
            border="rough"
            zIndex={24}
            decoration="tape-top"
            frameStyle="torn"
            filmFilter="faded"
          />

          {/* Collection info */}
          <div
            className="absolute z-30"
            style={{
              bottom: '5%',
              left: isReversed ? 'auto' : '5%',
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
                glitchOffset={4}
                charRotation
                rotationIntensity={2}
                className="mt-3 group-hover:opacity-80 transition-opacity"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  letterSpacing: '-0.02em',
                }}
                as="h2"
              />

              <p
                className="font-sans text-yon-grey/60 mt-3 max-w-xs"
                style={{ fontSize: '0.8rem', lineHeight: 1.6 }}
              >
                {collection.description}
              </p>

              <span
                className="inline-block mt-5 font-mono uppercase tracking-[0.2em] text-yon-grey/40 group-hover:text-yon-black transition-colors border-b border-yon-grey/20 group-hover:border-yon-black pb-1"
                style={{ fontSize: '0.55rem' }}
              >
                View Collection →
              </span>
            </Link>
          </div>

          {/* Status */}
          {collection.status && (
            <div
              className="absolute z-25"
              style={{
                top: '3%',
                left: isReversed ? '5%' : 'auto',
                right: isReversed ? 'auto' : '5%',
              }}
            >
              <span
                className={`font-mono uppercase tracking-[0.15em] ${
                  collection.status === 'in_progress' ? 'text-yon-accent' :
                  collection.status === 'testing' ? 'text-yon-grey/60' : 'text-yon-grey/30'
                }`}
                style={{ fontSize: '0.5rem' }}
              >
                {collection.status === 'in_progress' ? '● Current' : collection.status === 'testing' ? '● Testing' : '○ Archive'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-yon-grey/10 to-transparent" />
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
