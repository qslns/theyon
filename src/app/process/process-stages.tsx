'use client'

import { Slot } from '@/components/deconstructivist'

// Process stages data
const processStages = [
  {
    id: '01',
    title: 'RESEARCH',
    description: 'Gathering inspiration from archives, street, culture',
    items: [
      { label: 'Mood Board', id: 'RES-001' },
      { label: 'Reference', id: 'RES-002' },
      { label: 'Archive', id: 'RES-003' },
      { label: 'Street', id: 'RES-004' },
    ],
  },
  {
    id: '02',
    title: 'CONCEPT',
    description: 'Distilling ideas into core vision',
    items: [
      { label: 'Manifesto', id: 'CON-001' },
      { label: 'Mind Map', id: 'CON-002' },
      { label: 'Keywords', id: 'CON-003' },
    ],
  },
  {
    id: '03',
    title: 'SKETCH',
    description: 'Quick studies, silhouettes, explorations',
    items: [
      { label: 'Quick Study', id: 'SKE-001' },
      { label: 'Silhouette', id: 'SKE-002' },
      { label: 'Detail', id: 'SKE-003' },
      { label: 'Technical', id: 'SKE-004' },
      { label: 'Iteration', id: 'SKE-005' },
    ],
  },
  {
    id: '04',
    title: 'MATERIAL',
    description: 'Fabric tests, texture studies, color development',
    items: [
      { label: 'Fabric Test', id: 'MAT-001' },
      { label: 'Color Study', id: 'MAT-002' },
      { label: 'Texture', id: 'MAT-003' },
      { label: 'Drape Test', id: 'MAT-004' },
    ],
  },
  {
    id: '05',
    title: 'TOILE',
    description: '3D development through muslin iterations',
    items: [
      { label: 'First Toile', id: 'TOI-001' },
      { label: 'Iteration 2', id: 'TOI-002' },
      { label: 'Iteration 3', id: 'TOI-003' },
      { label: 'Final Toile', id: 'TOI-004' },
    ],
  },
  {
    id: '06',
    title: 'FAILURE',
    description: 'Documented failures — essential to progress',
    items: [
      { label: 'Rejected', id: 'FAI-001' },
      { label: 'Failed Toile', id: 'FAI-002' },
      { label: 'Wrong Path', id: 'FAI-003' },
    ],
  },
  {
    id: '07',
    title: 'REFINE',
    description: 'Seam studies, proportions, finishing details',
    items: [
      { label: 'Seam Study', id: 'REF-001' },
      { label: 'Proportion', id: 'REF-002' },
      { label: 'Finishing', id: 'REF-003' },
    ],
  },
  {
    id: '08',
    title: 'FINAL',
    description: 'Completed looks ready for presentation',
    items: [
      { label: 'Look 01', id: 'FIN-001' },
      { label: 'Look 02', id: 'FIN-002' },
      { label: 'Detail', id: 'FIN-003' },
    ],
  },
]

// Sketchbook page component - scattered layout
// Note: These slots use hardcoded labels since they're generated dynamically per stage
function SketchbookPage({
  stage,
  index,
}: {
  stage: (typeof processStages)[0]
  index: number
}) {
  const isReversed = index % 2 === 1
  const isFailure = stage.id === '06'

  // Different slot configurations per stage
  const getSlotConfig = (itemIndex: number) => {
    const configs = [
      // First item - large
      {
        size: 'medium' as const,
        rotation: isReversed ? 3 : -2,
        clip: 'irregular-1' as const,
        shadow: 'offset' as const,
        position: { top: '5%', left: isReversed ? 'auto' : '8%', right: isReversed ? '8%' : 'auto' },
      },
      // Second item
      {
        size: 'small' as const,
        rotation: isReversed ? -4 : 5,
        clip: 'torn-1' as const,
        shadow: 'float' as const,
        position: { top: '35%', left: isReversed ? '15%' : 'auto', right: isReversed ? 'auto' : '20%' },
      },
      // Third item - swatch
      {
        size: 'swatch' as const,
        rotation: -8,
        border: 'rough' as const,
        decoration: 'tape-top' as const,
        position: { top: '60%', left: '45%' },
      },
      // Fourth item
      {
        size: 'tiny' as const,
        rotation: 12,
        border: 'thin' as const,
        decoration: 'pin' as const,
        position: { top: '20%', left: isReversed ? '60%' : '55%' },
      },
      // Fifth item
      {
        size: 'small-square' as const,
        rotation: -5,
        clip: 'irregular-4' as const,
        grayscale: true,
        position: { bottom: '15%', left: isReversed ? 'auto' : '25%', right: isReversed ? '30%' : 'auto' },
      },
    ]
    return configs[itemIndex % configs.length]
  }

  return (
    <section
      className={`relative min-h-screen w-full py-20 overflow-hidden ${
        isFailure ? 'bg-yon-ivory/50' : index % 2 === 0 ? 'texture-grain' : 'texture-paper'
      }`}
    >
      {/* Giant background stage number */}
      <span
        className="absolute pointer-events-none select-none"
        style={{
          top: '15%',
          left: isReversed ? 'auto' : '-5%',
          right: isReversed ? '-5%' : 'auto',
          fontSize: 'clamp(15rem, 35vw, 50rem)',
          fontWeight: 100,
          fontFamily: 'var(--font-mono), monospace',
          opacity: 0.02,
          lineHeight: 0.8,
          color: isFailure ? '#8B7355' : '#0A0A0A',
        }}
        aria-hidden="true"
      >
        {stage.id}
      </span>

      {/* Stage title - rotated on side */}
      <div
        className="absolute z-30"
        style={{
          top: '50%',
          left: isReversed ? 'auto' : '2%',
          right: isReversed ? '2%' : 'auto',
          transform: `translateY(-50%) rotate(${isReversed ? 90 : -90}deg)`,
          transformOrigin: 'center',
        }}
      >
        <span
          className="font-mono uppercase tracking-[0.5em] text-yon-grey/20"
          style={{ fontSize: '0.6rem', whiteSpace: 'nowrap' }}
        >
          {stage.title}
        </span>
      </div>

      {/* Content area */}
      <div className="relative z-10 px-12 md:px-20 lg:px-28">
        {/* Stage header */}
        <div
          className="mb-16"
          style={{ transform: `rotate(${isReversed ? 0.5 : -0.5}deg)` }}
        >
          <div className="flex items-baseline gap-4">
            <span
              className={`font-mono tracking-[0.3em] ${isFailure ? 'text-yon-accent' : 'text-yon-grey/40'}`}
              style={{ fontSize: '0.6rem' }}
            >
              {stage.id}
            </span>
            <span className="w-8 h-px bg-yon-grey/20" />
          </div>

          <h2
            className={`font-serif mt-4 ${isFailure ? 'text-yon-accent' : 'text-yon-black'}`}
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
            }}
          >
            {stage.title}
          </h2>

          <p
            className="font-sans text-yon-grey/50 mt-6 max-w-sm"
            style={{
              fontSize: '0.8rem',
              lineHeight: 1.6,
              marginLeft: isReversed ? '0' : '1rem',
            }}
          >
            {stage.description}
          </p>
        </div>

        {/* Scattered slots */}
        <div className="relative" style={{ minHeight: '60vh' }}>
          {stage.items.map((item, itemIndex) => {
            const config = getSlotConfig(itemIndex)
            return (
              <Slot
                key={item.id}
                label={item.label}
                size={config.size}
                position="absolute"
                top={config.position.top}
                left={config.position.left}
                right={config.position.right}
                bottom={(config.position as { bottom?: string }).bottom}
                rotation={config.rotation}
                clip={config.clip}
                shadow={config.shadow}
                border={config.border}
                decoration={config.decoration}
                grayscale={config.grayscale}
                zIndex={10 + itemIndex}
              />
            )
          })}

          {/* Handwritten annotation feel - item ID */}
          <div
            className="absolute"
            style={{
              bottom: '5%',
              right: isReversed ? 'auto' : '10%',
              left: isReversed ? '10%' : 'auto',
              transform: 'rotate(3deg)',
            }}
          >
            <span
              className="font-mono text-yon-grey/25"
              style={{ fontSize: '0.5rem', letterSpacing: '0.2em' }}
            >
              {stage.items.map((item) => item.id).join(' / ')}
            </span>
          </div>
        </div>
      </div>

      {/* Stage divider - torn paper effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}

export default function ProcessStages() {
  return (
    <>
      {/* Stage navigation */}
      <div className="relative z-20 px-8 md:px-16 lg:px-24 py-12 border-b border-yon-grey/10">
        <div className="flex flex-wrap gap-4">
          {processStages.map((stage, index) => (
            <a
              key={stage.id}
              href={`#stage-${stage.id}`}
              className="group font-mono uppercase tracking-[0.15em] text-yon-grey/40 hover:text-yon-black transition-colors"
              style={{
                fontSize: '0.55rem',
                transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
              }}
            >
              <span className="text-yon-accent/60 group-hover:text-yon-accent mr-1">
                {stage.id}
              </span>
              {stage.title}
            </a>
          ))}
        </div>
      </div>

      {/* Process stages */}
      {processStages.map((stage, index) => (
        <div key={stage.id} id={`stage-${stage.id}`}>
          <SketchbookPage stage={stage} index={index} />
        </div>
      ))}
    </>
  )
}
