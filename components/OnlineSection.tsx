'use client'

export default function OnlineSection() {
  const scrollToForm = () => {
    const form = document.getElementById('consultation-form')
    form?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            회원가입 없는 <span className="text-yellow-300">1분 학습설계</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            정확한 안내를 위한 하루 20명 한정 안내
          </p>

          {/* 이미지/비디오 영역 - 실제로는 이미지를 넣으시면 됩니다 */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm p-8">
            <div className="aspect-video bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">💻</div>
                <p className="text-2xl font-bold">온라인 학습 설계</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <p className="text-xl font-bold mb-4">
              " 정확하고 체계적인 학습설계를 받고 싶다면 훈스쿨에서 상담 받아보세요! "
            </p>
          </div>

          <button
            onClick={scrollToForm}
            className="bg-white text-purple-700 font-bold text-xl py-5 px-12 rounded-full hover:bg-yellow-300 hover:text-purple-900 transition-all duration-300 shadow-2xl hover:scale-110"
          >
            지금 바로 신청하기 →
          </button>
        </div>
      </div>
    </section>
  )
}
