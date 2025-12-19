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

interface SlotData {
  slotId: string
  page: string
  section: string
  isActive: boolean
  hasImage: boolean
  imageUrl: string | null
}

async function diagnose() {
  // 모든 슬롯 가져오기
  const slots = await client.fetch<SlotData[]>(`
    *[_type == "slotImage"] {
      slotId,
      page,
      section,
      isActive,
      "hasImage": defined(image.asset),
      "imageUrl": image.asset->url
    } | order(slotId asc)
  `)

  console.log('\n=== CMS 슬롯 진단 ===\n')

  // 이미지 없는 슬롯
  const noImage = slots.filter(s => !s.hasImage)
  if (noImage.length > 0) {
    console.log('❌ 이미지가 없는 슬롯:', noImage.length, '개')
    noImage.forEach(s => console.log('  -', s.slotId, '(page:', s.page, ')'))
  } else {
    console.log('✅ 모든 슬롯에 이미지가 있습니다')
  }

  // 비활성화된 슬롯
  const inactive = slots.filter(s => s.isActive === false)
  if (inactive.length > 0) {
    console.log('\n🔴 비활성화된 슬롯:', inactive.length, '개')
    inactive.forEach(s => console.log('  -', s.slotId))
  } else {
    console.log('\n✅ 모든 슬롯이 활성화되어 있습니다')
  }

  // page 값이 없는 슬롯
  const noPage = slots.filter(s => !s.page)
  if (noPage.length > 0) {
    console.log('\n⚠️ page 값이 없는 슬롯:', noPage.length, '개')
    noPage.forEach(s => console.log('  -', s.slotId))
  }

  // 슬롯 ID와 page 값 불일치 체크
  const mismatch = slots.filter(s => {
    // collection 슬롯은 'collection-xxx'로 시작 (예: collection-deconstruction-hero-001)
    if (s.slotId.startsWith('collection-')) {
      const parts = s.slotId.split('-')
      const expectedPageFull = parts[0] + '-' + parts[1]
      return s.page !== expectedPageFull
    }
    // 일반 슬롯 (예: home-hero-001)
    const expectedPage = s.slotId.split('-')[0]
    return s.page !== expectedPage
  })
  if (mismatch.length > 0) {
    console.log('\n⚠️ slotId와 page 값 불일치:', mismatch.length, '개')
    mismatch.forEach(s => {
      const expected = s.slotId.startsWith('collection-')
        ? s.slotId.split('-').slice(0, 2).join('-')
        : s.slotId.split('-')[0]
      console.log('  -', s.slotId, '| page:', s.page, '| expected:', expected)
    })
  } else {
    console.log('\n✅ 모든 슬롯의 page 값이 올바릅니다')
  }

  // 페이지별 통계
  console.log('\n📊 페이지별 슬롯 수:')
  const byPage: Record<string, number> = {}
  slots.forEach(s => {
    const p = s.page || 'NO_PAGE'
    byPage[p] = (byPage[p] || 0) + 1
  })
  Object.entries(byPage).sort().forEach(([p, c]) => console.log('  ', p, ':', c))

  // 이미지 있는 슬롯 vs 없는 슬롯
  const withImage = slots.filter(s => s.hasImage && s.isActive !== false)
  const withoutImage = slots.filter(s => !s.hasImage || s.isActive === false)
  console.log('\n✅ 표시 가능한 슬롯:', withImage.length, '개')
  console.log('❌ 표시 불가능한 슬롯:', withoutImage.length, '개')

  // 주요 페이지들의 슬롯 상세 확인
  console.log('\n=== 페이지별 상세 ===')
  const mainPages = ['home', 'about', 'collections', 'archive', 'process', 'contact', 'lab']

  for (const page of mainPages) {
    const pageSlots = slots.filter(s => s.page === page)
    const activeWithImage = pageSlots.filter(s => s.hasImage && s.isActive !== false)
    const problems = pageSlots.filter(s => !s.hasImage || s.isActive === false)

    console.log(`\n📄 ${page}: ${activeWithImage.length}/${pageSlots.length} 표시 가능`)
    if (problems.length > 0) {
      problems.forEach(s => {
        const reason = !s.hasImage ? '이미지 없음' : '비활성화'
        console.log(`   ❌ ${s.slotId} - ${reason}`)
      })
    }
  }
}

diagnose().catch(console.error)
