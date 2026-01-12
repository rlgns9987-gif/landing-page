'use client'

export default function HeroSection() {
  const scrollToForm = () => {
    const form = document.getElementById('consultation-form')
    form?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-blue rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-purple rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10 text-center py-20">
        {/* 메인 헤드라인 */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          <span className="block text-primary-blue mb-2">230만 학습자들을 위한</span>
          <span className="block text-gray-800 mb-2">단 하나의 맞춤형 학습 설계 서비스,</span>
          <span className="block gradient-text text-5xl md:text-7xl lg:text-8xl mt-4">
            [ 위드에듀 ]
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          성공적인 학업 여정의 시작과 끝을 함께합니다.
        </p>

        {/* 메인 CTA */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={scrollToForm}
            className="btn-primary text-xl md:text-2xl py-6 px-12 shadow-2xl"
          >
            1:1 맞춤 학습설계 받으러 가기 →
          </button>
        </div>

        {/* 특징 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          {/* STEP 01 */}
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="text-sm font-bold mb-2 opacity-90">STEP 01</div>
            <h3 className="text-2xl font-bold mb-4">최종학력 확인</h3>
            <div className="text-6xl mb-4">🎓</div>
            <p className="font-bold text-lg mb-2">[상황별 맞춤 학습설계]</p>
            <p className="text-sm opacity-90">
              대졸, 전문대졸, 고졸<br />
              모두 최단방기 학습과정 안내
            </p>
          </div>

          {/* STEP 02 */}
          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-sm font-bold mb-2 opacity-90">STEP 02</div>
            <h3 className="text-2xl font-bold mb-4">최대 78% 할인</h3>
            <div className="text-6xl mb-4">💰</div>
            <p className="font-bold text-lg mb-2">[합리적인 비용]</p>
            <p className="text-sm opacity-90">
              합리적인 비용으로<br />
              최단기간 마무리<br />
              효율적인 진행!
            </p>
          </div>

          {/* STEP 03 */}
          <div className="card bg-gradient-to-br from-pink-500 to-pink-600 text-white animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <div className="text-sm font-bold mb-2 opacity-90">STEP 03</div>
            <h3 className="text-2xl font-bold mb-4">목표 과정 마무리</h3>
            <div className="text-6xl mb-4">📝</div>
            <p className="font-bold text-lg mb-2">[마무리까지 확실한 안내]</p>
            <p className="text-sm opacity-90">
              수업 시작부터<br />
              학습과정 마무리까지<br />
              1:1 담당자의 책임 안내
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
