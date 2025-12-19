/**
 * Add Collection Detail Page Slots
 *
 * Creates slots for each collection detail page
 * Run with: npx tsx scripts/add-collection-slots.ts
 */

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

const SIZE_GUIDE = {
  background: '📐 권장: 1920×1080px 이상 | 가로형',
  hero: '📐 권장: 1200×1600px | 세로 3:4',
  medium: '📐 권장: 600×750px | 세로 4:5',
  small: '📐 권장: 400×533px | 세로 3:4',
  swatch: '📐 권장: 200×200px | 정사각형',
  large: '📐 권장: 800×1066px | 세로 3:4',
}

const COLLECTIONS = [
  { slug: 'deconstruction', title: 'DECONSTRUCTION', index: '01' },
  { slug: 'fragments', title: 'FRAGMENTS', index: '02' },
  { slug: 'void', title: 'VOID', index: '03' },
  { slug: 'origin', title: 'ORIGIN', index: '04' },
]

interface SlotData {
  slotId: string
  page: string
  section: string
  label: string
  slotSize: string
  description: string
}

function generateCollectionSlots(): SlotData[] {
  const slots: SlotData[] = []

  for (const col of COLLECTIONS) {
    const prefix = `collection-${col.slug}`
    const page = `collection-${col.slug}`

    slots.push(
      {
        slotId: `${prefix}-background-001`,
        page,
        section: 'background',
        label: '🖼️ 배경',
        slotSize: 'background',
        description: `${col.title} 컬렉션 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}\n\n💡 팁: 컬렉션 분위기에 맞는 배경. 투명도 2%로 은은하게 표시됩니다.`,
      },
      {
        slotId: `${prefix}-background-002`,
        page,
        section: 'background',
        label: '🖼️ 스크롤 배경',
        slotSize: 'background',
        description: `${col.title} 컬렉션 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}\n\n💡 팁: 세로로 긴 이미지 권장.`,
      },
      {
        slotId: `${prefix}-hero-001`,
        page,
        section: 'hero',
        label: `⭐ ${col.title} 메인`,
        slotSize: 'hero',
        description: `${col.title} 컬렉션의 메인 히어로 이미지입니다.\n\n${SIZE_GUIDE.hero}\n\n💡 팁: 이 컬렉션을 대표하는 가장 강력한 룩 이미지. 화면 왼쪽으로 넘칩니다.`,
      },
      {
        slotId: `${prefix}-hero-002`,
        page,
        section: 'hero',
        label: '🔍 디테일',
        slotSize: 'medium',
        description: `${col.title} 히어로의 디테일 이미지입니다.\n\n${SIZE_GUIDE.medium}\n\n💡 팁: 디테일 샷, 클로즈업 이미지.`,
      },
      {
        slotId: `${prefix}-hero-003`,
        page,
        section: 'hero',
        label: '⚙️ 프로세스',
        slotSize: 'small',
        description: `${col.title} 히어로의 프로세스 이미지입니다.\n\n${SIZE_GUIDE.small}\n\n💡 팁: 제작 과정을 담은 이미지.`,
      },
      {
        slotId: `${prefix}-hero-004`,
        page,
        section: 'hero',
        label: '🧵 소재',
        slotSize: 'swatch',
        description: `${col.title} 히어로의 소재 스와치입니다.\n\n${SIZE_GUIDE.swatch}\n\n💡 팁: 이 컬렉션에서 사용한 주요 소재.`,
      },
      {
        slotId: `${prefix}-gallery-001`,
        page,
        section: 'gallery',
        label: '👔 룩 01',
        slotSize: 'large',
        description: `${col.title} 갤러리의 첫 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.large}\n\n💡 팁: 전신 룩 이미지.`,
      },
      {
        slotId: `${prefix}-gallery-002`,
        page,
        section: 'gallery',
        label: '👗 룩 02',
        slotSize: 'medium',
        description: `${col.title} 갤러리의 두 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.medium}\n\n💡 팁: 다른 각도 또는 다른 룩.`,
      }
    )
  }

  return slots
}

async function addCollectionSlots() {
  const slots = generateCollectionSlots()

  console.log('🎨 Adding collection detail page slots...')
  console.log(`📊 Total slots to create: ${slots.length}`)

  let created = 0
  let skipped = 0
  let errors = 0

  for (const slot of slots) {
    try {
      const existing = await client.fetch(
        `*[_type == "slotImage" && slotId == $slotId][0]`,
        { slotId: slot.slotId }
      )

      if (existing) {
        console.log(`⏭️  Skipped: ${slot.slotId} (already exists)`)
        skipped++
        continue
      }

      await client.create({
        _type: 'slotImage',
        slotId: slot.slotId,
        page: slot.page,
        section: slot.section,
        description: slot.description,
        slotSize: slot.slotSize,
        label: slot.label,
        isActive: true,
        order: 0,
      })

      console.log(`✅ Created: ${slot.slotId}`)
      created++
    } catch (error) {
      console.error(`❌ Error creating ${slot.slotId}:`, error)
      errors++
    }
  }

  console.log('\n📈 Summary:')
  console.log(`   Created: ${created}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Errors: ${errors}`)
}

addCollectionSlots()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error:', err)
    process.exit(1)
  })
