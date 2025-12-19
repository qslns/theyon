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

// All slots extracted from the codebase
const SLOTS: SlotData[] = [
  // ==========================================
  // HOME PAGE (16 slots)
  // ==========================================
  // Background
  { slotId: 'home-background-001', page: 'home', section: 'background', description: '홈페이지 전체 배경 이미지. 매우 낮은 투명도로 분위기만 연출. 스크롤해도 고정됨.', slotSize: 'background', label: 'BACKGROUND' },

  // Hero Section (15 slots)
  { slotId: 'home-hero-001', page: 'home', section: 'hero', description: '홈 히어로 왼쪽 상단 대형 이미지. 화면 밖으로 약간 넘침. 메인 룩 이미지 권장.', slotSize: 'hero', label: 'LOOK 01' },
  { slotId: 'home-hero-002', page: 'home', section: 'hero', description: '홈 히어로 중앙 상단. 두 번째 주요 룩 이미지.', slotSize: 'large', label: 'LOOK 02' },
  { slotId: 'home-hero-003', page: 'home', section: 'hero', description: '홈 히어로 디테일 샷. 중간 크기.', slotSize: 'medium', label: 'DETAIL' },
  { slotId: 'home-hero-004', page: 'home', section: 'hero', description: '홈 히어로 프로세스 이미지. 작은 크기.', slotSize: 'small', label: 'PROCESS' },
  { slotId: 'home-hero-005', page: 'home', section: 'hero', description: '홈 히어로 패브릭 스와치.', slotSize: 'swatch', label: 'FABRIC' },
  { slotId: 'home-hero-006', page: 'home', section: 'hero', description: '홈 히어로 울 소재 스와치.', slotSize: 'swatch', label: 'WOOL' },
  { slotId: 'home-hero-007', page: 'home', section: 'hero', description: '홈 히어로 토일 이미지.', slotSize: 'small', label: 'TOILE' },
  { slotId: 'home-hero-008', page: 'home', section: 'hero', description: '홈 히어로 레퍼런스 이미지. 작은 크기.', slotSize: 'tiny', label: 'REF' },
  { slotId: 'home-hero-009', page: 'home', section: 'hero', description: '홈 히어로 마이크로 번호 태그.', slotSize: 'micro', label: '01' },
  { slotId: 'home-hero-010', page: 'home', section: 'hero', description: '홈 히어로 실루엣 이미지. 중간 세로형.', slotSize: 'medium', label: 'SILHOUETTE' },
  { slotId: 'home-hero-011', page: 'home', section: 'hero', description: '홈 히어로 실크 스와치.', slotSize: 'swatch', label: 'SILK' },
  { slotId: 'home-hero-012', page: 'home', section: 'hero', description: '홈 히어로 린넨 스와치.', slotSize: 'swatch', label: 'LINEN' },
  { slotId: 'home-hero-013', page: 'home', section: 'hero', description: '홈 히어로 무드 이미지. 작은 크기.', slotSize: 'tiny', label: 'MOOD' },
  { slotId: 'home-hero-014', page: 'home', section: 'hero', description: '홈 히어로 아카이브 참조 이미지.', slotSize: 'small', label: 'ARCHIVE' },
  { slotId: 'home-hero-015', page: 'home', section: 'hero', description: '홈 히어로 폼 스터디 이미지.', slotSize: 'medium', label: 'FORM' },

  // Philosophy Section (6 slots)
  { slotId: 'home-philosophy-001', page: 'home', section: 'philosophy', description: '철학 섹션 무드 이미지.', slotSize: 'medium', label: 'MOOD' },
  { slotId: 'home-philosophy-002', page: 'home', section: 'philosophy', description: '철학 섹션 레퍼런스 이미지.', slotSize: 'small', label: 'REF' },
  { slotId: 'home-philosophy-003', page: 'home', section: 'philosophy', description: '철학 섹션 텍스처 클로즈업.', slotSize: 'swatch', label: 'TEXTURE' },
  { slotId: 'home-philosophy-004', page: 'home', section: 'philosophy', description: '철학 섹션 스케치 이미지.', slotSize: 'small', label: 'SKETCH' },
  { slotId: 'home-philosophy-005', page: 'home', section: 'philosophy', description: '철학 섹션 디테일 이미지.', slotSize: 'tiny', label: 'DETAIL' },
  { slotId: 'home-philosophy-006', page: 'home', section: 'philosophy', description: '철학 섹션 마이크로 번호.', slotSize: 'micro', label: '002' },

  // Collections Preview (10 slots)
  { slotId: 'home-collections-001', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 DECONSTRUCTION 메인 이미지.', slotSize: 'large', label: 'DECONSTRUCTION / 01' },
  { slotId: 'home-collections-002', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 디테일 이미지.', slotSize: 'small', label: 'DETAIL' },
  { slotId: 'home-collections-003', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 데님 스와치.', slotSize: 'swatch', label: 'DENIM' },
  { slotId: 'home-collections-004', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 레퍼런스.', slotSize: 'tiny', label: 'REF' },
  { slotId: 'home-collections-005', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 FRAGMENTS 메인 이미지.', slotSize: 'medium', label: 'FRAGMENTS / 01' },
  { slotId: 'home-collections-006', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 텍스처 이미지.', slotSize: 'small', label: 'TEXTURE' },
  { slotId: 'home-collections-007', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 나일론 스와치.', slotSize: 'swatch', label: 'NYLON' },
  { slotId: 'home-collections-008', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 VOID 메인 이미지.', slotSize: 'medium', label: 'VOID / 01' },
  { slotId: 'home-collections-009', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 실루엣 이미지.', slotSize: 'small', label: 'SILHOUETTE' },
  { slotId: 'home-collections-010', page: 'home', section: 'collections-preview', description: '컬렉션 프리뷰 볼륨 스와치.', slotSize: 'swatch', label: 'VOL' },

  // Process Teaser (8 slots)
  { slotId: 'home-process-001', page: 'home', section: 'process-teaser', description: '프로세스 티저 스케치 이미지.', slotSize: 'medium', label: 'SKETCH / 001' },
  { slotId: 'home-process-002', page: 'home', section: 'process-teaser', description: '프로세스 티저 이터레이션 이미지.', slotSize: 'small', label: 'ITERATION' },
  { slotId: 'home-process-003', page: 'home', section: 'process-teaser', description: '프로세스 티저 파이널 이미지.', slotSize: 'small', label: 'FINAL' },
  { slotId: 'home-process-004', page: 'home', section: 'process-teaser', description: '프로세스 티저 거절된 시안.', slotSize: 'tiny', label: 'REJECTED' },
  { slotId: 'home-process-005', page: 'home', section: 'process-teaser', description: '프로세스 티저 노트 이미지.', slotSize: 'small', label: 'NOTE' },
  { slotId: 'home-process-006', page: 'home', section: 'process-teaser', description: '프로세스 티저 스와치 A.', slotSize: 'swatch', label: 'A' },
  { slotId: 'home-process-007', page: 'home', section: 'process-teaser', description: '프로세스 티저 스와치 B.', slotSize: 'swatch', label: 'B' },
  { slotId: 'home-process-008', page: 'home', section: 'process-teaser', description: '프로세스 티저 마이크로.', slotSize: 'micro', label: '03' },

  // Contact CTA (3 slots)
  { slotId: 'home-contact-001', page: 'home', section: 'contact-cta', description: '홈 컨택 CTA 메인 이미지.', slotSize: 'small', label: 'CONTACT' },
  { slotId: 'home-contact-002', page: 'home', section: 'contact-cta', description: '홈 컨택 CTA 스와치.', slotSize: 'tiny', label: 'MAIL' },
  { slotId: 'home-contact-003', page: 'home', section: 'contact-cta', description: '홈 컨택 CTA 화살표.', slotSize: 'micro', label: '→' },

  // ==========================================
  // ABOUT PAGE (41 slots)
  // ==========================================
  { slotId: 'about-background-001', page: 'about', section: 'background', description: 'About 페이지 전체 배경 이미지.', slotSize: 'background', label: 'BACKGROUND' },

  // Hero Section (15 slots)
  { slotId: 'about-hero-001', page: 'about', section: 'hero', description: 'About 히어로 포트레이트 메인 이미지. 디자이너 사진 권장.', slotSize: 'hero', label: 'PORTRAIT' },
  { slotId: 'about-hero-002', page: 'about', section: 'hero', description: 'About 히어로 스튜디오 이미지.', slotSize: 'large', label: 'STUDIO' },
  { slotId: 'about-hero-003', page: 'about', section: 'hero', description: 'About 히어로 손 작업 이미지.', slotSize: 'medium', label: 'HANDS' },
  { slotId: 'about-hero-004', page: 'about', section: 'hero', description: 'About 히어로 프로세스 이미지.', slotSize: 'small', label: 'PROCESS' },
  { slotId: 'about-hero-005', page: 'about', section: 'hero', description: 'About 히어로 작업실 이미지.', slotSize: 'medium', label: 'WORKSPACE' },
  { slotId: 'about-hero-006', page: 'about', section: 'hero', description: 'About 히어로 연구 이미지.', slotSize: 'small', label: 'RESEARCH' },
  { slotId: 'about-hero-007', page: 'about', section: 'hero', description: 'About 히어로 소재 이미지.', slotSize: 'swatch', label: 'MATERIAL' },
  { slotId: 'about-hero-008', page: 'about', section: 'hero', description: 'About 히어로 디테일 이미지.', slotSize: 'tiny', label: 'DETAIL' },
  { slotId: 'about-hero-009', page: 'about', section: 'hero', description: 'About 히어로 마이크로 번호.', slotSize: 'micro', label: '01' },
  { slotId: 'about-hero-010', page: 'about', section: 'hero', description: 'About 히어로 스케치북 이미지.', slotSize: 'medium', label: 'SKETCHBOOK' },
  { slotId: 'about-hero-011', page: 'about', section: 'hero', description: 'About 히어로 울 스와치.', slotSize: 'swatch', label: 'WOOL' },
  { slotId: 'about-hero-012', page: 'about', section: 'hero', description: 'About 히어로 실크 스와치.', slotSize: 'swatch', label: 'SILK' },
  { slotId: 'about-hero-013', page: 'about', section: 'hero', description: 'About 히어로 레퍼런스 이미지.', slotSize: 'tiny', label: 'REF' },
  { slotId: 'about-hero-014', page: 'about', section: 'hero', description: 'About 히어로 무드 이미지.', slotSize: 'small', label: 'MOOD' },
  { slotId: 'about-hero-015', page: 'about', section: 'hero', description: 'About 히어로 폼 이미지.', slotSize: 'medium', label: 'FORM' },

  // Philosophy Section (8 slots)
  { slotId: 'about-philosophy-001', page: 'about', section: 'philosophy', description: 'About 철학 무드 이미지.', slotSize: 'medium', label: 'MOOD' },
  { slotId: 'about-philosophy-002', page: 'about', section: 'philosophy', description: 'About 철학 비전 이미지.', slotSize: 'small', label: 'VISION' },
  { slotId: 'about-philosophy-003', page: 'about', section: 'philosophy', description: 'About 철학 레퍼런스.', slotSize: 'tiny', label: 'REF' },
  { slotId: 'about-philosophy-004', page: 'about', section: 'philosophy', description: 'About 철학 텍스처 스와치.', slotSize: 'swatch', label: 'TEXTURE' },
  { slotId: 'about-philosophy-005', page: 'about', section: 'philosophy', description: 'About 철학 스케치 이미지.', slotSize: 'small', label: 'SKETCH' },
  { slotId: 'about-philosophy-006', page: 'about', section: 'philosophy', description: 'About 철학 아이디어 이미지.', slotSize: 'tiny', label: 'IDEA' },
  { slotId: 'about-philosophy-007', page: 'about', section: 'philosophy', description: 'About 철학 마이크로 번호.', slotSize: 'micro', label: '02' },
  { slotId: 'about-philosophy-008', page: 'about', section: 'philosophy', description: 'About 철학 폼 이미지.', slotSize: 'small', label: 'FORM' },

  // Education Section (6 slots)
  { slotId: 'about-education-001', page: 'about', section: 'education', description: 'About 교육 스케치 이미지.', slotSize: 'medium', label: 'SKETCH' },
  { slotId: 'about-education-002', page: 'about', section: 'education', description: 'About 교육 토일 이미지.', slotSize: 'small', label: 'TOILE' },
  { slotId: 'about-education-003', page: 'about', section: 'education', description: 'About 교육 패턴 이미지.', slotSize: 'small', label: 'PATTERN' },
  { slotId: 'about-education-004', page: 'about', section: 'education', description: 'About 교육 노트 이미지.', slotSize: 'tiny', label: 'NOTE' },
  { slotId: 'about-education-005', page: 'about', section: 'education', description: 'About 교육 샘플 스와치.', slotSize: 'swatch', label: 'SAMPLE' },
  { slotId: 'about-education-006', page: 'about', section: 'education', description: 'About 교육 마이크로 번호.', slotSize: 'micro', label: '03' },

  // Process Section (7 slots)
  { slotId: 'about-process-001', page: 'about', section: 'process', description: 'About 프로세스 리서치 이미지.', slotSize: 'medium', label: 'RESEARCH' },
  { slotId: 'about-process-002', page: 'about', section: 'process', description: 'About 프로세스 스케치 이미지.', slotSize: 'small', label: 'SKETCH' },
  { slotId: 'about-process-003', page: 'about', section: 'process', description: 'About 프로세스 프로토타입 이미지.', slotSize: 'small', label: 'PROTOTYPE' },
  { slotId: 'about-process-004', page: 'about', section: 'process', description: 'About 프로세스 이터레이션 이미지.', slotSize: 'tiny', label: 'ITERATE' },
  { slotId: 'about-process-005', page: 'about', section: 'process', description: 'About 프로세스 파이널 이미지.', slotSize: 'small', label: 'FINAL' },
  { slotId: 'about-process-006', page: 'about', section: 'process', description: 'About 프로세스 스와치 A.', slotSize: 'swatch', label: 'A' },
  { slotId: 'about-process-007', page: 'about', section: 'process', description: 'About 프로세스 스와치 B.', slotSize: 'swatch', label: 'B' },

  // Contact Section (3 slots)
  { slotId: 'about-contact-001', page: 'about', section: 'contact', description: 'About 연락처 스튜디오 이미지.', slotSize: 'small', label: 'STUDIO' },
  { slotId: 'about-contact-002', page: 'about', section: 'contact', description: 'About 연락처 메일 이미지.', slotSize: 'tiny', label: 'MAIL' },
  { slotId: 'about-contact-003', page: 'about', section: 'contact', description: 'About 연락처 @ 마이크로.', slotSize: 'micro', label: '@' },

  // ==========================================
  // COLLECTIONS PAGE (16 slots)
  // ==========================================
  { slotId: 'collections-background-001', page: 'collections', section: 'background', description: 'Collections 페이지 전체 배경.', slotSize: 'background', label: 'BACKGROUND' },

  // Header Section (10 slots)
  { slotId: 'collections-header-001', page: 'collections', section: 'header', description: 'Collections 헤더 피처드 이미지.', slotSize: 'hero', label: 'FEATURED' },
  { slotId: 'collections-header-002', page: 'collections', section: 'header', description: 'Collections 헤더 AW25 이미지.', slotSize: 'large', label: 'AW25' },
  { slotId: 'collections-header-003', page: 'collections', section: 'header', description: 'Collections 헤더 프로세스 이미지.', slotSize: 'medium', label: 'PROCESS' },
  { slotId: 'collections-header-004', page: 'collections', section: 'header', description: 'Collections 헤더 레퍼런스 이미지.', slotSize: 'small', label: 'REF' },
  { slotId: 'collections-header-005', page: 'collections', section: 'header', description: 'Collections 헤더 스와치 A.', slotSize: 'swatch', label: 'A' },
  { slotId: 'collections-header-006', page: 'collections', section: 'header', description: 'Collections 헤더 스와치 B.', slotSize: 'swatch', label: 'B' },
  { slotId: 'collections-header-007', page: 'collections', section: 'header', description: 'Collections 헤더 스와치 C.', slotSize: 'swatch', label: 'C' },
  { slotId: 'collections-header-008', page: 'collections', section: 'header', description: 'Collections 헤더 아카이브 이미지.', slotSize: 'small', label: 'ARCHIVE' },
  { slotId: 'collections-header-009', page: 'collections', section: 'header', description: 'Collections 헤더 스케치 이미지.', slotSize: 'tiny', label: 'SKETCH' },
  { slotId: 'collections-header-010', page: 'collections', section: 'header', description: 'Collections 헤더 마이크로 번호.', slotSize: 'micro', label: '04' },

  // Archive Section (5 slots)
  { slotId: 'collections-archive-001', page: 'collections', section: 'archive', description: 'Collections 아카이브 메인 이미지.', slotSize: 'medium', label: 'ARCHIVE' },
  { slotId: 'collections-archive-002', page: 'collections', section: 'archive', description: 'Collections 아카이브 문서 이미지.', slotSize: 'small', label: 'DOC' },
  { slotId: 'collections-archive-003', page: 'collections', section: 'archive', description: 'Collections 아카이브 프로세스 이미지.', slotSize: 'tiny', label: 'PROCESS' },
  { slotId: 'collections-archive-004', page: 'collections', section: 'archive', description: 'Collections 아카이브 레퍼런스.', slotSize: 'swatch', label: 'REF' },
  { slotId: 'collections-archive-005', page: 'collections', section: 'archive', description: 'Collections 아카이브 화살표.', slotSize: 'micro', label: '→' },

  // ==========================================
  // ARCHIVE PAGE (16 slots)
  // ==========================================
  { slotId: 'archive-background-001', page: 'archive', section: 'background', description: 'Archive 페이지 전체 배경.', slotSize: 'background', label: 'BACKGROUND' },

  // Header Section (12 slots)
  { slotId: 'archive-header-001', page: 'archive', section: 'header', description: 'Archive 헤더 메인 이미지. 화면 왼쪽 밖으로 넘침.', slotSize: 'hero', label: 'ARCHIVE / MAIN' },
  { slotId: 'archive-header-002', page: 'archive', section: 'header', description: 'Archive 헤더 프로세스 이미지.', slotSize: 'large', label: 'PROCESS' },
  { slotId: 'archive-header-003', page: 'archive', section: 'header', description: 'Archive 헤더 리서치 이미지.', slotSize: 'medium', label: 'RESEARCH' },
  { slotId: 'archive-header-004', page: 'archive', section: 'header', description: 'Archive 헤더 스터디 이미지.', slotSize: 'small', label: 'STUDY' },
  { slotId: 'archive-header-005', page: 'archive', section: 'header', description: 'Archive 헤더 도큐먼트 이미지.', slotSize: 'medium', label: 'DOCUMENT' },
  { slotId: 'archive-header-006', page: 'archive', section: 'header', description: 'Archive 헤더 스와치 A.', slotSize: 'swatch', label: 'A' },
  { slotId: 'archive-header-007', page: 'archive', section: 'header', description: 'Archive 헤더 스와치 B.', slotSize: 'swatch', label: 'B' },
  { slotId: 'archive-header-008', page: 'archive', section: 'header', description: 'Archive 헤더 스와치 C.', slotSize: 'swatch', label: 'C' },
  { slotId: 'archive-header-009', page: 'archive', section: 'header', description: 'Archive 헤더 레퍼런스 이미지.', slotSize: 'tiny', label: 'REF' },
  { slotId: 'archive-header-010', page: 'archive', section: 'header', description: 'Archive 헤더 노트 이미지.', slotSize: 'small', label: 'NOTES' },
  { slotId: 'archive-header-011', page: 'archive', section: 'header', description: 'Archive 헤더 마이크로 번호.', slotSize: 'micro', label: '01' },
  { slotId: 'archive-header-012', page: 'archive', section: 'header', description: 'Archive 헤더 히스토리 이미지.', slotSize: 'medium', label: 'HISTORY' },

  // CTA Section (3 slots)
  { slotId: 'archive-cta-001', page: 'archive', section: 'cta', description: 'Archive CTA 결과 이미지.', slotSize: 'small', label: 'RESULT' },
  { slotId: 'archive-cta-002', page: 'archive', section: 'cta', description: 'Archive CTA 파이널 이미지.', slotSize: 'tiny', label: 'FINAL' },
  { slotId: 'archive-cta-003', page: 'archive', section: 'cta', description: 'Archive CTA 화살표.', slotSize: 'micro', label: '→' },

  // ==========================================
  // PROCESS PAGE (12 slots)
  // ==========================================
  { slotId: 'process-background-001', page: 'process', section: 'background', description: 'Process 페이지 전체 배경.', slotSize: 'background', label: 'BACKGROUND' },

  // Hero Section (8 slots)
  { slotId: 'process-hero-001', page: 'process', section: 'hero', description: 'Process 히어로 스케치 이미지.', slotSize: 'medium', label: 'SKETCH' },
  { slotId: 'process-hero-002', page: 'process', section: 'hero', description: 'Process 히어로 토일 이미지.', slotSize: 'small', label: 'TOILE' },
  { slotId: 'process-hero-003', page: 'process', section: 'hero', description: 'Process 히어로 패브릭 이미지.', slotSize: 'small', label: 'FABRIC' },
  { slotId: 'process-hero-004', page: 'process', section: 'hero', description: 'Process 히어로 레퍼런스 이미지.', slotSize: 'tiny', label: 'REF' },
  { slotId: 'process-hero-005', page: 'process', section: 'hero', description: 'Process 히어로 무드 이미지.', slotSize: 'small', label: 'MOOD' },
  { slotId: 'process-hero-006', page: 'process', section: 'hero', description: 'Process 히어로 디테일 이미지.', slotSize: 'tiny', label: 'DETAIL' },
  { slotId: 'process-hero-007', page: 'process', section: 'hero', description: 'Process 히어로 스와치 A.', slotSize: 'swatch', label: 'A' },
  { slotId: 'process-hero-008', page: 'process', section: 'hero', description: 'Process 히어로 스와치 B.', slotSize: 'swatch', label: 'B' },

  // CTA Section (3 slots)
  { slotId: 'process-cta-001', page: 'process', section: 'cta', description: 'Process CTA 파이널 이미지.', slotSize: 'small', label: 'FINAL' },
  { slotId: 'process-cta-002', page: 'process', section: 'cta', description: 'Process CTA 결과 이미지.', slotSize: 'tiny', label: 'RESULT' },
  { slotId: 'process-cta-003', page: 'process', section: 'cta', description: 'Process CTA 화살표.', slotSize: 'micro', label: '→' },

  // ==========================================
  // CONTACT PAGE (25 slots)
  // ==========================================
  { slotId: 'contact-background-001', page: 'contact', section: 'background', description: 'Contact 페이지 전체 배경.', slotSize: 'background', label: 'BACKGROUND' },

  // Hero Section (15 slots)
  { slotId: 'contact-hero-001', page: 'contact', section: 'hero', description: 'Contact 히어로 스튜디오 이미지.', slotSize: 'hero', label: 'STUDIO' },
  { slotId: 'contact-hero-002', page: 'contact', section: 'hero', description: 'Contact 히어로 연락처 이미지.', slotSize: 'large', label: 'CONTACT' },
  { slotId: 'contact-hero-003', page: 'contact', section: 'hero', description: 'Contact 히어로 서울 이미지.', slotSize: 'medium', label: 'SEOUL' },
  { slotId: 'contact-hero-004', page: 'contact', section: 'hero', description: 'Contact 히어로 스와치 A.', slotSize: 'swatch', label: 'A' },
  { slotId: 'contact-hero-005', page: 'contact', section: 'hero', description: 'Contact 히어로 스와치 B.', slotSize: 'swatch', label: 'B' },
  { slotId: 'contact-hero-006', page: 'contact', section: 'hero', description: 'Contact 히어로 레퍼런스 이미지.', slotSize: 'tiny', label: 'REF' },
  { slotId: 'contact-hero-007', page: 'contact', section: 'hero', description: 'Contact 히어로 프로세스 이미지.', slotSize: 'small', label: 'PROCESS' },
  { slotId: 'contact-hero-008', page: 'contact', section: 'hero', description: 'Contact 히어로 메일 이미지.', slotSize: 'small', label: 'MAIL' },
  { slotId: 'contact-hero-009', page: 'contact', section: 'hero', description: 'Contact 히어로 문의 이미지.', slotSize: 'medium', label: 'INQUIRY' },
  { slotId: 'contact-hero-010', page: 'contact', section: 'hero', description: 'Contact 히어로 마이크로 번호.', slotSize: 'micro', label: '01' },
  { slotId: 'contact-hero-011', page: 'contact', section: 'hero', description: 'Contact 히어로 작업 이미지.', slotSize: 'small', label: 'WORK' },
  { slotId: 'contact-hero-012', page: 'contact', section: 'hero', description: 'Contact 히어로 협업 이미지.', slotSize: 'tiny', label: 'COLLAB' },
  { slotId: 'contact-hero-013', page: 'contact', section: 'hero', description: 'Contact 히어로 KR 스와치.', slotSize: 'swatch', label: 'KR' },
  { slotId: 'contact-hero-014', page: 'contact', section: 'hero', description: 'Contact 히어로 2024 스와치.', slotSize: 'swatch', label: '2024' },
  { slotId: 'contact-hero-015', page: 'contact', section: 'hero', description: 'Contact 히어로 화살표.', slotSize: 'micro', label: '→' },

  // Location Section (6 slots)
  { slotId: 'contact-location-001', page: 'contact', section: 'location', description: 'Contact 위치 서울 이미지.', slotSize: 'medium', label: 'SEOUL' },
  { slotId: 'contact-location-002', page: 'contact', section: 'location', description: 'Contact 위치 스튜디오 이미지.', slotSize: 'small', label: 'STUDIO' },
  { slotId: 'contact-location-003', page: 'contact', section: 'location', description: 'Contact 위치 공간 이미지.', slotSize: 'small', label: 'SPACE' },
  { slotId: 'contact-location-004', page: 'contact', section: 'location', description: 'Contact 위치 방문 이미지.', slotSize: 'tiny', label: 'VISIT' },
  { slotId: 'contact-location-005', page: 'contact', section: 'location', description: 'Contact 위치 지도 이미지.', slotSize: 'swatch', label: 'MAP' },
  { slotId: 'contact-location-006', page: 'contact', section: 'location', description: 'Contact 위치 예약 이미지.', slotSize: 'swatch', label: 'BY APPT' },

  // Social Section (3 slots)
  { slotId: 'contact-social-001', page: 'contact', section: 'social', description: 'Contact 소셜 인스타그램 이미지.', slotSize: 'small', label: 'IG' },
  { slotId: 'contact-social-002', page: 'contact', section: 'social', description: 'Contact 소셜 @ 이미지.', slotSize: 'tiny', label: '@' },
  { slotId: 'contact-social-003', page: 'contact', section: 'social', description: 'Contact 소셜 DM 이미지.', slotSize: 'swatch', label: 'DM' },

  // ==========================================
  // LAB PAGE (28 slots)
  // ==========================================
  { slotId: 'lab-background-001', page: 'lab', section: 'background', description: 'Lab 페이지 전체 배경.', slotSize: 'background', label: 'BACKGROUND' },

  // Hero Section (12 slots)
  { slotId: 'lab-hero-001', page: 'lab', section: 'hero', description: 'Lab 히어로 실험 메인 이미지.', slotSize: 'hero', label: 'EXP / MAIN' },
  { slotId: 'lab-hero-002', page: 'lab', section: 'hero', description: 'Lab 히어로 테스트 001 이미지.', slotSize: 'large', label: 'TEST 001' },
  { slotId: 'lab-hero-003', page: 'lab', section: 'hero', description: 'Lab 히어로 샘플 이미지.', slotSize: 'medium', label: 'SAMPLE' },
  { slotId: 'lab-hero-004', page: 'lab', section: 'hero', description: 'Lab 히어로 이터레이션 이미지.', slotSize: 'small', label: 'ITERATION' },
  { slotId: 'lab-hero-005', page: 'lab', section: 'hero', description: 'Lab 히어로 프로세스 이미지.', slotSize: 'medium', label: 'PROCESS' },
  { slotId: 'lab-hero-006', page: 'lab', section: 'hero', description: 'Lab 히어로 스와치 A.', slotSize: 'swatch', label: 'A' },
  { slotId: 'lab-hero-007', page: 'lab', section: 'hero', description: 'Lab 히어로 스와치 B.', slotSize: 'swatch', label: 'B' },
  { slotId: 'lab-hero-008', page: 'lab', section: 'hero', description: 'Lab 히어로 레퍼런스 이미지.', slotSize: 'tiny', label: 'REF' },
  { slotId: 'lab-hero-009', page: 'lab', section: 'hero', description: 'Lab 히어로 무드 이미지.', slotSize: 'small', label: 'MOOD' },
  { slotId: 'lab-hero-010', page: 'lab', section: 'hero', description: 'Lab 히어로 마이크로 번호.', slotSize: 'micro', label: '01' },
  { slotId: 'lab-hero-011', page: 'lab', section: 'hero', description: 'Lab 히어로 데이터 이미지.', slotSize: 'tiny', label: 'DATA' },
  { slotId: 'lab-hero-012', page: 'lab', section: 'hero', description: 'Lab 히어로 결과 이미지.', slotSize: 'small', label: 'RESULT' },

  // Failures Section (12 slots)
  { slotId: 'lab-failures-001', page: 'lab', section: 'failures', description: 'Lab 실패 거절된 01 이미지.', slotSize: 'medium', label: 'REJECTED / 01' },
  { slotId: 'lab-failures-002', page: 'lab', section: 'failures', description: 'Lab 실패 토일 이미지.', slotSize: 'small', label: 'FAILED TOILE' },
  { slotId: 'lab-failures-003', page: 'lab', section: 'failures', description: 'Lab 실패 잘못된 방향 이미지.', slotSize: 'small', label: 'WRONG PATH' },
  { slotId: 'lab-failures-004', page: 'lab', section: 'failures', description: 'Lab 실패 이터레이션 03 이미지.', slotSize: 'tiny', label: 'ITERATION 03' },
  { slotId: 'lab-failures-005', page: 'lab', section: 'failures', description: 'Lab 실패 폐기 이미지.', slotSize: 'small', label: 'DISCARDED' },
  { slotId: 'lab-failures-006', page: 'lab', section: 'failures', description: 'Lab 실패 스터디 이미지.', slotSize: 'tiny', label: 'STUDY' },
  { slotId: 'lab-failures-007', page: 'lab', section: 'failures', description: 'Lab 실패 깨진 이미지.', slotSize: 'swatch', label: 'BROKEN' },
  { slotId: 'lab-failures-008', page: 'lab', section: 'failures', description: 'Lab 실패 포기 이미지.', slotSize: 'small', label: 'ABANDONED' },
  { slotId: 'lab-failures-009', page: 'lab', section: 'failures', description: 'Lab 실패 X 마크 1.', slotSize: 'swatch', label: 'X' },
  { slotId: 'lab-failures-010', page: 'lab', section: 'failures', description: 'Lab 실패 X 마크 2.', slotSize: 'swatch', label: 'X' },
  { slotId: 'lab-failures-011', page: 'lab', section: 'failures', description: 'Lab 실패 NO 마크.', slotSize: 'micro', label: 'NO' },
  { slotId: 'lab-failures-012', page: 'lab', section: 'failures', description: 'Lab 실패 ? 마크.', slotSize: 'micro', label: '?' },

  // Method Section (5 slots)
  { slotId: 'lab-method-001', page: 'lab', section: 'method', description: 'Lab 방법론 관찰 이미지.', slotSize: 'medium', label: 'OBSERVE' },
  { slotId: 'lab-method-002', page: 'lab', section: 'method', description: 'Lab 방법론 실험 이미지.', slotSize: 'medium', label: 'EXPERIMENT' },
  { slotId: 'lab-method-003', page: 'lab', section: 'method', description: 'Lab 방법론 정제 이미지.', slotSize: 'medium', label: 'REFINE' },
  { slotId: 'lab-method-004', page: 'lab', section: 'method', description: 'Lab 방법론 노트 이미지.', slotSize: 'small', label: 'NOTE' },
  { slotId: 'lab-method-005', page: 'lab', section: 'method', description: 'Lab 방법론 레퍼런스 이미지.', slotSize: 'tiny', label: 'REF' },

  // CTA Section (3 slots)
  { slotId: 'lab-cta-001', page: 'lab', section: 'cta', description: 'Lab CTA 파이널 이미지.', slotSize: 'small', label: 'FINAL' },
  { slotId: 'lab-cta-002', page: 'lab', section: 'cta', description: 'Lab CTA 결과 이미지.', slotSize: 'tiny', label: 'RESULT' },
  { slotId: 'lab-cta-003', page: 'lab', section: 'cta', description: 'Lab CTA 화살표.', slotSize: 'micro', label: '→' },
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
