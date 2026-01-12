'use client'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4 gradient-text">위드에듀</h3>
            <p className="text-sm leading-relaxed">
              학점은행제 전문 상담<br />
              230만 학습자들을 위한<br />
              맞춤형 학습 설계 서비스
            </p>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>📧 이메일: with.education@naver.com</li>
              <li>📞 고객센터: 02-2114-8224</li>
              <li>🏢 사업자등록번호: 384-40-00729</li>
            </ul>
          </div>

          {/* 주소 */}
          <div>
            <h4 className="text-white font-bold mb-4">Address</h4>
            <p className="text-sm leading-relaxed">
              서울특별시 금천구 디지털로 178
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#consultation-form" className="hover:text-white transition-colors">
                  무료 상담 신청
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  이용약관
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 위드에듀. All rights reserved.</p>
          <p className="mt-2 text-gray-500">
            학점은행제 전문 상담 서비스
          </p>
        </div>
      </div>
    </footer>
  )
}
