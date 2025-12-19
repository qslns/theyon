/**
 * Sanity Slot Seed Script
 *
 * Creates all slot documents in Sanity CMS
 * Run with: npx tsx scripts/seed-slots.ts
 */

import * as dotenv from 'dotenv'
import { createClient } from '@sanity/client'

dotenv.config({ path: '.env.local' })

console.log('🔑 Token loaded:', process.env.SANITY_API_TOKEN ? 'Yes' : 'No')

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

// 이미지 사이즈 가이드
const SIZE_GUIDE = {
  background: '📐 권장: 1920×1080px 이상 | 가로형 | 투명도 낮게 표시됨',
  hero: '📐 권장: 1200×1600px | 세로 3:4 | 메인 이미지',
  large: '📐 권장: 800×1066px | 세로 3:4 | 큰 이미지',
  medium: '📐 권장: 600×750px | 세로 4:5 | 중간 이미지',
  small: '📐 권장: 400×533px | 세로 3:4 | 작은 이미지',
  'small-square': '📐 권장: 400×400px | 정사각형',
  tiny: '📐 권장: 200×200px | 정사각형 | 아주 작게 표시',
  swatch: '📐 권장: 200×200px | 정사각형 | 소재/텍스처용',
  micro: '📐 권장: 100×100px | 정사각형 | 아이콘 크기',
}

// All slots ACTUALLY USED in the codebase (75 total)
const SLOTS: SlotData[] = [
  // ==========================================
  // HOME PAGE (16 slots)
  // ==========================================
  {
    slotId: 'home-background-001',
    page: 'home',
    section: 'background',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `홈페이지 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}\n\n💡 팁: 스튜디오 전경, 작업실 분위기 등 브랜드를 대표하는 이미지를 넣으세요. 매우 낮은 투명도(2%)로 표시되어 은은한 분위기만 연출합니다.`,
  },
  {
    slotId: 'home-background-002',
    page: 'home',
    section: 'background',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `홈페이지 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}\n\n💡 팁: 세로로 긴 이미지 권장. 페이지 스크롤 시 함께 움직이며 깊이감을 더합니다.`,
  },
  {
    slotId: 'home-hero-001',
    page: 'home',
    section: 'hero',
    label: '⭐ 메인 룩',
    slotSize: 'hero',
    description: `홈페이지 첫 화면의 가장 큰 메인 이미지입니다.\n\n${SIZE_GUIDE.hero}\n\n💡 팁: 가장 자신있는 룩/작품 이미지를 넣으세요. 화면 왼쪽으로 약간 넘치게 배치되어 임팩트를 줍니다.`,
  },
  {
    slotId: 'home-hero-002',
    page: 'home',
    section: 'hero',
    label: '📷 서브 룩',
    slotSize: 'medium',
    description: `히어로 오른쪽 상단의 보조 이미지입니다.\n\n${SIZE_GUIDE.medium}\n\n💡 팁: 메인 룩과 다른 각도 또는 두 번째로 좋은 룩 이미지를 넣으세요.`,
  },
  {
    slotId: 'home-hero-003',
    page: 'home',
    section: 'hero',
    label: '🔍 디테일',
    slotSize: 'small',
    description: `히어로 섹션의 디테일 샷입니다.\n\n${SIZE_GUIDE.small}\n\n💡 팁: 봉제 디테일, 소재 클로즈업 등을 보여주세요.`,
  },
  {
    slotId: 'home-hero-004',
    page: 'home',
    section: 'hero',
    label: '🧵 소재',
    slotSize: 'swatch',
    description: `소재/원단 스와치 이미지입니다.\n\n${SIZE_GUIDE.swatch}\n\n💡 팁: 사용한 원단을 가까이서 촬영한 이미지.`,
  },
  {
    slotId: 'home-philosophy-001',
    page: 'home',
    section: 'philosophy',
    label: '💭 무드',
    slotSize: 'medium',
    description: `철학 섹션의 무드 이미지입니다.\n\n${SIZE_GUIDE.medium}\n\n💡 팁: 브랜드의 분위기를 전달하는 감성적인 이미지.`,
  },
  {
    slotId: 'home-philosophy-002',
    page: 'home',
    section: 'philosophy',
    label: '✏️ 스케치',
    slotSize: 'small',
    description: `철학 섹션의 스케치 이미지입니다.\n\n${SIZE_GUIDE.small}\n\n💡 팁: 디자인 스케치, 크로키, 아이디어 드로잉.`,
  },
  {
    slotId: 'home-collections-001',
    page: 'home',
    section: 'collections-preview',
    label: '👔 DECONSTRUCTION',
    slotSize: 'large',
    description: `컬렉션 프리뷰의 DECONSTRUCTION 대표 이미지입니다.\n\n${SIZE_GUIDE.large}\n\n💡 팁: 클릭하면 컬렉션 페이지로 이동합니다.`,
  },
  {
    slotId: 'home-collections-002',
    page: 'home',
    section: 'collections-preview',
    label: '👗 FRAGMENTS',
    slotSize: 'medium',
    description: `컬렉션 프리뷰의 FRAGMENTS 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },
  {
    slotId: 'home-collections-003',
    page: 'home',
    section: 'collections-preview',
    label: '🌑 VOID',
    slotSize: 'small',
    description: `컬렉션 프리뷰의 VOID 이미지입니다.\n\n${SIZE_GUIDE.small}\n\n💡 팁: 흑백으로 표시됩니다.`,
  },
  {
    slotId: 'home-collections-004',
    page: 'home',
    section: 'collections-preview',
    label: '🧶 소재',
    slotSize: 'swatch',
    description: `컬렉션 프리뷰의 소재 스와치입니다.\n\n${SIZE_GUIDE.swatch}`,
  },
  {
    slotId: 'home-process-001',
    page: 'home',
    section: 'process-teaser',
    label: '📝 스케치',
    slotSize: 'medium',
    description: `프로세스 섹션의 스케치 이미지입니다.\n\n${SIZE_GUIDE.medium}\n\n💡 팁: 디자인의 시작점을 보여주는 스케치.`,
  },
  {
    slotId: 'home-process-002',
    page: 'home',
    section: 'process-teaser',
    label: '👕 토일',
    slotSize: 'small',
    description: `프로세스 섹션의 토일 이미지입니다.\n\n${SIZE_GUIDE.small}\n\n💡 팁: 테스트 의류 이미지. 세피아 톤으로 표시됩니다.`,
  },
  {
    slotId: 'home-process-003',
    page: 'home',
    section: 'process-teaser',
    label: '✅ 완성',
    slotSize: 'small-square',
    description: `프로세스 섹션의 완성품 이미지입니다.\n\n${SIZE_GUIDE['small-square']}\n\n💡 팁: 체크 마크와 함께 표시됩니다.`,
  },
  {
    slotId: 'home-contact-001',
    page: 'home',
    section: 'contact-cta',
    label: '📍 스튜디오',
    slotSize: 'small',
    description: `연락처 섹션의 스튜디오 이미지입니다.\n\n${SIZE_GUIDE.small}\n\n💡 팁: 흑백으로 표시됩니다.`,
  },

  // ==========================================
  // ABOUT PAGE (14 slots)
  // ==========================================
  {
    slotId: 'about-background-001',
    page: 'about',
    section: 'background',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `About 페이지 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}`,
  },
  {
    slotId: 'about-background-002',
    page: 'about',
    section: 'background',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `About 페이지 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}`,
  },
  {
    slotId: 'about-hero-001',
    page: 'about',
    section: 'hero',
    label: '⭐ 프로필',
    slotSize: 'hero',
    description: `About 페이지의 메인 프로필 이미지입니다.\n\n${SIZE_GUIDE.hero}\n\n💡 팁: 디자이너 본인의 프로필 사진 또는 작업하는 모습.`,
  },
  {
    slotId: 'about-hero-002',
    page: 'about',
    section: 'hero',
    label: '🏠 스튜디오',
    slotSize: 'large',
    description: `About 히어로의 스튜디오 이미지입니다.\n\n${SIZE_GUIDE.large}`,
  },
  {
    slotId: 'about-hero-003',
    page: 'about',
    section: 'hero',
    label: '🤲 손 작업',
    slotSize: 'medium',
    description: `About 히어로의 손 작업 이미지입니다.\n\n${SIZE_GUIDE.medium}\n\n💡 팁: 재봉, 패턴 작업 등 손으로 만드는 과정.`,
  },
  {
    slotId: 'about-philosophy-001',
    page: 'about',
    section: 'philosophy',
    label: '💭 비전',
    slotSize: 'medium',
    description: `철학 섹션의 비전 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },
  {
    slotId: 'about-philosophy-002',
    page: 'about',
    section: 'philosophy',
    label: '✏️ 아이디어',
    slotSize: 'small',
    description: `철학 섹션의 아이디어 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'about-education-001',
    page: 'about',
    section: 'education',
    label: '📚 학습',
    slotSize: 'medium',
    description: `교육 섹션의 학습 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },
  {
    slotId: 'about-education-002',
    page: 'about',
    section: 'education',
    label: '👔 토일',
    slotSize: 'small',
    description: `교육 섹션의 토일 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'about-education-003',
    page: 'about',
    section: 'education',
    label: '📐 패턴',
    slotSize: 'small',
    description: `교육 섹션의 패턴 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'about-process-001',
    page: 'about',
    section: 'process',
    label: '🔬 리서치',
    slotSize: 'medium',
    description: `프로세스 섹션의 리서치 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },
  {
    slotId: 'about-process-002',
    page: 'about',
    section: 'process',
    label: '🧪 프로토타입',
    slotSize: 'small',
    description: `프로세스 섹션의 프로토타입 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'about-process-003',
    page: 'about',
    section: 'process',
    label: '✨ 완성',
    slotSize: 'small',
    description: `프로세스 섹션의 완성 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'about-contact-001',
    page: 'about',
    section: 'contact',
    label: '📧 연락',
    slotSize: 'small',
    description: `About 연락처 섹션의 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },

  // ==========================================
  // COLLECTIONS PAGE (8 slots)
  // ==========================================
  {
    slotId: 'collections-background-001',
    page: 'collections',
    section: 'background',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `Collections 페이지 고정 배경입니다.\n\n${SIZE_GUIDE.background}`,
  },
  {
    slotId: 'collections-background-002',
    page: 'collections',
    section: 'background',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `Collections 페이지 스크롤 배경입니다.\n\n${SIZE_GUIDE.background}`,
  },
  {
    slotId: 'collections-header-001',
    page: 'collections',
    section: 'header',
    label: '⭐ 피처드',
    slotSize: 'hero',
    description: `컬렉션 페이지의 메인 피처드 이미지입니다.\n\n${SIZE_GUIDE.hero}`,
  },
  {
    slotId: 'collections-header-002',
    page: 'collections',
    section: 'header',
    label: '📷 룩 02',
    slotSize: 'large',
    description: `헤더의 두 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.large}`,
  },
  {
    slotId: 'collections-header-003',
    page: 'collections',
    section: 'header',
    label: '🔍 디테일',
    slotSize: 'medium',
    description: `헤더의 디테일 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },
  {
    slotId: 'collections-header-004',
    page: 'collections',
    section: 'header',
    label: '🧵 패브릭',
    slotSize: 'swatch',
    description: `헤더의 소재 스와치입니다.\n\n${SIZE_GUIDE.swatch}`,
  },
  {
    slotId: 'collections-archive-001',
    page: 'collections',
    section: 'archive',
    label: '📁 아카이브',
    slotSize: 'medium',
    description: `아카이브 섹션의 메인 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },
  {
    slotId: 'collections-archive-002',
    page: 'collections',
    section: 'archive',
    label: '⚙️ 프로세스',
    slotSize: 'small',
    description: `아카이브 섹션의 프로세스 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },

  // ==========================================
  // ARCHIVE PAGE (8 slots)
  // ==========================================
  {
    slotId: 'archive-background-001',
    page: 'archive',
    section: 'background',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `Archive 페이지 고정 배경입니다.\n\n${SIZE_GUIDE.background}`,
  },
  {
    slotId: 'archive-background-002',
    page: 'archive',
    section: 'background',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `Archive 페이지 스크롤 배경입니다.\n\n${SIZE_GUIDE.background}`,
  },
  {
    slotId: 'archive-header-001',
    page: 'archive',
    section: 'header',
    label: '⭐ 아카이브 메인',
    slotSize: 'hero',
    description: `Archive 페이지의 메인 이미지입니다.\n\n${SIZE_GUIDE.hero}`,
  },
  {
    slotId: 'archive-header-002',
    page: 'archive',
    section: 'header',
    label: '⚙️ 프로세스',
    slotSize: 'large',
    description: `Archive 헤더의 프로세스 이미지입니다.\n\n${SIZE_GUIDE.large}`,
  },
  {
    slotId: 'archive-header-003',
    page: 'archive',
    section: 'header',
    label: '🔬 리서치',
    slotSize: 'medium',
    description: `Archive 헤더의 리서치 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },
  {
    slotId: 'archive-header-004',
    page: 'archive',
    section: 'header',
    label: '📖 스터디',
    slotSize: 'small',
    description: `Archive 헤더의 스터디 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'archive-cta-001',
    page: 'archive',
    section: 'cta',
    label: '🎯 결과',
    slotSize: 'small',
    description: `Archive CTA의 결과 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'archive-cta-002',
    page: 'archive',
    section: 'cta',
    label: '✅ 완성',
    slotSize: 'tiny',
    description: `Archive CTA의 완성 이미지입니다.\n\n${SIZE_GUIDE.tiny}`,
  },

  // ==========================================
  // PROCESS PAGE (8 slots)
  // ==========================================
  {
    slotId: 'process-background-001',
    page: 'process',
    section: 'background',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `Process 페이지 고정 배경입니다.\n\n${SIZE_GUIDE.background}`,
  },
  {
    slotId: 'process-background-002',
    page: 'process',
    section: 'background',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `Process 페이지 스크롤 배경입니다.\n\n${SIZE_GUIDE.background}`,
  },
  {
    slotId: 'process-hero-001',
    page: 'process',
    section: 'hero',
    label: '✏️ 스케치',
    slotSize: 'medium',
    description: `Process 히어로의 스케치 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },
  {
    slotId: 'process-hero-002',
    page: 'process',
    section: 'hero',
    label: '👕 토일',
    slotSize: 'small',
    description: `Process 히어로의 토일 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'process-hero-003',
    page: 'process',
    section: 'hero',
    label: '🧵 패브릭',
    slotSize: 'small',
    description: `Process 히어로의 패브릭 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'process-hero-004',
    page: 'process',
    section: 'hero',
    label: '💭 무드',
    slotSize: 'tiny',
    description: `Process 히어로의 무드 이미지입니다.\n\n${SIZE_GUIDE.tiny}`,
  },
  {
    slotId: 'process-cta-001',
    page: 'process',
    section: 'cta',
    label: '✨ 완성',
    slotSize: 'small',
    description: `Process CTA의 완성 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'process-cta-002',
    page: 'process',
    section: 'cta',
    label: '🎯 결과',
    slotSize: 'tiny',
    description: `Process CTA의 결과 이미지입니다.\n\n${SIZE_GUIDE.tiny}`,
  },

  // ==========================================
  // CONTACT PAGE (8 slots)
  // ==========================================
  {
    slotId: 'contact-background-001',
    page: 'contact',
    section: 'background',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `Contact 페이지 고정 배경입니다.\n\n${SIZE_GUIDE.background}`,
  },
  {
    slotId: 'contact-background-002',
    page: 'contact',
    section: 'background',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `Contact 페이지 스크롤 배경입니다.\n\n${SIZE_GUIDE.background}`,
  },
  {
    slotId: 'contact-hero-001',
    page: 'contact',
    section: 'hero',
    label: '⭐ 스튜디오',
    slotSize: 'hero',
    description: `Contact 페이지의 스튜디오 메인 이미지입니다.\n\n${SIZE_GUIDE.hero}`,
  },
  {
    slotId: 'contact-hero-002',
    page: 'contact',
    section: 'hero',
    label: '📞 연락처',
    slotSize: 'large',
    description: `Contact 히어로의 연락처 관련 이미지입니다.\n\n${SIZE_GUIDE.large}`,
  },
  {
    slotId: 'contact-hero-003',
    page: 'contact',
    section: 'hero',
    label: '📍 서울',
    slotSize: 'medium',
    description: `Contact 히어로의 위치 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },
  {
    slotId: 'contact-hero-004',
    page: 'contact',
    section: 'hero',
    label: '✉️ 메일',
    slotSize: 'small',
    description: `Contact 히어로의 메일 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'contact-location-001',
    page: 'contact',
    section: 'location',
    label: '🗺️ 위치',
    slotSize: 'medium',
    description: `Location 섹션의 서울 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },
  {
    slotId: 'contact-location-002',
    page: 'contact',
    section: 'location',
    label: '🏠 공간',
    slotSize: 'small',
    description: `Location 섹션의 스튜디오 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },

  // ==========================================
  // LAB PAGE (13 slots)
  // ==========================================
  {
    slotId: 'lab-background-001',
    page: 'lab',
    section: 'background',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `Lab 페이지 고정 배경입니다.\n\n${SIZE_GUIDE.background}`,
  },
  {
    slotId: 'lab-background-002',
    page: 'lab',
    section: 'background',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `Lab 페이지 스크롤 배경입니다.\n\n${SIZE_GUIDE.background}`,
  },
  {
    slotId: 'lab-hero-001',
    page: 'lab',
    section: 'hero',
    label: '⭐ 실험 메인',
    slotSize: 'hero',
    description: `Lab 페이지의 메인 실험 이미지입니다.\n\n${SIZE_GUIDE.hero}`,
  },
  {
    slotId: 'lab-hero-002',
    page: 'lab',
    section: 'hero',
    label: '🧪 테스트',
    slotSize: 'large',
    description: `Lab 히어로의 테스트 이미지입니다.\n\n${SIZE_GUIDE.large}`,
  },
  {
    slotId: 'lab-hero-003',
    page: 'lab',
    section: 'hero',
    label: '🔬 샘플',
    slotSize: 'medium',
    description: `Lab 히어로의 샘플 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },
  {
    slotId: 'lab-hero-004',
    page: 'lab',
    section: 'hero',
    label: '🔄 반복',
    slotSize: 'small',
    description: `Lab 히어로의 이터레이션 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'lab-failures-001',
    page: 'lab',
    section: 'failures',
    label: '❌ 실패 01',
    slotSize: 'medium',
    description: `실패 섹션의 첫 번째 거절된 작업 이미지입니다.\n\n${SIZE_GUIDE.medium}\n\n💡 팁: 실패도 과정의 일부입니다.`,
  },
  {
    slotId: 'lab-failures-002',
    page: 'lab',
    section: 'failures',
    label: '❌ 실패한 토일',
    slotSize: 'small',
    description: `실패 섹션의 실패한 토일 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'lab-failures-003',
    page: 'lab',
    section: 'failures',
    label: '🚫 잘못된 방향',
    slotSize: 'small',
    description: `실패 섹션의 잘못된 방향 이미지입니다.\n\n${SIZE_GUIDE.small}`,
  },
  {
    slotId: 'lab-failures-004',
    page: 'lab',
    section: 'failures',
    label: '🔁 반복 03',
    slotSize: 'tiny',
    description: `실패 섹션의 이터레이션 이미지입니다.\n\n${SIZE_GUIDE.tiny}`,
  },
  {
    slotId: 'lab-method-001',
    page: 'lab',
    section: 'method',
    label: '👁️ 관찰',
    slotSize: 'medium',
    description: `방법론 섹션의 "Observe" 관찰 단계 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },
  {
    slotId: 'lab-method-002',
    page: 'lab',
    section: 'method',
    label: '🧪 실험',
    slotSize: 'medium',
    description: `방법론 섹션의 "Experiment" 실험 단계 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },
  {
    slotId: 'lab-method-003',
    page: 'lab',
    section: 'method',
    label: '💎 정제',
    slotSize: 'medium',
    description: `방법론 섹션의 "Refine" 정제 단계 이미지입니다.\n\n${SIZE_GUIDE.medium}`,
  },

  // ==========================================
  // COLLECTION DETAIL PAGES (32 slots - 8 per collection)
  // ==========================================
  // DECONSTRUCTION
  { slotId: 'collection-deconstruction-background-001', page: 'collection-deconstruction', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `DECONSTRUCTION 컬렉션 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-deconstruction-background-002', page: 'collection-deconstruction', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `DECONSTRUCTION 컬렉션 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-deconstruction-hero-001', page: 'collection-deconstruction', section: 'hero', label: '⭐ DECONSTRUCTION 메인', slotSize: 'hero', description: `DECONSTRUCTION 컬렉션의 메인 히어로 이미지입니다.\n\n${SIZE_GUIDE.hero}\n\n💡 팁: 이 컬렉션을 대표하는 가장 강력한 룩 이미지.` },
  { slotId: 'collection-deconstruction-hero-002', page: 'collection-deconstruction', section: 'hero', label: '🔍 디테일', slotSize: 'medium', description: `DECONSTRUCTION 히어로의 디테일 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'collection-deconstruction-hero-003', page: 'collection-deconstruction', section: 'hero', label: '⚙️ 프로세스', slotSize: 'small', description: `DECONSTRUCTION 히어로의 프로세스 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'collection-deconstruction-hero-004', page: 'collection-deconstruction', section: 'hero', label: '🧵 소재', slotSize: 'swatch', description: `DECONSTRUCTION 히어로의 소재 스와치입니다.\n\n${SIZE_GUIDE.swatch}` },
  { slotId: 'collection-deconstruction-gallery-001', page: 'collection-deconstruction', section: 'gallery', label: '👔 룩 01', slotSize: 'large', description: `DECONSTRUCTION 갤러리의 첫 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.large}` },
  { slotId: 'collection-deconstruction-gallery-002', page: 'collection-deconstruction', section: 'gallery', label: '👗 룩 02', slotSize: 'medium', description: `DECONSTRUCTION 갤러리의 두 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.medium}` },

  // FRAGMENTS
  { slotId: 'collection-fragments-background-001', page: 'collection-fragments', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `FRAGMENTS 컬렉션 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-fragments-background-002', page: 'collection-fragments', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `FRAGMENTS 컬렉션 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-fragments-hero-001', page: 'collection-fragments', section: 'hero', label: '⭐ FRAGMENTS 메인', slotSize: 'hero', description: `FRAGMENTS 컬렉션의 메인 히어로 이미지입니다.\n\n${SIZE_GUIDE.hero}\n\n💡 팁: 이 컬렉션을 대표하는 가장 강력한 룩 이미지.` },
  { slotId: 'collection-fragments-hero-002', page: 'collection-fragments', section: 'hero', label: '🔍 디테일', slotSize: 'medium', description: `FRAGMENTS 히어로의 디테일 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'collection-fragments-hero-003', page: 'collection-fragments', section: 'hero', label: '⚙️ 프로세스', slotSize: 'small', description: `FRAGMENTS 히어로의 프로세스 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'collection-fragments-hero-004', page: 'collection-fragments', section: 'hero', label: '🧵 소재', slotSize: 'swatch', description: `FRAGMENTS 히어로의 소재 스와치입니다.\n\n${SIZE_GUIDE.swatch}` },
  { slotId: 'collection-fragments-gallery-001', page: 'collection-fragments', section: 'gallery', label: '👔 룩 01', slotSize: 'large', description: `FRAGMENTS 갤러리의 첫 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.large}` },
  { slotId: 'collection-fragments-gallery-002', page: 'collection-fragments', section: 'gallery', label: '👗 룩 02', slotSize: 'medium', description: `FRAGMENTS 갤러리의 두 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.medium}` },

  // VOID
  { slotId: 'collection-void-background-001', page: 'collection-void', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `VOID 컬렉션 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-void-background-002', page: 'collection-void', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `VOID 컬렉션 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-void-hero-001', page: 'collection-void', section: 'hero', label: '⭐ VOID 메인', slotSize: 'hero', description: `VOID 컬렉션의 메인 히어로 이미지입니다.\n\n${SIZE_GUIDE.hero}\n\n💡 팁: 이 컬렉션을 대표하는 가장 강력한 룩 이미지.` },
  { slotId: 'collection-void-hero-002', page: 'collection-void', section: 'hero', label: '🔍 디테일', slotSize: 'medium', description: `VOID 히어로의 디테일 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'collection-void-hero-003', page: 'collection-void', section: 'hero', label: '⚙️ 프로세스', slotSize: 'small', description: `VOID 히어로의 프로세스 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'collection-void-hero-004', page: 'collection-void', section: 'hero', label: '🧵 소재', slotSize: 'swatch', description: `VOID 히어로의 소재 스와치입니다.\n\n${SIZE_GUIDE.swatch}` },
  { slotId: 'collection-void-gallery-001', page: 'collection-void', section: 'gallery', label: '👔 룩 01', slotSize: 'large', description: `VOID 갤러리의 첫 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.large}` },
  { slotId: 'collection-void-gallery-002', page: 'collection-void', section: 'gallery', label: '👗 룩 02', slotSize: 'medium', description: `VOID 갤러리의 두 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.medium}` },

  // ORIGIN
  { slotId: 'collection-origin-background-001', page: 'collection-origin', section: 'background', label: '🖼️ 배경', slotSize: 'background', description: `ORIGIN 컬렉션 고정 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-origin-background-002', page: 'collection-origin', section: 'background', label: '🖼️ 스크롤 배경', slotSize: 'background', description: `ORIGIN 컬렉션 스크롤 배경 이미지입니다.\n\n${SIZE_GUIDE.background}` },
  { slotId: 'collection-origin-hero-001', page: 'collection-origin', section: 'hero', label: '⭐ ORIGIN 메인', slotSize: 'hero', description: `ORIGIN 컬렉션의 메인 히어로 이미지입니다.\n\n${SIZE_GUIDE.hero}\n\n💡 팁: 이 컬렉션을 대표하는 가장 강력한 룩 이미지.` },
  { slotId: 'collection-origin-hero-002', page: 'collection-origin', section: 'hero', label: '🔍 디테일', slotSize: 'medium', description: `ORIGIN 히어로의 디테일 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
  { slotId: 'collection-origin-hero-003', page: 'collection-origin', section: 'hero', label: '⚙️ 프로세스', slotSize: 'small', description: `ORIGIN 히어로의 프로세스 이미지입니다.\n\n${SIZE_GUIDE.small}` },
  { slotId: 'collection-origin-hero-004', page: 'collection-origin', section: 'hero', label: '🧵 소재', slotSize: 'swatch', description: `ORIGIN 히어로의 소재 스와치입니다.\n\n${SIZE_GUIDE.swatch}` },
  { slotId: 'collection-origin-gallery-001', page: 'collection-origin', section: 'gallery', label: '👔 룩 01', slotSize: 'large', description: `ORIGIN 갤러리의 첫 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.large}` },
  { slotId: 'collection-origin-gallery-002', page: 'collection-origin', section: 'gallery', label: '👗 룩 02', slotSize: 'medium', description: `ORIGIN 갤러리의 두 번째 룩 이미지입니다.\n\n${SIZE_GUIDE.medium}` },
]

async function seedSlots() {
  console.log('🌱 Starting slot seed...')
  console.log(`📊 Total slots to create: ${SLOTS.length}`)

  let created = 0
  let skipped = 0
  let errors = 0

  for (const slot of SLOTS) {
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

  console.log('\n📈 Seed Summary:')
  console.log(`   Created: ${created}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Errors: ${errors}`)
  console.log(`   Total: ${SLOTS.length}`)
}

seedSlots()
  .then(() => {
    console.log('\n✨ Seed complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Seed failed:', error)
    process.exit(1)
  })
