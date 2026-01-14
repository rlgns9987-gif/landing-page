'use client'

import { useState, useEffect } from 'react'

interface FormData {
  name: string
  phone: string
  learningGoals: number[]          // 1,2,3,4,5
  finalEducation: number[]         // 1,2,3,4,5
  consultationMethod: number | 0   // 1 or 2 (0은 미선택)
  privacyAgreed: boolean
}

// 학습목표 옵션 (코드: 라벨)
const learningGoalOptions = [
  { code: 1, label: '자격증취득 과정' },
  { code: 2, label: '(산업)기사 응시자격' },
  { code: 3, label: '편입준비' },
  { code: 4, label: '대학원 진학준비' },
  { code: 5, label: '학위취득 취득과정' }
]

// 최종학력 옵션 (코드: 라벨)
const finalEducationOptions = [
  { code: 1, label: '고등학교 졸업' },
  { code: 2, label: '전문대학교 졸업' },
  { code: 3, label: '4년제 대학교 졸업' },
  { code: 4, label: '대학교 중퇴' },
  { code: 5, label: '기타' }
]

export default function ConsultationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    learningGoals: [],
    finalEducation: [],
    consultationMethod: 0,
    privacyAgreed: false
  })

  const [stats, setStats] = useState({
    remaining: 20,
    totalCount: 0
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const result = await response.json()
      if (result.success) {
        setStats({
          remaining: result.data.remaining,
          totalCount: result.data.totalCount
        })
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const handleCheckboxChange = (field: 'learningGoals' | 'finalEducation', value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '')
    
    // 자동으로 하이픈 추가
    if (value.length <= 3) {
      value = value
    } else if (value.length <= 7) {
      value = value.slice(0, 3) + '-' + value.slice(3)
    } else if (value.length <= 11) {
      value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7)
    } else {
      value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11)
    }
    
    setFormData(prev => ({ ...prev, phone: value }))
  }

  const validateForm = (): string | null => {
    if (!formData.name.trim()) {
      return '이름을 입력해주세요.'
    }
    
    if (!formData.phone.trim()) {
      return '연락처를 입력해주세요.'
    }
    
    const phoneRegex = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/
    if (!phoneRegex.test(formData.phone)) {
      return '올바른 연락처 형식이 아닙니다. (예: 010-1234-5678)'
    }
    
    if (formData.learningGoals.length === 0) {
      return '학습목표를 최소 1개 이상 선택해주세요.'
    }
    
    if (formData.finalEducation.length === 0) {
      return '최종학력을 최소 1개 이상 선택해주세요.'
    }
    
    if (!formData.consultationMethod || formData.consultationMethod === 0) {
      return '원하는 상담 방식을 선택해주세요.'
    }
    
    if (!formData.privacyAgreed) {
      return '개인정보 수집 및 이용에 동의해주세요.'
    }
    
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 일일 신청 마감 체크
    if (stats.remaining <= 0) {
      alert('오늘의 상담 신청이 마감되었습니다. 내일 다시 시도해주세요.')
      return
    }

    // 폼 검증
    const error = validateForm()
    if (error) {
      alert(error)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        alert(`상담 신청이 완료되었습니다!\n빠른 시일 내에 연락드리겠습니다.`)
        
        // 폼 초기화
        setFormData({
          name: '',
          phone: '',
          learningGoals: [],
          finalEducation: [],
          consultationMethod: 0,
          privacyAgreed: false
        })
        
        // 통계 갱신
        fetchStats()
        // 이 줄 추가!
        window.location.reload()
      } else {
        alert(result.error || '오류가 발생했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="consultation-form" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom max-w-4xl">
        <h2 className="section-title">
          학점은행제 <span className="gradient-text">무료상담</span>
        </h2>

        <form onSubmit={handleSubmit} className="card">
          {/* 학습목표 */}
          <div className="mb-8">
            <label className="block text-xl font-bold mb-4 text-gray-800">
              학습목표 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {learningGoalOptions.map(option => (
                <label
                  key={option.code}
                  className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                  style={{
                    borderColor: formData.learningGoals.includes(option.code) ? '#4A7CFF' : '#E5E7EB',
                    backgroundColor: formData.learningGoals.includes(option.code) ? '#EFF6FF' : 'white'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.learningGoals.includes(option.code)}
                    onChange={() => handleCheckboxChange('learningGoals', option.code)}
                    className="w-5 h-5 text-primary-blue focus:ring-primary-blue"
                  />
                  <span className="ml-3 font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 최종학력 */}
          <div className="mb-8">
            <label className="block text-xl font-bold mb-4 text-gray-800">
              최종학력 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {finalEducationOptions.map(option => (
                <label
                  key={option.code}
                  className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
                  style={{
                    borderColor: formData.finalEducation.includes(option.code) ? '#7C3AED' : '#E5E7EB',
                    backgroundColor: formData.finalEducation.includes(option.code) ? '#F3E8FF' : 'white'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.finalEducation.includes(option.code)}
                    onChange={() => handleCheckboxChange('finalEducation', option.code)}
                    className="w-5 h-5 text-primary-purple focus:ring-primary-purple"
                  />
                  <span className="ml-3 font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 이름 */}
          <div className="mb-6">
            <label className="block text-xl font-bold mb-3 text-gray-800">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="이름을 입력해주세요"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-blue focus:outline-none text-lg"
              required
            />
          </div>

          {/* 연락처 */}
          <div className="mb-6">
            <label className="block text-xl font-bold mb-3 text-gray-800">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="010-0000-0000"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-blue focus:outline-none text-lg"
              required
            />
          </div>

          {/* 상담진행방식 */}
          <div className="mb-8">
            <label className="block text-xl font-bold mb-4 text-gray-800">
              상담진행방식 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex-1">
                <input
                  type="radio"
                  name="consultationMethod"
                  value="1"
                  checked={formData.consultationMethod === 1}
                  onChange={() => setFormData(prev => ({ ...prev, consultationMethod: 1 }))}
                  className="sr-only"
                />
                <div
                  className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all ${
                    formData.consultationMethod === 1
                      ? 'border-primary-blue bg-blue-50 font-bold'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  📞 전화상담
                </div>
              </label>
              
              <label className="flex-1">
                <input
                  type="radio"
                  name="consultationMethod"
                  value="2"
                  checked={formData.consultationMethod === 2}
                  onChange={() => setFormData(prev => ({ ...prev, consultationMethod: 2 }))}
                  className="sr-only"
                />
                <div
                  className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all ${
                    formData.consultationMethod === 2
                      ? 'border-primary-purple bg-purple-50 font-bold'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  💬 카카오톡상담
                </div>
              </label>
            </div>
          </div>

          {/* 개인정보 동의 */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <label className="block text-lg font-bold mb-3">
              개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
            </label>
            <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4 max-h-48 overflow-y-auto text-sm">
              <p className="font-bold mb-2">&lt;위드에듀&gt; 개인정보 처리방침</p>
              <p className="mb-2">
                위드에듀(은)는 개인정보 보호법 제30조에 따라 정보주체(고객)의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립·공개합니다.
              </p>
              <p className="font-bold mt-3 mb-2">제1조 (개인정보의 처리목적)</p>
              <p>
                1. 개인정보의 처리목적 위드에듀(은)는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
              </p>
            </div>
            
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={formData.privacyAgreed}
                onChange={(e) => setFormData(prev => ({ ...prev, privacyAgreed: e.target.checked }))}
                className="w-5 h-5 mt-1 text-primary-blue focus:ring-primary-blue"
                required
              />
              <span className="ml-3 text-gray-700">
                개인정보 수집 및 이용에 동의합니다.
              </span>
            </label>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={loading || stats.remaining <= 0}
            className={`w-full py-5 rounded-lg text-xl font-bold transition-all ${
              loading || stats.remaining <= 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-blue to-primary-purple text-white hover:shadow-2xl hover:scale-105'
            }`}
          >
            {loading ? '제출 중...' : stats.remaining <= 0 ? '오늘 신청 마감' : '무료 상담 신청하기'}
          </button>

          {stats.remaining > 0 && stats.remaining <= 5 && (
            <p className="text-center mt-4 text-red-600 font-bold animate-pulse">
              ⚠️ 잔여 {stats.remaining}석 - 서둘러주세요!
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
