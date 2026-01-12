'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center gap-2">
            <div className="text-2xl md:text-3xl font-bold">
              <span className="gradient-text">위드에듀</span>
            </div>
            <div className={`hidden md:block text-sm ${scrolled ? 'text-gray-600' : 'text-gray-700'}`}>
              학점은행제 | 원격평생교육원
            </div>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('consultation-form')}
              className={`font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-primary-blue' : 'text-gray-800 hover:text-primary-purple'
              }`}
            >
              학점은행제란?
            </button>
            <button
              onClick={() => scrollToSection('consultation-form')}
              className="btn-primary"
            >
              무료 상담 신청
            </button>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full ${scrolled ? 'bg-gray-800' : 'bg-gray-800'} transition-all`}></span>
              <span className={`block h-0.5 w-full ${scrolled ? 'bg-gray-800' : 'bg-gray-800'} transition-all`}></span>
              <span className={`block h-0.5 w-full ${scrolled ? 'bg-gray-800' : 'bg-gray-800'} transition-all`}></span>
            </div>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 bg-white rounded-lg shadow-lg">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('consultation-form')}
                className="text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded"
              >
                학점은행제란?
              </button>
              <button
                onClick={() => scrollToSection('consultation-form')}
                className="mx-4 btn-primary text-center"
              >
                무료 상담 신청
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
