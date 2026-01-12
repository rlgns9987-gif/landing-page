'use client'

const cases = [
  {
    id: 1,
    title: '학위취득 및 학력개선',
    description: '취업 혹은 이직 등의 다양한 이유로 학력을 개선하고자 하시는 분',
    detail: '고졸 → 전문대졸 / 2학기\n전문대졸 → 대졸 / 2학기',
    icon: '🎓',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 2,
    title: '자격증 취득',
    description: '사회복지사, 보육교사 등 취업을 위한 자격증 취득이 필요한 분',
    detail: '사회복지사2급 / 3학기\n보육교사2급 / 3학기',
    icon: '📜',
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 3,
    title: '(산업)기사 응시자격',
    description: '국가기술자격증 시험 OO기사, OO산업기사 응시자격이 필요하신 분',
    detail: '고졸 → 산업기사 / 1학기 과정\n전문대졸 → 기사 / 1학기 과정',
    icon: '🔧',
    color: 'from-indigo-400 to-indigo-600'
  },
  {
    id: 4,
    title: '인서울 & 지거국 편입',
    description: '인서울과 편입 지거국 편입을 위해 높은성적의 학위가 필요하신 분',
    detail: '고졸 → 일반편입 / 2학기\n전문대졸 → 학사편입 / 2학기',
    icon: '🏫',
    color: 'from-cyan-400 to-cyan-600'
  },
  {
    id: 5,
    title: '대학원진학',
    description: '교육대학원 or 특수대학원 진학을 목표로 학위취득을 준비하는 분',
    detail: '전문대졸 → 대학원 / 3학기\n대졸 → 대학원 / 2학기',
    icon: '🎯',
    color: 'from-teal-400 to-teal-600'
  },
  {
    id: 6,
    title: '시간이 없는 직장인',
    description: '공부를 하고싶지만 시간이 없어 걱정이신 분',
    detail: '100% 온라인 과정\n전 과정 모바일 수강 지원',
    icon: '⏰',
    color: 'from-orange-400 to-orange-600'
  },
  {
    id: 7,
    title: '난이도가 걱정이신분',
    description: '공부를 안한지 너무 오래되어 진도를 나갈때 있어서 걱정이신분',
    detail: '우점자료 지원\n원격제어를 통한 오류 해결',
    icon: '📚',
    color: 'from-rose-400 to-rose-600'
  }
]

export default function RecommendCases() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title">
          왜 <span className="gradient-text">'위드에듀'</span>인가요?<br />
          <span className="text-2xl md:text-3xl text-gray-600 font-normal">
            시험,레포트 걱정없다!
          </span>
        </h2>

        <div className="mb-16 text-center">
          <div className="inline-block bg-gray-100 rounded-2xl p-8">
            <p className="text-2xl font-bold text-gray-800 mb-4">출석률 80% 이상 기준</p>
            <p className="text-xl text-gray-600">과락걱정 NO</p>
            <ul className="mt-6 space-y-3 text-left">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>전과목 개설<br />교육원 이동없이 전 과목 수강 가능</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>모바일 수강<br />100% 온라인은 물론 모바일까지 지원</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>혼일 없는 상담시간<br />주말, 공휴일에도 가능한 학습안내</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, index) => (
            <div
              key={item.id}
              className="card hover:scale-105 transition-transform duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`text-6xl mb-4 bg-gradient-to-r ${item.color} w-20 h-20 rounded-full flex items-center justify-center`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 gradient-text">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {item.description}
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <p className="text-sm font-bold text-gray-800 whitespace-pre-line">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
