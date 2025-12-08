# ASKEW - Twisted yet Harmonious

## BRAND IDENTITY
**"Twisted yet Harmonious"**

ASKEW (어스큐) = "비뚤어진, 기울어진"
뒤틀렸지만 조화로운. Wearable sculpture.

**Slogan**: "Twisted yet Harmonious"
**Message**: "Structure woven in silence, beauty caught in light."
**Collection**: Spider's Web Collection

## CORE PHILOSOPHY
- **정체성**: 실험적 패션 포트폴리오 (Wearable Sculpture)
- **핵심 미학**: 뒤틀렸지만 조화로운 - 모든 요소가 약간씩 어긋나 있지만 전체적으로 아름다운 구성
- **디자이너**: Taehyun Lee (이태현), 사사다 패션스쿨
- **목적**: CSM, Parsons, Antwerp 대학원 포트폴리오
- **도메인**: askewstudio.vercel.app

## WEBSITE STRUCTURE

### HOME (/)
- Deconstructivist 스타일 이미지 배치
- 패럴랙스 스크롤 효과
- "ASKEW" 브랜드 타이포그래피
- Spider's Web Collection 프리뷰

### COLLECTIONS (/collections)
- 비대칭 그리드 갤러리
- Sanity CMS 연동 (선택적)
- 시즌별 필터링 (AW25, SS25, AW24, SS24)

### COLLECTIONS/[SLUG] (/collections/[slug])
- 동적 라우팅
- 풀스크린 히어로 이미지
- 컨셉, 기법, 소재 정보

### ARCHIVE (/archive)
- 리서치/프로세스 문서화
- 시즌별 필터링
- 카테고리: Construction, Material, Form, Process

### ABOUT (/about)
- 디자이너 소개 (미니멀)
- 이름 + 도시 + 연락처만
- 이미지가 말하게 한다

### CONTACT (/contact)
- 미니멀 디자인
- 문의 폼 (Name, Email, Type, Message)
- 이메일: hello@askew.studio
- 인스타그램: @askew_studio

## DESIGN PRINCIPLES

### 비대칭 미학
- 60:40, 70:30 비율 분할
- 예상치 못한 요소 배치
- 0.5° ~ 3° 미세한 회전

### 색상 팔레트
- 흑백 베이스
- yon-black (#0A0A0A) ~ yon-white (#FAFAFA)
- 강조색: yon-accent (#8B7355)

### 타이포그래피
- Cormorant Garamond (세리프) - 타이틀
- Inter (산세리프) - 본문
- Space Mono (모노) - 기술 정보

### 애니메이션
- transform과 opacity만 사용
- ease-out-expo 커브
- Framer Motion 사용

## TECHNICAL STACK
- Next.js 16 App Router (Turbopack)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis (스무스 스크롤)
- Sanity CMS (선택적)

## SEO & ACCESSIBILITY
- 동적 sitemap.ts, robots.ts
- 동적 OG 이미지 (opengraph-image.tsx)
- 페이지별 메타데이터
- Skip to main, focus-visible, aria 속성
- AI 크롤러 허용 (GPTBot, ClaudeBot 등)

## PERFORMANCE
- Lighthouse 90점 이상 목표
- LCP 이미지 priority
- next/image 최적화

## NOT ALLOWED
- Three.js, WebGL
- 무거운 파티클 시스템
- E-commerce 기능
- 복잡한 색상 팔레트

---

ASKEW — Twisted yet Harmonious
