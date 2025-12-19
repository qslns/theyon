'use client'

import { useState, useMemo, memo } from 'react'
import { Slot } from '@/components/deconstructivist'
import { WhisperText } from '@/components/typography'

// Archive items - research and process documentation
const archiveItems = [
  {
    id: '001',
    title: 'Deconstructed Tailoring',
    category: 'Construction',
    description: 'Traditional pattern blocks, reimagined. Where structure meets chaos.',
    longDescription: 'Exploring the boundary between precision and disorder in classical tailoring. Each seam becomes a decision point—to follow or to break.',
    status: 'current',
    tags: ['Tailoring', 'Deconstruction', 'Structure'],
  },
  {
    id: '002',
    title: 'Raw Edge Studies',
    category: 'Material',
    description: 'Embracing the unfinished. Beauty in the frayed.',
    longDescription: 'What if we celebrated the edges that convention tells us to hide? A meditation on completion and incompleteness.',
    status: 'current',
    tags: ['Raw Edge', 'Texture', 'Unfinished'],
  },
  {
    id: '003',
    title: 'Volume Architecture',
    category: 'Form',
    description: 'The space between body and fabric. Sculptural silhouettes.',
    longDescription: 'Architecture for the human form. Creating three-dimensional space that moves, breathes, and transforms with the wearer.',
    status: 'archived',
    tags: ['Volume', 'Sculpture', 'Silhouette'],
  },
  {
    id: '004',
    title: 'Toile Iterations',
    category: 'Process',
    description: 'Every muslin tells a story. Prototypes as artifacts.',
    longDescription: 'The toile is not just a test—it is a document of exploration. Each iteration preserves a moment of discovery or failure.',
    status: 'archived',
    tags: ['Muslin', 'Prototype', 'Iteration'],
  },
  {
    id: '005',
    title: 'Beautiful Failures',
    category: 'Experiment',
    description: "What didn't work—and why it matters.",
    longDescription: 'A collection of experiments that did not succeed in their original intention, but revealed unexpected truths about material and form.',
    status: 'archived',
    tags: ['Failure', 'Learning', 'Discovery'],
  },
  {
    id: '006',
    title: 'Seam Exposé',
    category: 'Detail',
    description: 'Seams as protagonists. Exposed, celebrated, exaggerated.',
    longDescription: 'Inverting the hierarchy of garment construction. The seam—normally hidden—becomes the main character of the narrative.',
    status: 'archived',
    tags: ['Seams', 'Exposed', 'Detail'],
  },
  {
    id: '007',
    title: 'Concept Sketches',
    category: 'Origin',
    description: 'Where it all begins. Raw ideas on paper.',
    longDescription: 'The first marks of imagination. Before fabric, before form—there is the line. These sketches capture the genesis of ideas.',
    status: 'archived',
    tags: ['Sketch', 'Concept', 'Beginning'],
  },
  {
    id: '008',
    title: 'Texture Studies',
    category: 'Surface',
    description: 'The language of fabric. Close encounters.',
    longDescription: 'Macro explorations of textile surfaces. Understanding material through intimate observation reveals patterns invisible to the casual eye.',
    status: 'archived',
    tags: ['Texture', 'Material', 'Surface'],
  },
]

const categories = ['All', 'Construction', 'Material', 'Form', 'Process', 'Experiment', 'Detail', 'Origin', 'Surface']

// Simplified archive card with single slot
const ArchiveCard = memo(function ArchiveCard({ item, index }: { item: typeof archiveItems[0]; index: number }) {
  const rotations = [-2, 1.5, -1.5, 2, -1, 2.5, -2, 1]
  const clips = ['irregular-1', 'torn-1', 'organic-1', 'torn-2'] as const

  return (
    <div
      className="relative animate-fade-in-up"
      style={{
        transform: `rotate(${rotations[index % rotations.length] * 0.2}deg)`,
        animationDelay: `${index * 40}ms`
      }}
    >
      {/* Single slot per card */}
      <div className="relative" style={{ minHeight: '220px' }}>
        <Slot
          label={item.title}
          size={index % 2 === 0 ? 'medium' : 'small'}
          rotation={rotations[index % rotations.length]}
          clip={clips[index % clips.length]}
          shadow="offset"
          zIndex={10}
          grayscale={item.status === 'archived'}
          annotationNumber={item.id}
          frameStyle={(['contact-sheet', 'sketchbook', 'crumpled', 'vintage', 'torn', 'polaroid', 'slide-mount', 'film-strip'] as const)[index % 8]}
          filmFilter={item.status === 'archived' ? 'faded' : 'vintage'}
        />
      </div>

      {/* Info */}
      <div className="mt-3 px-1">
        <div className="flex items-center gap-2">
          <span
            className={`font-mono uppercase tracking-[0.15em] ${item.status === 'current' ? 'text-yon-accent' : 'text-yon-grey/40'}`}
            style={{ fontSize: '0.5rem' }}
          >
            {item.status === 'current' ? '● Current' : '○ Archived'}
          </span>
        </div>

        <h3 className="font-serif text-yon-black mt-2" style={{ fontSize: '1rem' }}>
          {item.title}
        </h3>

        <p
          className="font-sans text-yon-grey/50 mt-1"
          style={{ fontSize: '0.7rem', lineHeight: 1.5 }}
        >
          {item.description}
        </p>
      </div>
    </div>
  )
})

export default function ArchiveClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Filter items
  const filteredItems = useMemo(() => {
    return archiveItems.filter(item => {
      const matchesSearch = searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <>
      {/* Filter controls */}
      <div className="relative z-35 px-8 md:px-16 lg:px-24 py-12 border-b border-yon-grey/10">
        <div className="flex flex-wrap items-center gap-6">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 font-mono text-yon-black bg-transparent border-b border-yon-grey/20 focus:border-yon-black focus:outline-none transition-colors placeholder:text-yon-grey/40"
              style={{ fontSize: '0.75rem' }}
            />
          </div>

          <span className="text-yon-grey/20">|</span>

          {/* Category filter */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.slice(0, 5).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono uppercase tracking-[0.15em] transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'text-yon-black border-b border-yon-black'
                    : 'text-yon-grey/40 hover:text-yon-grey/70'
                }`}
                style={{ fontSize: '0.55rem', paddingBottom: '2px' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <span
            className="ml-auto font-mono text-yon-grey/30"
            style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}
          >
            {filteredItems.length} Items
          </span>
        </div>
      </div>

      {/* ============================================
          ARCHIVE GRID - Dense Scattered Layout
          ============================================ */}
      <section className="relative py-20 px-8 md:px-16 lg:px-24 texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-10%',
            fontSize: 'clamp(10rem, 25vw, 38rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            color: '#0A0A0A',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          01—08
        </span>

        <div
          key={`${selectedCategory}-${searchQuery}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 animate-fade-in"
        >
          {filteredItems.map((item, index) => (
            <ArchiveCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="py-24 text-center animate-fade-in">
            <span className="font-mono text-yon-grey/50" style={{ fontSize: '0.75rem' }}>
              No results found
            </span>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="block mx-auto mt-6 font-mono uppercase tracking-[0.15em] text-yon-black hover:text-yon-accent transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
              style={{ fontSize: '0.6rem' }}
            >
              Reset Filters →
            </button>
          </div>
        )}
      </section>
    </>
  )
}
