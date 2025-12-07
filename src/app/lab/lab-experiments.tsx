'use client'

import { Slot, AnnotationLabel } from '@/components/deconstructivist'

// Lab experiments data
const experiments = [
  {
    id: 'EXP-001',
    title: 'Material Splice',
    status: 'active',
    description: 'Contrasting fabric fusion techniques',
    date: '2024.11',
  },
  {
    id: 'EXP-002',
    title: 'Zero Waste Pattern',
    status: 'testing',
    description: 'Pattern cutting with no fabric waste',
    date: '2024.10',
  },
  {
    id: 'EXP-003',
    title: 'Modular System',
    status: 'paused',
    description: 'Interchangeable garment components',
    date: '2024.09',
  },
  {
    id: 'EXP-004',
    title: 'Surface Treatment',
    status: 'complete',
    description: 'Post-production fabric manipulation',
    date: '2024.08',
  },
  {
    id: 'EXP-005',
    title: 'Volume Study',
    status: 'active',
    description: '3D form through flat construction',
    date: '2024.11',
  },
]

// Experiment card with dense slot cluster
// Note: These slots use hardcoded labels since they're generated dynamically per experiment
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
  const decorations = ['tape-top', 'pin', 'staple', 'corner-fold', 'tape-corner'] as const

  const statusColors = {
    active: 'text-yon-accent',
    testing: 'text-yon-grey/60',
    paused: 'text-yon-grey/40',
    complete: 'text-yon-black/40',
  }

  return (
    <div
      className="relative py-16 border-b border-yon-grey/10"
      style={{ transform: `rotate(${rotations[index % rotations.length] * 0.3}deg)` }}
    >
      <div className={`flex flex-col md:flex-row gap-8 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
        {/* Dense slot cluster - 4 slots per experiment */}
        <div className="w-full md:w-1/2 relative" style={{ minHeight: '300px' }}>
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
            shadow={index % 2 === 0 ? 'offset' : 'float'}
            grayscale={experiment.status === 'paused'}
            zIndex={15}
            annotationNumber={experiment.id.replace('EXP-', '')}
          />

          {/* Detail slot - overlapping */}
          <Slot
            label="DETAIL"
            size="small"
            position="absolute"
            top="30%"
            left={isReversed ? '10%' : '40%'}
            rotation={-rotations[index % rotations.length] * 2}
            clip={clips[(index + 2) % clips.length]}
            zIndex={20}
            decoration={decorations[index % decorations.length]}
            overlapX={50}
          />

          {/* Swatch */}
          <Slot
            label="SAMPLE"
            size="swatch"
            position="absolute"
            bottom="10%"
            left={isReversed ? '5%' : '25%'}
            rotation={rotations[(index + 1) % rotations.length] * 3}
            border="rough"
            zIndex={18}
            decoration="tape-top"
          />

          {/* Micro accent */}
          <Slot
            label={String(index + 1).padStart(2, '0')}
            size="micro"
            position="absolute"
            top="60%"
            left={isReversed ? '40%' : '60%'}
            rotation={12}
            border="thin"
            zIndex={22}
            decoration="pin-red"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4">
          <div className="flex items-baseline gap-4">
            <span
              className="font-mono text-yon-grey/30"
              style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}
            >
              {experiment.id}
            </span>
            <span
              className={`font-mono uppercase tracking-[0.15em] ${statusColors[experiment.status as keyof typeof statusColors]}`}
              style={{ fontSize: '0.5rem' }}
            >
              {experiment.status}
            </span>
          </div>

          <h3
            className="font-serif text-yon-black mt-3"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              transform: `rotate(${rotations[index % rotations.length] * 0.2}deg)`
            }}
          >
            {experiment.title}
          </h3>

          <p
            className="font-sans text-yon-grey/50 mt-3 max-w-sm"
            style={{ fontSize: '0.85rem', lineHeight: 1.7 }}
          >
            {experiment.description}
          </p>

          <span
            className="font-mono text-yon-grey/30 mt-4"
            style={{ fontSize: '0.55rem', letterSpacing: '0.15em' }}
          >
            {experiment.date}
          </span>
        </div>
      </div>

      {/* Annotation per experiment */}
      {index % 2 === 0 && (
        <AnnotationLabel
          text={experiment.status === 'active' ? 'in progress' : experiment.status}
          position={{
            top: '20%',
            right: isReversed ? '60%' : '10%'
          }}
          rotation={rotations[(index + 2) % rotations.length]}
          variant={experiment.status === 'active' ? 'stamp' : 'handwritten'}
        />
      )}
    </div>
  )
}

export default function LabExperiments() {
  return (
    <section className="relative py-20 px-8 md:px-16 lg:px-24 texture-paper">
      {/* Background */}
      <span
        className="absolute pointer-events-none select-none"
        style={{
          top: '5%',
          right: '-10%',
          fontSize: 'clamp(12rem, 28vw, 40rem)',
          fontWeight: 100,
          fontFamily: 'var(--font-mono), monospace',
          opacity: 0.015,
          color: '#0A0A0A',
          transform: 'rotate(5deg)',
        }}
        aria-hidden="true"
      >
        01—05
      </span>

      <div className="max-w-6xl mx-auto">
        {experiments.map((experiment, index) => (
          <ExperimentCard key={experiment.id} experiment={experiment} index={index} />
        ))}
      </div>
    </section>
  )
}
