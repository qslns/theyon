'use client'

import { Slot } from '@/components/deconstructivist'

// Lab experiments data
const experiments = [
  { id: 'EXP-001', title: 'Material Splice', status: 'active', description: 'Contrasting fabric fusion techniques', date: '2024.11' },
  { id: 'EXP-002', title: 'Zero Waste Pattern', status: 'testing', description: 'Pattern cutting with no fabric waste', date: '2024.10' },
  { id: 'EXP-003', title: 'Modular System', status: 'paused', description: 'Interchangeable garment components', date: '2024.09' },
  { id: 'EXP-004', title: 'Surface Treatment', status: 'complete', description: 'Post-production fabric manipulation', date: '2024.08' },
  { id: 'EXP-005', title: 'Volume Study', status: 'active', description: '3D form through flat construction', date: '2024.11' },
]

// Simplified experiment card - 2 slots per experiment
function ExperimentCard({
  experiment,
  index,
}: {
  experiment: (typeof experiments)[0]
  index: number
}) {
  const isReversed = index % 2 === 1
  const rotations = [-2, 1.5, -1, 2, -1.5]
  const clips = ['irregular-1', 'torn-1', 'irregular-3', 'torn-2', 'organic-1'] as const

  const statusColors = {
    active: 'text-yon-accent',
    testing: 'text-yon-grey/60',
    paused: 'text-yon-grey/40',
    complete: 'text-yon-black/40',
  }

  return (
    <div
      className="relative py-12 border-b border-yon-grey/10"
      style={{ transform: `rotate(${rotations[index % rotations.length] * 0.2}deg)` }}
    >
      <div className={`flex flex-col md:flex-row gap-6 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
        {/* 2 slots per experiment */}
        <div className="w-full md:w-1/2 relative" style={{ minHeight: '220px' }}>
          {/* Main slot */}
          <Slot
            label={experiment.title}
            size="medium"
            position="absolute"
            top="0"
            left={isReversed ? 'auto' : '0'}
            right={isReversed ? '0' : 'auto'}
            rotation={rotations[index % rotations.length]}
            clip={clips[index % clips.length]}
            shadow="offset"
            grayscale={experiment.status === 'paused'}
            zIndex={15}
            annotationNumber={experiment.id.replace('EXP-', '')}
            frameStyle={(['contact-sheet', 'sketchbook', 'crumpled', 'vintage', 'torn'] as const)[index % 5]}
            frameNumber={experiment.id.replace('EXP-', '')}
            filmFilter={experiment.status === 'paused' ? 'faded' : experiment.status === 'active' ? 'warm' : 'vintage'}
          />

          {/* Detail slot */}
          <Slot
            label="DETAIL"
            size="small"
            position="absolute"
            top="40%"
            left={isReversed ? '15%' : '45%'}
            rotation={-rotations[index % rotations.length] * 1.5}
            clip={clips[(index + 1) % clips.length]}
            zIndex={18}
            decoration={index % 2 === 0 ? 'tape-corner' : 'pin'}
            frameStyle={(['polaroid', 'slide-mount', 'torn', 'film-strip', 'vintage'] as const)[index % 5]}
            filmFilter="cool"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-2">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-yon-grey/30" style={{ fontSize: '0.5rem', letterSpacing: '0.15em' }}>
              {experiment.id}
            </span>
            <span
              className={`font-mono uppercase tracking-[0.12em] ${statusColors[experiment.status as keyof typeof statusColors]}`}
              style={{ fontSize: '0.45rem' }}
            >
              {experiment.status}
            </span>
          </div>

          <h3 className="font-serif text-yon-black mt-2" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}>
            {experiment.title}
          </h3>

          <p className="font-sans text-yon-grey/50 mt-2 max-w-sm" style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
            {experiment.description}
          </p>

          <span className="font-mono text-yon-grey/30 mt-3" style={{ fontSize: '0.5rem', letterSpacing: '0.1em' }}>
            {experiment.date}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function LabExperiments() {
  return (
    <section className="relative py-16 px-8 md:px-16 lg:px-24 texture-paper">
      {/* Background */}
      <span
        className="absolute pointer-events-none select-none"
        style={{
          top: '5%',
          right: '-8%',
          fontSize: 'clamp(10rem, 22vw, 30rem)',
          fontWeight: 100,
          fontFamily: 'var(--font-mono), monospace',
          opacity: 0.012,
          color: 'var(--yon-black)',
          transform: 'rotate(4deg)',
        }}
        aria-hidden="true"
      >
        01—05
      </span>

      <div className="max-w-5xl mx-auto">
        {experiments.map((experiment, index) => (
          <ExperimentCard key={experiment.id} experiment={experiment} index={index} />
        ))}
      </div>
    </section>
  )
}
