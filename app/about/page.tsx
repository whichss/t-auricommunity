"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube, Facebook } from 'lucide-react'

// 타이핑 애니메이션 컴포넌트
function TypingAnimation({ text, className = "", speed = 50, delay = 0 }: { text: string; className?: string; speed?: number; delay?: number }) {
  const [displayText, setDisplayText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsVisible(true)
          setHasStarted(true)
        }
      },
      { threshold: 0.1 }
    )
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1))
        index++
        if (index >= text.length) clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [isVisible, text, speed, delay])

  return (
    <div ref={elementRef} className={className}>
      {displayText}
      {displayText.length < text.length && <span className="animate-pulse">|</span>}
    </div>
  )
}

// 슬라이드업 애니메이션 컴포넌트
function SlideUpAnimation({ children, delay = 0, duration = 800 }: { children: React.ReactNode; delay?: number; duration?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setIsVisible(true), delay)
      },
      { threshold: 0.1 }
    )
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [delay])
  return (
    <div
      ref={elementRef}
      className={`transform transition-all ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}

// 숫자 카운팅 애니메이션 컴포넌트
function CountingAnimation({ target, className = "", duration = 2000, delay = 0, suffix = "" }: { target: number; className?: string; duration?: number; delay?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsVisible(true)
          setHasStarted(true)
        }
      },
      { threshold: 0.1 }
    )
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [hasStarted])
  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(() => {
      const increment = target / (duration / 16)
      let current = 0
      const interval = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(interval)
        } else {
          setCount(Math.floor(current))
        }
      }, 16)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [isVisible, target, duration, delay])
  return (
    <div ref={elementRef} className={className}>
      {count}{suffix}
    </div>
  )
}

// 페이드인 애니메이션 컴포넌트
function FadeInAnimation({ children, delay = 0, direction = "up", duration = 600 }: { children: React.ReactNode; delay?: number; direction?: "up" | "down" | "left" | "right"; duration?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setIsVisible(true), delay)
      },
      { threshold: 0.1 }
    )
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [delay])
  const getTransform = () => {
    if (isVisible) return 'translate-x-0 translate-y-0'
    switch (direction) {
      case "up": return 'translate-y-8'
      case "down": return '-translate-y-8'
      case "left": return 'translate-x-8'
      case "right": return '-translate-x-8'
      default: return 'translate-y-8'
    }
  }
  return (
    <div
      ref={elementRef}
      className={`transform transition-all ease-out ${getTransform()} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // 자동전환 설정 (true: 켜기, false: 끄기)
  const AUTO_PLAY_ENABLED = true
  // 전환 시간 설정 (밀리초, 3500 = 3.5초)
  const SLIDE_INTERVAL = 3500
  // 반복 설정 (true: 반복, false: 마지막 이미지에서 멈춤)
  const LOOP_ENABLED = false
  
  // 배경 이미지 배열 (이미지 경로를 추가하세요)
  const backgroundImages = [
    "/images/aboutbackground.jpg",
    "/images/aboutbackground2.jpg", 
    "/images/aboutbackground3.png",
    "/images/aboutbackground4.jpg",
  ]

  // 자동 슬라이드 효과
  useEffect(() => {
    if (!AUTO_PLAY_ENABLED || backgroundImages.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        // 마지막 이미지인지 확인
        const isLastImage = prevIndex === backgroundImages.length - 1
        
        if (isLastImage && !LOOP_ENABLED) {
          // 반복이 비활성화되어 있고 마지막 이미지라면 멈춤
          return prevIndex
        }
        
        // 다음 이미지로 이동 (반복 설정에 따라 처음으로 돌아가거나 다음으로)
        return (prevIndex + 1) % backgroundImages.length
      })
    }, SLIDE_INTERVAL)

    return () => clearInterval(interval)
  }, [backgroundImages.length])

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
              <span className="text-xl font-light tracking-wider">AURI COMMUNITY</span>
            </Link>
            <div className="hidden md:flex items-center space-x-12">
              <Link href="/about" className="text-white hover:text-white/80 transition-all duration-300 text-sm font-light tracking-wide">ABOUT</Link>
              <Link href="/connect-worship" className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide">CONNECT WORSHIP</Link>
              <Link href="/camp" className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide">CAMP</Link>
              <Link href="/blog" className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide">BLOG</Link>
              <Link href="/donation" className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide">후원</Link>
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
                  className="text-white hover:text-white/80 transition-all duration-300 text-sm font-light tracking-wide"
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
                  className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide"
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
        {/* Background Images Slideshow */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`소개 배경 ${index + 1}`}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin tracking-wider mb-12">
            소개
          </h1>
          
          {/* Breadcrumb */}
          <div className="flex items-center justify-center space-x-3 text-white/60 text-sm font-light">
            <span className="text-white"></span>
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-16 bg-zinc-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div>
              <FadeInAnimation delay={200} direction="right">
                <div className="relative group">
                  <div className="bg-zinc-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                    <div className="relative mb-3 flex justify-center">
                      <div className="w-80 h-96 relative overflow-hidden rounded">
                        <Image 
                          src="/images/about1.jpg" 
                          alt="대표 김희성 목사" 
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/about1.png';
                            target.onerror = () => {
                              target.src = '/placeholder.svg?height=384&width=320';
                            };
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded"></div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </FadeInAnimation>
            </div>
            
            <div className="lg:col-span-2">
              <FadeInAnimation delay={400}>
                <div className="mb-8">
                  <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-light mb-6">
                    대표 인사말
                  </div>
                </div>
              </FadeInAnimation>
              
              <div className="space-y-4">
                <FadeInAnimation delay={600}>
                  <blockquote className="relative text-center">
                    <div className="absolute -left-4 -top-2 text-6xl text-white/20 font-serif leading-none">“</div>
                    <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed italic pl-8 pr-8">
                      복음이 멈춘 그 자리, 하나됨으로 다시 이어갑니다
                    </p>
                    <div className="absolute -right-4 -bottom-6 text-6xl text-white/20 font-serif leading-none">”</div>
                  </blockquote>
                </FadeInAnimation>
                
                <div className="space-y-3 text-white/70 font-light leading-relaxed text-sm">
                  <FadeInAnimation delay={800}>
                    <p>
                      지금 세대는 세상적인 문화의 습득 속도는 누구보다 빠르지만, 
                      <br />그 어느 것보다 중요한 복음에 대해서는 누구보다 차가운 반응을 보입니다.
                      <br />이런 세상을 살아가며 다음세대를 바라보면 복음이 그들에게 흘러가고 있는가에 대한 의문이 들며
                      <br />교회가 짊어져야할 책임에 마음이 무거워지고, 안타깝다고 생각합니다.
                    </p>
                  </FadeInAnimation>
                  
                  <FadeInAnimation delay={900}>
                    <p>
                      다음세대를 향한 안타까움과 무거운 책임감을 가지고 설립한 '아우리 공동체'는 
                      <br />다음세대를 다시 살리고, 성장하게 하고, 그들이 느끼는 영적 결핌을
                      <br />오직 하나님으로 충족시키기 위해 열심과 최선으로 나아가고 있습니다.
                    </p>
                  </FadeInAnimation>

                  <FadeInAnimation delay={1000}>
                    <p>
                      '아우리'를 향하신 주님의 뜻 안에 각 개인들이 연합으로 하나되고, 주님께서 주신 사명으로 공동체가 하나되어
                      <br />우리 모두를 위해 예비하시고 준비하신 자리에 순종하고 헌신하는 주님의 몸된 공동체가 되기를 간절히 소망합니다.                    </p>
                  </FadeInAnimation>
                </div>
                
                <FadeInAnimation delay={1200}>
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <div className="w-12 h-px bg-gradient-to-r from-white/40 to-transparent mb-1"></div>
                      <p className="text-white/80 font-light text-xs">AURI 공동체 대표</p>
                      <p className="text-base font-light text-white">김희성</p>
                    </div>
                    <div className="text-white/20">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                  </div>
                </FadeInAnimation>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SlideUpAnimation delay={200}>
                <h2 className="text-4xl md:text-5xl font-thin tracking-wide text-white mb-8">
                  서로를 아우르며, 하나되어 다음세대를 섬기는 공동체
                </h2>
            </SlideUpAnimation>
            <FadeInAnimation delay={600}>
              <p className="text-lg text-white/70 font-light leading-relaxed">
              </p>
            </FadeInAnimation>
          </div>
          <div className="max-w-3xl mx-auto text-center mb-20">
            {/* 타이핑 애니메이션은 여기서만 사용 */}
            <TypingAnimation 
              text="Story"
              className="text-3xl font-light text-white mb-8"
              speed={80}
              delay={1000}
            />
            <div className="space-y-8 text-white/70 font-light leading-relaxed text-lg">
                <SlideUpAnimation delay={1700}>
                  <p>
                    2014년, 아우리 공동체와 아우리 캠프는 작은 교회들의 연합 수련회로 첫걸음을 내딛었습니다.
                    <br />비록 화려하진 않지만, 교회와 선교단체, 기관, 기업, 그리고 개인이 주님 안에서 하나 되어
                    <br />주어진 사명의 자리로 순종하며 나아가는 것, 이것이 바로 아우리의 정신입니다.
                  </p>
                </SlideUpAnimation>
                <FadeInAnimation delay={1800}>
                  <p>
                    ‘아우르다’라는 이름처럼, 우리는 서로를 품고 하나 되어 섬겨왔습니다.
                    <br />때로는 단체의 이름이 드러나지 않고, 세상으로부터 박수나 칭찬을 받지 못했을지라도
                    <br />묵묵히 감당한 섬김의 자리에서 주님은 언제나 일하시고, 열매 맺게 하셨습니다.
                  </p>
                </FadeInAnimation>
                <FadeInAnimation delay={1900}>
                  <p>
                    앞으로도 우리는 주님 앞에서 아우리의 정체성을 붙들고,
                    <br />많은 이들과 함께 하나님의 부르심에 응답하는 공동체, 그리고 캠프로 걸어가겠습니다.
                  </p>
                </FadeInAnimation>
              </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <CountingAnimation 
                target={30}
                suffix="+"
                className="text-4xl font-thin text-white mb-4"
                duration={2500}
                delay={0}
              />
              <SlideUpAnimation delay={1500}>
                <h4 className="text-lg font-light text-white mb-2">STAFF</h4>
              </SlideUpAnimation>
              <FadeInAnimation delay={1900}>
                <p className="text-white/60 text-sm font-light">하나님의 사랑으로 시작된 특별한 여정</p>
              </FadeInAnimation>
            </div>
            <div className="text-center">
              <CountingAnimation 
                target={5000}
                suffix="+"
                className="text-4xl font-thin text-white mb-4"
                duration={2500}
                delay={500}
              />
              <SlideUpAnimation delay={1600}>
                <h4 className="text-lg font-light text-white mb-2">PEOPLE</h4>
              </SlideUpAnimation>
              <FadeInAnimation delay={2000}>
                <p className="text-white/60 text-sm font-light">지금까지 함께한 소중한 가족들</p>
              </FadeInAnimation>
            </div>
            <div className="text-center">
              <CountingAnimation 
                target={20}
                suffix="+"
                className="text-4xl font-thin text-white mb-4"
                duration={2500}
                delay={1000}
              />
              <SlideUpAnimation delay={1700}>
                <h4 className="text-lg font-light text-white mb-2">CAMP</h4>
              </SlideUpAnimation>
              <FadeInAnimation delay={2100}>
                <p className="text-white/60 text-sm font-light">하나님과 함께한 특별한 시간들</p>
              </FadeInAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <SlideUpAnimation>
            <h2 className="text-4xl md:text-5xl font-thin tracking-wide text-white mb-8">AURI Vision</h2>
          </SlideUpAnimation>
          <FadeInAnimation delay={800}>
            <p className="text-xl text-white/70 font-light leading-relaxed mb-12">우리는 하나님의 사랑으로 다음세대를 섬기고, <br/>교회와 개인이 연합하여 세상에 소망을 전하는 공동체를 지향합니다.</p>
          </FadeInAnimation>
          <div className="grid md:grid-cols-2 gap-12">
            <FadeInAnimation delay={1200} direction="right">
              <div className="text-left">
                <h3 className="text-xl font-light text-white mb-4">사랑의 실천</h3>
                <p className="text-white/60 font-light leading-relaxed">하나님의 사랑을 받아 이웃과 세상을 향해 그 사랑을 나누며 실천하는 공동체입니다.</p>
              </div>
            </FadeInAnimation>
            <FadeInAnimation delay={1600} direction="left">
              <div className="text-left">
                <h3 className="text-xl font-light text-white mb-4">함께 성장</h3>
                <p className="text-white/60 font-light leading-relaxed">캠프, 예배, 모임을 통해 믿음 안에서 서로를 세우며,<br/>영적으로 함께 자라고 성숙한 제자로 살아갑니다.</p>
              </div>
            </FadeInAnimation>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SlideUpAnimation>
            <div className="text-center mb-16">
              <h3 className="text-3xl font-thin text-white mb-8">핵심 가치</h3>
            </div>
          </SlideUpAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "사랑", desc: "하나님의 무조건적인 사랑을 경험하고, 다음세대와 공동체를 향해 그 사랑을 전합니다.", icon: "❤️", delay: 0 },
              { title: "교제", desc: "믿음 안에서 한 가족이 되어 서로를 돌보고, 함께 걸어가는 연합 공동체입니다.", icon: "🤝", delay: 200 },
              { title: "성장", desc: "말씀, 예배, 기도 가운데 다음세대가 신앙 안에서 자라며 성숙한 제자가 됩니다.", icon: "🌱", delay: 400 },
              { title: "섬김", desc: "예수님의 마음으로 지역과 다음세대를 섬기며, 세상에 소망을 전합니다.", icon: "🙏", delay: 600 }
            ].map((value, index) => (
              <FadeInAnimation key={index} delay={value.delay}>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-300">
                    <span className="text-2xl">{value.icon}</span>
                  </div>
                  <h4 className="text-lg font-light text-white mb-2 group-hover:text-white/90 transition-colors duration-300">{value.title}</h4>
                  <p className="text-white/60 text-sm group-hover:text-white/70 transition-colors duration-300">{value.desc}</p>
                </div>
              </FadeInAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SlideUpAnimation>
            <div className="text-center mb-16">
              <h3 className="text-3xl font-thin text-white mb-8">AURI History</h3>
              <p className="text-white/60 font-light">하나님의 인도하심 아래 걸어온 소중한 발걸음들</p>
            </div>
          </SlideUpAnimation>
          <div className="relative">
            {/* Timeline Line - Desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/20"></div>
            {/* Timeline Line - Mobile */}
            <div className="md:hidden absolute left-6 top-0 h-full w-0.5 bg-white/20"></div>
            
            <div className="space-y-12 md:space-y-16">
              {[
                {
                  year: "2014",
                  title: "AURI 공동체 설립",
                  description: "작은 교회들이 모여 서로 연합하여 시작한 것이 아우리의 시작입니다.",
                  side: "left",
                  delay: 0
                },
                {
                  year: "2018",
                  title: "비영리단체 등록",
                  description: "정식 비영리단체로 등록하며 체계적인 사역을 시작했습니다. 연간 100명 이상의 청소년들이 참여하게 되었습니다.",
                  side: "right",
                  delay: 200
                },
                {
                  year: "2020",
                  title: "온라인 사역 확대",
                  description: "COVID-19 상황에 대응하여 온라인 예배와 캠프 프로그램을 개발했습니다. 전국 어디서나 참여 가능하게 되었습니다.",
                  side: "left",
                  delay: 400
                },
                {
                  year: "2022",
                  title: "지역 사회 확장",
                  description: "서울 외에도 부산, 대구 등 주요 도시로 사역을 확장하여 더 많은 사람들과 하나님의 사랑을 나누게 되었습니다.",
                  side: "right",
                  delay: 600
                },
                {
                  year: "2025",
                  title: "새로운 비전",
                  description: "현재까지 5000명 이상의 청소년들이 참여했으며, 차세대 다음세대 사역과 비전을 향해 나아가고 있습니다.",
                  side: "left",
                  delay: 800
                }
              ].map((item, index) => (
                <FadeInAnimation key={index} delay={item.delay} direction={item.side === "left" ? "right" : "left"}>
                  {/* Desktop Layout */}
                  <div className={`hidden md:flex items-center ${item.side === "right" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-1/2 ${item.side === "left" ? "pr-8 text-right" : "pl-8"}`}>
                      <div className="bg-zinc-800 p-6 rounded-lg border border-white/10">
                        <div className={`text-2xl font-thin text-white mb-2 ${item.side === "right" ? "text-left" : "text-right"}`}>{item.year}</div>
                        <h4 className={`text-lg font-light text-white mb-3 ${item.side === "right" ? "text-left" : "text-right"}`}>{item.title}</h4>
                        <p className={`text-white/70 text-sm leading-relaxed ${item.side === "right" ? "text-left" : "text-right"}`}>{item.description}</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-white rounded-full border-4 border-zinc-900 z-10 relative"></div>
                    <div className="w-1/2"></div>
                  </div>
                  
                  {/* Mobile Layout */}
                  <div className="md:hidden flex items-start">
                    <div className="w-4 h-4 bg-white rounded-full border-4 border-zinc-900 z-10 relative mt-2 mr-6 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-zinc-800 p-6 rounded-lg border border-white/10">
                        <div className="text-2xl font-thin text-white mb-2">{item.year}</div>
                        <h4 className="text-lg font-light text-white mb-3">{item.title}</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </FadeInAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organization Section */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SlideUpAnimation>
            <div className="text-center mb-16">
              <h3 className="text-3xl font-thin text-white mb-8">우리의 조직</h3>
              <p className="text-white/60 font-light">하나님의 사랑으로 함께 일하는 소중한 가족들</p>
            </div>
          </SlideUpAnimation>
          <div className="mb-16">
            <SlideUpAnimation delay={400}>
              <h4 className="text-xl font-light text-white mb-8 text-center"></h4>
            </SlideUpAnimation>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { name: "김희성", position: "대표", image: "/placeholder.svg?height=200&width=200", delay: 600 },
              ].map((member, index) => (
                <FadeInAnimation key={index} delay={member.delay}>
                  <div className="text-center group">
                    <div className="relative mb-4 mx-auto w-32 h-32 overflow-hidden rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300">
                      <Image src={member.image} alt={member.name} width={200} height={200} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h5 className="text-lg font-light text-white mb-1">{member.name}</h5>
                    <p className="text-white/80 text-sm mb-2">{member.position}</p>
                  </div>
                </FadeInAnimation>
              ))}
            </div>
          </div>
          <div>
            <SlideUpAnimation delay={1200}>
              <h4 className="text-xl font-light text-white mb-8 text-center">사역 팀</h4>
            </SlideUpAnimation>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { team: "리더진", members: "2명", description: "캠프 전체적인 준비 및 진행", icon: "🎵", delay: 1600 },
                { team: "예배팀", members: "15명", description: "캠프 준비 및 진행", icon: "🎵", delay: 1600 },
                { team: "WORSHIP팀", members: "5명", description: "찬양 WORSHIP 제작 및 진행", icon: "📖", delay: 1800 },
              ].map((team, index) => (
                <FadeInAnimation key={index} delay={team.delay}>
                  <div className="bg-zinc-900 p-6 rounded-lg text-center border border-white/10 group hover:border-white/20 transition-colors duration-300">
                    <div className="text-3xl mb-4">{team.icon}</div>
                    <h5 className="text-lg font-light text-white mb-1">{team.team}</h5>
                    <p className="text-white/80 text-sm mb-2">{team.members}</p>
                    <p className="text-white/60 text-xs leading-relaxed">{team.description}</p>
                  </div>
                </FadeInAnimation>
              ))}
            </div>
          </div>
          <FadeInAnimation delay={2200}>
            <div className="text-center mt-12">
              <p className="text-white/60 text-sm">모든 팀원들은 자원봉사자로 하나님의 사랑으로 섬기고 있습니다</p>
            </div>
          </FadeInAnimation>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeInAnimation>
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
            </FadeInAnimation>
            <FadeInAnimation delay={200}>
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
            </FadeInAnimation>
            <FadeInAnimation delay={400}>
              <div>
                <h4 className="font-light text-white mb-6 text-sm tracking-wide">CONTACT</h4>
                <div className="space-y-2 text-white/60 text-sm font-light">
                  <p>서울시 강남구 테헤란로 123</p>
                  <p>02-1234-5678</p>
                  <p>info@auricommunity.org</p>
                </div>
              </div>
            </FadeInAnimation>
            <FadeInAnimation delay={600}>
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
            </FadeInAnimation>
          </div>
          <FadeInAnimation delay={800}>
            <div className="border-t border-white/10 mt-12 pt-8 text-center">
              <p className="text-white/40 text-sm font-light">&copy; 2025 AURI & AURI COMMUNITY. All rights reserved.</p>
            </div>
          </FadeInAnimation>
        </div>
      </footer>
    </div>
  )
}
