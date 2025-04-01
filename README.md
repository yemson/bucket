# 노트잇! (Note-it!)

노트잇은 Nuxt 3, Nitro, TipTap 에디터를 활용한 간편한 노트 작성 및 공유 서비스입니다. 일상의 이야기를 기록하고 공유할 수 있는 블로그 스타일의 애플리케이션입니다.

## 주요 기능

- 📝 **직관적인 노트 작성**: TipTap 에디터를 사용한 풍부한 텍스트 편집 경험
- 🔒 **공개/비공개 설정**: 작성한 노트의 공개 여부 설정 가능
- 🏷️ **태그 시스템**: 태그를 통한 노트 분류 (일상, 공부, 일, 취미, 기타)
- 👍 **좋아요 기능**: 다른 사용자의 노트에 좋아요 표시 가능
- 🌓 **다크 모드**: 라이트/다크 테마 지원
- 📱 **반응형 디자인**: 모바일부터 데스크탑까지 모든 기기에서 최적화된 경험

## 기술 스택

- **프론트엔드**:
  - [Nuxt 3](https://nuxt.com/): Vue 기반의 풀스택 프레임워크
  - [Nuxt UI](https://ui.nuxt.com/): UI 컴포넌트 라이브러리
  - [TipTap](https://tiptap.dev/): 모던 WYSIWYG 에디터
  - [Tailwind CSS](https://tailwindcss.com/): 유틸리티 우선 CSS 프레임워크

- **백엔드**:
  - [Nitro](https://nitro.unjs.io/): Nuxt의 서버 엔진
  - [Supabase](https://supabase.com/): 인증 및 데이터베이스 서비스

- **기타 도구**:
  - [Flicking](https://github.com/naver/egjs-flicking): 캐러셀 컴포넌트
  - [dayjs-nuxt](https://github.com/fumeapp/dayjs): 날짜 처리
  - [Vercel](https://vercel.com/): 배포 및 호스팅 (Speed Insights, Analytics)

## 로컬 개발 환경 구성

### 요구 사항

- Node.js (v16 이상 권장)
- npm 또는 yarn
- Supabase 계정 및 프로젝트

### 설치 및 실행

1. 저장소 복제
   ```bash
   git clone https://github.com/your-username/note-it.git
   cd note-it
   ```

2. 의존성 설치
   ```bash
   npm install
   # 또는
   yarn install
   ```

3. 환경 변수 설정
   - `.env` 파일을 생성하고 Supabase 연결 정보 추가
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-key
   ```

4. 개발 서버 실행
   ```bash
   npm run dev
   # 또는
   yarn dev
   ```

## 데이터베이스 구조

이 프로젝트는 Supabase를 사용하여 다음과 같은 테이블 구조를 가집니다:

- **profiles**: 사용자 프로필 정보
  - id: 사용자 고유 ID (auth.users와 연결)
  - email: 사용자 이메일
  - nickname: 사용자 닉네임

- **posts**: 노트 데이터
  - id: 노트 ID
  - user_id: 작성자 ID
  - title: 노트 제목
  - description: 노트 설명
  - post_json: TipTap 에디터 콘텐츠 (JSON)
  - is_public: 공개 여부
  - tag: 태그 배열
  - created_at: 생성 시간
  - updated_at: 수정 시간

- **likes**: 좋아요 정보
  - id: 좋아요 ID
  - post_id: 노트 ID
  - user_id: 사용자 ID
  - post_user_id: 노트 작성자 ID
  - created_at: 생성 시간
