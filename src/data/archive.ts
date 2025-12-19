// ASKEW Archive - Philosophy and Research Documentation

export interface Philosophy {
  id: string
  title: string
  content: string
  category: 'MANIFESTO' | 'THOUGHT' | 'PROCESS' | 'REFLECTION'
}

export interface ArchiveEntry {
  id: string
  title: string
  subtitle: string
  type: 'PHILOSOPHY' | 'EXPERIMENT' | 'RESEARCH' | 'PROCESS' | 'STUDY'
  category: 'CREATION' | 'EXPLORATION' | 'TRANSFORMATION' | 'REFLECTION'
  content: string
  thoughts: string[]
  tags: string[]
  significance: number // 1-5
  isPublic: boolean
}

export const philosophies: Philosophy[] = [
  {
    id: 'PHIL_001',
    title: 'THE LABORATORY MANIFESTO',
    content: `Fashion is not commerce. Fashion is experiment. Fashion is the physical manifestation of creative research.

    We don't sell clothes. We create moments of transformation. Each piece is a timestamp of creative evolution, not a product.

    ASKEW is an experimental fashion laboratory. We pursue the limits of fashion through rigorous research and uncompromising methodology.

    The laboratory is where fashion meets art, where fabric meets philosophy, where destruction creates beauty.`,
    category: 'MANIFESTO'
  },
  {
    id: 'PHIL_002',
    title: 'ON DESTRUCTION AS CREATION',
    content: `Every act of creation requires destruction. To make something new, something old must die.

    In the laboratory, we embrace failure as a teacher. Each failed experiment brings us closer to revelation.

    Pattern deconstruction is not about breaking things - it's about finding the beauty in broken things.`,
    category: 'THOUGHT'
  },
  {
    id: 'PHIL_003',
    title: 'TIME AS MATERIAL',
    content: `Time is not linear in fashion. A garment can exist in multiple temporal states simultaneously.

    We design for the future while honoring the destruction of the past. Each collection is a time capsule of NOW.

    Fashion that changes over time, that degrades beautifully, that evolves with wear - this is living fashion.`,
    category: 'PROCESS'
  },
  {
    id: 'PHIL_004',
    title: 'THE VOID PHILOSOPHY',
    content: `Negative space is not empty space. It is potential space. It is the space where imagination lives.

    In fashion, what we don't create is as important as what we do create. The absence defines the presence.

    TWIST • BALANCE • REPEAT - The twist creates tension, the balance creates harmony, the repeat creates rhythm.`,
    category: 'REFLECTION'
  },
  {
    id: 'PHIL_005',
    title: 'BEYOND COMMERCE',
    content: `When fashion becomes pure commerce, it loses its soul.

    We create because we must. Each piece exists as art, as experiment, as statement.

    The work speaks for itself. Not through price, but through understanding.`,
    category: 'MANIFESTO'
  }
]

export const archiveEntries: ArchiveEntry[] = [
  // Research & Process
  {
    id: 'ARCHIVE_001',
    title: 'THE BEGINNING OF CHAOS',
    subtitle: 'Pattern deconstruction series',
    type: 'EXPERIMENT',
    category: 'CREATION',
    content: 'Pattern blocks subjected to creative reinterpretation. Traditional forms questioned, new silhouettes discovered.',
    thoughts: [
      'Patterns want to be broken',
      'Structure is just one possibility',
      'Chaos is unrecognized order'
    ],
    tags: ['PATTERN', 'DECONSTRUCTION', 'STRUCTURE'],
    significance: 5,
    isPublic: true
  },
  {
    id: 'ARCHIVE_002',
    title: 'FAILURE AS TEACHER',
    subtitle: 'Structural exploration',
    type: 'STUDY',
    category: 'EXPLORATION',
    content: 'The garment collapsed under its own conceptual weight. The structure could not support the idea. But in collapse, we found new form.',
    thoughts: [
      'Failure is data',
      'Collapse creates new structures',
      'The garment rejected our vision - it had its own'
    ],
    tags: ['FAILURE', 'STRUCTURE', 'LEARNING'],
    significance: 4,
    isPublic: true
  },
  {
    id: 'ARCHIVE_003',
    title: 'DECONSTRUCTED REALITY',
    subtitle: 'Collection development',
    type: 'RESEARCH',
    category: 'REFLECTION',
    content: 'Reality bent through the lens of deconstruction. Each piece exists between structure and chaos.',
    thoughts: [
      'Fashion is not about selling',
      'It is about creating moments that transcend commerce',
      'This is not just a collection, it is a statement'
    ],
    tags: ['COLLECTION', 'EXPERIMENT', 'PHILOSOPHY'],
    significance: 5,
    isPublic: true
  },
  {
    id: 'ARCHIVE_004',
    title: 'MATERIAL EXPLORATION',
    subtitle: 'Textile research',
    type: 'EXPERIMENT',
    category: 'TRANSFORMATION',
    content: 'Exploring the boundaries of fabric behavior. Understanding how materials respond to manipulation and stress.',
    thoughts: [
      'Materials have memory',
      'Destruction is a form of creation',
      'Every fabric tells a story'
    ],
    tags: ['MATERIAL', 'RESEARCH', 'TRANSFORMATION'],
    significance: 5,
    isPublic: true
  },
  {
    id: 'ARCHIVE_005',
    title: 'UNEXPECTED RESULTS',
    subtitle: 'Learning from mistakes',
    type: 'STUDY',
    category: 'EXPLORATION',
    content: 'Sometimes the best discoveries come from unplanned outcomes. Embracing the unexpected as creative opportunity.',
    thoughts: [
      'Mistakes are discoveries in disguise',
      'Respect the materials',
      'Every failure teaches something new'
    ],
    tags: ['FAILURE', 'DISCOVERY', 'LEARNING'],
    significance: 3,
    isPublic: true
  },
  {
    id: 'ARCHIVE_006',
    title: 'TEMPORAL DISTORTION',
    subtitle: 'Time-based research',
    type: 'RESEARCH',
    category: 'REFLECTION',
    content: 'Exploring how garments exist across time. Past and future collapsed into singular moments of creation.',
    thoughts: [
      'Time is not linear',
      'Fashion exists in multiple dimensions',
      'Every piece is a timestamp'
    ],
    tags: ['TIME', 'PHILOSOPHY', 'RESEARCH'],
    significance: 5,
    isPublic: true
  },
  {
    id: 'ARCHIVE_007',
    title: 'DIMENSIONAL STUDY',
    subtitle: 'Form exploration',
    type: 'EXPERIMENT',
    category: 'CREATION',
    content: 'Investigating how three-dimensional forms wrap and define the human body. Geometry as wearable art.',
    thoughts: [
      'Geometry is wearable',
      'The body defines the form',
      'Breaking dimensional boundaries'
    ],
    tags: ['FORM', 'GEOMETRY', 'BODY'],
    significance: 5,
    isPublic: true
  },
  {
    id: 'ARCHIVE_008',
    title: 'THE LABORATORY',
    subtitle: 'Space of creation',
    type: 'PHILOSOPHY',
    category: 'CREATION',
    content: 'The beginning of pure experimentation. No more commerce. No more compromise. Only creation.',
    thoughts: [
      'This is where it begins',
      'Fashion dies when it becomes product',
      'We choose experiment over profit'
    ],
    tags: ['BEGINNING', 'LABORATORY', 'MANIFESTO'],
    significance: 5,
    isPublic: true
  },
  {
    id: 'ARCHIVE_009',
    title: 'ITERATION STUDY',
    subtitle: 'Process documentation',
    type: 'PROCESS',
    category: 'EXPLORATION',
    content: 'Multiple iterations of the same concept. Each version teaches something new about the original idea.',
    thoughts: [
      'Success and failure are perspectives',
      'Iteration reveals truth',
      'We must design for evolution'
    ],
    tags: ['ITERATION', 'PROCESS', 'EVOLUTION'],
    significance: 4,
    isPublic: true
  },
  {
    id: 'ARCHIVE_010',
    title: 'RECOGNITION',
    subtitle: 'Exhibition documentation',
    type: 'PHILOSOPHY',
    category: 'REFLECTION',
    content: 'Pure fashion experiment on display. The audience was confused, then amazed.',
    thoughts: [
      'Confusion precedes understanding',
      'Experimental work is often misunderstood initially',
      'We are not here to be understood, we are here to create'
    ],
    tags: ['EXHIBITION', 'UNDERSTANDING', 'CREATION'],
    significance: 5,
    isPublic: true
  }
]

// Archive Helper Functions
export function getPhilosophyById(id: string): Philosophy | undefined {
  return philosophies.find(p => p.id === id)
}

export function getArchiveEntryById(id: string): ArchiveEntry | undefined {
  return archiveEntries.find(e => e.id === id)
}

export function getEntriesByType(type: ArchiveEntry['type']): ArchiveEntry[] {
  return archiveEntries.filter(e => e.type === type)
}

export function getPublicEntries(): ArchiveEntry[] {
  return archiveEntries.filter(e => e.isPublic)
}

export function getSignificantEntries(minSignificance: number = 4): ArchiveEntry[] {
  return archiveEntries.filter(e => e.significance >= minSignificance)
}
