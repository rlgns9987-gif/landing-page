# DB 설계 변경 요약 (V2)

## 🔄 주요 변경사항

### 1. 숫자 코드 기반 데이터 구조

기존의 텍스트 배열/문자열 방식을 **숫자 코드**로 완전히 변경했습니다.

#### 변경 전 (V1):
```typescript
learning_goals: ['자격증취득 과정', '편입준비']  // 텍스트 배열
final_education: ['고등학교 졸업']              // 텍스트 배열
consultation_method: 'phone'                    // 문자열
```

#### 변경 후 (V2):
```typescript
learning_goals: [1, 3]          // 숫자 배열
final_education: [1]            // 숫자 배열
consultation_method: 1          // 숫자 (1 or 2)
```

---

## 📊 코드 매핑표

### 학습목표 (learning_goals)
| 코드 | 의미 |
|------|------|
| 1 | 자격증취득 과정 |
| 2 | (산업)기사 응시자격 |
| 3 | 편입준비 |
| 4 | 대학원 진학준비 |
| 5 | 학위취득 취득과정 |

**예시:**
- `[1, 3]` → 자격증취득 + 편입준비
- `[2, 4, 5]` → 기사자격 + 대학원 + 학위취득

### 최종학력 (final_education)
| 코드 | 의미 |
|------|------|
| 1 | 고등학교 졸업 |
| 2 | 전문대학교 졸업 |
| 3 | 4년제 대학교 졸업 |
| 4 | 대학교 중퇴 |
| 5 | 기타 |

**예시:**
- `[1]` → 고졸
- `[2, 4]` → 전문대졸 + 대학중퇴

### 상담진행방식 (consultation_method)
| 코드 | 의미 |
|------|------|
| 1 | 전화상담 |
| 2 | 카카오톡상담 |

**예시:**
- `1` → 전화상담
- `2` → 카카오톡상담

### 담당자 코드 (manager_code) - 자동 배정
| 코드 | 배정 규칙 |
|------|----------|
| 1 | 홀수번째 신청 (1번째, 3번째, 5번째...) |
| 2 | 짝수번째 신청 (2번째, 4번째, 6번째...) |

**예시:**
- 첫 번째 신청 → `manager_code: 1`
- 두 번째 신청 → `manager_code: 2`
- 세 번째 신청 → `manager_code: 1`
- 네 번째 신청 → `manager_code: 2`

---

## 🗂️ DB 스키마 (최종)

```sql
CREATE TABLE consultation_requests (
    id UUID PRIMARY KEY,
    
    -- 기본 정보
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    
    -- 선택 항목 (숫자 코드)
    learning_goals INTEGER[],           -- [1,2,3,4,5]
    final_education INTEGER[],          -- [1,2,3,4,5]
    consultation_method INTEGER,        -- 1 or 2
    manager_code INTEGER,               -- 1 or 2 (자동)
    
    -- 동의
    privacy_agreed BOOLEAN,
    
    -- 추적 정보
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(255),
    utm_term VARCHAR(255),
    utm_content VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    
    -- 상담 관리
    consultation_status VARCHAR(20) DEFAULT 'new',
    memo TEXT,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    contacted_at TIMESTAMP
);
```

---

## 💾 실제 저장 예시

### 사용자가 이렇게 선택:
- ✅ 자격증취득 과정
- ✅ 편입준비
- ✅ 고등학교 졸업
- 이름: 홍길동
- 전화: 010-1234-5678
- 📞 전화상담

### DB에 이렇게 저장:
```json
{
  "id": "uuid-xxx",
  "name": "홍길동",
  "phone": "010-1234-5678",
  "learning_goals": [1, 3],        // 코드로 저장
  "final_education": [1],          // 코드로 저장
  "consultation_method": 1,        // 코드로 저장
  "manager_code": 1,               // 자동 배정
  "privacy_agreed": true,
  "utm_source": "google",
  "utm_campaign": "spring2024",
  "created_at": "2024-01-15T10:30:00"
}
```

---

## ✨ 장점

### 1. 데이터 크기 절약
- **기존**: `['자격증취득 과정', '편입준비']` → 40+ bytes
- **변경**: `[1, 3]` → 8 bytes
- **절약**: 약 80% 용량 감소

### 2. 검색 성능 향상
```sql
-- 빠름!
SELECT * FROM consultation_requests WHERE 1 = ANY(learning_goals);

-- 느림 (기존)
SELECT * FROM consultation_requests WHERE '자격증취득 과정' = ANY(learning_goals);
```

### 3. 유지보수 용이
- 라벨 변경 시 DB 데이터 수정 불필요
- 프론트엔드에서만 매핑 테이블 수정
- 다국어 지원 쉬움 (코드는 동일, 라벨만 번역)

### 4. 오타 방지
- 텍스트는 오타 가능: "자격증취득 과정" vs "자격증 취득 과정"
- 숫자는 오타 없음: `1` vs `1` (항상 동일)

---

## 🔍 관리자 대시보드 조회 예시

### 담당자별 신청 건수
```sql
SELECT 
  manager_code,
  COUNT(*) as total_count
FROM consultation_requests
WHERE created_at >= '2024-01-01'
GROUP BY manager_code;
```

결과:
```
manager_code | total_count
-------------+-------------
1            | 145
2            | 142
```

### 학습목표별 분석
```sql
SELECT 
  UNNEST(learning_goals) as goal_code,
  COUNT(*) as count
FROM consultation_requests
GROUP BY goal_code
ORDER BY count DESC;
```

결과:
```
goal_code | count
----------+-------
1         | 320   (자격증취득)
3         | 280   (편입준비)
5         | 250   (학위취득)
2         | 180   (기사자격)
4         | 150   (대학원)
```

---

## 🚀 API 응답 예시

### 제출 성공 시:
```json
{
  "success": true,
  "data": {
    "id": "uuid-xxx",
    "name": "홍길동",
    "learning_goals": [1, 3],
    "final_education": [1],
    "consultation_method": 1,
    "manager_code": 1,
    "created_at": "2024-01-15T10:30:00"
  },
  "manager_code": 1
}
```

사용자에게 표시:
```
✅ 상담 신청이 완료되었습니다!
담당자 1번이 배정되었습니다.
빠른 시일 내에 연락드리겠습니다.
```

---

## 📝 마이그레이션 가이드

### 기존 데이터가 있는 경우:

```sql
-- 1. 백업
CREATE TABLE consultation_requests_backup AS 
SELECT * FROM consultation_requests;

-- 2. 텍스트 → 숫자 변환
UPDATE consultation_requests SET
  learning_goals = ARRAY(
    SELECT CASE
      WHEN goal = '자격증취득 과정' THEN 1
      WHEN goal = '(산업)기사 응시자격' THEN 2
      WHEN goal = '편입준비' THEN 3
      WHEN goal = '대학원 진학준비' THEN 4
      WHEN goal = '학위취득 취득과정' THEN 5
    END::INTEGER
    FROM UNNEST(learning_goals) AS goal
  );

-- 3. 컬럼 타입 변경
ALTER TABLE consultation_requests 
  ALTER COLUMN learning_goals TYPE INTEGER[] USING learning_goals::INTEGER[];
```

---

## 완료! ✅

이제 DB가 훨씬 더 **심플하고 효율적**으로 변경되었습니다!

- ✅ 숫자 코드 기반
- ✅ 담당자 자동 배정 (홀수/짝수)
- ✅ 불필요한 필드 제거
- ✅ 데이터 크기 80% 절약
- ✅ 검색 성능 향상
