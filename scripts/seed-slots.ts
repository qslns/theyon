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
  { slotId: 'home-background-001', page: 'home', section: 'background', description: '전체 배경, 고정 위치', slotSize: 'background', label: 'BACKGROUND' },

  // Hero Section (15 slots)
  { slotId: 'home-hero-001', page: 'home', section: 'hero', description: '주요 포커스, 좌상단 대형', slotSize: 'hero', label: 'LOOK 01' },
  { slotId: 'home-hero-002', page: 'home', section: 'hero', description: '보조 포커스, 우상단 대형', slotSize: 'large', label: 'LOOK 02' },
  { slotId: 'home-hero-003', page: 'home', section: 'hero', description: '클로즈업, 중앙 중형', slotSize: 'medium', label: 'DETAIL' },
  { slotId: 'home-hero-004', page: 'home', section: 'hero', description: '프로세스 표현, 소형', slotSize: 'small', label: 'PROCESS' },
  { slotId: 'home-hero-005', page: 'home', section: 'hero', description: '텍스처 샘플 A', slotSize: 'swatch', label: 'FABRIC' },
  { slotId: 'home-hero-006', page: 'home', section: 'hero', description: '텍스처 샘플 B', slotSize: 'swatch', label: 'WOOL' },
  { slotId: 'home-hero-007', page: 'home', section: 'hero', description: '구조 테스트, 소형', slotSize: 'small', label: 'TOILE' },
  { slotId: 'home-hero-008', page: 'home', section: 'hero', description: '참조 이미지, 아주 작음', slotSize: 'tiny', label: 'REF' },
  { slotId: 'home-hero-009', page: 'home', section: 'hero', description: '번호 표시', slotSize: 'micro', label: '01' },
  { slotId: 'home-hero-010', page: 'home', section: 'hero', description: '실루엣 강조, 세로형', slotSize: 'medium', label: 'SILHOUETTE' },
  { slotId: 'home-hero-011', page: 'home', section: 'hero', description: '텍스처 샘플 C, 클러스터', slotSize: 'swatch', label: 'SILK' },
  { slotId: 'home-hero-012', page: 'home', section: 'hero', description: '텍스처 샘플 D, 클러스터', slotSize: 'swatch', label: 'LINEN' },
  { slotId: 'home-hero-013', page: 'home', section: 'hero', description: '분위기 표현, 아주 작음', slotSize: 'tiny', label: 'MOOD' },
  { slotId: 'home-hero-014', page: 'home', section: 'hero', description: '아카이브 참조, 소형', slotSize: 'small', label: 'ARCHIVE' },
  { slotId: 'home-hero-015', page: 'home', section: 'hero', description: '형태 연구, 중형 세로', slotSize: 'medium', label: 'FORM' },

  // Philosophy Section (6 slots)
  { slotId: 'home-philosophy-001', page: 'home', section: 'philosophy', description: '분위기 설정, 중형', slotSize: 'medium', label: 'MOOD' },
  { slotId: 'home-philosophy-002', page: 'home', section: 'philosophy', description: '시각 참조, 소형', slotSize: 'small', label: 'REF' },
  { slotId: 'home-philosophy-003', page: 'home', section: 'philosophy', description: '텍스처 샘플', slotSize: 'swatch', label: 'TEXTURE' },
  { slotId: 'home-philosophy-004', page: 'home', section: 'philosophy', description: '초기 아이디어, 소형', slotSize: 'small', label: 'SKETCH' },
  { slotId: 'home-philosophy-005', page: 'home', section: 'philosophy', description: '디테일 강조, 아주 작음', slotSize: 'tiny', label: 'DETAIL' },
  { slotId: 'home-philosophy-006', page: 'home', section: 'philosophy', description: '번호 표시', slotSize: 'micro', label: '002' },

  // Collections Preview (10 slots)
  { slotId: 'home-collections-001', page: 'home', section: 'collections-preview', description: '첫 번째 컬렉션 대표, 대형', slotSize: 'large', label: 'DECONSTRUCTION / 01' },
  { slotId: 'home-collections-002', page: 'home', section: 'collections-preview', description: '디테일 표현, 소형', slotSize: 'small', label: 'DETAIL' },
  { slotId: 'home-collections-003', page: 'home', section: 'collections-preview', description: '텍스처 샘플 A', slotSize: 'swatch', label: 'DENIM' },
  { slotId: 'home-collections-004', page: 'home', section: 'collections-preview', description: '참조 이미지', slotSize: 'tiny', label: 'REF' },
  { slotId: 'home-collections-005', page: 'home', section: 'collections-preview', description: '두 번째 컬렉션 대표, 중형', slotSize: 'medium', label: 'FRAGMENTS / 01' },
  { slotId: 'home-collections-006', page: 'home', section: 'collections-preview', description: '텍스처 표현, 소형', slotSize: 'small', label: 'TEXTURE' },
  { slotId: 'home-collections-007', page: 'home', section: 'collections-preview', description: '텍스처 샘플 B', slotSize: 'swatch', label: 'NYLON' },
  { slotId: 'home-collections-008', page: 'home', section: 'collections-preview', description: '세 번째 컬렉션 대표, 중형', slotSize: 'medium', label: 'VOID / 01' },
  { slotId: 'home-collections-009', page: 'home', section: 'collections-preview', description: '실루엣 표현, 소형', slotSize: 'small', label: 'SILHOUETTE' },
  { slotId: 'home-collections-010', page: 'home', section: 'collections-preview', description: '볼륨감 샘플', slotSize: 'swatch', label: 'VOL' },

  // Process Teaser (8 slots)
  { slotId: 'home-process-001', page: 'home', section: 'process-teaser', description: '초기 아이디어, 중형', slotSize: 'medium', label: 'SKETCH / 001' },
  { slotId: 'home-process-002', page: 'home', section: 'process-teaser', description: '반복 과정, 소형', slotSize: 'small', label: 'ITERATION' },
  { slotId: 'home-process-003', page: 'home', section: 'process-teaser', description: '최종 결과, 소형', slotSize: 'small', label: 'FINAL' },
  { slotId: 'home-process-004', page: 'home', section: 'process-teaser', description: '거절된 시안, 아주 작음', slotSize: 'tiny', label: 'REJECTED' },
  { slotId: 'home-process-005', page: 'home', section: 'process-teaser', description: '메모/노트, 소형', slotSize: 'small', label: 'NOTE' },
  { slotId: 'home-process-006', page: 'home', section: 'process-teaser', description: '샘플 클러스터 A', slotSize: 'swatch', label: 'A' },
  { slotId: 'home-process-007', page: 'home', section: 'process-teaser', description: '샘플 클러스터 B', slotSize: 'swatch', label: 'B' },
  { slotId: 'home-process-008', page: 'home', section: 'process-teaser', description: '번호 표시', slotSize: 'micro', label: '03' },

  // Contact CTA (3 slots)
  { slotId: 'home-contact-001', page: 'home', section: 'contact-cta', description: '액센트, 소형', slotSize: 'small', label: 'CONTACT' },
  { slotId: 'home-contact-002', page: 'home', section: 'contact-cta', description: '액센트, 아주 작음', slotSize: 'tiny', label: 'MAIL' },
  { slotId: 'home-contact-003', page: 'home', section: 'contact-cta', description: '화살표 마크', slotSize: 'micro', label: '→' },

  // ==========================================
  // ABOUT PAGE (41 slots)
  // ==========================================
  { slotId: 'about-background-001', page: 'about', section: 'background', description: '전체 배경, 고정 위치', slotSize: 'background', label: 'BACKGROUND' },

  // Hero Section (15 slots)
  { slotId: 'about-hero-001', page: 'about', section: 'hero', description: '메인 포트레이트, 좌상단 대형', slotSize: 'hero', label: 'PORTRAIT' },
  { slotId: 'about-hero-002', page: 'about', section: 'hero', description: '작업공간, 우상단 대형', slotSize: 'large', label: 'STUDIO' },
  { slotId: 'about-hero-003', page: 'about', section: 'hero', description: '손 작업 표현, 중형', slotSize: 'medium', label: 'HANDS' },
  { slotId: 'about-hero-004', page: 'about', section: 'hero', description: '작업 과정, 소형', slotSize: 'small', label: 'PROCESS' },
  { slotId: 'about-hero-005', page: 'about', section: 'hero', description: '도시 배경, 중형', slotSize: 'medium', label: 'TOKYO' },
  { slotId: 'about-hero-006', page: 'about', section: 'hero', description: '학교 배경, 소형', slotSize: 'small', label: 'SASADA' },
  { slotId: 'about-hero-007', page: 'about', section: 'hero', description: '텍스처 샘플', slotSize: 'swatch', label: 'MATERIAL' },
  { slotId: 'about-hero-008', page: 'about', section: 'hero', description: '디테일 표현, 아주 작음', slotSize: 'tiny', label: 'DETAIL' },
  { slotId: 'about-hero-009', page: 'about', section: 'hero', description: '번호 표시', slotSize: 'micro', label: '01' },
  { slotId: 'about-hero-010', page: 'about', section: 'hero', description: '아이디어 표현, 중형', slotSize: 'medium', label: 'SKETCHBOOK' },
  { slotId: 'about-hero-011', page: 'about', section: 'hero', description: '텍스처 샘플 A', slotSize: 'swatch', label: 'WOOL' },
  { slotId: 'about-hero-012', page: 'about', section: 'hero', description: '텍스처 샘플 B', slotSize: 'swatch', label: 'SILK' },
  { slotId: 'about-hero-013', page: 'about', section: 'hero', description: '참조 이미지, 아주 작음', slotSize: 'tiny', label: 'REF' },
  { slotId: 'about-hero-014', page: 'about', section: 'hero', description: '분위기 표현, 소형', slotSize: 'small', label: 'MOOD' },
  { slotId: 'about-hero-015', page: 'about', section: 'hero', description: '형태 연구, 중형', slotSize: 'medium', label: 'FORM' },

  // Philosophy Section (8 slots)
  { slotId: 'about-philosophy-001', page: 'about', section: 'philosophy', description: '분위기 설정, 중형', slotSize: 'medium', label: 'MOOD' },
  { slotId: 'about-philosophy-002', page: 'about', section: 'philosophy', description: '비전 표현, 소형', slotSize: 'small', label: 'VISION' },
  { slotId: 'about-philosophy-003', page: 'about', section: 'philosophy', description: '참조 이미지, 아주 작음', slotSize: 'tiny', label: 'REF' },
  { slotId: 'about-philosophy-004', page: 'about', section: 'philosophy', description: '텍스처 샘플', slotSize: 'swatch', label: 'TEXTURE' },
  { slotId: 'about-philosophy-005', page: 'about', section: 'philosophy', description: '초기 아이디어, 소형', slotSize: 'small', label: 'SKETCH' },
  { slotId: 'about-philosophy-006', page: 'about', section: 'philosophy', description: '아이디어 표현, 아주 작음', slotSize: 'tiny', label: 'IDEA' },
  { slotId: 'about-philosophy-007', page: 'about', section: 'philosophy', description: '번호 표시', slotSize: 'micro', label: '02' },
  { slotId: 'about-philosophy-008', page: 'about', section: 'philosophy', description: '형태 표현, 소형', slotSize: 'small', label: 'FORM' },

  // Education Section (6 slots)
  { slotId: 'about-education-001', page: 'about', section: 'education', description: '초기 아이디어, 중형', slotSize: 'medium', label: 'SKETCH' },
  { slotId: 'about-education-002', page: 'about', section: 'education', description: '구조 테스트, 소형', slotSize: 'small', label: 'TOILE' },
  { slotId: 'about-education-003', page: 'about', section: 'education', description: '패턴 표현, 소형', slotSize: 'small', label: 'PATTERN' },
  { slotId: 'about-education-004', page: 'about', section: 'education', description: '메모/노트, 아주 작음', slotSize: 'tiny', label: 'NOTE' },
  { slotId: 'about-education-005', page: 'about', section: 'education', description: '텍스처 샘플', slotSize: 'swatch', label: 'SAMPLE' },
  { slotId: 'about-education-006', page: 'about', section: 'education', description: '번호 표시', slotSize: 'micro', label: '03' },

  // Process Section (7 slots)
  { slotId: 'about-process-001', page: 'about', section: 'process', description: '리서치 표현, 중형', slotSize: 'medium', label: 'RESEARCH' },
  { slotId: 'about-process-002', page: 'about', section: 'process', description: '초기 아이디어, 소형', slotSize: 'small', label: 'SKETCH' },
  { slotId: 'about-process-003', page: 'about', section: 'process', description: '프로토타입, 소형', slotSize: 'small', label: 'PROTOTYPE' },
  { slotId: 'about-process-004', page: 'about', section: 'process', description: '반복 과정, 아주 작음', slotSize: 'tiny', label: 'ITERATE' },
  { slotId: 'about-process-005', page: 'about', section: 'process', description: '최종 결과, 소형', slotSize: 'small', label: 'FINAL' },
  { slotId: 'about-process-006', page: 'about', section: 'process', description: '텍스처 샘플 A', slotSize: 'swatch', label: 'A' },
  { slotId: 'about-process-007', page: 'about', section: 'process', description: '텍스처 샘플 B', slotSize: 'swatch', label: 'B' },

  // Contact Section (3 slots)
  { slotId: 'about-contact-001', page: 'about', section: 'contact', description: '작업공간, 소형', slotSize: 'small', label: 'STUDIO' },
  { slotId: 'about-contact-002', page: 'about', section: 'contact', description: '연락 아이콘, 아주 작음', slotSize: 'tiny', label: 'MAIL' },
  { slotId: 'about-contact-003', page: 'about', section: 'contact', description: '@ 마크', slotSize: 'micro', label: '@' },

  // ==========================================
  // COLLECTIONS PAGE (16 slots)
  // ==========================================
  { slotId: 'collections-background-001', page: 'collections', section: 'background', description: '전체 배경, 고정 위치', slotSize: 'background', label: 'BACKGROUND' },

  // Header Section (10 slots)
  { slotId: 'collections-header-001', page: 'collections', section: 'header', description: '주요 피처드, 대형', slotSize: 'hero', label: 'FEATURED' },
  { slotId: 'collections-header-002', page: 'collections', section: 'header', description: '시즌 대표, 대형', slotSize: 'large', label: 'AW25' },
  { slotId: 'collections-header-003', page: 'collections', section: 'header', description: '작업 과정, 중형', slotSize: 'medium', label: 'PROCESS' },
  { slotId: 'collections-header-004', page: 'collections', section: 'header', description: '참조 이미지, 소형', slotSize: 'small', label: 'REF' },
  { slotId: 'collections-header-005', page: 'collections', section: 'header', description: '텍스처 샘플 A', slotSize: 'swatch', label: 'A' },
  { slotId: 'collections-header-006', page: 'collections', section: 'header', description: '텍스처 샘플 B', slotSize: 'swatch', label: 'B' },
  { slotId: 'collections-header-007', page: 'collections', section: 'header', description: '텍스처 샘플 C', slotSize: 'swatch', label: 'C' },
  { slotId: 'collections-header-008', page: 'collections', section: 'header', description: '아카이브 참조, 소형', slotSize: 'small', label: 'ARCHIVE' },
  { slotId: 'collections-header-009', page: 'collections', section: 'header', description: '초기 아이디어, 아주 작음', slotSize: 'tiny', label: 'SKETCH' },
  { slotId: 'collections-header-010', page: 'collections', section: 'header', description: '번호 표시', slotSize: 'micro', label: '04' },

  // Archive Section (5 slots)
  { slotId: 'collections-archive-001', page: 'collections', section: 'archive', description: '아카이브 메인, 중형', slotSize: 'medium', label: 'ARCHIVE' },
  { slotId: 'collections-archive-002', page: 'collections', section: 'archive', description: '문서 표현, 소형', slotSize: 'small', label: 'DOC' },
  { slotId: 'collections-archive-003', page: 'collections', section: 'archive', description: '작업 과정, 아주 작음', slotSize: 'tiny', label: 'PROCESS' },
  { slotId: 'collections-archive-004', page: 'collections', section: 'archive', description: '참조 샘플', slotSize: 'swatch', label: 'REF' },
  { slotId: 'collections-archive-005', page: 'collections', section: 'archive', description: '화살표 마크', slotSize: 'micro', label: '→' },

  // ==========================================
  // ARCHIVE PAGE (16 slots)
  // ==========================================
  { slotId: 'archive-background-001', page: 'archive', section: 'background', description: '전체 배경, 고정 위치', slotSize: 'background', label: 'BACKGROUND' },

  // Header Section (12 slots)
  { slotId: 'archive-header-001', page: 'archive', section: 'header', description: '메인 포커스, 좌측 대형', slotSize: 'hero', label: 'ARCHIVE / MAIN' },
  { slotId: 'archive-header-002', page: 'archive', section: 'header', description: '작업 과정, 대형', slotSize: 'large', label: 'PROCESS' },
  { slotId: 'archive-header-003', page: 'archive', section: 'header', description: '리서치 표현, 중형', slotSize: 'medium', label: 'RESEARCH' },
  { slotId: 'archive-header-004', page: 'archive', section: 'header', description: '스터디 표현, 소형', slotSize: 'small', label: 'STUDY' },
  { slotId: 'archive-header-005', page: 'archive', section: 'header', description: '문서 표현, 중형', slotSize: 'medium', label: 'DOCUMENT' },
  { slotId: 'archive-header-006', page: 'archive', section: 'header', description: '텍스처 샘플 A', slotSize: 'swatch', label: 'A' },
  { slotId: 'archive-header-007', page: 'archive', section: 'header', description: '텍스처 샘플 B', slotSize: 'swatch', label: 'B' },
  { slotId: 'archive-header-008', page: 'archive', section: 'header', description: '텍스처 샘플 C', slotSize: 'swatch', label: 'C' },
  { slotId: 'archive-header-009', page: 'archive', section: 'header', description: '참조 이미지, 아주 작음', slotSize: 'tiny', label: 'REF' },
  { slotId: 'archive-header-010', page: 'archive', section: 'header', description: '메모/노트, 소형', slotSize: 'small', label: 'NOTES' },
  { slotId: 'archive-header-011', page: 'archive', section: 'header', description: '번호 표시', slotSize: 'micro', label: '01' },
  { slotId: 'archive-header-012', page: 'archive', section: 'header', description: '히스토리 표현, 중형', slotSize: 'medium', label: 'HISTORY' },

  // CTA Section (3 slots)
  { slotId: 'archive-cta-001', page: 'archive', section: 'cta', description: '결과 표현, 소형', slotSize: 'small', label: 'RESULT' },
  { slotId: 'archive-cta-002', page: 'archive', section: 'cta', description: '최종 결과, 아주 작음', slotSize: 'tiny', label: 'FINAL' },
  { slotId: 'archive-cta-003', page: 'archive', section: 'cta', description: '화살표 마크', slotSize: 'micro', label: '→' },

  // ==========================================
  // PROCESS PAGE (12 slots)
  // ==========================================
  { slotId: 'process-background-001', page: 'process', section: 'background', description: '전체 배경, 고정 위치', slotSize: 'background', label: 'BACKGROUND' },

  // Hero Section (8 slots)
  { slotId: 'process-hero-001', page: 'process', section: 'hero', description: '초기 아이디어, 중형', slotSize: 'medium', label: 'SKETCH' },
  { slotId: 'process-hero-002', page: 'process', section: 'hero', description: '구조 테스트, 소형', slotSize: 'small', label: 'TOILE' },
  { slotId: 'process-hero-003', page: 'process', section: 'hero', description: '텍스처 표현, 소형', slotSize: 'small', label: 'FABRIC' },
  { slotId: 'process-hero-004', page: 'process', section: 'hero', description: '참조 이미지, 아주 작음', slotSize: 'tiny', label: 'REF' },
  { slotId: 'process-hero-005', page: 'process', section: 'hero', description: '분위기 표현, 소형', slotSize: 'small', label: 'MOOD' },
  { slotId: 'process-hero-006', page: 'process', section: 'hero', description: '디테일 표현, 아주 작음', slotSize: 'tiny', label: 'DETAIL' },
  { slotId: 'process-hero-007', page: 'process', section: 'hero', description: '텍스처 샘플 A', slotSize: 'swatch', label: 'A' },
  { slotId: 'process-hero-008', page: 'process', section: 'hero', description: '텍스처 샘플 B', slotSize: 'swatch', label: 'B' },

  // CTA Section (3 slots)
  { slotId: 'process-cta-001', page: 'process', section: 'cta', description: '최종 결과, 소형', slotSize: 'small', label: 'FINAL' },
  { slotId: 'process-cta-002', page: 'process', section: 'cta', description: '결과 표현, 아주 작음', slotSize: 'tiny', label: 'RESULT' },
  { slotId: 'process-cta-003', page: 'process', section: 'cta', description: '화살표 마크', slotSize: 'micro', label: '→' },

  // ==========================================
  // CONTACT PAGE (25 slots)
  // ==========================================
  { slotId: 'contact-background-001', page: 'contact', section: 'background', description: '전체 배경, 고정 위치', slotSize: 'background', label: 'BACKGROUND' },

  // Hero Section (15 slots)
  { slotId: 'contact-hero-001', page: 'contact', section: 'hero', description: '작업공간, 좌상단 대형', slotSize: 'hero', label: 'STUDIO' },
  { slotId: 'contact-hero-002', page: 'contact', section: 'hero', description: '연락 표현, 대형', slotSize: 'large', label: 'CONTACT' },
  { slotId: 'contact-hero-003', page: 'contact', section: 'hero', description: '도시 배경, 중형', slotSize: 'medium', label: 'SEOUL' },
  { slotId: 'contact-hero-004', page: 'contact', section: 'hero', description: '텍스처 샘플 A', slotSize: 'swatch', label: 'A' },
  { slotId: 'contact-hero-005', page: 'contact', section: 'hero', description: '텍스처 샘플 B', slotSize: 'swatch', label: 'B' },
  { slotId: 'contact-hero-006', page: 'contact', section: 'hero', description: '참조 이미지, 아주 작음', slotSize: 'tiny', label: 'REF' },
  { slotId: 'contact-hero-007', page: 'contact', section: 'hero', description: '작업 과정, 소형', slotSize: 'small', label: 'PROCESS' },
  { slotId: 'contact-hero-008', page: 'contact', section: 'hero', description: '메일 아이콘, 소형', slotSize: 'small', label: 'MAIL' },
  { slotId: 'contact-hero-009', page: 'contact', section: 'hero', description: '문의 표현, 중형', slotSize: 'medium', label: 'INQUIRY' },
  { slotId: 'contact-hero-010', page: 'contact', section: 'hero', description: '번호 표시', slotSize: 'micro', label: '01' },
  { slotId: 'contact-hero-011', page: 'contact', section: 'hero', description: '작업 표현, 소형', slotSize: 'small', label: 'WORK' },
  { slotId: 'contact-hero-012', page: 'contact', section: 'hero', description: '협업 표현, 아주 작음', slotSize: 'tiny', label: 'COLLAB' },
  { slotId: 'contact-hero-013', page: 'contact', section: 'hero', description: '지역 태그', slotSize: 'swatch', label: 'KR' },
  { slotId: 'contact-hero-014', page: 'contact', section: 'hero', description: '연도 태그', slotSize: 'swatch', label: '2024' },
  { slotId: 'contact-hero-015', page: 'contact', section: 'hero', description: '화살표 마크', slotSize: 'micro', label: '→' },

  // Location Section (6 slots)
  { slotId: 'contact-location-001', page: 'contact', section: 'location', description: '도시 배경, 중형', slotSize: 'medium', label: 'SEOUL' },
  { slotId: 'contact-location-002', page: 'contact', section: 'location', description: '작업공간, 소형', slotSize: 'small', label: 'STUDIO' },
  { slotId: 'contact-location-003', page: 'contact', section: 'location', description: '공간 표현, 소형', slotSize: 'small', label: 'SPACE' },
  { slotId: 'contact-location-004', page: 'contact', section: 'location', description: '방문 표현, 아주 작음', slotSize: 'tiny', label: 'VISIT' },
  { slotId: 'contact-location-005', page: 'contact', section: 'location', description: '위치 표시 샘플', slotSize: 'swatch', label: 'MAP' },
  { slotId: 'contact-location-006', page: 'contact', section: 'location', description: '예약 표시 샘플', slotSize: 'swatch', label: 'BY APPT' },

  // Social Section (3 slots)
  { slotId: 'contact-social-001', page: 'contact', section: 'social', description: '소셜 미디어, 소형', slotSize: 'small', label: 'IG' },
  { slotId: 'contact-social-002', page: 'contact', section: 'social', description: '@ 마크, 아주 작음', slotSize: 'tiny', label: '@' },
  { slotId: 'contact-social-003', page: 'contact', section: 'social', description: 'DM 태그 샘플', slotSize: 'swatch', label: 'DM' },

  // ==========================================
  // LAB PAGE (28 slots)
  // ==========================================
  { slotId: 'lab-background-001', page: 'lab', section: 'background', description: '전체 배경, 고정 위치', slotSize: 'background', label: 'BACKGROUND' },

  // Hero Section (12 slots)
  { slotId: 'lab-hero-001', page: 'lab', section: 'hero', description: '실험 메인, 대형', slotSize: 'hero', label: 'EXP / MAIN' },
  { slotId: 'lab-hero-002', page: 'lab', section: 'hero', description: '테스트 표현, 대형', slotSize: 'large', label: 'TEST 001' },
  { slotId: 'lab-hero-003', page: 'lab', section: 'hero', description: '샘플 표현, 중형', slotSize: 'medium', label: 'SAMPLE' },
  { slotId: 'lab-hero-004', page: 'lab', section: 'hero', description: '반복 과정, 소형', slotSize: 'small', label: 'ITERATION' },
  { slotId: 'lab-hero-005', page: 'lab', section: 'hero', description: '작업 과정, 중형', slotSize: 'medium', label: 'PROCESS' },
  { slotId: 'lab-hero-006', page: 'lab', section: 'hero', description: '텍스처 샘플 A', slotSize: 'swatch', label: 'A' },
  { slotId: 'lab-hero-007', page: 'lab', section: 'hero', description: '텍스처 샘플 B', slotSize: 'swatch', label: 'B' },
  { slotId: 'lab-hero-008', page: 'lab', section: 'hero', description: '참조 이미지, 아주 작음', slotSize: 'tiny', label: 'REF' },
  { slotId: 'lab-hero-009', page: 'lab', section: 'hero', description: '분위기 표현, 소형', slotSize: 'small', label: 'MOOD' },
  { slotId: 'lab-hero-010', page: 'lab', section: 'hero', description: '번호 표시', slotSize: 'micro', label: '01' },
  { slotId: 'lab-hero-011', page: 'lab', section: 'hero', description: '데이터 표현, 아주 작음', slotSize: 'tiny', label: 'DATA' },
  { slotId: 'lab-hero-012', page: 'lab', section: 'hero', description: '결과 표현, 소형', slotSize: 'small', label: 'RESULT' },

  // Failures Section (12 slots)
  { slotId: 'lab-failures-001', page: 'lab', section: 'failures', description: '거절된 시안, 중형', slotSize: 'medium', label: 'REJECTED / 01' },
  { slotId: 'lab-failures-002', page: 'lab', section: 'failures', description: '실패한 구조, 소형', slotSize: 'small', label: 'FAILED TOILE' },
  { slotId: 'lab-failures-003', page: 'lab', section: 'failures', description: '잘못된 방향, 소형', slotSize: 'small', label: 'WRONG PATH' },
  { slotId: 'lab-failures-004', page: 'lab', section: 'failures', description: '반복 과정 3, 아주 작음', slotSize: 'tiny', label: 'ITERATION 03' },
  { slotId: 'lab-failures-005', page: 'lab', section: 'failures', description: '폐기된 시안, 소형', slotSize: 'small', label: 'DISCARDED' },
  { slotId: 'lab-failures-006', page: 'lab', section: 'failures', description: '스터디 표현, 아주 작음', slotSize: 'tiny', label: 'STUDY' },
  { slotId: 'lab-failures-007', page: 'lab', section: 'failures', description: '중단된 샘플', slotSize: 'swatch', label: 'BROKEN' },
  { slotId: 'lab-failures-008', page: 'lab', section: 'failures', description: '포기된 시안, 소형', slotSize: 'small', label: 'ABANDONED' },
  { slotId: 'lab-failures-009', page: 'lab', section: 'failures', description: 'X 마크 샘플 1', slotSize: 'swatch', label: 'X' },
  { slotId: 'lab-failures-010', page: 'lab', section: 'failures', description: 'X 마크 샘플 2', slotSize: 'swatch', label: 'X' },
  { slotId: 'lab-failures-011', page: 'lab', section: 'failures', description: 'NO 마크', slotSize: 'micro', label: 'NO' },
  { slotId: 'lab-failures-012', page: 'lab', section: 'failures', description: '? 마크', slotSize: 'micro', label: '?' },

  // Method Section (5 slots)
  { slotId: 'lab-method-001', page: 'lab', section: 'method', description: '관찰 단계, 중형', slotSize: 'medium', label: 'OBSERVE' },
  { slotId: 'lab-method-002', page: 'lab', section: 'method', description: '실험 단계, 중형', slotSize: 'medium', label: 'EXPERIMENT' },
  { slotId: 'lab-method-003', page: 'lab', section: 'method', description: '정제 단계, 중형', slotSize: 'medium', label: 'REFINE' },
  { slotId: 'lab-method-004', page: 'lab', section: 'method', description: '메모/노트, 소형', slotSize: 'small', label: 'NOTE' },
  { slotId: 'lab-method-005', page: 'lab', section: 'method', description: '참조 이미지, 아주 작음', slotSize: 'tiny', label: 'REF' },

  // CTA Section (3 slots)
  { slotId: 'lab-cta-001', page: 'lab', section: 'cta', description: '최종 결과, 소형', slotSize: 'small', label: 'FINAL' },
  { slotId: 'lab-cta-002', page: 'lab', section: 'cta', description: '결과 표현, 아주 작음', slotSize: 'tiny', label: 'RESULT' },
  { slotId: 'lab-cta-003', page: 'lab', section: 'cta', description: '화살표 마크', slotSize: 'micro', label: '→' },
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
