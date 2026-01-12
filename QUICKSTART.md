# 🚀 빠른 시작 가이드

## 1단계: Supabase 설정 (5분)

### 1.1 Supabase 프로젝트 생성
1. https://supabase.com 접속
2. "New Project" 클릭
3. 프로젝트 이름 입력 (예: credit-bank-landing)
4. Database Password 설정 (꼭 메모!)
5. Region 선택 (Northeast Asia - Seoul 권장)
6. "Create new project" 클릭

### 1.2 DB 테이블 생성
1. 왼쪽 메뉴에서 "SQL Editor" 클릭
2. "New query" 클릭
3. 루트 디렉토리의 `supabase_schema.sql` 파일 내용 복사
4. SQL Editor에 붙여넣기
5. "Run" 버튼 클릭 (오른쪽 하단)
6. 성공 메시지 확인

### 1.3 API 키 복사
1. 왼쪽 메뉴에서 "Settings" → "API" 클릭
2. "Project URL" 복사
3. "anon public" 키 복사

## 2단계: 프로젝트 설정 (3분)

### 2.1 패키지 설치
```bash
cd credit-bank-landing
npm install
```

### 2.2 환경 변수 설정
1. `.env.local.example` 파일을 복사하여 `.env.local` 생성:
```bash
cp .env.local.example .env.local
```

2. `.env.local` 파일 열어서 수정:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co  # 복사한 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key  # 복사한 anon 키
NEXT_PUBLIC_DAILY_LIMIT=20
```

## 3단계: 실행 (1분)

### 3.1 개발 서버 시작
```bash
npm run dev
```

### 3.2 브라우저에서 확인
http://localhost:3000 접속

### 3.3 테스트
1. 페이지 하단의 상담 신청 폼 작성
2. 제출 버튼 클릭
3. 성공 메시지 확인
4. Supabase Dashboard → Table Editor → consultation_requests에서 데이터 확인

## 4단계: 배포 (5분)

### 4.1 GitHub에 푸시
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 4.2 Vercel 배포
1. https://vercel.com 접속
2. "New Project" 클릭
3. GitHub 저장소 선택
4. Environment Variables 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_DAILY_LIMIT`
5. "Deploy" 클릭

## 완료! 🎉

이제 랜딩 페이지가 실행 중입니다!

## 다음 단계

### 커스터마이징
- `components/` 폴더의 각 컴포넌트에서 문구 수정
- `tailwind.config.js`에서 컬러 변경
- `public/` 폴더에 로고/이미지 추가

### Google Ads 연동
1. Google Ads에서 전환 추적 코드 생성
2. `app/layout.tsx`에 추적 스크립트 추가
3. UTM 파라미터가 포함된 URL로 광고 설정

### 모니터링
- Supabase Dashboard에서 실시간 데이터 확인
- Vercel Dashboard에서 트래픽/에러 모니터링

## 문제 해결

### "Supabase client not initialized"
→ `.env.local` 파일이 올바르게 설정되었는지 확인

### "Cannot find module"
→ `npm install` 다시 실행

### 폼 제출이 안됨
→ 브라우저 개발자 도구(F12) → Console 탭에서 에러 확인

## 지원
- README.md 참고
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
