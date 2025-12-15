'use client'

import { Slot } from '@/components/deconstructivist'

// Simplified process stages - 2 slots each
const processStages = [
  { id: '01', title: 'RESEARCH', description: 'Gathering inspiration from archives, street, culture' },
  { id: '02', title: 'CONCEPT', description: 'Distilling ideas into core vision' },
  { id: '03', title: 'SKETCH', description: 'Quick studies, silhouettes, explorations' },
  { id: '04', title: 'MATERIAL', description: 'Fabric tests, texture studies, color development' },
  { id: '05', title: 'TOILE', description: '3D development through muslin iterations' },
  { id: '06', title: 'FAILURE', description: 'Documented failures — essential to progress' },
  { id: '07', title: 'REFINE', description: 'Seam studies, proportions, finishing details' },
  { id: '08', title: 'FINAL', description: 'Completed looks ready for presentation' },
]

// Simplified stage component - 2 slots per stage
function ProcessStage({
  stage,
  index,
}: {
  stage: (typeof processStages)[0]
  index: number
}) {
  const isReversed = index % 2 === 1
  const isFailure = stage.id === '06'
  const rotations = [-2, 3, -1.5, 2.5, -2.5, 1.5, -3, 2]
  const clips = ['irregular-1', 'torn-1', 'organic-1', 'torn-2'] as const

  return (
    <section
      className={`relative min-h-[70vh] w-full py-16 overflow-hidden ${
        isFailure ? 'bg-yon-ivory/30' : index % 2 === 0 ? 'texture-grain' : 'texture-paper'
      }`}
    >
      {/* Background number */}
      <span
        className="absolute pointer-events-none select-none"
        style={{
          top: '20%',
          left: isReversed ? 'auto' : '-3%',
          right: isReversed ? '-3%' : 'auto',
          fontSize: 'clamp(10rem, 25vw, 35rem)',
          fontWeight: 100,
          fontFamily: 'var(--font-mono), monospace',
          opacity: 0.015,
          color: isFailure ? 'var(--yon-accent)' : 'var(--yon-black)',
        }}
        aria-hidden="true"
      >
        {stage.id}
      </span>

      <div className="relative z-10 px-8 md:px-16 lg:px-24">
        {/* Stage header */}
        <div style={{ transform: `rotate(${isReversed ? 0.3 : -0.3}deg)` }}>
          <span
            className={`font-mono tracking-[0.2em] ${isFailure ? 'text-yon-accent' : 'text-yon-grey/40'}`}
            style={{ fontSize: '0.55rem' }}
          >
            {stage.id}
          </span>

          <h2
            className={`font-serif mt-3 ${isFailure ? 'text-yon-accent' : 'text-yon-black'}`}
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
          >
            {stage.title}
          </h2>

          <p
            className="font-sans text-yon-grey/50 mt-4 max-w-sm"
            style={{ fontSize: '0.8rem', lineHeight: 1.6 }}
          >
            {stage.description}
          </p>
        </div>

        {/* 2 slots per stage */}
        <div className="relative mt-12" style={{ minHeight: '40vh' }}>
          {/* Main slot */}
          <Slot
            label={stage.title}
            size="medium"
            position="absolute"
            top="0"
            left={isReversed ? 'auto' : '5%'}
            right={isReversed ? '5%' : 'auto'}
            rotation={rotations[index % rotations.length]}
            clip={clips[index % clips.length]}
            shadow="offset"
            zIndex={15}
            grayscale={isFailure}
            annotationNumber={stage.id}
            frameStyle={(['sketchbook', 'contact-sheet', 'crumpled', 'vintage', 'torn', 'film-strip', 'polaroid', 'slide-mount'] as const)[index % 8]}
            frameNumber={stage.id}
            filmFilter={isFailure ? 'faded' : 'vintage'}
          />

          {/* Secondary slot */}
          <Slot
            label="DETAIL"
            size="small"
            position="absolute"
            top="35%"
            left={isReversed ? '20%' : 'auto'}
            right={isReversed ? 'auto' : '15%'}
            rotation={-rotations[index % rotations.length] * 1.5}
            clip={clips[(index + 1) % clips.length]}
            shadow="float"
            zIndex={18}
            decoration={index % 2 === 0 ? 'tape-corner' : 'pin'}
            frameStyle={(['polaroid', 'torn', 'slide-mount', 'vintage', 'sketchbook', 'crumpled', 'contact-sheet', 'film-strip'] as const)[index % 8]}
            filmFilter="warm"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-yon-grey/5" />
    </section>
  )
}

export default function ProcessStages() {
  return (
    <>
      {/* Stage navigation */}
      <div className="relative z-20 px-8 md:px-16 lg:px-24 py-10 border-b border-yon-grey/10">
        <div className="flex flex-wrap gap-3">
          {processStages.map((stage, index) => (
            <a
              key={stage.id}
              href={`#stage-${stage.id}`}
              className="group font-mono uppercase tracking-[0.12em] text-yon-grey/40 hover:text-yon-black transition-colors"
              style={{
                fontSize: '0.5rem',
                transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)`,
              }}
            >
              <span className="text-yon-accent/50 group-hover:text-yon-accent mr-1">
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
          <ProcessStage stage={stage} index={index} />
        </div>
      ))}
    </>
  )
}
