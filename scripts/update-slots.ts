/**
 * Sanity Slot Update Script
 *
 * Updates all slot documents with improved descriptions and guides
 * Run with: npx tsx scripts/update-slots.ts
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

interface SlotUpdate {
  slotId: string
  label: string
  description: string
  slotSize: string
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

// 모든 슬롯의 업데이트 정보
const SLOT_UPDATES: SlotUpdate[] = [
  // ==========================================
  // HOME PAGE (16 slots)
  // ==========================================
  {
    slotId: 'home-background-001',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `홈페이지 고정 배경 이미지입니다.

${SIZE_GUIDE.background}

💡 팁: 스튜디오 전경, 작업실 분위기 등 브랜드를 대표하는 이미지를 넣으세요. 매우 낮은 투명도(2%)로 표시되어 은은한 분위기만 연출합니다.`,
  },
  {
    slotId: 'home-background-002',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `홈페이지 스크롤 배경 이미지입니다.

${SIZE_GUIDE.background}

💡 팁: 세로로 긴 이미지 권장. 페이지 스크롤 시 함께 움직이며 깊이감을 더합니다.`,
  },
  {
    slotId: 'home-hero-001',
    label: '⭐ 메인 룩',
    slotSize: 'hero',
    description: `홈페이지 첫 화면의 가장 큰 메인 이미지입니다.

${SIZE_GUIDE.hero}

💡 팁: 가장 자신있는 룩/작품 이미지를 넣으세요. 화면 왼쪽으로 약간 넘치게 배치되어 임팩트를 줍니다. 전신 룩 사진이 가장 효과적입니다.`,
  },
  {
    slotId: 'home-hero-002',
    label: '📷 서브 룩',
    slotSize: 'medium',
    description: `히어로 오른쪽 상단의 보조 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 메인 룩과 다른 각도 또는 두 번째로 좋은 룩 이미지를 넣으세요. 폴라로이드 스타일로 표시됩니다.`,
  },
  {
    slotId: 'home-hero-003',
    label: '🔍 디테일',
    slotSize: 'small',
    description: `히어로 섹션의 디테일 샷입니다.

${SIZE_GUIDE.small}

💡 팁: 봉제 디테일, 소재 클로즈업, 특별한 디자인 포인트 등을 보여주세요. 작품의 퀄리티를 증명하는 이미지입니다.`,
  },
  {
    slotId: 'home-hero-004',
    label: '🧵 소재',
    slotSize: 'swatch',
    description: `소재/원단 스와치 이미지입니다.

${SIZE_GUIDE.swatch}

💡 팁: 사용한 원단을 가까이서 촬영한 이미지. 질감이 잘 보이도록 조명에 신경쓰세요.`,
  },
  {
    slotId: 'home-philosophy-001',
    label: '💭 무드',
    slotSize: 'medium',
    description: `철학 섹션의 무드 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 브랜드의 분위기를 전달하는 감성적인 이미지. 작업 과정, 영감, 레퍼런스 등 "왜 이 작업을 하는가"를 보여주세요.`,
  },
  {
    slotId: 'home-philosophy-002',
    label: '✏️ 스케치',
    slotSize: 'small',
    description: `철학 섹션의 스케치/드로잉 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 디자인 스케치, 크로키, 아이디어 드로잉 등. 창작 과정을 보여주는 이미지가 좋습니다.`,
  },
  {
    slotId: 'home-collections-001',
    label: '👔 DECONSTRUCTION',
    slotSize: 'large',
    description: `컬렉션 프리뷰의 첫 번째 컬렉션 대표 이미지입니다.

${SIZE_GUIDE.large}

💡 팁: DECONSTRUCTION 컬렉션의 가장 대표적인 룩. 클릭하면 컬렉션 페이지로 이동합니다.`,
  },
  {
    slotId: 'home-collections-002',
    label: '👗 FRAGMENTS',
    slotSize: 'medium',
    description: `컬렉션 프리뷰의 두 번째 컬렉션 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: FRAGMENTS 컬렉션의 대표 이미지를 넣으세요.`,
  },
  {
    slotId: 'home-collections-003',
    label: '🌑 VOID',
    slotSize: 'small',
    description: `컬렉션 프리뷰의 세 번째 컬렉션 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: VOID 컬렉션의 이미지. 흑백으로 표시됩니다.`,
  },
  {
    slotId: 'home-collections-004',
    label: '🧶 소재',
    slotSize: 'swatch',
    description: `컬렉션 프리뷰의 소재 스와치입니다.

${SIZE_GUIDE.swatch}

💡 팁: 컬렉션에서 사용한 특별한 소재나 텍스처를 보여주세요.`,
  },
  {
    slotId: 'home-process-001',
    label: '📝 스케치',
    slotSize: 'medium',
    description: `프로세스 섹션의 스케치 단계 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 디자인의 시작점을 보여주는 스케치나 드로잉. "여기서 시작됐다"를 보여주세요.`,
  },
  {
    slotId: 'home-process-002',
    label: '👕 토일',
    slotSize: 'small',
    description: `프로세스 섹션의 토일/목업 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 무슬린이나 저렴한 원단으로 만든 테스트 의류. 빈티지한 세피아 톤으로 표시됩니다.`,
  },
  {
    slotId: 'home-process-003',
    label: '✅ 완성',
    slotSize: 'small-square',
    description: `프로세스 섹션의 완성품 이미지입니다.

${SIZE_GUIDE['small-square']}

💡 팁: 완성된 작품. 체크 마크와 함께 표시되어 "완료"를 나타냅니다.`,
  },
  {
    slotId: 'home-contact-001',
    label: '📍 스튜디오',
    slotSize: 'small',
    description: `연락처 섹션의 스튜디오 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 작업실 내부, 입구, 또는 위치를 알 수 있는 이미지. 흑백으로 표시됩니다.`,
  },

  // ==========================================
  // ABOUT PAGE (14 slots)
  // ==========================================
  {
    slotId: 'about-background-001',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `About 페이지 고정 배경 이미지입니다.

${SIZE_GUIDE.background}

💡 팁: 작업실이나 스튜디오 분위기가 느껴지는 이미지를 넣으세요.`,
  },
  {
    slotId: 'about-background-002',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `About 페이지 스크롤 배경 이미지입니다.

${SIZE_GUIDE.background}

💡 팁: 세로로 긴 이미지 권장. 페이지와 함께 스크롤됩니다.`,
  },
  {
    slotId: 'about-hero-001',
    label: '⭐ 프로필',
    slotSize: 'hero',
    description: `About 페이지의 메인 프로필 이미지입니다.

${SIZE_GUIDE.hero}

💡 팁: 디자이너 본인의 프로필 사진 또는 작업하는 모습. 전문적이면서도 개성있는 사진을 선택하세요.`,
  },
  {
    slotId: 'about-hero-002',
    label: '🏠 스튜디오',
    slotSize: 'large',
    description: `About 히어로의 스튜디오 이미지입니다.

${SIZE_GUIDE.large}

💡 팁: 작업 공간 전체 또는 일부를 보여주는 이미지. 브랜드의 환경을 보여줍니다.`,
  },
  {
    slotId: 'about-hero-003',
    label: '🤲 손 작업',
    slotSize: 'medium',
    description: `About 히어로의 손 작업 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 재봉, 패턴 작업, 소재 만지는 손 등. "손으로 만든다"는 장인 정신을 보여주세요.`,
  },
  {
    slotId: 'about-philosophy-001',
    label: '💭 비전',
    slotSize: 'medium',
    description: `철학 섹션의 비전/무드 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 브랜드 철학을 시각적으로 표현하는 이미지. 영감의 원천이 되는 것들.`,
  },
  {
    slotId: 'about-philosophy-002',
    label: '✏️ 아이디어',
    slotSize: 'small',
    description: `철학 섹션의 스케치/아이디어 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 노트, 스케치북, 무드보드 등 아이디어를 정리한 이미지.`,
  },
  {
    slotId: 'about-education-001',
    label: '📚 학습',
    slotSize: 'medium',
    description: `교육/배경 섹션의 스케치 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 학교에서의 작업, 포트폴리오 작업 등 성장 과정을 보여주세요.`,
  },
  {
    slotId: 'about-education-002',
    label: '👔 토일',
    slotSize: 'small',
    description: `교육 섹션의 토일 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 학습 과정에서 만든 토일이나 연습 작업물.`,
  },
  {
    slotId: 'about-education-003',
    label: '📐 패턴',
    slotSize: 'small',
    description: `교육 섹션의 패턴 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 패턴 메이킹 작업 이미지. 기술적 능력을 보여줍니다.`,
  },
  {
    slotId: 'about-process-001',
    label: '🔬 리서치',
    slotSize: 'medium',
    description: `프로세스 섹션의 리서치 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 자료 조사, 레퍼런스 수집, 영감 탐색 등 연구 과정.`,
  },
  {
    slotId: 'about-process-002',
    label: '🧪 프로토타입',
    slotSize: 'small',
    description: `프로세스 섹션의 프로토타입 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 실험적 시도, 테스트 작업물 등.`,
  },
  {
    slotId: 'about-process-003',
    label: '✨ 완성',
    slotSize: 'small',
    description: `프로세스 섹션의 완성 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 프로세스의 결과물. 정사각형으로 표시됩니다.`,
  },
  {
    slotId: 'about-contact-001',
    label: '📧 연락',
    slotSize: 'small',
    description: `About 연락처 섹션의 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 연락이나 협업을 연상시키는 이미지.`,
  },

  // ==========================================
  // COLLECTIONS PAGE (8 slots)
  // ==========================================
  {
    slotId: 'collections-background-001',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `Collections 페이지 고정 배경입니다.

${SIZE_GUIDE.background}

💡 팁: 컬렉션의 전반적인 무드를 담은 배경 이미지.`,
  },
  {
    slotId: 'collections-background-002',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `Collections 페이지 스크롤 배경입니다.

${SIZE_GUIDE.background}

💡 팁: 세로형 이미지 권장.`,
  },
  {
    slotId: 'collections-header-001',
    label: '⭐ 피처드',
    slotSize: 'hero',
    description: `컬렉션 페이지의 메인 피처드 이미지입니다.

${SIZE_GUIDE.hero}

💡 팁: 모든 컬렉션을 대표하는 가장 강력한 이미지. 화면 왼쪽으로 넘치게 배치됩니다.`,
  },
  {
    slotId: 'collections-header-002',
    label: '📷 룩 02',
    slotSize: 'large',
    description: `헤더의 두 번째 룩 이미지입니다.

${SIZE_GUIDE.large}

💡 팁: 피처드 이미지와 다른 스타일 또는 각도의 룩.`,
  },
  {
    slotId: 'collections-header-003',
    label: '🔍 디테일',
    slotSize: 'medium',
    description: `헤더의 디테일 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 봉제, 재단, 디자인 포인트 등 클로즈업.`,
  },
  {
    slotId: 'collections-header-004',
    label: '🧵 패브릭',
    slotSize: 'swatch',
    description: `헤더의 소재 스와치입니다.

${SIZE_GUIDE.swatch}

💡 팁: 컬렉션의 주요 소재 클로즈업.`,
  },
  {
    slotId: 'collections-archive-001',
    label: '📁 아카이브',
    slotSize: 'medium',
    description: `아카이브 섹션의 메인 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 과거 작업이나 프로세스를 보여주는 이미지.`,
  },
  {
    slotId: 'collections-archive-002',
    label: '⚙️ 프로세스',
    slotSize: 'small',
    description: `아카이브 섹션의 프로세스 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 제작 과정을 담은 이미지.`,
  },

  // ==========================================
  // ARCHIVE PAGE (8 slots)
  // ==========================================
  {
    slotId: 'archive-background-001',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `Archive 페이지 고정 배경입니다.

${SIZE_GUIDE.background}

💡 팁: 아카이브/연구 분위기의 배경.`,
  },
  {
    slotId: 'archive-background-002',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `Archive 페이지 스크롤 배경입니다.

${SIZE_GUIDE.background}

💡 팁: 세로형 이미지 권장.`,
  },
  {
    slotId: 'archive-header-001',
    label: '⭐ 아카이브 메인',
    slotSize: 'hero',
    description: `Archive 페이지의 메인 이미지입니다.

${SIZE_GUIDE.hero}

💡 팁: 연구, 실험, 과정을 대표하는 이미지. 화면 왼쪽으로 넘칩니다.`,
  },
  {
    slotId: 'archive-header-002',
    label: '⚙️ 프로세스',
    slotSize: 'large',
    description: `Archive 헤더의 프로세스 이미지입니다.

${SIZE_GUIDE.large}

💡 팁: 작업 과정을 담은 이미지.`,
  },
  {
    slotId: 'archive-header-003',
    label: '🔬 리서치',
    slotSize: 'medium',
    description: `Archive 헤더의 리서치 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 연구, 자료 수집 등의 이미지. 메인 이미지 뒤에 겹쳐 배치됩니다.`,
  },
  {
    slotId: 'archive-header-004',
    label: '📖 스터디',
    slotSize: 'small',
    description: `Archive 헤더의 스터디 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 학습, 분석 관련 이미지.`,
  },
  {
    slotId: 'archive-cta-001',
    label: '🎯 결과',
    slotSize: 'small',
    description: `Archive CTA의 결과 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 연구/실험의 결과물을 보여주는 이미지.`,
  },
  {
    slotId: 'archive-cta-002',
    label: '✅ 완성',
    slotSize: 'tiny',
    description: `Archive CTA의 완성 이미지입니다.

${SIZE_GUIDE.tiny}

💡 팁: 작은 완성품 이미지. 아주 작게 표시됩니다.`,
  },

  // ==========================================
  // PROCESS PAGE (8 slots)
  // ==========================================
  {
    slotId: 'process-background-001',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `Process 페이지 고정 배경입니다.

${SIZE_GUIDE.background}

💡 팁: 작업 과정을 연상시키는 배경.`,
  },
  {
    slotId: 'process-background-002',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `Process 페이지 스크롤 배경입니다.

${SIZE_GUIDE.background}

💡 팁: 세로형 이미지 권장.`,
  },
  {
    slotId: 'process-hero-001',
    label: '✏️ 스케치',
    slotSize: 'medium',
    description: `Process 히어로의 스케치 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 디자인 스케치, 크로키, 아이디어 드로잉.`,
  },
  {
    slotId: 'process-hero-002',
    label: '👕 토일',
    slotSize: 'small',
    description: `Process 히어로의 토일 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 토일/목업 작업 이미지. 빈티지 톤으로 표시됩니다.`,
  },
  {
    slotId: 'process-hero-003',
    label: '🧵 패브릭',
    slotSize: 'small',
    description: `Process 히어로의 패브릭 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 소재 선택, 원단 작업 등의 이미지.`,
  },
  {
    slotId: 'process-hero-004',
    label: '💭 무드',
    slotSize: 'tiny',
    description: `Process 히어로의 무드 이미지입니다.

${SIZE_GUIDE.tiny}

💡 팁: 영감, 레퍼런스 등 무드 이미지. 작게 표시됩니다.`,
  },
  {
    slotId: 'process-cta-001',
    label: '✨ 완성',
    slotSize: 'small',
    description: `Process CTA의 완성 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 프로세스의 최종 결과물.`,
  },
  {
    slotId: 'process-cta-002',
    label: '🎯 결과',
    slotSize: 'tiny',
    description: `Process CTA의 결과 이미지입니다.

${SIZE_GUIDE.tiny}

💡 팁: 작은 결과물 이미지.`,
  },

  // ==========================================
  // CONTACT PAGE (8 slots)
  // ==========================================
  {
    slotId: 'contact-background-001',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `Contact 페이지 고정 배경입니다.

${SIZE_GUIDE.background}

💡 팁: 연락/협업 분위기의 배경.`,
  },
  {
    slotId: 'contact-background-002',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `Contact 페이지 스크롤 배경입니다.

${SIZE_GUIDE.background}

💡 팁: 세로형 이미지 권장.`,
  },
  {
    slotId: 'contact-hero-001',
    label: '⭐ 스튜디오',
    slotSize: 'hero',
    description: `Contact 페이지의 스튜디오 메인 이미지입니다.

${SIZE_GUIDE.hero}

💡 팁: 스튜디오 외관 또는 내부. 방문자가 찾아올 곳의 이미지.`,
  },
  {
    slotId: 'contact-hero-002',
    label: '📞 연락처',
    slotSize: 'large',
    description: `Contact 히어로의 연락처 관련 이미지입니다.

${SIZE_GUIDE.large}

💡 팁: 작업실 내부, 미팅 공간 등.`,
  },
  {
    slotId: 'contact-hero-003',
    label: '📍 서울',
    slotSize: 'medium',
    description: `Contact 히어로의 위치 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 서울/위치를 나타내는 이미지. 주변 환경이나 건물.`,
  },
  {
    slotId: 'contact-hero-004',
    label: '✉️ 메일',
    slotSize: 'small',
    description: `Contact 히어로의 메일/연락 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 소통을 연상시키는 이미지.`,
  },
  {
    slotId: 'contact-location-001',
    label: '🗺️ 위치',
    slotSize: 'medium',
    description: `Location 섹션의 서울 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 스튜디오 위치나 서울 풍경.`,
  },
  {
    slotId: 'contact-location-002',
    label: '🏠 공간',
    slotSize: 'small',
    description: `Location 섹션의 스튜디오 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 작업 공간 내부 이미지.`,
  },

  // ==========================================
  // LAB PAGE (13 slots)
  // ==========================================
  {
    slotId: 'lab-background-001',
    label: '🖼️ 배경',
    slotSize: 'background',
    description: `Lab 페이지 고정 배경입니다.

${SIZE_GUIDE.background}

💡 팁: 실험적인 분위기의 배경.`,
  },
  {
    slotId: 'lab-background-002',
    label: '🖼️ 스크롤 배경',
    slotSize: 'background',
    description: `Lab 페이지 스크롤 배경입니다.

${SIZE_GUIDE.background}

💡 팁: 세로형 이미지 권장.`,
  },
  {
    slotId: 'lab-hero-001',
    label: '⭐ 실험 메인',
    slotSize: 'hero',
    description: `Lab 페이지의 메인 실험 이미지입니다.

${SIZE_GUIDE.hero}

💡 팁: 가장 흥미로운 실험/연구 작업. 화면 왼쪽으로 넘칩니다.`,
  },
  {
    slotId: 'lab-hero-002',
    label: '🧪 테스트',
    slotSize: 'large',
    description: `Lab 히어로의 테스트 이미지입니다.

${SIZE_GUIDE.large}

💡 팁: 실험적 시도, 테스트 작업의 이미지.`,
  },
  {
    slotId: 'lab-hero-003',
    label: '🔬 샘플',
    slotSize: 'medium',
    description: `Lab 히어로의 샘플 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 실험 샘플, 테스트 조각 등.`,
  },
  {
    slotId: 'lab-hero-004',
    label: '🔄 반복',
    slotSize: 'small',
    description: `Lab 히어로의 이터레이션 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 여러 번의 시도/반복 과정을 보여주는 이미지.`,
  },
  {
    slotId: 'lab-failures-001',
    label: '❌ 실패 01',
    slotSize: 'medium',
    description: `실패 섹션의 첫 번째 거절된 작업 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: 실패했거나 거절된 작업. 실패도 과정의 일부임을 보여줍니다.`,
  },
  {
    slotId: 'lab-failures-002',
    label: '❌ 실패한 토일',
    slotSize: 'small',
    description: `실패 섹션의 실패한 토일 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 실패한 토일/목업 작업.`,
  },
  {
    slotId: 'lab-failures-003',
    label: '🚫 잘못된 방향',
    slotSize: 'small',
    description: `실패 섹션의 잘못된 방향 이미지입니다.

${SIZE_GUIDE.small}

💡 팁: 방향이 틀렸던 시도의 이미지.`,
  },
  {
    slotId: 'lab-failures-004',
    label: '🔁 반복 03',
    slotSize: 'tiny',
    description: `실패 섹션의 이터레이션 이미지입니다.

${SIZE_GUIDE.tiny}

💡 팁: 여러 번 시도했던 과정. 작게 표시됩니다.`,
  },
  {
    slotId: 'lab-method-001',
    label: '👁️ 관찰',
    slotSize: 'medium',
    description: `방법론 섹션의 관찰 단계 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: "Observe" - 관찰하고 분석하는 단계를 보여주세요.`,
  },
  {
    slotId: 'lab-method-002',
    label: '🧪 실험',
    slotSize: 'medium',
    description: `방법론 섹션의 실험 단계 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: "Experiment" - 시도하고 테스트하는 단계.`,
  },
  {
    slotId: 'lab-method-003',
    label: '💎 정제',
    slotSize: 'medium',
    description: `방법론 섹션의 정제 단계 이미지입니다.

${SIZE_GUIDE.medium}

💡 팁: "Refine" - 다듬고 완성하는 단계.`,
  },
]

async function updateSlots() {
  console.log('🔄 Starting slot updates...')
  console.log(`📊 Total slots to update: ${SLOT_UPDATES.length}`)

  let updated = 0
  let notFound = 0
  let errors = 0

  for (const slot of SLOT_UPDATES) {
    try {
      // Find existing slot
      const existing = await client.fetch<{ _id: string } | null>(
        `*[_type == "slotImage" && slotId == $slotId][0]{ _id }`,
        { slotId: slot.slotId }
      )

      if (!existing) {
        console.log(`⚠️  Not found: ${slot.slotId}`)
        notFound++
        continue
      }

      // Update the slot
      await client.patch(existing._id)
        .set({
          label: slot.label,
          description: slot.description,
          slotSize: slot.slotSize,
        })
        .commit()

      console.log(`✅ Updated: ${slot.slotId} → ${slot.label}`)
      updated++
    } catch (error) {
      console.error(`❌ Error updating ${slot.slotId}:`, error)
      errors++
    }
  }

  console.log('\n📈 Update Summary:')
  console.log(`   Updated: ${updated}`)
  console.log(`   Not Found: ${notFound}`)
  console.log(`   Errors: ${errors}`)
  console.log(`   Total: ${SLOT_UPDATES.length}`)
}

// Run the update
updateSlots()
  .then(() => {
    console.log('\n✨ Update complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Update failed:', error)
    process.exit(1)
  })
