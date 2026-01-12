import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // 전체 누적 수
    const { count: totalCount, error: totalError } = await supabase
      .from('consultation_requests')
      .select('*', { count: 'exact', head: true })

    if (totalError) throw totalError

    // 오늘 신청 수
    const today = new Date().toISOString().split('T')[0]
    const { count: todayCount, error: todayError } = await supabase
      .from('consultation_requests')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${today}T00:00:00`)
      .lt('created_at', `${today}T23:59:59`)

    if (todayError) throw todayError

    const dailyLimit = parseInt(process.env.NEXT_PUBLIC_DAILY_LIMIT || '20')
    const remaining = Math.max(0, dailyLimit - (todayCount || 0))

    return NextResponse.json({
      success: true,
      data: {
        totalCount: totalCount || 0,
        todayCount: todayCount || 0,
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
