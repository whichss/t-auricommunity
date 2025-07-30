import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube, Facebook, Calendar, MapPin, Users } from 'lucide-react'

export default function AndCampPage() {
  const camp = {
    title: 'AND 캠프',
    subtitle: 'And 함께하는 은혜의 시간',
    period: '과거 진행 (현재 중단)',
    location: '경기도 양평 수련원',
    participants: '초등학교 4학년 ~ 고등학교 3학년',
    price: '진행 중단',
    description: '과거 AURI에서 진행했던 캠프로, 소중한 추억과 은혜가 담긴 특별한 시간이었습니다.',
    longDescription: 'AND 캠프는 AURI 공동체 초기에 진행되었던 캠프로, 많은 학생들에게 소중한 은혜와 추억을 남긴 의미 있는 시간이었습니다. 비록 현재는 진행하지 않지만, 그 시간들이 AURI 공동체의 기초가 되었고 지금의 AURI 캠프로 이어지고 있습니다. 참여했던 분들에게는 잊을 수 없는 추억이 되었습니다.',
    features: ['말씀 나눔', '공동체 교제', '자연 체험', '문화 활동', '감사 예배', '추억 만들기'],
    color: 'from-gray-500/20 to-slate-500/20',
    status: '진행 중단'
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-transparent backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                <Image src="/images/logo.png" alt="AURI COMMUNITY 로고" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-light tracking-wider">AURI COMMUNITY</span>
            </Link>
            <div className="hidden md:flex items-center space-x-12">
              <Link href="/about" className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide">ABOUT</Link>
              <Link href="/connect-worship" className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide">CONNECT WORSHIP</Link>
              <Link href="/camp" className="text-white hover:text-white/80 transition-all duration-300 text-sm font-light tracking-wide">CAMP</Link>
              <Link href="/blog" className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide">BLOG</Link>
              <Link href="/donation" className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide">후원</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?height=1080&width=1920" alt={camp.title} width={1920} height={1080} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${camp.color}`}></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin tracking-wider mb-8">{camp.title}</h1>
          <p className="text-xl md:text-2xl font-light tracking-wide text-white/80 mb-6">{camp.subtitle}</p>
          <p className="text-lg text-white/60 mb-16 max-w-2xl mx-auto leading-relaxed">{camp.description}</p>
          
          <div className="flex items-center justify-center space-x-3 text-white/60 text-sm font-light">
            <Link href="/" className="hover:text-white transition-colors">홈</Link>
            <span>•</span>
            <Link href="/camp" className="hover:text-white transition-colors">CAMP</Link>
            <span>•</span>
            <span className="text-white">{camp.title}</span>
          </div>
        </div>
      </section>

      {/* 캠프 정보 */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-thin text-white mb-8">캠프 정보</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="w-5 h-5 text-white/60 mt-1" />
                  <div>
                    <h4 className="text-white font-light mb-1">기간</h4>
                    <p className="text-white/70 text-sm">{camp.period}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-white/60 mt-1" />
                  <div>
                    <h4 className="text-white font-light mb-1">장소</h4>
                    <p className="text-white/70 text-sm">{camp.location}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="w-5 h-5 text-white/60 mt-1" />
                  <div>
                    <h4 className="text-white font-light mb-1">참가 대상</h4>
                    <p className="text-white/70 text-sm">{camp.participants}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-white/60 mt-1">💰</span>
                  <div>
                    <h4 className="text-white font-light mb-1">참가비</h4>
                    <p className="text-white/70 text-sm">{camp.price}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-white font-light mb-4">주요 프로그램</h4>
                <div className="flex flex-wrap gap-2">
                  {camp.features.map((feature, index) => (
                    <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-sm">{feature}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-thin text-white mb-8">캠프 소개</h2>
              <p className="text-white/70 leading-relaxed mb-8">{camp.longDescription}</p>
              
              <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-lg">
                <h4 className="text-amber-300 font-light mb-4">📋 알림</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  AND 캠프는 현재 진행되지 않는 과거의 캠프입니다. 
                  현재는 AURI 캠프로 통합되어 더욱 발전된 프로그램으로 진행되고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 신청 안내 */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-thin text-white mb-8">추억 공유</h2>
          <p className="text-white/70 mb-12">AND 캠프에 참여했던 추억이 있으시면 언제든지 공유해주세요.</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-black/30 p-6 rounded-lg">
              <h4 className="text-white font-light mb-4">📞 전화 문의</h4>
              <p className="text-white/70 text-lg">02-1234-5678</p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg">
              <h4 className="text-white font-light mb-4">📧 이메일 문의</h4>
              <p className="text-white/70 text-lg">auricommunity@gmail.com</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-600 text-white px-8 py-3 font-light cursor-not-allowed" disabled>
              진행 중단된 캠프
            </button>
            <Link href="/camp/auri" className="border border-white/30 text-white px-8 py-3 font-light hover:border-white/50 transition-colors inline-block">
              AURI 캠프 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                  <Image src="/images/logo.png" alt="AURI COMMUNITY 로고" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <span className="text-xl font-light tracking-wider">AURI COMMUNITY</span>
              </div>
              <p className="text-white/60 leading-relaxed font-light text-sm">하나님의 사랑으로 하나 되는 공동체</p>
            </div>
            <div>
              <h4 className="font-light text-white mb-6 text-sm tracking-wide">MENU</h4>
              <div className="space-y-3">
                <Link href="/about" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">ABOUT</Link>
                <Link href="/connect-worship" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">CONNECT WORSHIP</Link>
                <Link href="/camp" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">CAMP</Link>
                <Link href="/blog" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">BLOG</Link>
                <Link href="/donation" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">후원</Link>
              </div>
            </div>
            <div>
              <h4 className="font-light text-white mb-6 text-sm tracking-wide">CONTACT</h4>
              <div className="space-y-2 text-white/60 text-sm font-light">
                <p>서울시 강남구 테헤란로 123</p>
                <p>02-1234-5678</p>
                <p>auricommunity@gmail.com</p>
              </div>
            </div>
            <div>
              <h4 className="font-light text-white mb-6 text-sm tracking-wide">SOCIAL</h4>
              <div className="flex space-x-4">
                <a href="https://instagram.com/auri_community" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors duration-300">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://youtube.com/@auricommunity" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors duration-300">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://facebook.com/auricommunity" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors duration-300">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-white/40 text-sm font-light">&copy; 2024 AURI COMMUNITY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
