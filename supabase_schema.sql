-- 학점은행제 상담 신청 테이블
CREATE TABLE consultation_requests (
    -- 기본 키
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- 신청자 기본 정보
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    
    -- 학습목표 (다중 선택, 숫자 배열)
    -- 1: 자격증취득 과정
    -- 2: (산업)기사 응시자격
    -- 3: 편입준비
    -- 4: 대학원 진학준비
    -- 5: 학위취득 취득과정
    learning_goals INTEGER[],
    
    -- 최종학력 (다중 선택, 숫자 배열)
    -- 1: 고등학교 졸업
    -- 2: 전문대학교 졸업
    -- 3: 4년제 대학교 졸업
    -- 4: 대학교 중퇴
    -- 5: 기타
    final_education INTEGER[],
    
    -- 상담진행방식 (단일 선택)
    -- 1: 전화상담
    -- 2: 카카오톡상담
    consultation_method INTEGER CHECK (consultation_method IN (1, 2)),
    
    -- 담당자 코드 (자동 배정)
    -- 1 또는 2 (홀수번째 신청: 1, 짝수번째 신청: 2)
    manager_code INTEGER CHECK (manager_code IN (1, 2)),
    
    -- 상담 관리
    consultation_status VARCHAR(20) DEFAULT 'new' CHECK (consultation_status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
    memo TEXT,
    contacted_at TIMESTAMP WITH TIME ZONE,
    
    -- 개인정보 동의
    privacy_agreed BOOLEAN DEFAULT false NOT NULL,
    
    -- 마케팅 추적 (Google Ads)
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(255),
    utm_term VARCHAR(255),
    utm_content VARCHAR(255),
    
    -- 기술 정보
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    
    -- 타임스탬프
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 인덱스 생성 (조회 성능 최적화)
CREATE INDEX idx_consultation_status ON consultation_requests(consultation_status);
CREATE INDEX idx_created_at ON consultation_requests(created_at DESC);
CREATE INDEX idx_phone ON consultation_requests(phone);
CREATE INDEX idx_utm_source ON consultation_requests(utm_source);
CREATE INDEX idx_utm_campaign ON consultation_requests(utm_campaign);
CREATE INDEX idx_manager_code ON consultation_requests(manager_code);

-- updated_at 자동 업데이트를 위한 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER update_consultation_requests_updated_at 
    BEFORE UPDATE ON consultation_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) 설정
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (있을 경우)
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON consultation_requests;
DROP POLICY IF EXISTS "Enable insert for all users" ON consultation_requests;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON consultation_requests;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON consultation_requests;
DROP POLICY IF EXISTS "Allow anonymous insert" ON consultation_requests;
DROP POLICY IF EXISTS "Allow authenticated read" ON consultation_requests;
DROP POLICY IF EXISTS "Allow authenticated update" ON consultation_requests;
DROP POLICY IF EXISTS "Allow public insert" ON consultation_requests;
DROP POLICY IF EXISTS "Allow authenticated select" ON consultation_requests;
DROP POLICY IF EXISTS "Allow authenticated delete" ON consultation_requests;

-- 새 정책 생성
-- 1. 누구나 INSERT 가능 (랜딩 페이지 신청)
CREATE POLICY "Allow public insert"
ON consultation_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 2. 인증된 사용자만 SELECT 가능 (관리자)
CREATE POLICY "Allow authenticated select"
ON consultation_requests
FOR SELECT
TO authenticated
USING (true);

-- 3. 인증된 사용자만 UPDATE 가능 (관리자)
CREATE POLICY "Allow authenticated update"
ON consultation_requests
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 4. 인증된 사용자만 DELETE 가능 (관리자)
CREATE POLICY "Allow authenticated delete"
ON consultation_requests
FOR DELETE
TO authenticated
USING (true);

-- 코멘트 추가
COMMENT ON TABLE consultation_requests IS '학점은행제 상담 신청 데이터';
COMMENT ON COLUMN consultation_requests.consultation_status IS '상담 상태: new(신규), contacted(연락완료), in_progress(진행중), completed(완료), cancelled(취소)';
COMMENT ON COLUMN consultation_requests.learning_goals IS '학습목표 코드: 1(자격증취득), 2((산업)기사), 3(편입준비), 4(대학원진학), 5(학위취득)';
COMMENT ON COLUMN consultation_requests.final_education IS '최종학력 코드: 1(고졸), 2(전문대졸), 3(4년제졸), 4(대학중퇴), 5(기타)';
COMMENT ON COLUMN consultation_requests.consultation_method IS '상담방식: 1(전화상담), 2(카카오톡상담)';
COMMENT ON COLUMN consultation_requests.manager_code IS '담당자 코드: 1 또는 2 (홀수번째/짝수번째 신청 기준 자동배정)';
COMMENT ON COLUMN consultation_requests.utm_source IS 'Google Ads 추적용 - 광고 소스';
COMMENT ON COLUMN consultation_requests.utm_campaign IS 'Google Ads 추적용 - 캠페인명';