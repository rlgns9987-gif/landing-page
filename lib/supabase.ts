import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export interface ConsultationRequest {
  id?: string
  name: string
  phone: string
  learning_goals: number[]        // 1,2,3,4,5
  final_education: number[]       // 1,2,3,4,5
  consultation_method: number     // 1 or 2
  manager_code?: number           // 1 or 2 (자동 배정)
  privacy_agreed: boolean
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  ip_address?: string
  user_agent?: string
  referrer?: string
  created_at?: string
}
