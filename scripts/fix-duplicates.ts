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

interface SlotDoc {
  _id: string
  slotId: string
  hasImage: boolean
}

async function fixDuplicates() {
  console.log('🔍 Finding duplicate slots...\n')

  // 모든 슬롯 가져오기
  const slots = await client.fetch<SlotDoc[]>(`
    *[_type == "slotImage"] {
      _id,
      slotId,
      "hasImage": defined(image.asset)
    } | order(slotId asc)
  `)

  // slotId별로 그룹화
  const grouped: Record<string, SlotDoc[]> = {}
  slots.forEach(s => {
    if (!grouped[s.slotId]) grouped[s.slotId] = []
    grouped[s.slotId].push(s)
  })

  // 중복된 것 찾기
  const duplicates = Object.entries(grouped).filter(([, docs]) => docs.length > 1)

  if (duplicates.length === 0) {
    console.log('✅ No duplicates found!')
    return
  }

  console.log(`Found ${duplicates.length} duplicate slotIds:\n`)

  for (const [slotId, docs] of duplicates) {
    console.log(`📍 ${slotId}: ${docs.length} documents`)

    // 이미지가 있는 것 유지, 없는 것 삭제
    const withImage = docs.filter(d => d.hasImage)
    const withoutImage = docs.filter(d => !d.hasImage)

    if (withImage.length > 0 && withoutImage.length > 0) {
      // 이미지 없는 것 삭제
      for (const doc of withoutImage) {
        console.log(`   🗑️  Deleting (no image): ${doc._id}`)
        await client.delete(doc._id)
      }
    } else if (withImage.length === 0) {
      // 모두 이미지 없으면 첫번째 제외하고 삭제
      for (let i = 1; i < docs.length; i++) {
        console.log(`   🗑️  Deleting (duplicate, no image): ${docs[i]._id}`)
        await client.delete(docs[i]._id)
      }
    } else {
      // 모두 이미지 있으면 첫번째 제외하고 삭제
      for (let i = 1; i < withImage.length; i++) {
        console.log(`   🗑️  Deleting (duplicate): ${withImage[i]._id}`)
        await client.delete(withImage[i]._id)
      }
      // 이미지 없는 것도 삭제
      for (const doc of withoutImage) {
        console.log(`   🗑️  Deleting (no image): ${doc._id}`)
        await client.delete(doc._id)
      }
    }
  }

  console.log('\n✅ Duplicates fixed!')
}

fixDuplicates().catch(console.error)
