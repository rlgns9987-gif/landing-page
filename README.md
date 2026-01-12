# 학점은행제 상담 신청 랜딩 페이지

Next.js 14와 Supabase를 사용한 학점은행제 상담 신청 랜딩 페이지입니다.

## 🚀 주요 기능

- ✅ 실시간 상담 신청 통계 (누적/일일/잔여)
- ✅ 일일 신청 제한 기능 (기본 20건)
- ✅ Google Ads UTM 파라미터 자동 추적
- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 폼 validation 및 사용자 친화적 UX
- ✅ Supabase 실시간 데이터 연동
- ✅ 애니메이션 및 인터랙션 효과

## 📋 사전 요구사항

1. **Node.js 18+** 설치
2. **Supabase 계정** 및 프로젝트 생성
3. **npm** 또는 **yarn** 패키지 매니저

## 🛠️ 설치 및 실행

### 1. 패키지 설치

```bash
npm install
# 또는
yarn install
```

### 2. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. SQL Editor에서 `supabase_schema.sql` 파일 실행
3. Project Settings → API에서 URL과 anon key 복사

### 3. 환경 변수 설정

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_DAILY_LIMIT=20
```

### 4. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 `http://localhost:3000` 접속

### 5. 프로덕션 빌드

```bash
npm run build
npm start
# 또는
yarn build
yarn start
```

## 📁 프로젝트 구조

```
credit-bank-landing/
├── app/
│   ├── api/
│   │   ├── consultation/
│   │   │   └── route.ts          # 상담 신청 API
│   │   └── stats/
│   │       └── route.ts          # 통계 조회 API
│   ├── globals.css               # 글로벌 스타일
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 메인 페이지
├── components/
│   ├── Header.tsx                # 헤더/네비게이션
│   ├── HeroSection.tsx           # 히어로 섹션
│   ├── StatsSection.tsx          # 실시간 통계
│   ├── AboutSection.tsx          # 학점은행제 소개
│   ├── RecommendCases.tsx        # 추천 케이스
│   ├── OnlineSection.tsx         # 온라인 학습 섹션
│   ├── PointsSection.tsx         # 포인트 설명
│   ├── FAQSection.tsx            # FAQ
│   ├── ConsultationForm.tsx      # 상담 신청 폼
│   └── Footer.tsx                # 푸터
├── lib/
│   └── supabase.ts               # Supabase 클라이언트
├── public/                       # 정적 파일
├── .env.local.example            # 환경 변수 예시
├── tailwind.config.js            # Tailwind 설정
├── tsconfig.json                 # TypeScript 설정
└── package.json                  # 프로젝트 의존성
```

## 🎨 디자인 특징

- **메인 컬러**: 파란색(#4A7CFF) & 보라색(#7C3AED) 그라디언트
- **포인트 컬러**: 노란색(#FFD93D)
- **타이포그래피**: 시스템 폰트 스택 (한글 최적화)
- **애니메이션**: Fade-in, Slide-up 효과

## 📊 DB 스키마

### consultation_requests 테이블

- `id`: UUID (Primary Key)
- `name`: 이름 (필수)
- `phone`: 전화번호 (필수)
- `learning_goals`: 학습목표 (배열)
- `final_education`: 최종학력 (배열)
- `consultation_method`: 상담방식 (phone/kakao)
- `utm_*`: Google Ads 추적 파라미터
- `ip_address`, `user_agent`, `referrer`: 추적 정보
- `privacy_agreed`: 개인정보 동의
- `created_at`, `updated_at`: 타임스탬프

## 🔧 커스터마이징

### 일일 신청 제한 변경

`.env.local`:
```env
NEXT_PUBLIC_DAILY_LIMIT=30  # 원하는 숫자로 변경
```

### 컬러 테마 변경

`tailwind.config.js`:
```js
colors: {
  primary: {
    blue: '#YOUR_COLOR',
    purple: '#YOUR_COLOR',
  }
}
```

### 문구 수정

각 컴포넌트 파일에서 텍스트 직접 수정 가능

## 📱 반응형 브레이크포인트

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 배포

### Vercel 배포 (권장)

1. GitHub에 프로젝트 푸시
2. [Vercel](https://vercel.com) 접속 후 Import
3. 환경 변수 설정
4. Deploy 클릭

### 기타 플랫폼

- Netlify
- Cloudflare Pages
- AWS Amplify

모두 Next.js를 지원하며 동일한 방식으로 배포 가능

## 🔒 보안

- ✅ Supabase Row Level Security (RLS) 활성화
- ✅ API 키는 환경 변수로 관리
- ✅ 클라이언트에서 `anon` 키만 사용
- ✅ `service_role` 키는 절대 노출 금지

## 📈 Google Ads 연동

### UTM 파라미터 자동 추적

URL 예시:
```
https://your-domain.com/?utm_source=google&utm_medium=cpc&utm_campaign=spring2024
```

모든 UTM 파라미터가 자동으로 DB에 저장됨

### Google Tag Manager 설정

상담 신청 완료 시 dataLayer 이벤트 발생:
```javascript
window.dataLayer.push({
  'event': 'consultation_submit',
  'consultation_type': 'credit_bank'
})
```

## 🐛 트러블슈팅

### Supabase 연결 오류
- `.env.local` 파일 확인
- Supabase URL과 키가 올바른지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인

### 통계가 표시되지 않음
- DB에 데이터가 있는지 확인
- RLS 정책이 올바르게 설정되었는지 확인
- 브라우저 콘솔에서 에러 확인

### 폼 제출이 안됨
- 필수 항목이 모두 입력되었는지 확인
- 네트워크 탭에서 API 응답 확인
- Supabase 로그 확인

## 📞 지원

문제가 발생하면 이슈를 등록해주세요.

## 📄 라이선스

MIT License

---

Made with ❤️ by 위드에듀
