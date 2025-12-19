/**
 * Sanity Slot Seed Script
 *
 * Creates all slot documents in Sanity CMS
 * Run with: npx tsx scripts/seed-slots.ts
 */

import * as dotenv from 'dotenv'
import { createClient } from '@sanity/client'

// Load .env.local file
dotenv.config({ path: '.env.local' })

// Debug: Check if token is loaded
console.log('🔑 Token loaded:', process.env.SANITY_API_TOKEN ? 'Yes (length: ' + process.env.SANITY_API_TOKEN.length + ')' : 'No')

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
  description: string
  slotSize: string
  label: string
}

// All slots ACTUALLY USED in the codebase (80 total)
const SLOTS: SlotData[] = [
  // ==========================================
  // HOME PAGE (16 slots)
  // ==========================================
  { slotId: 'home-background-001', page: 'home', section: 'background', description: '홈페이지 전체 배경 이미지. 매우 낮은 투명도로 분위기만 연출.', slotSize: 'background', label: 'BACKGROUND' },
  { slotId: 'home-background-002', page: 'home', section: 'background', description: '홈페이지 스크롤링 배경 이미지. 페이지와 함께 스크롤됨.', slotSize: 'background', label: 'SCROLLING BG' },
  { slotId: 'home-hero-001', page: 'home', section: 'hero', description: '홈 히어로 왼쪽 상단 대형 이미지. 메인 룩 이미지 권장.', slotSize: 'hero', label: 'LOOK 01' },
  { slotId: 'home-hero-002', page: 'home', section: 'hero', description: '홈 히어로 중앙 상단. 두 번째 주요 룩 이미지.', slotSize: 'medium', label: 'LOOK 02' },
  { slotId: 'home-hero-003', page: 'home', section: 'hero', description: '홈 히어로 디테일 샷.', slotSize: 'small', label: 'DETAIL' },
  { slotId: 'home-hero-004', page: 'home', section: 'hero', description: '홈 히어로 패브릭 스와치.', slotSize: 'swatch', label: 'FABRIC' },
  { slotId: 'home-philosophy-001', page: 'home', section: 'philosophy', description: '철학 섹션 무드 이미지.', slotSize: 'medium', label: 'MOOD' },
  { slotId: 'home-philosophy-002', page: 'home', section: 'philosophy', description: '철학 섹션 스케치 이미지.', slotSize: 'small', label: 'SKETCH' },
  { slotId: 'home-collections-001', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 DECONSTRUCTION 메인 이미지.', slotSize: 'large', label: 'DECONSTRUCTION' },
  { slotId: 'home-collections-002', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 FRAGMENTS 이미지.', slotSize: 'medium', label: 'FRAGMENTS' },
  { slotId: 'home-collections-003', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 VOID 이미지.', slotSize: 'small', label: 'VOID' },
  { slotId: 'home-collections-004', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 소재 스와치.', slotSize: 'swatch', label: 'MATERIAL' },
  { slotId: 'home-process-001', page: 'home', section: 'process-teaser', description: '프로세스 티저 스케치 이미지.', slotSize: 'medium', label: 'SKETCH' },
  { slotId: 'home-process-002', page: 'home', section: 'process-teaser', description: '프로세스 티저 토일 이미지.', slotSize: 'small', label: 'TOILE' },
  { slotId: 'home-process-003', page: 'home', section: 'process-teaser', description: '프로세스 티저 파이널 이미지.', slotSize: 'small-square', label: 'FINAL' },
  { slotId: 'home-contact-001', page: 'home', section: 'contact-cta', description: '홈 컨택 CTA 스튜디오 이미지.', slotSize: 'small', label: 'STUDIO' },

  // ==========================================
  // ABOUT PAGE (15 slots)
  // ==========================================
  { slotId: 'about-background-001', page: 'about', section: 'background', description: 'About 페이지 전체 배경 이미지.', slotSize: 'background', label: 'BACKGROUND' },
  { slotId: 'about-background-002', page: 'about', section: 'background', description: 'About 스크롤링 배경 이미지.', slotSize: 'background', label: 'SCROLLING BG' },
  { slotId: 'about-hero-001', page: 'about', section: 'hero', description: 'About 히어로 포트레이트 이미지. 디자이너 사진 권장.', slotSize: 'hero', label: 'PORTRAIT' },
  { slotId: 'about-hero-002', page: 'about', section: 'hero', description: 'About 히어로 스튜디오 이미지.', slotSize: 'large', label: 'STUDIO' },
  { slotId: 'about-hero-003', page: 'about', section: 'hero', description: 'About 히어로 손 작업 이미지.', slotSize: 'medium', label: 'HANDS' },
  { slotId: 'about-philosophy-001', page: 'about', section: 'philosophy', description: 'About 철학 무드 이미지.', slotSize: 'medium', label: 'MOOD' },
  { slotId: 'about-philosophy-002', page: 'about', section: 'philosophy', description: 'About 철학 스케치 이미지.', slotSize: 'small', label: 'SKETCH' },
  { slotId: 'about-education-001', page: 'about', section: 'education', description: 'About 교육 스케치 이미지.', slotSize: 'medium', label: 'SKETCH' },
  { slotId: 'about-education-002', page: 'about', section: 'education', description: 'About 교육 토일 이미지.', slotSize: 'small', label: 'TOILE' },
  { slotId: 'about-education-003', page: 'about', section: 'education', description: 'About 교육 패턴 이미지.', slotSize: 'small', label: 'PATTERN' },
  { slotId: 'about-process-001', page: 'about', section: 'process', description: 'About 프로세스 리서치 이미지.', slotSize: 'medium', label: 'RESEARCH' },
  { slotId: 'about-process-002', page: 'about', section: 'process', description: 'About 프로세스 프로토타입 이미지.', slotSize: 'small', label: 'PROTOTYPE' },
  { slotId: 'about-process-003', page: 'about', section: 'process', description: 'About 프로세스 파이널 이미지.', slotSize: 'small', label: 'FINAL' },
  { slotId: 'about-contact-001', page: 'about', section: 'contact', description: 'About 연락처 스튜디오 이미지.', slotSize: 'small', label: 'STUDIO' },

  // ==========================================
  // COLLECTIONS PAGE (10 slots)
  // ==========================================
  { slotId: 'collections-background-001', page: 'collections', section: 'background', description: 'Collections 페이지 전체 배경.', slotSize: 'background', label: 'BACKGROUND' },
  { slotId: 'collections-background-002', page: 'collections', section: 'background', description: 'Collections 스크롤링 배경.', slotSize: 'background', label: 'SCROLLING BG' },
  { slotId: 'collections-header-001', page: 'collections', section: 'header', description: 'Collections 헤더 피처드 이미지.', slotSize: 'hero', label: 'FEATURED' },
  { slotId: 'collections-header-002', page: 'collections', section: 'header', description: 'Collections 헤더 룩 02 이미지.', slotSize: 'large', label: 'LOOK 02' },
  { slotId: 'collections-header-003', page: 'collections', section: 'header', description: 'Collections 헤더 디테일 이미지.', slotSize: 'medium', label: 'DETAIL' },
  { slotId: 'collections-header-004', page: 'collections', section: 'header', description: 'Collections 헤더 패브릭 스와치.', slotSize: 'swatch', label: 'FABRIC' },
  { slotId: 'collections-archive-001', page: 'collections', section: 'archive', description: 'Collections 아카이브 메인 이미지.', slotSize: 'medium', label: 'ARCHIVE' },
  { slotId: 'collections-archive-002', page: 'collections', section: 'archive', description: 'Collections 아카이브 프로세스 이미지.', slotSize: 'small', label: 'PROCESS' },

  // ==========================================
  // ARCHIVE PAGE (8 slots)
  // ==========================================
  { slotId: 'archive-background-001', page: 'archive', section: 'background', description: 'Archive 페이지 전체 배경.', slotSize: 'background', label: 'BACKGROUND' },
  { slotId: 'archive-background-002', page: 'archive', section: 'background', description: 'Archive 스크롤링 배경.', slotSize: 'background', label: 'SCROLLING BG' },
  { slotId: 'archive-header-001', page: 'archive', section: 'header', description: 'Archive 헤더 메인 이미지.', slotSize: 'hero', label: 'ARCHIVE / MAIN' },
  { slotId: 'archive-header-002', page: 'archive', section: 'header', description: 'Archive 헤더 프로세스 이미지.', slotSize: 'large', label: 'PROCESS' },
  { slotId: 'archive-header-003', page: 'archive', section: 'header', description: 'Archive 헤더 리서치 이미지.', slotSize: 'medium', label: 'RESEARCH' },
  { slotId: 'archive-header-004', page: 'archive', section: 'header', description: 'Archive 헤더 스터디 이미지.', slotSize: 'small', label: 'STUDY' },
  { slotId: 'archive-cta-001', page: 'archive', section: 'cta', description: 'Archive CTA 결과 이미지.', slotSize: 'small', label: 'RESULT' },
  { slotId: 'archive-cta-002', page: 'archive', section: 'cta', description: 'Archive CTA 파이널 이미지.', slotSize: 'tiny', label: 'FINAL' },

  // ==========================================
  // PROCESS PAGE (8 slots)
  // ==========================================
  { slotId: 'process-background-001', page: 'process', section: 'background', description: 'Process 페이지 전체 배경.', slotSize: 'background', label: 'BACKGROUND' },
  { slotId: 'process-background-002', page: 'process', section: 'background', description: 'Process 스크롤링 배경.', slotSize: 'background', label: 'SCROLLING BG' },
  { slotId: 'process-hero-001', page: 'process', section: 'hero', description: 'Process 히어로 스케치 이미지.', slotSize: 'medium', label: 'SKETCH' },
  { slotId: 'process-hero-002', page: 'process', section: 'hero', description: 'Process 히어로 토일 이미지.', slotSize: 'small', label: 'TOILE' },
  { slotId: 'process-hero-003', page: 'process', section: 'hero', description: 'Process 히어로 패브릭 이미지.', slotSize: 'small', label: 'FABRIC' },
  { slotId: 'process-hero-004', page: 'process', section: 'hero', description: 'Process 히어로 무드 이미지.', slotSize: 'tiny', label: 'MOOD' },
  { slotId: 'process-cta-001', page: 'process', section: 'cta', description: 'Process CTA 파이널 이미지.', slotSize: 'small', label: 'FINAL' },
  { slotId: 'process-cta-002', page: 'process', section: 'cta', description: 'Process CTA 결과 이미지.', slotSize: 'tiny', label: 'RESULT' },

  // ==========================================
  // CONTACT PAGE (8 slots)
  // ==========================================
  { slotId: 'contact-background-001', page: 'contact', section: 'background', description: 'Contact 페이지 전체 배경.', slotSize: 'background', label: 'BACKGROUND' },
  { slotId: 'contact-background-002', page: 'contact', section: 'background', description: 'Contact 스크롤링 배경.', slotSize: 'background', label: 'SCROLLING BG' },
  { slotId: 'contact-hero-001', page: 'contact', section: 'hero', description: 'Contact 히어로 스튜디오 이미지.', slotSize: 'hero', label: 'STUDIO' },
  { slotId: 'contact-hero-002', page: 'contact', section: 'hero', description: 'Contact 히어로 연락처 이미지.', slotSize: 'large', label: 'CONTACT' },
  { slotId: 'contact-hero-003', page: 'contact', section: 'hero', description: 'Contact 히어로 서울 이미지.', slotSize: 'medium', label: 'SEOUL' },
  { slotId: 'contact-hero-004', page: 'contact', section: 'hero', description: 'Contact 히어로 메일 이미지.', slotSize: 'small', label: 'MAIL' },
  { slotId: 'contact-location-001', page: 'contact', section: 'location', description: 'Contact 위치 서울 이미지.', slotSize: 'medium', label: 'SEOUL' },
  { slotId: 'contact-location-002', page: 'contact', section: 'location', description: 'Contact 위치 스튜디오 이미지.', slotSize: 'small', label: 'STUDIO' },

  // ==========================================
  // LAB PAGE (15 slots)
  // ==========================================
  { slotId: 'lab-background-001', page: 'lab', section: 'background', description: 'Lab 페이지 전체 배경.', slotSize: 'background', label: 'BACKGROUND' },
  { slotId: 'lab-background-002', page: 'lab', section: 'background', description: 'Lab 스크롤링 배경.', slotSize: 'background', label: 'SCROLLING BG' },
  { slotId: 'lab-hero-001', page: 'lab', section: 'hero', description: 'Lab 히어로 실험 메인 이미지.', slotSize: 'hero', label: 'EXP / MAIN' },
  { slotId: 'lab-hero-002', page: 'lab', section: 'hero', description: 'Lab 히어로 테스트 001 이미지.', slotSize: 'large', label: 'TEST 001' },
  { slotId: 'lab-hero-003', page: 'lab', section: 'hero', description: 'Lab 히어로 샘플 이미지.', slotSize: 'medium', label: 'SAMPLE' },
  { slotId: 'lab-hero-004', page: 'lab', section: 'hero', description: 'Lab 히어로 이터레이션 이미지.', slotSize: 'small', label: 'ITERATION' },
  { slotId: 'lab-failures-001', page: 'lab', section: 'failures', description: 'Lab 실패 거절된 01 이미지.', slotSize: 'medium', label: 'REJECTED / 01' },
  { slotId: 'lab-failures-002', page: 'lab', section: 'failures', description: 'Lab 실패 토일 이미지.', slotSize: 'small', label: 'FAILED TOILE' },
  { slotId: 'lab-failures-003', page: 'lab', section: 'failures', description: 'Lab 실패 잘못된 방향 이미지.', slotSize: 'small', label: 'WRONG PATH' },
  { slotId: 'lab-failures-004', page: 'lab', section: 'failures', description: 'Lab 실패 이터레이션 03 이미지.', slotSize: 'tiny', label: 'ITERATION 03' },
  { slotId: 'lab-method-001', page: 'lab', section: 'method', description: 'Lab 방법론 관찰 이미지.', slotSize: 'medium', label: 'OBSERVE' },
  { slotId: 'lab-method-002', page: 'lab', section: 'method', description: 'Lab 방법론 실험 이미지.', slotSize: 'medium', label: 'EXPERIMENT' },
  { slotId: 'lab-method-003', page: 'lab', section: 'method', description: 'Lab 방법론 정제 이미지.', slotSize: 'medium', label: 'REFINE' },
]

async function seedSlots() {
  console.log('🌱 Starting slot seed...')
  console.log(`📊 Total slots to create: ${SLOTS.length}`)

  let created = 0
  let skipped = 0
  let errors = 0

  for (const slot of SLOTS) {
    try {
      // Check if slot already exists
      const existing = await client.fetch(
        `*[_type == "slotImage" && slotId == $slotId][0]`,
        { slotId: slot.slotId }
      )

      if (existing) {
        console.log(`⏭️  Skipped: ${slot.slotId} (already exists)`)
        skipped++
        continue
      }

      // Create new slot document
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

  console.log('\n📈 Seed Summary:')
  console.log(`   Created: ${created}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Errors: ${errors}`)
  console.log(`   Total: ${SLOTS.length}`)
}

// Run the seed
seedSlots()
  .then(() => {
    console.log('\n✨ Seed complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Seed failed:', error)
    process.exit(1)
  })
