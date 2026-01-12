import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '위드에듀 | 학점은행제 무료상담',
  description: '230만 학습자들을 위한 단 하나의 맞춤형 학습 설계 서비스. 학점은행제 전문 상담을 통해 학위 취득, 자격증, 편입, 대학원 진학을 준비하세요.',
  keywords: '학점은행제, 학위취득, 자격증, 사회복지사, 보육교사, 편입, 대학원, 온라인학습',
  openGraph: {
    title: '위드에듀 | 학점은행제 무료상담',
    description: '230만 학습자들을 위한 맞춤형 학습 설계 서비스',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
