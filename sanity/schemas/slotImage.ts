import { defineType, defineField } from 'sanity'

// Page options for slot organization
const PAGE_OPTIONS = [
  { title: 'Home', value: 'home' },
  { title: 'About', value: 'about' },
  { title: 'Collections', value: 'collections' },
  { title: 'Collections Detail', value: 'collections-detail' },
  { title: 'Archive', value: 'archive' },
  { title: 'Process', value: 'process' },
  { title: 'Contact', value: 'contact' },
  { title: 'Lab', value: 'lab' },
]

// Section options - varies by page
const SECTION_OPTIONS = [
  // Home sections
  { title: 'Hero', value: 'hero' },
  { title: 'Philosophy', value: 'philosophy' },
  { title: 'Collections Preview', value: 'collections-preview' },
  { title: 'Process Teaser', value: 'process-teaser' },
  { title: 'Contact CTA', value: 'contact-cta' },
  // About sections
  { title: 'Portrait', value: 'portrait' },
  { title: 'Statement', value: 'statement' },
  { title: 'Background', value: 'background' },
  { title: 'Work Process', value: 'work-process' },
  // Collections sections
  { title: 'Header', value: 'header' },
  { title: 'Moodboard', value: 'moodboard' },
  { title: 'Gallery', value: 'gallery' },
  // Archive sections
  { title: 'Main', value: 'main' },
  { title: 'Failures', value: 'failures' },
  // Process sections
  { title: 'Research', value: 'research' },
  { title: 'Concept', value: 'concept' },
  { title: 'Sketch', value: 'sketch' },
  { title: 'Material', value: 'material' },
  { title: 'Toile', value: 'toile' },
  { title: 'Failure', value: 'failure' },
  { title: 'Refine', value: 'refine' },
  { title: 'Final', value: 'final' },
  // Contact sections
  { title: 'Form', value: 'form' },
  { title: 'Location', value: 'location' },
  { title: 'Social', value: 'social' },
  // Lab sections
  { title: 'Experiments', value: 'experiments' },
]

export default defineType({
  name: 'slotImage',
  title: 'Slot Images',
  type: 'document',
  fields: [
    defineField({
      name: 'slotId',
      title: 'Slot ID',
      type: 'string',
      description: 'Unique slot identifier (e.g., home-hero-001)',
      validation: (Rule) => Rule.required().regex(/^[a-z]+-[a-z]+-\d{3}$/, {
        name: 'slotId format',
        invert: false,
      }).error('Format: page-section-number (e.g., home-hero-001)'),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
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
      description: 'Where this slot appears on the page (for CMS users)',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enable image cropping/focus point
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Accessibility description',
        }),
      ],
    }),
    defineField({
      name: 'label',
      title: 'Label Override',
      type: 'string',
      description: 'Custom label to display on the slot (optional)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this slot on the website',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within the section (lower = first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'slotId',
      subtitle: 'description',
      media: 'image',
      page: 'page',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, media, page, isActive } = selection
      return {
        title: `${isActive ? '' : '(Hidden) '}${title}`,
        subtitle: subtitle || `${page} slot`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Page, then Section, then Order',
      name: 'pageSectionOrder',
      by: [
        { field: 'page', direction: 'asc' },
        { field: 'section', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Slot ID',
      name: 'slotIdAsc',
      by: [{ field: 'slotId', direction: 'asc' }],
    },
  ],
})
