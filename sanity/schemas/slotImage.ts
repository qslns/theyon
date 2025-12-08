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
  // Background (all pages) - full screen ambient image
  { title: '🖼️ Background (Full Screen)', value: 'background' },
  // Common sections
  { title: '🎯 Hero', value: 'hero' },
  { title: '🔗 CTA', value: 'cta' },
  // Home sections
  { title: '🏠 Philosophy', value: 'philosophy' },
  { title: '🏠 Collections Preview', value: 'collections-preview' },
  { title: '🏠 Process Teaser', value: 'process-teaser' },
  { title: '🏠 Contact CTA', value: 'contact-cta' },
  // About sections
  { title: '👤 Portrait', value: 'portrait' },
  { title: '👤 Education', value: 'education' },
  { title: '👤 Process', value: 'process' },
  { title: '👤 Contact', value: 'contact' },
  // Collections sections
  { title: '📚 Header', value: 'header' },
  { title: '📚 Moodboard', value: 'moodboard' },
  { title: '📚 Gallery', value: 'gallery' },
  { title: '📚 Archive', value: 'archive' },
  // Archive sections
  { title: '📦 Main', value: 'main' },
  // Lab sections
  { title: '🔬 Failures', value: 'failures' },
  { title: '🔬 Method', value: 'method' },
  // Contact sections
  { title: '✉️ Location', value: 'location' },
  { title: '✉️ Social', value: 'social' },
]

// Slot size options with recommended dimensions
const SLOT_SIZE_OPTIONS = [
  { title: '🖥️ Background (1920x1080)', value: 'background' },
  { title: '🦸 Hero (800x600)', value: 'hero' },
  { title: '📐 Large (600x400)', value: 'large' },
  { title: '📏 Medium (400x300)', value: 'medium' },
  { title: '📎 Small (300x200)', value: 'small' },
  { title: '🔲 Tiny (200x150)', value: 'tiny' },
  { title: '🎨 Swatch (150x150)', value: 'swatch' },
  { title: '⚬ Micro (100x100)', value: 'micro' },
]

export default defineType({
  name: 'slotImage',
  title: 'Slot Images',
  type: 'document',
  icon: () => '🖼️',
  groups: [
    { name: 'location', title: '📍 Location', icon: () => '📍', default: true },
    { name: 'content', title: '🖼️ Content', icon: () => '🖼️' },
    { name: 'settings', title: '⚙️ Settings', icon: () => '⚙️' },
  ],
  fields: [
    // Location Group
    defineField({
      name: 'slotId',
      title: 'Slot ID',
      type: 'string',
      group: 'location',
      description: 'Unique ID: page-section-number (e.g., home-hero-001). See SLOT-IDS.md for full list.',
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
      description: 'Which page does this slot appear on?',
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
      description: 'Which section of the page?',
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
      description: 'Brief description of where this image appears (helps other editors)',
      placeholder: 'e.g., "Main hero image, top-left corner"',
    }),

    // Content Group
    defineField({
      name: 'slotSize',
      title: 'Slot Size (Recommended)',
      type: 'string',
      group: 'content',
      description: 'Recommended image dimensions for this slot. Upload at least this resolution for best quality.',
      options: {
        list: SLOT_SIZE_OPTIONS,
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'content',
      description: 'Drag and drop or click to upload. Use hotspot (click focal point) to control cropping.',
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
          description: 'Describe the image for accessibility (screen readers) - IMPORTANT for SEO',
        }),
      ],
      validation: (Rule) => Rule.required().error('Image is required'),
    }),
    defineField({
      name: 'label',
      title: 'Label Override',
      type: 'string',
      group: 'content',
      description: 'Custom text displayed on the slot. Leave empty to use default label.',
      placeholder: 'e.g., "HERO" or "DETAIL"',
    }),

    // Settings Group
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      group: 'settings',
      description: 'Turn OFF to temporarily hide this slot on the website. The image stays saved for later use.',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'settings',
      description: 'Controls order within section. Lower numbers = appears first. (0, 1, 2, ...)',
      initialValue: 0,
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      group: 'settings',
      description: 'Private notes for editors (not shown on website)',
      rows: 2,
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
      slotSize: 'slotSize',
    },
    prepare(selection) {
      const { title, subtitle, media, page, section, isActive, slotSize } = selection
      const statusIcon = isActive === false ? '🔴 ' : '🟢 '
      const sizeHint = slotSize ? ` [${slotSize}]` : ''
      return {
        title: `${statusIcon}${title || 'New Slot'}${sizeHint}`,
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
    {
      title: 'Active First',
      name: 'activeFirst',
      by: [
        { field: 'isActive', direction: 'desc' },
        { field: 'page', direction: 'asc' },
      ],
    },
  ],
})
