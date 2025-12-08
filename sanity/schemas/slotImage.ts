import { defineType, defineField } from 'sanity'

// Page options for slot organization
const PAGE_OPTIONS = [
  { title: '🏠 Home', value: 'home' },
  { title: '👤 About', value: 'about' },
  { title: '📚 Collections', value: 'collections' },
  { title: '📦 Archive', value: 'archive' },
  { title: '⚙️ Process', value: 'process' },
  { title: '✉️ Contact', value: 'contact' },
  { title: '🔬 Lab', value: 'lab' },
  // Dynamic collection pages
  { title: '📄 Collection: Deconstruction', value: 'collection-deconstruction' },
  { title: '📄 Collection: Fragments', value: 'collection-fragments' },
  { title: '📄 Collection: Void', value: 'collection-void' },
  { title: '📄 Collection: Origin', value: 'collection-origin' },
]

// Section options grouped by page
const SECTION_OPTIONS = [
  // Home sections
  { title: '🏠 Hero', value: 'hero' },
  { title: '🏠 Philosophy', value: 'philosophy' },
  { title: '🏠 Collections Preview', value: 'collections-preview' },
  { title: '🏠 Process Teaser', value: 'process-teaser' },
  { title: '🏠 Contact CTA', value: 'contact-cta' },
  // About sections
  { title: '👤 Portrait', value: 'portrait' },
  { title: '👤 Statement', value: 'statement' },
  { title: '👤 Background', value: 'background' },
  { title: '👤 Work Process', value: 'work-process' },
  // Collections sections
  { title: '📚 Header', value: 'header' },
  { title: '📚 Moodboard', value: 'moodboard' },
  { title: '📚 Gallery', value: 'gallery' },
  // Archive sections
  { title: '📦 Main', value: 'main' },
  { title: '📦 Failures', value: 'failures' },
  // Process sections
  { title: '⚙️ Research', value: 'research' },
  { title: '⚙️ Concept', value: 'concept' },
  { title: '⚙️ Sketch', value: 'sketch' },
  { title: '⚙️ Material', value: 'material' },
  { title: '⚙️ Toile', value: 'toile' },
  { title: '⚙️ Failure', value: 'failure' },
  { title: '⚙️ Refine', value: 'refine' },
  { title: '⚙️ Final', value: 'final' },
  // Contact sections
  { title: '✉️ Form', value: 'form' },
  { title: '✉️ Location', value: 'location' },
  { title: '✉️ Social', value: 'social' },
  // Lab sections
  { title: '🔬 Experiments', value: 'experiments' },
]

export default defineType({
  name: 'slotImage',
  title: 'Slot Images',
  type: 'document',
  icon: () => '🖼️',
  groups: [
    { name: 'location', title: 'Location', icon: () => '📍', default: true },
    { name: 'content', title: 'Content', icon: () => '🖼️' },
    { name: 'settings', title: 'Settings', icon: () => '⚙️' },
  ],
  fields: [
    // Location Group
    defineField({
      name: 'slotId',
      title: 'Slot ID',
      type: 'string',
      group: 'location',
      description: 'Format: page-section-number (e.g., home-hero-001). Check SLOT-IDS.md for reference.',
      validation: (Rule) =>
        Rule.required()
          .regex(/^[a-z]+-[a-z-]+-\d{3}$/, {
            name: 'slotId format',
            invert: false,
          })
          .error('Format: page-section-number (e.g., home-hero-001)'),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      group: 'location',
      options: {
        list: PAGE_OPTIONS,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      group: 'location',
      options: {
        list: SECTION_OPTIONS,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Slot Description',
      type: 'string',
      group: 'location',
      description: 'Describe where this slot appears on the page (helps other editors)',
    }),

    // Content Group
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'content',
      description: 'Upload or drag an image. Use hotspot to set focus point for cropping.',
      options: {
        hotspot: true,
        accept: 'image/*',
        storeOriginalFilename: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility (screen readers)',
        }),
      ],
      validation: (Rule) => Rule.required().error('Image is required'),
    }),
    defineField({
      name: 'label',
      title: 'Label Override',
      type: 'string',
      group: 'content',
      description: 'Custom text to display on the slot (leave empty to use default)',
    }),

    // Settings Group
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      group: 'settings',
      description: 'Turn off to hide this slot on the website (image stays saved)',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'settings',
      description: 'Controls order within section (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'slotId',
      subtitle: 'description',
      media: 'image',
      page: 'page',
      section: 'section',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, media, page, section, isActive } = selection
      const statusIcon = isActive === false ? '🔴 ' : '🟢 '
      return {
        title: `${statusIcon}${title || 'New Slot'}`,
        subtitle: subtitle || `${page || '?'} → ${section || '?'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Page → Section → Order',
      name: 'pageSectionOrder',
      by: [
        { field: 'page', direction: 'asc' },
        { field: 'section', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Slot ID (A-Z)',
      name: 'slotIdAsc',
      by: [{ field: 'slotId', direction: 'asc' }],
    },
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
  ],
})
