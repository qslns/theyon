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
  // ★ PAGE BACKGROUND (all pages) - 가장 뒤쪽 배경 이미지
  { title: '🖼️ PAGE BACKGROUND (모든 페이지)', value: 'background' },

  // Home sections
  { title: '🏠 Home: Hero', value: 'hero' },
  { title: '🏠 Home: Philosophy', value: 'philosophy' },
  { title: '🏠 Home: Collections Preview', value: 'collections' },
  { title: '🏠 Home: Process Teaser', value: 'process' },
  { title: '🏠 Home: Contact CTA', value: 'contact' },

  // About sections
  { title: '👤 About: Portrait', value: 'portrait' },
  { title: '👤 About: Statement', value: 'statement' },
  { title: '👤 About: Timeline', value: 'timeline' },
  { title: '👤 About: CTA', value: 'cta' },

  // Collections sections
  { title: '📚 Collections: Header', value: 'header' },
  { title: '📚 Collections: Moodboard', value: 'moodboard' },
  { title: '📚 Collections: Gallery', value: 'gallery' },

  // Archive sections
  { title: '📦 Archive: Header', value: 'header' },
  { title: '📦 Archive: CTA', value: 'cta' },

  // Process sections
  { title: '⚙️ Process: Hero', value: 'hero' },
  { title: '⚙️ Process: CTA', value: 'cta' },

  // Contact sections
  { title: '✉️ Contact: Hero', value: 'hero' },
  { title: '✉️ Contact: Location', value: 'location' },
  { title: '✉️ Contact: Social', value: 'social' },

  // Lab sections
  { title: '🔬 Lab: Hero', value: 'hero' },
  { title: '🔬 Lab: Experiments', value: 'experiments' },
  { title: '🔬 Lab: CTA', value: 'cta' },
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
      description: `슬롯 ID 형식: page-section-number (예: home-hero-001)

📌 배경 슬롯 ID (각 페이지당 1개):
• home-background-001 - 홈페이지 배경
• about-background-001 - About 페이지 배경
• collections-background-001 - Collections 페이지 배경
• archive-background-001 - Archive 페이지 배경
• process-background-001 - Process 페이지 배경
• contact-background-001 - Contact 페이지 배경
• lab-background-001 - Lab 페이지 배경

🌐 웹사이트에서 ?debug=slots 파라미터로 모든 슬롯 위치 확인 가능`,
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
