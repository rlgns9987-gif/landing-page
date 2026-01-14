'use client'

import { useEffect, useState } from 'react'

interface Stats {
  totalCount: number
  todayCount: number
  dailyLimit: number
  remaining: number
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stats>({
    totalCount: 0,
    todayCount: 0,
    dailyLimit: 20,
    remaining: 20
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    // 30초마다 자동 갱신
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const result = await response.json()
      if (result.success) {
        setStats(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="gradient-text">실시간 문의</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* 누적 신청 수 */}
          <div className="card text-center animate-slide-up">
            <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">
              {loading ? '...' : stats.totalCount}
            </div>
            <div className="text-gray-600 font-medium text-lg">
              누적 신청 수
            </div>
          </div>

          {/* 일일 신청 가능 수 */}
          <div className="card text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-5xl md:text-6xl font-bold text-primary-purple mb-4">
              {stats.dailyLimit}
            </div>
            <div className="text-gray-600 font-medium text-lg">
              일일 신청 가능 수
            </div>
          </div>

          {/* 금일 잔여 신청 수 */}
          <div className="card text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className={`text-5xl md:text-6xl font-bold mb-4 ${
              stats.remaining > 5 ? 'text-green-500' : 'text-red-500'
            }`}>
              {loading ? '...' : stats.remaining}
            </div>
            <div className="text-gray-600 font-medium text-lg">
              금일 잔여 신청 수
            </div>
          </div>
        </div>

        {stats.remaining <= 5 && stats.remaining > 0 && (
          <div className="mt-8 text-center">
            <p className="text-red-600 font-bold text-xl animate-pulse">
              ⚠️ 오늘 신청 마감이 얼마 남지 않았습니다!
            </p>
          </div>
        )}

        {stats.remaining === 0 && (
          <div className="mt-8 text-center">
            <p className="text-red-600 font-bold text-xl">
              오늘의 상담 신청이 마감되었습니다. 내일 다시 시도해주세요.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
