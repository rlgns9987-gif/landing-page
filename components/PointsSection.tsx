'use client'

const points = [
  {
    number: '01',
    title: '담당자의 정확한 학습설계',
    description: '학습자님들의 목표에 맞는 1:1 맞춤 학습 설계를 진행해 원활한 수업 진행을 도와드립니다.',
    icon: '👨‍🏫',
    color: 'from-purple-500 to-purple-600'
  },
  {
    number: '02',
    title: 'PC/모바일을 이용한 수업진행',
    description: '시간이 부족한 학습자님들을 위해 PC뿐만 아니라 모바일로도 수업을 지원합니다.',
    icon: '📱',
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '03',
    title: '수업 시작부터 마무리까지',
    description: '학습자님들의 수업시작 뿐만아니라 원하는 목표를 이룰때까지 함께 도와드리고 있습니다.',
    icon: '🎯',
    color: 'from-teal-500 to-teal-600'
  }
]

export default function PointsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto space-y-16">
          {points.map((point, index) => (
            <div
              key={point.number}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* 이미지/아이콘 영역 */}
              <div className="flex-1">
                <div className={`bg-gradient-to-br ${point.color} rounded-3xl p-12 text-center shadow-2xl`}>
                  <div className="text-9xl mb-6">{point.icon}</div>
                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-8 py-3">
                    <p className="text-white font-bold text-xl">POINT {point.number}</p>
                  </div>
                </div>
              </div>

              {/* 설명 영역 */}
              <div className="flex-1">
                <div className="card bg-white">
                  <div className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full px-6 py-2 mb-4">
                    <span className="font-bold">POINT {point.number}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 gradient-text">
                    {point.title}
                  </h3>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
