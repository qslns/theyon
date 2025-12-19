/**
 * Sync Slots Script
 *
 * Compares slots in code vs CMS and adds only missing slots
 * Run with: npx tsx scripts/sync-slots.ts
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
  large: '📐 권장: 800×1066px | 세로 3:4',
  medium: '📐 권장: 600×750px | 세로 4:5',
  small: '📐 권장: 400×533px | 세로 3:4',
  swatch: '📐 권장: 200×200px | 정사각형',
}

interface SlotData {
  slotId: string
  page: string
  section: string
  label: string
  slotSize: string
  description: string
}

// ALL 107 slots used in the codebase
const ALL_REQUIRED_SLOTS: SlotData[] = [
  // ==========================================
  // HOME PAGE (16 slots)
  // ==========================================
  { slotId: 'home-background-001', page: 'home', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `홈페이지 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'home-background-002', page: 'home', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `홈페이지 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'home-hero-001', page: 'home', section: 'hero', label: '⭐ 메인 룩', slotSize: 'hero', description: `홈페이지 첫 화면의 가장 큰 메인 이미지입니다.\n\n${SIZE_GUIDE.hero}` },
  { slotId: 'home-hero-002', page: 'home', section: 'hero', label: '📷 서브 룩', slotSize: 'medium', description: `히어로 오른쪽 상단의 보조 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'home-hero-003', page: 'home', section: 'hero', label: '🔍 디테일', slotSize: 'small', description: `히어로 섹션의 디테일 샷입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'home-hero-004', page: 'home', section: 'hero', label: '🧵 소재', slotSize: 'swatch', description: `소재/원단 스와치 이미지입니다.\n\n${SIZE_GUIDE.swatch}` },
  { slotId: 'home-philosophy-001', page: 'home', section: 'philosophy', label: '💭 철학 메인', slotSize: 'large', description: `철학 섹션의 메인 이미지입니다.\n\n${SIZE_GUIDE.large}` },
  { slotId: 'home-philosophy-002', page: 'home', section: 'philosophy', label: '💭 철학 서브', slotSize: 'medium', description: `철학 섹션의 보조 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'home-collections-001', page: 'home', section: 'collections', label: '👔 컬렉션 01', slotSize: 'large', description: `컬렉션 프리뷰 첫 번째 이미지입니다.\n\n${SIZE_GUIDE.large}` },
  { slotId: 'home-collections-002', page: 'home', section: 'collections', label: '👗 컬렉션 02', slotSize: 'medium', description: `컬렉션 프리뷰 두 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'home-collections-003', page: 'home', section: 'collections', label: '👕 컬렉션 03', slotSize: 'medium', description: `컬렉션 프리뷰 세 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'home-collections-004', page: 'home', section: 'collections', label: '👚 컬렉션 04', slotSize: 'small', description: `컬렉션 프리뷰 네 번째 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'home-process-001', page: 'home', section: 'process', label: '⚙️ 프로세스 01', slotSize: 'medium', description: `프로세스 섹션 첫 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'home-process-002', page: 'home', section: 'process', label: '⚙️ 프로세스 02', slotSize: 'medium', description: `프로세스 섹션 두 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'home-process-003', page: 'home', section: 'process', label: '⚙️ 프로세스 03', slotSize: 'small', description: `프로세스 섹션 세 번째 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'home-contact-001', page: 'home', section: 'contact', label: '📧 연락처', slotSize: 'medium', description: `연락처 섹션 이미지입니다.\n\n${SIZE_GUIDE.medium}` },

  // ==========================================
  // ABOUT PAGE (14 slots)
  // ==========================================
  { slotId: 'about-background-001', page: 'about', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `About 페이지 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'about-background-002', page: 'about', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `About 페이지 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'about-hero-001', page: 'about', section: 'hero', label: '⭐ 히어로 메인', slotSize: 'hero', description: `About 페이지 메인 히어로 이미지입니다.\n\n${SIZE_GUIDE.hero}` },
  { slotId: 'about-hero-002', page: 'about', section: 'hero', label: '📷 히어로 서브', slotSize: 'medium', description: `About 페이지 히어로 보조 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'about-hero-003', page: 'about', section: 'hero', label: '🔍 히어로 디테일', slotSize: 'small', description: `About 페이지 히어로 디테일 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'about-philosophy-001', page: 'about', section: 'philosophy', label: '💭 철학 메인', slotSize: 'large', description: `About 철학 섹션 메인 이미지입니다.\n\n${SIZE_GUIDE.large}` },
  { slotId: 'about-philosophy-002', page: 'about', section: 'philosophy', label: '💭 철학 서브', slotSize: 'medium', description: `About 철학 섹션 보조 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'about-education-001', page: 'about', section: 'education', label: '🎓 교육 01', slotSize: 'medium', description: `교육 섹션 첫 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'about-education-002', page: 'about', section: 'education', label: '🎓 교육 02', slotSize: 'medium', description: `교육 섹션 두 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'about-education-003', page: 'about', section: 'education', label: '🎓 교육 03', slotSize: 'small', description: `교육 섹션 세 번째 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'about-process-001', page: 'about', section: 'process', label: '⚙️ 프로세스 01', slotSize: 'medium', description: `About 프로세스 섹션 첫 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'about-process-002', page: 'about', section: 'process', label: '⚙️ 프로세스 02', slotSize: 'medium', description: `About 프로세스 섹션 두 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'about-process-003', page: 'about', section: 'process', label: '⚙️ 프로세스 03', slotSize: 'small', description: `About 프로세스 섹션 세 번째 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'about-contact-001', page: 'about', section: 'contact', label: '📧 연락처', slotSize: 'medium', description: `About 연락처 섹션 이미지입니다.\n\n${SIZE_GUIDE.medium}` },

  // ==========================================
  // COLLECTIONS PAGE (8 slots)
  // ==========================================
  { slotId: 'collections-background-001', page: 'collections', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `Collections 페이지 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collections-background-002', page: 'collections', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `Collections 페이지 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collections-header-001', page: 'collections', section: 'header', label: '⭐ 헤더 메인', slotSize: 'hero', description: `Collections 헤더 메인 이미지입니다.\n\n${SIZE_GUIDE.hero}` },
  { slotId: 'collections-header-002', page: 'collections', section: 'header', label: '📷 헤더 02', slotSize: 'medium', description: `Collections 헤더 두 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'collections-header-003', page: 'collections', section: 'header', label: '🔍 헤더 03', slotSize: 'small', description: `Collections 헤더 세 번째 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'collections-header-004', page: 'collections', section: 'header', label: '🧵 헤더 04', slotSize: 'swatch', description: `Collections 헤더 네 번째 이미지입니다.\n\n${SIZE_GUIDE.swatch}` },
  { slotId: 'collections-archive-001', page: 'collections', section: 'archive', label: '📦 아카이브 01', slotSize: 'medium', description: `Collections 아카이브 섹션 첫 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'collections-archive-002', page: 'collections', section: 'archive', label: '📦 아카이브 02', slotSize: 'medium', description: `Collections 아카이브 섹션 두 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },

  // ==========================================
  // ARCHIVE PAGE (8 slots)
  // ==========================================
  { slotId: 'archive-background-001', page: 'archive', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `Archive 페이지 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'archive-background-002', page: 'archive', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `Archive 페이지 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'archive-header-001', page: 'archive', section: 'header', label: '⭐ 헤더 메인', slotSize: 'hero', description: `Archive 헤더 메인 이미지입니다.\n\n${SIZE_GUIDE.hero}` },
  { slotId: 'archive-header-002', page: 'archive', section: 'header', label: '📷 헤더 02', slotSize: 'medium', description: `Archive 헤더 두 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'archive-header-003', page: 'archive', section: 'header', label: '🔍 헤더 03', slotSize: 'small', description: `Archive 헤더 세 번째 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'archive-header-004', page: 'archive', section: 'header', label: '🧵 헤더 04', slotSize: 'swatch', description: `Archive 헤더 네 번째 이미지입니다.\n\n${SIZE_GUIDE.swatch}` },
  { slotId: 'archive-cta-001', page: 'archive', section: 'cta', label: '🎯 CTA 01', slotSize: 'medium', description: `Archive CTA 섹션 첫 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'archive-cta-002', page: 'archive', section: 'cta', label: '🎯 CTA 02', slotSize: 'medium', description: `Archive CTA 섹션 두 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },

  // ==========================================
  // PROCESS PAGE (8 slots)
  // ==========================================
  { slotId: 'process-background-001', page: 'process', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `Process 페이지 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'process-background-002', page: 'process', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `Process 페이지 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'process-hero-001', page: 'process', section: 'hero', label: '✏️ 스케치', slotSize: 'medium', description: `Process 히어로 스케치 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'process-hero-002', page: 'process', section: 'hero', label: '👗 토일', slotSize: 'medium', description: `Process 히어로 토일 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'process-hero-003', page: 'process', section: 'hero', label: '🧵 패브릭', slotSize: 'medium', description: `Process 히어로 패브릭 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'process-hero-004', page: 'process', section: 'hero', label: '🎨 무드', slotSize: 'medium', description: `Process 히어로 무드 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'process-cta-001', page: 'process', section: 'cta', label: '🎯 CTA 01', slotSize: 'large', description: `Process CTA 섹션 첫 번째 이미지입니다.\n\n${SIZE_GUIDE.large}` },
  { slotId: 'process-cta-002', page: 'process', section: 'cta', label: '🎯 CTA 02', slotSize: 'medium', description: `Process CTA 섹션 두 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },

  // ==========================================
  // CONTACT PAGE (8 slots)
  // ==========================================
  { slotId: 'contact-background-001', page: 'contact', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `Contact 페이지 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'contact-background-002', page: 'contact', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `Contact 페이지 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'contact-hero-001', page: 'contact', section: 'hero', label: '⭐ 히어로 메인', slotSize: 'hero', description: `Contact 히어로 메인 이미지입니다.\n\n${SIZE_GUIDE.hero}` },
  { slotId: 'contact-hero-002', page: 'contact', section: 'hero', label: '📷 히어로 02', slotSize: 'medium', description: `Contact 히어로 두 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'contact-hero-003', page: 'contact', section: 'hero', label: '🔍 히어로 03', slotSize: 'small', description: `Contact 히어로 세 번째 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'contact-hero-004', page: 'contact', section: 'hero', label: '🧵 히어로 04', slotSize: 'swatch', description: `Contact 히어로 네 번째 이미지입니다.\n\n${SIZE_GUIDE.swatch}` },
  { slotId: 'contact-location-001', page: 'contact', section: 'location', label: '📍 위치 01', slotSize: 'medium', description: `Contact 위치 섹션 첫 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'contact-location-002', page: 'contact', section: 'location', label: '📍 위치 02', slotSize: 'medium', description: `Contact 위치 섹션 두 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },

  // ==========================================
  // LAB PAGE (13 slots)
  // ==========================================
  { slotId: 'lab-background-001', page: 'lab', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `Lab 페이지 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'lab-background-002', page: 'lab', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `Lab 페이지 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'lab-hero-001', page: 'lab', section: 'hero', label: '⭐ 히어로 메인', slotSize: 'hero', description: `Lab 히어로 메인 이미지입니다.\n\n${SIZE_GUIDE.hero}` },
  { slotId: 'lab-hero-002', page: 'lab', section: 'hero', label: '📷 히어로 02', slotSize: 'medium', description: `Lab 히어로 두 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'lab-hero-003', page: 'lab', section: 'hero', label: '🔍 히어로 03', slotSize: 'small', description: `Lab 히어로 세 번째 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'lab-hero-004', page: 'lab', section: 'hero', label: '🧵 히어로 04', slotSize: 'swatch', description: `Lab 히어로 네 번째 이미지입니다.\n\n${SIZE_GUIDE.swatch}` },
  { slotId: 'lab-failures-001', page: 'lab', section: 'failures', label: '❌ 실패 01', slotSize: 'medium', description: `Lab 실패 섹션 첫 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'lab-failures-002', page: 'lab', section: 'failures', label: '❌ 실패 02', slotSize: 'medium', description: `Lab 실패 섹션 두 번째 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'lab-failures-003', page: 'lab', section: 'failures', label: '❌ 실패 03', slotSize: 'small', description: `Lab 실패 섹션 세 번째 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'lab-failures-004', page: 'lab', section: 'failures', label: '❌ 실패 04', slotSize: 'small', description: `Lab 실패 섹션 네 번째 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'lab-method-001', page: 'lab', section: 'method', label: '🔬 관찰', slotSize: 'medium', description: `Lab 방법론 관찰 단계 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'lab-method-002', page: 'lab', section: 'method', label: '🧪 실험', slotSize: 'medium', description: `Lab 방법론 실험 단계 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'lab-method-003', page: 'lab', section: 'method', label: '💎 정제', slotSize: 'medium', description: `Lab 방법론 정제 단계 이미지입니다.\n\n${SIZE_GUIDE.medium}` },

  // ==========================================
  // COLLECTION DETAIL PAGES (32 slots - 8 per collection)
  // ==========================================
  // DECONSTRUCTION
  { slotId: 'collection-deconstruction-background-001', page: 'collection-deconstruction', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `DECONSTRUCTION 컬렉션 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-deconstruction-background-002', page: 'collection-deconstruction', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `DECONSTRUCTION 컬렉션 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-deconstruction-hero-001', page: 'collection-deconstruction', section: 'hero', label: '⭐ 메인', slotSize: 'hero', description: `DECONSTRUCTION 컬렉션의 메인 히어로 이미지입니다.\n\n${SIZE_GUIDE.hero}` },
  { slotId: 'collection-deconstruction-hero-002', page: 'collection-deconstruction', section: 'hero', label: '🔍 디테일', slotSize: 'medium', description: `DECONSTRUCTION 히어로의 디테일 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'collection-deconstruction-hero-003', page: 'collection-deconstruction', section: 'hero', label: '⚙️ 프로세스', slotSize: 'small', description: `DECONSTRUCTION 히어로의 프로세스 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'collection-deconstruction-hero-004', page: 'collection-deconstruction', section: 'hero', label: '🧵 소재', slotSize: 'swatch', description: `DECONSTRUCTION 히어로의 소재 스와치입니다.\n\n${SIZE_GUIDE.swatch}` },
  { slotId: 'collection-deconstruction-gallery-001', page: 'collection-deconstruction', section: 'gallery', label: '👔 룩 01', slotSize: 'large', description: `DECONSTRUCTION 갤러리의 첫 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.large}` },
  { slotId: 'collection-deconstruction-gallery-002', page: 'collection-deconstruction', section: 'gallery', label: '👗 룩 02', slotSize: 'medium', description: `DECONSTRUCTION 갤러리의 두 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.medium}` },

  // FRAGMENTS
  { slotId: 'collection-fragments-background-001', page: 'collection-fragments', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `FRAGMENTS 컬렉션 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-fragments-background-002', page: 'collection-fragments', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `FRAGMENTS 컬렉션 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-fragments-hero-001', page: 'collection-fragments', section: 'hero', label: '⭐ 메인', slotSize: 'hero', description: `FRAGMENTS 컬렉션의 메인 히어로 이미지입니다.\n\n${SIZE_GUIDE.hero}` },
  { slotId: 'collection-fragments-hero-002', page: 'collection-fragments', section: 'hero', label: '🔍 디테일', slotSize: 'medium', description: `FRAGMENTS 히어로의 디테일 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'collection-fragments-hero-003', page: 'collection-fragments', section: 'hero', label: '⚙️ 프로세스', slotSize: 'small', description: `FRAGMENTS 히어로의 프로세스 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'collection-fragments-hero-004', page: 'collection-fragments', section: 'hero', label: '🧵 소재', slotSize: 'swatch', description: `FRAGMENTS 히어로의 소재 스와치입니다.\n\n${SIZE_GUIDE.swatch}` },
  { slotId: 'collection-fragments-gallery-001', page: 'collection-fragments', section: 'gallery', label: '👔 룩 01', slotSize: 'large', description: `FRAGMENTS 갤러리의 첫 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.large}` },
  { slotId: 'collection-fragments-gallery-002', page: 'collection-fragments', section: 'gallery', label: '👗 룩 02', slotSize: 'medium', description: `FRAGMENTS 갤러리의 두 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.medium}` },

  // VOID
  { slotId: 'collection-void-background-001', page: 'collection-void', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `VOID 컬렉션 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-void-background-002', page: 'collection-void', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `VOID 컬렉션 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-void-hero-001', page: 'collection-void', section: 'hero', label: '⭐ 메인', slotSize: 'hero', description: `VOID 컬렉션의 메인 히어로 이미지입니다.\n\n${SIZE_GUIDE.hero}` },
  { slotId: 'collection-void-hero-002', page: 'collection-void', section: 'hero', label: '🔍 디테일', slotSize: 'medium', description: `VOID 히어로의 디테일 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'collection-void-hero-003', page: 'collection-void', section: 'hero', label: '⚙️ 프로세스', slotSize: 'small', description: `VOID 히어로의 프로세스 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'collection-void-hero-004', page: 'collection-void', section: 'hero', label: '🧵 소재', slotSize: 'swatch', description: `VOID 히어로의 소재 스와치입니다.\n\n${SIZE_GUIDE.swatch}` },
  { slotId: 'collection-void-gallery-001', page: 'collection-void', section: 'gallery', label: '👔 룩 01', slotSize: 'large', description: `VOID 갤러리의 첫 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.large}` },
  { slotId: 'collection-void-gallery-002', page: 'collection-void', section: 'gallery', label: '👗 룩 02', slotSize: 'medium', description: `VOID 갤러리의 두 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.medium}` },

  // ORIGIN
  { slotId: 'collection-origin-background-001', page: 'collection-origin', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `ORIGIN 컬렉션 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-origin-background-002', page: 'collection-origin', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `ORIGIN 컬렉션 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-origin-hero-001', page: 'collection-origin', section: 'hero', label: '⭐ 메인', slotSize: 'hero', description: `ORIGIN 컬렉션의 메인 히어로 이미지입니다.\n\n${SIZE_GUIDE.hero}` },
  { slotId: 'collection-origin-hero-002', page: 'collection-origin', section: 'hero', label: '🔍 디테일', slotSize: 'medium', description: `ORIGIN 히어로의 디테일 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'collection-origin-hero-003', page: 'collection-origin', section: 'hero', label: '⚙️ 프로세스', slotSize: 'small', description: `ORIGIN 히어로의 프로세스 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'collection-origin-hero-004', page: 'collection-origin', section: 'hero', label: '🧵 소재', slotSize: 'swatch', description: `ORIGIN 히어로의 소재 스와치입니다.\n\n${SIZE_GUIDE.swatch}` },
  { slotId: 'collection-origin-gallery-001', page: 'collection-origin', section: 'gallery', label: '👔 룩 01', slotSize: 'large', description: `ORIGIN 갤러리의 첫 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.large}` },
  { slotId: 'collection-origin-gallery-002', page: 'collection-origin', section: 'gallery', label: '👗 룩 02', slotSize: 'medium', description: `ORIGIN 갤러리의 두 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
]

async function syncSlots() {
  console.log('🔄 Starting slot sync...')
  console.log(`📊 Total required slots: ${ALL_REQUIRED_SLOTS.length}`)

  // Get all existing slots from CMS
  const existingSlots = await client.fetch<Array<{ _id: string; slotId: string }>>(
    `*[_type == "slotImage"]{ _id, slotId }`
  )
  console.log(`📦 Existing slots in CMS: ${existingSlots.length}`)

  const existingSlotIds = new Set(existingSlots.map(s => s.slotId))

  // Find missing slots
  const missingSlots = ALL_REQUIRED_SLOTS.filter(slot => !existingSlotIds.has(slot.slotId))
  console.log(`❌ Missing slots: ${missingSlots.length}`)

  if (missingSlots.length === 0) {
    console.log('✅ All slots already exist in CMS!')
    return
  }

  console.log('\n📝 Missing slots:')
  missingSlots.forEach(slot => console.log(`   - ${slot.slotId}`))

  // Create missing slots
  let created = 0
  let errors = 0

  console.log('\n🚀 Creating missing slots...')

  for (const slot of missingSlots) {
    try {
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

  console.log('\n📈 Sync Summary:')
  console.log(`   Required: ${ALL_REQUIRED_SLOTS.length}`)
  console.log(`   Already existed: ${existingSlots.length}`)
  console.log(`   Created: ${created}`)
  console.log(`   Errors: ${errors}`)
  console.log(`   Total now: ${existingSlots.length + created}`)
}

syncSlots()
  .then(() => {
    console.log('\n✨ Sync complete!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error:', err)
    process.exit(1)
  })
