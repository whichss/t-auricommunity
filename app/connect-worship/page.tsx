"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube, Facebook, Play, ArrowRight } from 'lucide-react'

// 스크롤 애니메이션 훅
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return { isVisible, elementRef }
}

// 애니메이션 컴포넌트
function AnimatedElement({ children, delay = 0, className = "" }: { 
  children: React.ReactNode
  delay?: number
  className?: string 
}) {
  const { isVisible, elementRef } = useScrollAnimation()

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-16 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function ConnectWorshipPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // ===== Hero Section 설정 =====
  // 타이틀 위치 설정 (left, center, right)
  const TITLE_POSITION = 'left'
  // 타이틀 수직 위치 (top, center, bottom)
  const TITLE_VERTICAL = 'center'
  // 텍스트 정렬 (left, center, right)
  const TEXT_ALIGN = 'left'
  
  // 위치별 CSS 클래스 매핑
  const getPositionClasses = () => {
    const positions = {
      left: 'justify-start text-left',
      center: 'justify-center text-center',
      right: 'justify-end text-right'
    }
    
    const verticals = {
      top: 'items-start pt-32',
      center: 'items-center',
      bottom: 'items-end pb-32'
    }
    
    const textAligns = {
      left: 'text-left',
      center: 'text-center', 
      right: 'text-right'
    }
    
    return {
      container: `flex min-h-screen ${verticals[TITLE_VERTICAL as keyof typeof verticals]} ${positions[TITLE_POSITION as keyof typeof positions]}`,
      text: textAligns[TEXT_ALIGN as keyof typeof textAligns]
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50">
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
              <span className="text-xl font-light tracking-wider">AURI COMMUNITY</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-12">
              <Link href="/about" className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-light tracking-wide">
                ABOUT
              </Link>
              <Link href="/connect-worship" className="text-white font-light text-sm tracking-wide">
                CONNECT WORSHIP
              </Link>
              <Link href="/camp" className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-light tracking-wide">
                CAMP
              </Link>
              <Link href="/blog" className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-light tracking-wide">
                BLOG
              </Link>
              <Link href="/donation" className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-light tracking-wide">
                후원
              </Link>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-white/80 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* 모바일 메뉴 */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10">
              <div className="flex flex-col space-y-4 pt-4">
                <Link href="/about" className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-light tracking-wide">
                  ABOUT
                </Link>
                <Link href="/connect-worship" className="text-white font-light text-sm tracking-wide">
                  CONNECT WORSHIP
                </Link>
                <Link href="/camp" className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-light tracking-wide">
                  CAMP
                </Link>
                <Link href="/blog" className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-light tracking-wide">
                  BLOG
                </Link>
                <Link href="/donation" className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-light tracking-wide">
                  후원
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - 배경 영상/이미지 위에 대형 타이포그래피 */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/worship-bg-video.jpg"
            alt="Connect Worship Background"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg?height=1080&width=1920&text=Worship+Background';
            }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Main Typography */}
        <div className={`relative z-20 px-6 max-w-6xl mx-auto ${getPositionClasses().container}`}>
          <div className={getPositionClasses().text}>
            <AnimatedElement>
              <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black tracking-tight leading-none">
                CONNECT
              </h1>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black tracking-tight leading-none -mt-4 lg:-mt-8">
                WORSHIP
              </h1>
            </AnimatedElement>
            
            <AnimatedElement delay={400}>
              <p className="text-lg md:text-xl text-white/80 mt-8 mb-12 font-light tracking-wide">
                MOVEMENT & PRAYER — SEOUL, KOREA
              </p>
            </AnimatedElement>

            <AnimatedElement delay={600}>
              <div className="flex items-center space-x-8">
                <button className="text-white/60 hover:text-white transition-colors duration-300 text-sm tracking-widest">
                  ↓ SCROLL TO EXPLORE
                </button>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Large Typography Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <AnimatedElement>
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                  WORSHIP
                  <br />
                  <span className="text-white/30">THROUGH</span>
                  <br />
                  MOVEMENT
                </h2>
              </AnimatedElement>
            </div>
            
            <div className="lg:col-span-5">
              <AnimatedElement delay={300}>
                <div className="space-y-6">
                  <p className="text-sm font-light tracking-widest text-white/60 uppercase">
                    A Creative Worship Experience
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed font-light">
                    Connect Worship은 단순한 춤이 아닙니다. 하나님께 드리는 진정한 예배이며, 
                    우리의 마음과 몸을 통해 표현하는 살아있는 찬양입니다.
                  </p>
                  <button className="text-white border-b border-white/30 hover:border-white transition-colors duration-300 text-sm tracking-wide font-light pb-1">
                    더 알아보기 →
                  </button>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Gallery Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedElement>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8">
                OUR
                <br />
                MOMENTS
              </h2>
            </div>
          </AnimatedElement>

          {/* Large Feature Image */}
          <AnimatedElement delay={200}>
            <div className="mb-16">
              <div className="aspect-[21/9] relative overflow-hidden">
                <Image
                  src="/images/worship-feature-large.jpg"
                  alt="Main worship performance"
                  width={1400}
                  height={600}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg?height=600&width=1400&text=Main+Performance';
                  }}
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-8 left-8">
                  <p className="text-white/80 text-sm tracking-widest">SUNDAY WORSHIP — FEBRUARY 2025</p>
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Grid Gallery */}
          <div className="grid md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item, index) => (
              <AnimatedElement key={index} delay={300 + index * 100}>
                <div className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
                  <Image
                    src={`/images/worship-grid-${item}.jpg`}
                    alt={`Gallery ${item}`}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/placeholder.svg?height=400&width=300&text=Gallery+${item}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Bold Typography */}
      {/*
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedElement>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-16">
              JOIN
              <br />
              <span className="text-white/40">THE</span>
              <br />
              MOVEMENT
            </h2>
          </AnimatedElement>

          <AnimatedElement delay={300}>
            <p className="text-lg text-white/80 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
              Connect Worship과 함께 하나님께 드리는 특별한 예배에 참여하세요. 
              경험이 없어도 괜찮습니다. 열린 마음으로 오시면 됩니다.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={500}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="px-8 py-4 bg-white text-black font-light tracking-wide hover:bg-white/90 transition-colors duration-300">
                팀 참여 신청
              </button>
              <button className="px-8 py-4 border border-white/30 text-white font-light tracking-wide hover:bg-white/10 transition-colors duration-300">
                연습 일정 보기
              </button>
            </div> 
          </AnimatedElement>

          <AnimatedElement delay={700}>
            <p className="text-white/50 text-sm tracking-widest">
              PRACTICE: EVERY SATURDAY 2PM — AURI COMMUNITY CENTER
            </p>
          </AnimatedElement>
        </div>
      </section>/*}

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
                <p>info@auricommunity.org</p>
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
            <p className="text-white/40 text-sm font-light">&copy; 2025 AURI & AURI COMMUNITY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
