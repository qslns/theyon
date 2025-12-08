import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

// Sanity Configuration - hardcoded for reliability
const projectId = '6qskaa98'
const dataset = 'production'

// Slot image pages for filtering
const SLOT_PAGES = [
  { id: 'home', title: 'Home', icon: '🏠' },
  { id: 'about', title: 'About', icon: '👤' },
  { id: 'collections', title: 'Collections', icon: '📚' },
  { id: 'archive', title: 'Archive', icon: '📦' },
  { id: 'process', title: 'Process', icon: '⚙️' },
  { id: 'contact', title: 'Contact', icon: '✉️' },
  { id: 'lab', title: 'Lab', icon: '🔬' },
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
          .title('THE YON Content')
          .items([
            // Slot Images - Primary management interface
            S.listItem()
              .title('🖼️ Slot Images')
              .icon(() => '🖼️')
              .child(
                S.list()
                  .title('Slot Images')
                  .items([
                    // Quick Access - All slots
                    S.listItem()
                      .title('📋 All Slots')
                      .icon(() => '📋')
                      .child(
                        S.documentTypeList('slotImage')
                          .title('All Slot Images')
                          .filter('_type == "slotImage"')
                          .defaultOrdering([
                            { field: 'page', direction: 'asc' },
                            { field: 'section', direction: 'asc' },
                            { field: 'order', direction: 'asc' },
                          ])
                      ),
                    // Quick Access - Background slots
                    S.listItem()
                      .title('🖼️ Background Slots (All Pages)')
                      .icon(() => '🖼️')
                      .child(
                        S.documentTypeList('slotImage')
                          .title('Background Slots')
                          .filter('_type == "slotImage" && section == "background"')
                          .defaultOrdering([
                            { field: 'page', direction: 'asc' },
                          ])
                      ),
                    // Quick Access - Active slots only
                    S.listItem()
                      .title('🟢 Active Slots')
                      .icon(() => '🟢')
                      .child(
                        S.documentTypeList('slotImage')
                          .title('Active Slots')
                          .filter('_type == "slotImage" && isActive == true')
                          .defaultOrdering([
                            { field: 'page', direction: 'asc' },
                            { field: 'section', direction: 'asc' },
                          ])
                      ),
                    // Quick Access - Inactive/Hidden slots
                    S.listItem()
                      .title('🔴 Hidden Slots')
                      .icon(() => '🔴')
                      .child(
                        S.documentTypeList('slotImage')
                          .title('Hidden (Inactive) Slots')
                          .filter('_type == "slotImage" && isActive == false')
                          .defaultOrdering([
                            { field: 'page', direction: 'asc' },
                          ])
                      ),
                    S.divider(),
                    // === BY PAGE ===
                    S.listItem()
                      .title('📂 Browse by Page')
                      .icon(() => '📂')
                      .child(
                        S.list()
                          .title('Select Page')
                          .items([
                            ...SLOT_PAGES.map((page) =>
                              S.listItem()
                                .title(`${page.icon} ${page.title}`)
                                .id(`slots-${page.id}`)
                                .child(
                                  S.documentTypeList('slotImage')
                                    .title(`${page.title} Slots`)
                                    .filter('_type == "slotImage" && page == $page')
                                    .params({ page: page.id })
                                    .defaultOrdering([
                                      { field: 'section', direction: 'asc' },
                                      { field: 'order', direction: 'asc' },
                                    ])
                                )
                            ),
                            S.divider(),
                            // Collection detail pages (dynamic)
                            S.listItem()
                              .title('📄 Collection Details')
                              .id('slots-collection-details')
                              .child(
                                S.documentTypeList('slotImage')
                                  .title('Collection Detail Slots')
                                  .filter('_type == "slotImage" && page match "collection-*"')
                                  .defaultOrdering([
                                    { field: 'page', direction: 'asc' },
                                    { field: 'section', direction: 'asc' },
                                    { field: 'order', direction: 'asc' },
                                  ])
                              ),
                          ])
                      ),
                  ])
              ),
            S.divider(),
            // Collections
            S.listItem()
              .title('👗 Collections')
              .icon(() => '👗')
              .child(
                S.documentTypeList('collection')
                  .title('Collections')
                  .filter('_type == "collection"')
                  .defaultOrdering([{ field: 'year', direction: 'desc' }])
              ),
            // Lab Experiments
            S.listItem()
              .title('🧪 Lab Experiments')
              .icon(() => '🧪')
              .child(
                S.documentTypeList('experiment')
                  .title('Experiments')
                  .filter('_type == "experiment"')
                  .defaultOrdering([{ field: 'startDate', direction: 'desc' }])
              ),
            // Archive
            S.listItem()
              .title('📁 Archive Entries')
              .icon(() => '📁')
              .child(
                S.documentTypeList('archive')
                  .title('Archive')
                  .filter('_type == "archive"')
                  .defaultOrdering([{ field: 'date', direction: 'desc' }])
              ),
            // Analysis
            S.listItem()
              .title('📊 Brand Analysis')
              .icon(() => '📊')
              .child(
                S.documentTypeList('analysis')
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
