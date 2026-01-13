import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // UTM 파라미터 추출
    const url = new URL(request.url)
    const searchParams = url.searchParams
    
    // IP 주소 및 User Agent 추출
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || ''
    const referrer = request.headers.get('referer') || ''
    
    // 담당자 자동 배정 (홀수: 1, 짝수: 2)
    const { count } = await supabase
      .from('consultation_requests')
      .select('*', { count: 'exact', head: true })
    
    const managerCode = ((count || 0) % 2 === 0) ? 1 : 2 // 0번째는 1, 1번째는 2, 2번째는 1...
    
    // DB에 저장
    const { data: result, error } = await supabase
      .from('consultation_requests')
      .insert([
        {
          name: data.name,
          phone: data.phone,
          learning_goals: data.learningGoals,      // 숫자 배열
          final_education: data.finalEducation,    // 숫자 배열
          consultation_method: data.consultationMethod, // 1 or 2
          manager_code: managerCode,               // 자동 배정
          privacy_agreed: data.privacyAgreed,
          utm_source: searchParams.get('utm_source'),
          utm_medium: searchParams.get('utm_medium'),
          utm_term: searchParams.get('utm_term'),
          ip_address: ip,
          user_agent: userAgent,
          referrer: referrer
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: result,
      manager_code: managerCode // 담당자 코드도 반환
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
