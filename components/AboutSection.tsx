'use client'

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">
            <span className="gradient-text">학점은행제는</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 설명 */}
            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                학점인정 등의 관한 법률에 의거한 교육부에서 주관하는 평생학습 학위제도입니다.
              </p>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                학위를 취득하고 싶은 그 누구에게나 학위취득의 기회를 주는 아주 멋진 우리나라의 제도입니다.
              </p>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                다양한 방법으로 학점을 인정받아 학위를 취득하고 응시자격과 자격증 취득에 필요한 자격요건을 갖출 수 있도록 만든 제도입니다.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mt-8">
                <p className="text-lg font-bold text-gray-800 mb-2">
                  ✨ 정식 학위 인정
                </p>
                <p className="text-gray-700">
                  학점은행제를 통해 취득한 학위는 일반 대학교 학위와 동등한 효력을 가집니다.
                </p>
              </div>
            </div>

            {/* 오른쪽: 일러스트 또는 이미지 영역 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-9xl mb-6">🎓</div>
                  <p className="text-2xl font-bold text-gray-800">학점은행제</p>
                  <p className="text-gray-600 mt-2">평생학습 학위제도</p>
                </div>
              </div>
              
              {/* 장식 요소 */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
