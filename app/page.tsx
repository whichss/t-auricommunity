"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, ArrowRight, Play, Sparkles, Users, Target, Instagram, Youtube, Facebook } from "lucide-react"
import Image from "next/image"
import { BlogPost } from './api/blog/route'

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideProgress, setSlideProgress] = useState([0, 0, 0])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const slides = [
    {
      id: 0,
      title: "ABOUT US",
      number: "01",
      mediaType: "video", // "image" 또는 "video"
      image: "/placeholder.svg?height=1080&width=1920",
      video: "/videos/aboutus.mp4",
      alt: "About us story",
      mainTitle: "AURI",
      subtitle: "하나님의 사랑 안에서",
      description: "믿음과 함께하는 특별한 공동체 경험을 만나보세요",
      // 비디오 설정
      videoSettings: {
        loop: false, // 루프 재생 안함 (한 번만 재생하고 끝)
        playOnce: false // 슬라이드 재방문시 다시 재생
      },
      // 슬라이드 노출 시간 (밀리초)
      duration: 2000 // 2초
    },
    {
      id: 1,
      title: "CAMP",
      number: "02",
      mediaType: "video",
      image: "/placeholder.svg?height=1080&width=1920",
      video: "/videos/camp.mp4",
      alt: "CAMP Video",
      mainTitle: "CAMP",
      subtitle: "하나님과 함께하는 캠프",
      description: "하나님과 더 깊이 만나는 특별한 시간들",
      videoSettings: {
        loop: true, // 계속 루프 재생
        playOnce: false
      },
      duration: 5000 // 5초
    },
    {
      id: 2,
      title: "Connect Worship",
      number: "03",
      mediaType: "video",
      image: "/placeholder.svg?height=1080&width=1920",
      video: "/videos/worship.mp4",
      alt: "Connect Worship video",
      mainTitle: "Connect Worship",
      subtitle: "워십으로 하나님을 섬기는 팀",
      description: "워십과 함께 하나님께 경배를 올려드리는 시간",
      videoSettings: {
        loop: true, // 계속 루프 재생
        playOnce: false
      },
      duration: 3400 // 3.4초
    }
  ]

  const SLIDE_DURATION = 5000

  useEffect(() => {
    fetchFeaturedPosts()
  }, [])

  const fetchFeaturedPosts = async () => {
    try {
      const response = await fetch('/api/blog?featured=true&limit=3')
      const data = await response.json()
      setFeaturedPosts(data)
    } catch (error) {
      console.error('Failed to fetch featured posts:', error)
    } finally {
      setPostsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideProgress(prev => {
        const newProgress = [...prev]
        const currentSlideDuration = slides[currentSlide]?.duration || 5000 // 현재 슬라이드의 duration 사용
        newProgress[currentSlide] += (100 / (currentSlideDuration / 100))
        
        if (newProgress[currentSlide] >= 100) {
          newProgress[currentSlide] = 100
          setTimeout(() => {
            const nextSlide = (currentSlide + 1) % slides.length
            setCurrentSlide(nextSlide)
            const resetProgress = [...newProgress]
            resetProgress[nextSlide] = 0
            setSlideProgress(resetProgress)
          }, 100)
        }
        
        return newProgress
      })
    }, 100)

    return () => clearInterval(timer)
  }, [currentSlide, slides])

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
    setSlideProgress(prev => {
      const newProgress = [...prev]
      newProgress[index] = 0
      return newProgress
    })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-transparent backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo.png" // 로고 이미지 경로
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
                className="text-white/70 hover:text-white transition-all duration-300 text-sm font-light tracking-wide"
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
        {/* Background Media (Images or Videos) */}
        <div className="absolute inset-0 z-0">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              data-slide={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {slide.mediaType === 'video' && slide.video && index === currentSlide ? (
                /* 영상 슬라이드 - 현재 슬라이드일 때만 렌더링 */
                <div className="relative w-full h-full">
                  {slide.video.includes('youtube.com') || slide.video.includes('youtu.be') ? (
                    /* YouTube 영상 */
                    <iframe
                      src={slide.video}
                      className="absolute inset-0 w-full h-full object-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        pointerEvents: 'none',
                        border: 'none'
                      }}
                    />
                  ) : (
                    /* 로컬 비디오 파일 */
                    <>
                      <video
                        autoPlay
                        muted
                        loop={slide.videoSettings?.loop !== false} // 기본값 true, 명시적으로 false일 때만 비활성화
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ pointerEvents: 'none' }}
                        onLoadStart={() => console.log('Video loading started:', slide.video)}
                        onCanPlay={() => console.log('Video can play:', slide.video)}
                        onLoadedData={() => console.log('Video loaded:', slide.video)}
                      >
                        <source src={slide.video} type="video/mp4" />
                        비디오를 로드할 수 없습니다.
                      </video>
                      {/* 폴백 이미지 */}
                      <img 
                        src={slide.image} 
                        alt={slide.alt}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ display: 'none' }}
                      />
                    </>
                  )}
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              ) : slide.mediaType === 'video' && slide.video && index !== currentSlide ? (
                /* 비활성 비디오 슬라이드 - 빈 대체 */
                <div className="absolute inset-0 bg-zinc-900"></div>
              ) : slide.image ? (
                /* 이미지 슬라이드 */
                <>
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                </>
              ) : (
                /* 기본 배경 */
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black"></div>
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin tracking-wider mb-4 transition-all duration-1000">
            {slides[currentSlide].mainTitle}
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide text-white/80 mb-4 transition-all duration-1000">
            {slides[currentSlide].subtitle}
          </p>
          <p className="text-sm md:text-base font-light text-white/60 mb-16 max-w-2xl mx-auto transition-all duration-1000">
            {slides[currentSlide].description}
          </p>
          
          {/* Navigation Pills */}
          <div className="flex justify-center space-x-0 mb-8">
            {slides.map((slide, index) => (
              <div key={slide.id} className="relative">
                <button
                  onClick={() => handleSlideChange(index)}
                  className={`px-8 py-4 text-sm font-light tracking-wide transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-transparent backdrop-blur-sm'
                      : 'bg-transparent backdrop-blur-sm hover:bg-white/5'
                  } ${
                    index === 0 ? 'border-r border-white/20' : ''
                  } ${
                    index === 1 ? 'border-r border-white/20' : ''
                  }`}
                >
                  <span className="text-white/50 mr-4">{slide.number}</span>
                  {slide.title}
                </button>
                {/* Individual Progress Bar */}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-white/20 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-100 ease-linear ${
                      index === currentSlide ? 'bg-white' : 'bg-white/30'
                    }`}
                    style={{
                      width: index === currentSlide ? `${slideProgress[index]}%` : '0%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with YouTube Video */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-thin tracking-wide text-white mb-8">
                세대를 아우르다, <br />하나로 세우다
              </h2>
              <p className="text-lg text-white/70 font-light leading-relaxed mb-8">
                AURI는 2014년부터 하나님의 사랑을 나누고<br/>함께 성장하는 특별한 공동체입니다.
              </p>
              <p className="text-white/60 font-light leading-relaxed mb-8">
                다양한 캠프와 예배를 통해 하나님과 더 깊이 만나고,<br/> 
                믿음의 가족들과 함께 영적으로 성장하며 소중한 추억을 만들어가고있습니다.
              </p>
              <Link href="/about">
                <button className="border border-white/30 text-white px-8 py-3 font-light hover:bg-white/10 transition-colors">
                  자세히 알아보기
                </button>
              </Link>
            </div>
            
            {/* YouTube Video */}
            <div className="relative">
              <div className="aspect-video w-full">
                {/* 여기에 실제 YouTube URL을 넣으세요 */}
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/R_JVajAYtxs?si=won_1ylcluGnkF0C"
                  title="AURI COMMUNITY 소개 비디오"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin tracking-wide text-white mb-4">
              Latest Stories
            </h2>
            <p className="text-white/60 font-light">
              AURI 공동체와 함께하는 특별한 이야기들
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white/10 h-64 mb-4 rounded"></div>
                  <div className="space-y-3">
                    <div className="bg-white/10 h-4 w-24 rounded"></div>
                    <div className="bg-white/10 h-6 w-full rounded"></div>
                    <div className="bg-white/10 h-4 w-3/4 rounded"></div>
                  </div>
                </div>
              ))
            ) : featuredPosts.length > 0 ? (
              featuredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group cursor-pointer">
                    {post.imageUrl && (
                      <div className="relative overflow-hidden mb-4">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 text-black px-3 py-1 text-xs font-medium rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <h3 className="text-xl font-light text-white group-hover:text-white/80 transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-white/40">
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-white/60">아직 게시된 콘텐츠가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-thin tracking-wide text-white mb-4">
            하나님의 사역을 함께하세요
          </h2>
          <p className="text-white/60 font-light mb-8">
            여러분의 소중한 후원이 청소년들에게 하나님의 사랑을 전하는 귀한 사역이 됩니다
          </p>
          
          <div className="space-y-4">
            <Link href="/donation" className="inline-flex items-center px-8 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors duration-300 group">
              <span>후원하기</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <p className="text-white/60 text-sm">
              모든 후원금은 청소년 사역을 위해 투명하게 사용됩니다.
            </p>
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
                <p>auricommunity@gmail.com</p>
              </div>
            </div>
            <div>
              <h4 className="font-light text-white mb-6 text-sm tracking-wide">SOCIAL</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/auri_community/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.youtube.com/@AURICOMMUNITY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors duration-300"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.facebook.com/p/%EC%95%84%EC%9A%B0%EB%A6%AC%EA%B3%B5%EB%8F%99%EC%B2%B4-100077341464707/" 
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
