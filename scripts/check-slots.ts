import * as dotenv from 'dotenv'
import { createClient } from '@sanity/client'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: '6qskaa98',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// 코드에서 사용중인 모든 슬롯 ID
const CODE_SLOTS = [
  // HOME
  'home-background-001', 'home-background-002',
  'home-hero-001', 'home-hero-002', 'home-hero-003', 'home-hero-004',
  'home-philosophy-001', 'home-philosophy-002',
  'home-collections-001', 'home-collections-002', 'home-collections-003', 'home-collections-004',
  'home-process-001', 'home-process-002', 'home-process-003',
  'home-contact-001',
  // ABOUT
  'about-background-001', 'about-background-002',
  'about-hero-001', 'about-hero-002', 'about-hero-003',
  'about-philosophy-001', 'about-philosophy-002',
  'about-education-001', 'about-education-002', 'about-education-003',
  'about-process-001', 'about-process-002', 'about-process-003',
  'about-contact-001',
  // COLLECTIONS
  'collections-background-001', 'collections-background-002',
  'collections-header-001', 'collections-header-002', 'collections-header-003', 'collections-header-004',
  'collections-archive-001', 'collections-archive-002',
  // ARCHIVE
  'archive-background-001', 'archive-background-002',
  'archive-header-001', 'archive-header-002', 'archive-header-003', 'archive-header-004',
  'archive-cta-001', 'archive-cta-002',
  // PROCESS
  'process-background-001', 'process-background-002',
  'process-hero-001', 'process-hero-002', 'process-hero-003', 'process-hero-004',
  'process-cta-001', 'process-cta-002',
  // CONTACT
  'contact-background-001', 'contact-background-002',
  'contact-hero-001', 'contact-hero-002', 'contact-hero-003', 'contact-hero-004',
  'contact-location-001', 'contact-location-002',
  // LAB
  'lab-background-001', 'lab-background-002',
  'lab-hero-001', 'lab-hero-002', 'lab-hero-003', 'lab-hero-004',
  'lab-failures-001', 'lab-failures-002', 'lab-failures-003', 'lab-failures-004',
  'lab-method-001', 'lab-method-002', 'lab-method-003',
]

async function checkSlots() {
  console.log('🔍 Checking slots...\n')

  const cmsSlots = await client.fetch<Array<{ slotId: string }>>('*[_type == "slotImage"]{ slotId }')
  const cmsSlotIds = cmsSlots.map(s => s.slotId)

  console.log(`📊 코드에서 사용: ${CODE_SLOTS.length}개`)
  console.log(`📊 CMS에 존재: ${cmsSlotIds.length}개\n`)

  // CMS에 없는 슬롯 찾기
  const missing = CODE_SLOTS.filter(id => !cmsSlotIds.includes(id))

  if (missing.length > 0) {
    console.log(`❌ CMS에 없는 슬롯 (${missing.length}개):`)
    missing.forEach(id => console.log(`   - ${id}`))
  } else {
    console.log('✅ 모든 슬롯이 CMS에 존재합니다!')
  }

  // CMS에는 있지만 코드에서 안쓰는 슬롯
  const unused = cmsSlotIds.filter(id => !CODE_SLOTS.includes(id))
  if (unused.length > 0) {
    console.log(`\n⚠️  코드에서 안쓰는 CMS 슬롯 (${unused.length}개):`)
    unused.forEach(id => console.log(`   - ${id}`))
  }

  return missing
}

checkSlots()
  .then(missing => {
    if (missing.length > 0) {
      console.log('\n💡 누락된 슬롯을 추가하려면: npx tsx scripts/seed-slots.ts')
    }
    process.exit(0)
  })
  .catch(err => {
    console.error('Error:', err)
    process.exit(1)
  })
