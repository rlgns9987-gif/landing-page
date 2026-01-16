import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // 전체 누적 수
    const { count: totalCount, error: totalError } = await supabase
      .from('consultation_requests')
      .select('*', { count: 'exact', head: true })

    if (totalError) throw totalError

    // 오늘 신청 수 (한국시간 기준 - 날짜만 비교)
    const kstOffset = 9 * 60 * 60 * 1000
    const nowKST = new Date(new Date().getTime() + kstOffset)
    const kstToday = nowKST.toISOString().split('T')[0] // YYYY-MM-DD

    const { count: todayCount , error : todayError } = await supabase
      .from('consultation_requests')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${kstToday}T00:00:00`)
      .lt('created_at', `${kstToday}T23:59:59.999`)

    if (todayError) throw todayError

    const dailyLimit = parseInt(process.env.NEXT_PUBLIC_DAILY_LIMIT || '25')
    const baseRemaining = 17  // 고정 시작값
    const remaining = Math.max(0, baseRemaining - (todayCount || 0));

    return NextResponse.json({
      success: true,
      data: {
        totalCount: totalCount || 0,
        todayCount: todayCount,
        dailyLimit,
        remaining
      }
    })

  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { error: '통계 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}