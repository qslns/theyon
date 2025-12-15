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

// Slot type options - 슬롯 종류
const SLOT_TYPE_OPTIONS = [
  { title: '📷 Normal (일반 이미지)', value: 'normal' },
  { title: '✂️ Nukki (누끼/투명 배경)', value: 'nukki' },
  { title: '🖼️ Background (스크롤 배경)', value: 'background' },
]

// Frame style options - 외적 개성
const FRAME_STYLE_OPTIONS = [
  { title: '🚫 None (없음)', value: 'none' },
  { title: '📸 Polaroid (폴라로이드)', value: 'polaroid' },
  { title: '📜 Torn (찢어진 종이)', value: 'torn' },
  { title: '🎞️ Film Strip (필름 스트립)', value: 'film-strip' },
  { title: '🔲 Slide Mount (슬라이드 마운트)', value: 'slide-mount' },
  { title: '📄 Crumpled (구겨진 종이)', value: 'crumpled' },
  { title: '✋ Handcut (손으로 자른)', value: 'handcut' },
  { title: '🏛️ Vintage (빈티지)', value: 'vintage' },
  { title: '📋 Contact Sheet (컨택트 시트)', value: 'contact-sheet' },
  { title: '📓 Sketchbook (스케치북)', value: 'sketchbook' },
]

// Film filter options - 필름 필터
const FILM_FILTER_OPTIONS = [
  { title: '🎬 Default (기본 필름)', value: 'default' },
  { title: '🌅 Warm (따뜻한 톤)', value: 'warm' },
  { title: '❄️ Cool (차가운 톤)', value: 'cool' },
  { title: '📷 Vintage (빈티지)', value: 'vintage' },
  { title: '🌫️ Faded (바랜 색감)', value: 'faded' },
  { title: '🚫 None (필터 없음)', value: 'none' },
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
      name: 'slotType',
      title: 'Slot Type',
      type: 'string',
      group: 'settings',
      description: 'Choose slot type: Normal (standard image), Nukki (transparent background PNG), or Background (scrolling full-screen).',
      options: {
        list: SLOT_TYPE_OPTIONS,
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'frameStyle',
      title: 'Frame Style',
      type: 'string',
      group: 'settings',
      description: 'Visual frame around the image. Gives personality to each slot.',
      options: {
        list: FRAME_STYLE_OPTIONS,
        layout: 'dropdown',
      },
      initialValue: 'none',
      hidden: ({ parent }) => parent?.slotType === 'background', // 배경 슬롯에는 프레임 불필요
    }),
    defineField({
      name: 'filmFilter',
      title: 'Film Filter',
      type: 'string',
      group: 'settings',
      description: 'Color grading filter applied to the image.',
      options: {
        list: FILM_FILTER_OPTIONS,
        layout: 'dropdown',
      },
      initialValue: 'default',
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
      slotType: 'slotType',
      frameStyle: 'frameStyle',
    },
    prepare(selection) {
      const { title, subtitle, media, page, section, isActive, slotSize, slotType, frameStyle } = selection
      const statusIcon = isActive === false ? '🔴 ' : '🟢 '
      const typeIcon = slotType === 'nukki' ? '✂️' : slotType === 'background' ? '🖼️' : '📷'
      const sizeHint = slotSize ? ` [${slotSize}]` : ''
      const frameHint = frameStyle && frameStyle !== 'none' ? ` (${frameStyle})` : ''
      return {
        title: `${statusIcon}${typeIcon} ${title || 'New Slot'}${sizeHint}`,
        subtitle: subtitle || `${page || '?'} → ${section || '?'}${frameHint}`,
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
