"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube, Facebook } from 'lucide-react'

export default function DonationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copyToast, setCopyToast] = useState(false)
  
  const bankAccounts = [
    {
      bank: "카카오뱅크",
      account: "7979-866-8405",
      holder: "도예슬"
    },
  ]

  const copyToClipboard = (bank: string, account: string) => {
    const textToCopy = `${bank} ${account}`
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyToast(true)
      setTimeout(() => {
        setCopyToast(false)
      }, 1500) // 3초 후 사라짐
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-transparent backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="AURI COMMUNITY 로고"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-light tracking-wider">
                AURI COMMUNITY
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-12">
              <Link
                href="/about"
                className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide"
              >
                ABOUT
              </Link>
              <Link
                href="/connect-worship"
                className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide"
              >
                CONNECT WORSHIP
              </Link>
              <Link
                href="/camp"
                className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide"
              >
                CAMP
              </Link>
              <Link
                href="/blog"
                className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide"
              >
                BLOG
              </Link>
              <Link
                href="/donation"
                className="text-white hover:text-white/80 transition-all duration-300 text-sm font-light tracking-wide"
              >
                후원
              </Link>
            </div>
            
            {/* 모바일 메뉴 버튼 */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-white/80 transition-colors"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          
          {/* 모바일 메뉴 */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10">
              <div className="flex flex-col space-y-4 pt-4">
                <Link
                  href="/about"
                  className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link
                  href="/connect-worship"
                  className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  CONNECT WORSHIP
                </Link>
                <Link
                  href="/camp"
                  className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  CAMP
                </Link>
                <Link
                  href="/blog"
                  className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  BLOG
                </Link>
                <Link
                  href="/donation"
                  className="text-white hover:text-white/80 transition-all duration-300 text-sm font-light tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  후원
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/donation.jpg?height=1080&width=1920"
            alt="후원 - 함께하는 사랑의 손길"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin tracking-wider mb-12">
            후원
          </h1>
          
          <div className="flex items-center justify-center space-x-3 text-white/60 text-sm font-light">
          <p className="text-xl md:text-2xl font-light tracking-wide text-white/80 mb-6">
            작은 사랑이 모여, 다음세대의 예배를 지켜냅니다
          </p>
          </div>
        </div>
      </section>

      {/* Donation Content */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin tracking-wide text-white mb-8">
              함께 만드는 희망
            </h2>
            <p className="text-lg text-white/70 font-light leading-relaxed max-w-3xl mx-auto">
              AURI의 사역과 캠프는 여러분의 후원으로 이어집니다.<br />
              여러분의 소중한 나눔은 더 많은 청소년들에게 하나님의 사랑을 전하는 데 사용됩니다.
            </p>
          </div>

          {/* Bank Account Info */}
          <div className="max-w-2xl mx-auto mb-16">
            <h3 className="text-2xl font-thin text-white mb-8 text-center">후원 계좌</h3>
            <div className="space-y-6">
              {bankAccounts.map((account, index) => (
                <div key={index} className="bg-zinc-900 p-8 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-white font-medium text-lg">{account.bank}</span>
                        <span className="text-white/60 text-sm">예금주: {account.holder}</span>
                      </div>
                      <div className="text-2xl font-light text-white tracking-wider">
                        {account.account}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(account.bank, account.account)}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm"
                    >
                      복사
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-zinc-800/50 p-6 rounded-lg mt-6">
              <h4 className="text-white font-light mb-3">후원 안내</h4>
              <ul className="text-white/70 text-sm space-y-2">
                <li>• 계좌 이체 후 010-4820-9155(김희성 목사)로 연락주시면 감사합니다</li>
                <li>• 후원자 성함과 연락처를 남겨주세요</li>
                <li>• 기부금 영수증이 필요하신 경우 말씀해주세요</li>
                <li>• 정기 후원을 원하시는 경우 별도 연락 부탁드립니다</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-thin text-white mb-8">후원금 사용처</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-lg font-light text-white mb-2">다음세대를 위한 캠프</h4>
              <p className="text-white/60 text-sm">여름/겨울 캠프 캠프를 통해<br/>청소년들에게 복음을 전합니다.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2m0 0h4m6 0v1a3 3 0 11-6 0v-1m6-4.5H9m9.5 0a2.5 2.5 0 000-5H16.5a2.5 2.5 0 000 5z" />
                </svg>
              </div>
              <h4 className="text-lg font-light text-white mb-2">예배와 사역을 위한 지원</h4>
              <p className="text-white/60 text-sm">미자립 교회, 청소년 예배 및 모임의 운영을 함께 돕습니다.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-light text-white mb-2">청소년 장학 후원</h4>
              <p className="text-white/60 text-sm">캠프 참가가 어려운 청소년에게<br/>참가비와 후원금을 지원합니다.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-light text-white mb-2">국내 선교와 나눔 사역</h4>
              <p className="text-white/60 text-sm">지역 청소년과 이웃을 위한<br/>복음 전파와 봉사 활동에 사용됩니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-thin text-white mb-8">후원 문의</h3>
          <div className="bg-zinc-900 p-8 rounded-lg">
            <div className="space-y-4 text-white/70">
              <div>
                <span className="text-white font-light">전화</span> 010-4820-9155(김희성 목사)
              </div>
              <div>
                <span className="text-white font-light">이메일</span> auricommunity@gmail.com
              </div>

            </div>
            <p className="text-white/60 text-sm mt-6">
              후원과 관련한 모든 문의사항은 언제든지 연락해주세요.
            </p>
          </div>
        </div>
      </section>

      {/* 복사 완료 토스트 알림 */}
      {copyToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out">
          <div className="bg-white text-black px-6 py-3 rounded-lg shadow-xl border border-gray-200 flex items-center space-x-3 animate-pulse">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-medium">계좌번호가 복사되었습니다!</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="AURI COMMUNITY 로고"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xl font-light tracking-wider">
                  AURI COMMUNITY
                </span>
              </div>
              <p className="text-white/60 leading-relaxed font-light text-sm">
                하나님의 사랑으로 하나 되는 공동체
              </p>
            </div>
            <div>
              <h4 className="font-light text-white mb-6 text-sm tracking-wide">MENU</h4>
              <div className="space-y-3">
                <Link href="/about" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">
                  ABOUT
                </Link>
                <Link href="/connect-worship" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">
                  CONNECT WORSHIP
                </Link>
                <Link href="/camp" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">
                  CAMP
                </Link>
                <Link href="/blog" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">
                  BLOG
                </Link>
                <Link href="/donation" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">
                  후원
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-light text-white mb-6 text-sm tracking-wide">CONTACT</h4>
              <div className="space-y-2 text-white/60 text-sm font-light">
                <p>서울시 강남구 테헤란로 123</p>
                <p>02-1234-5678</p>
                <p>info@auricommunity.org</p>
              </div>
            </div>
            <div>
              <h4 className="font-light text-white mb-6 text-sm tracking-wide">SOCIAL</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/auri_community" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com/@auricommunity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors duration-300"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com/auricommunity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors duration-300"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-white/40 text-sm font-light">&copy; 2025 AURI & AURI COMMUNITY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
