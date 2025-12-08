import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

// Sanity Configuration
const projectId = '6qskaa98'
const dataset = 'production'

// Section labels in Korean
const SECTION_LABELS: Record<string, string> = {
  background: '🎨 배경',
  hero: '⭐ 히어로',
  philosophy: '💭 철학',
  collections: '📸 컬렉션',
  process: '⚙️ 프로세스',
  contact: '📧 연락처',
  education: '📚 교육',
  header: '📋 헤더',
  archive: '📁 아카이브',
  cta: '🔗 CTA',
  location: '📍 위치',
  social: '🌐 소셜',
  failures: '❌ 실패',
  method: '📝 방법',
}

// Page configurations with sections and slot counts
const PAGE_CONFIG = [
  {
    id: 'home',
    title: '🏠 Home',
    count: 43,
    sections: [
      { id: 'background', count: 1 },
      { id: 'hero', count: 15 },
      { id: 'philosophy', count: 6 },
      { id: 'collections', count: 10 },
      { id: 'process', count: 8 },
      { id: 'contact', count: 3 },
    ],
  },
  {
    id: 'about',
    title: '👤 About',
    count: 40,
    sections: [
      { id: 'background', count: 1 },
      { id: 'hero', count: 15 },
      { id: 'philosophy', count: 8 },
      { id: 'education', count: 6 },
      { id: 'process', count: 7 },
      { id: 'contact', count: 3 },
    ],
  },
  {
    id: 'collections',
    title: '📸 Collections',
    count: 16,
    sections: [
      { id: 'background', count: 1 },
      { id: 'header', count: 10 },
      { id: 'archive', count: 5 },
    ],
  },
  {
    id: 'archive',
    title: '📁 Archive',
    count: 16,
    sections: [
      { id: 'background', count: 1 },
      { id: 'header', count: 12 },
      { id: 'cta', count: 3 },
    ],
  },
  {
    id: 'process',
    title: '⚙️ Process',
    count: 12,
    sections: [
      { id: 'background', count: 1 },
      { id: 'hero', count: 8 },
      { id: 'cta', count: 3 },
    ],
  },
  {
    id: 'contact',
    title: '📧 Contact',
    count: 25,
    sections: [
      { id: 'background', count: 1 },
      { id: 'hero', count: 15 },
      { id: 'location', count: 6 },
      { id: 'social', count: 3 },
    ],
  },
  {
    id: 'lab',
    title: '🧪 Lab',
    count: 33,
    sections: [
      { id: 'background', count: 1 },
      { id: 'hero', count: 12 },
      { id: 'failures', count: 12 },
      { id: 'method', count: 5 },
      { id: 'cta', count: 3 },
    ],
  },
]

export default defineConfig({
  name: 'default',
  title: 'THE YON CMS',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .id('root')
          .title('THE YON Content')
          .items([
            // ===== SLOT IMAGES =====
            S.listItem()
              .id('slot-images')
              .title('🖼️ Slot Images')
              .child(
                S.list()
                  .id('slot-images-list')
                  .title('페이지별 슬롯')
                  .items([
                    // Quick filters at top
                    S.listItem()
                      .id('all-slots')
                      .title('📋 전체 슬롯 (185개)')
                      .child(
                        S.documentTypeList('slotImage')
                          .id('all-slots-docs')
                          .title('All Slots')
                          .filter('_type == "slotImage"')
                          .defaultOrdering([
                            { field: 'page', direction: 'asc' },
                            { field: 'section', direction: 'asc' },
                            { field: 'order', direction: 'asc' },
                          ])
                      ),
                    S.listItem()
                      .id('with-image')
                      .title('🟢 이미지 있음')
                      .child(
                        S.documentTypeList('slotImage')
                          .id('with-image-docs')
                          .title('With Images')
                          .filter('_type == "slotImage" && defined(image)')
                          .defaultOrdering([
                            { field: 'page', direction: 'asc' },
                            { field: 'section', direction: 'asc' },
                          ])
                      ),
                    S.listItem()
                      .id('no-image')
                      .title('🔴 이미지 없음')
                      .child(
                        S.documentTypeList('slotImage')
                          .id('no-image-docs')
                          .title('Without Images')
                          .filter('_type == "slotImage" && !defined(image)')
                          .defaultOrdering([
                            { field: 'page', direction: 'asc' },
                            { field: 'section', direction: 'asc' },
                          ])
                      ),
                    S.divider(),

                    // Page-level items with sections nested inside
                    ...PAGE_CONFIG.map((page) =>
                      S.listItem()
                        .id(`page-${page.id}`)
                        .title(`${page.title} (${page.count}개)`)
                        .child(
                          S.list()
                            .id(`${page.id}-sections-list`)
                            .title(`${page.title} 슬롯`)
                            .items([
                              // All slots in this page
                              S.listItem()
                                .id(`${page.id}-all`)
                                .title(`📋 ${page.title} 전체`)
                                .child(
                                  S.documentTypeList('slotImage')
                                    .id(`${page.id}-all-docs`)
                                    .title(`${page.title} All`)
                                    .filter('_type == "slotImage" && page == $page')
                                    .params({ page: page.id })
                                    .defaultOrdering([
                                      { field: 'section', direction: 'asc' },
                                      { field: 'order', direction: 'asc' },
                                    ])
                                ),
                              S.divider(),
                              // Sections within this page
                              ...page.sections.map((section) =>
                                S.listItem()
                                  .id(`${page.id}-${section.id}`)
                                  .title(`${SECTION_LABELS[section.id] || section.id} (${section.count}개)`)
                                  .child(
                                    S.documentTypeList('slotImage')
                                      .id(`${page.id}-${section.id}-docs`)
                                      .title(`${page.title} - ${SECTION_LABELS[section.id] || section.id}`)
                                      .filter('_type == "slotImage" && page == $page && section == $section')
                                      .params({ page: page.id, section: section.id })
                                      .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                  )
                              ),
                            ])
                        )
                    ),
                  ])
              ),

            S.divider(),

            // ===== OTHER CONTENT TYPES =====
            S.listItem()
              .id('collections-content')
              .title('👗 Collections')
              .child(
                S.documentTypeList('collection')
                  .id('collections-docs')
                  .title('Collections')
                  .filter('_type == "collection"')
                  .defaultOrdering([{ field: 'year', direction: 'desc' }])
              ),

            S.listItem()
              .id('experiments-content')
              .title('🧪 Lab Experiments')
              .child(
                S.documentTypeList('experiment')
                  .id('experiments-docs')
                  .title('Experiments')
                  .filter('_type == "experiment"')
                  .defaultOrdering([{ field: 'startDate', direction: 'desc' }])
              ),

            S.listItem()
              .id('archive-content')
              .title('📁 Archive Entries')
              .child(
                S.documentTypeList('archive')
                  .id('archive-docs')
                  .title('Archive')
                  .filter('_type == "archive"')
                  .defaultOrdering([{ field: 'date', direction: 'desc' }])
              ),

            S.listItem()
              .id('analysis-content')
              .title('📊 Brand Analysis')
              .child(
                S.documentTypeList('analysis')
                  .id('analysis-docs')
                  .title('Analysis')
                  .filter('_type == "analysis"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
