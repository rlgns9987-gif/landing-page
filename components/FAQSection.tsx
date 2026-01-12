'use client'

const faqs = [
  {
    question: '직장을 다니느라 바쁜데... 잘 할 수 있을까요?',
    answer: '네! 가능합니다. 학점은행제 수업은 정해진 시간이 아닌 원하시는 편한 시간대에 강의를 수강하기에 누구나 할 수 있습니다!'
  },
  {
    question: '공부를 너무 오래만에 하는거라... 걱정이 크네요ㅠㅠ',
    answer: '학점은행제는 1:1 멘토시스템으로 각 전문 멘토들이 학사일정 안내와 더불어 참고문헌, 족보제공을 해드리고 있기 때문에 큰 어려움 없이 수료하실 수 있습니다!'
  },
  {
    question: '이무것도 모르고 담당자가 안내하는대로 수강신청 했더니 나중에 보니가 불필요한 수업을 들었더라고요',
    answer: '해당부분 확실합니다. 고객진에 문의했더니 교육원에 되는것만 교육원에 없는 확실한 거절의사가 전달 되어있지 않는다고 이런경우 어떻게 해야할까요...'
  }
]

export default function FAQSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          학점은행제 많이 하는 질문
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  Q.
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-purple-600 leading-relaxed">
                  {faq.question}
                </h3>
              </div>

              <div className="flex items-start gap-4 ml-0 md:ml-16">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  A.
                </div>
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 강조 메시지 */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-gray-900">
            <p className="text-xl md:text-2xl font-bold mb-4">
              정식인가 교육원을 통해 수업을 진행하는것이 <span className="text-red-600">학점은행제를</span> 가장 확실하고 안전하게 이용하는 방법입니다
            </p>
            <p className="text-lg">
              위드에듀는 <span className="font-bold">100% 정식인가 교육원으로</span> 안내해드리고 1:1 담당자를 또한 <span className="font-bold">5년이상의 경력자로</span> 구성 되어 있기에
            </p>
            <p className="text-lg mt-2">
              연락주셔서 같은 상황은 걱정 안하셔도 됩니다
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
