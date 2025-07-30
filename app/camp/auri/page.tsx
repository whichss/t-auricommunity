"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Users, Clock, ArrowLeft, Instagram, Youtube, Facebook } from 'lucide-react'

export default function AuriCampPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-gray-800">
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
              <span className="text-xl font-medium tracking-wide text-white">AURI COMMUNITY</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">ABOUT</Link>
              <Link href="/connect-worship" className="text-gray-300 hover:text-white transition-colors text-sm">CONNECT WORSHIP</Link>
              <Link href="/camp" className="text-white font-medium text-sm">CAMP</Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">BLOG</Link>
              <Link href="/donation" className="text-gray-300 hover:text-white transition-colors text-sm">후원</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="pt-24 pb-6">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/camp" className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            캠프 목록으로 돌아가기
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              AURI 캠프
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              하나님의 사랑 안에서 하나 되는 특별한 경험을 통해 청소년들의 영적 성장과 공동체 경험을 제공하는 캠프입니다.
            </p>
            
            {/* Basic Info Cards */}
            <div className="grid md:grid-cols-4 gap-4 mt-8">
              <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-800">
                <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">기간</div>
                <div className="text-white font-medium">2박 3일</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-800">
                <MapPin className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">장소</div>
                <div className="text-white font-medium">강원도 평창</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-800">
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">대상</div>
                <div className="text-white font-medium">초4 ~ 고3</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-800">
                <Clock className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">모집</div>
                <div className="text-white font-medium">120명</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b border-gray-800 sticky top-20 z-40 bg-black/95 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: '캠프 소개' },
              { id: 'program', label: '프로그램' },
              { id: 'schedule', label: '일정' },
              { id: 'instructors', label: '강사소개' },
              { id: 'location', label: '장소' },
              { id: 'poster', label: '포스터' },
              { id: 'info', label: '참가 안내' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">AURI 캠프</h2>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      AURI 캠프는 청소년이 하나님의 사랑 안에서 영적으로 성장할 수 있도록 돕는 특별한 교육 프로그램입니다.
                      전문적이고 체계적인 커리큘럼을 통해 신앙 안에서의 인격 형성과 리더십 개발을 동시에 추구합니다.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      2025년 현재 전국 150여 개 교회에서 약 5,000여 명의 청소년들이 참여하고 있습니다.
                      올바른 신앙 가치관을 바탕으로 청소년들이 사회의 건전한 리더로 성장할 수 있도록 지원합니다.
                    </p>
                  </div>
                </div>
                <div>
                  <Image
                    src="/images/auri-camp-main.jpg"
                    alt="AURI 캠프"
                    width={500}
                    height={350}
                    className="w-full rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg?height=350&width=500&text=AURI+캠프';
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Program Tab */}
          {activeTab === 'program' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-bold text-white">프로그램 특징</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <Image
                    src="/images/program-1.jpg"
                    alt="말씀 프로그램"
                    width={300}
                    height={200}
                    className="w-full rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg?height=200&width=300&text=말씀+프로그램';
                    }}
                  />
                  <h3 className="text-lg font-semibold text-white">말씀 중심 프로그램</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    매일 3회의 집회를 통해 하나님의 말씀을 깊이 있게 나누고, 
                    개인 QT 시간을 통해 말씀을 묵상합니다.
                  </p>
                </div>

                <div className="space-y-4">
                  <Image
                    src="/images/program-2.jpg"
                    alt="찬양과 워십"
                    width={300}
                    height={200}
                    className="w-full rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg?height=200&width=300&text=찬양+워십';
                    }}
                  />
                  <h3 className="text-lg font-semibold text-white">찬양과 워십</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    전문 찬양팀과 함께하는 역동적인 워십 타임으로 
                    하나님께 마음껏 찬양을 올려드립니다.
                  </p>
                </div>

                <div className="space-y-4">
                  <Image
                    src="/images/program-3.jpg"
                    alt="공동체 활동"
                    width={300}
                    height={200}
                    className="w-full rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg?height=200&width=300&text=공동체+활동';
                    }}
                  />
                  <h3 className="text-lg font-semibold text-white">공동체 활동</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    소그룹 나눔과 야외 활동을 통해 건강한 공동체의 
                    가치를 배우고 실천합니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white text-center">상세 일정</h2>
              
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <Image
                  src="/images/auri-camp-schedule-full.jpg"
                  alt="AURI 캠프 상세 일정표"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg?height=600&width=800&text=상세+일정표';
                  }}
                />
              </div>
            </div>
          )}

          {/* Instructors Tab */}
          {activeTab === 'instructors' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white text-center">강사 소개</h2>
              
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <Image
                  src="/images/auri-camp-instructors.jpg"
                  alt="AURI 캠프 강사진 소개"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg?height=600&width=800&text=강사진+소개';
                  }}
                />
              </div>
            </div>
          )}

          {/* Location Tab */}
          {activeTab === 'location' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-bold text-white">캠프 장소</h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">AURI 수련원</h3>
                    <div className="space-y-3 text-gray-300">
                      <p className="flex items-start space-x-2">
                        <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>강원도 평창군 대관령면 수련원길 123</span>
                      </p>
                      <p>📞 033-1234-5678</p>
                      <p>🚗 서울에서 차로 2시간 30분 거리</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">시설 안내</h4>
                    <div className="space-y-3 text-gray-300 text-sm">
                      <div>
                        <span className="text-green-400 font-medium">숙박시설:</span>
                        <span className="ml-2">4인실 기준 30개 방 (에어컨, 난방, 전용 화장실)</span>
                      </div>
                      <div>
                        <span className="text-green-400 font-medium">식당:</span>
                        <span className="ml-2">150석 규모 대형 식당</span>
                      </div>
                      <div>
                        <span className="text-green-400 font-medium">강당:</span>
                        <span className="ml-2">200석 규모 메인 강당</span>
                      </div>
                      <div>
                        <span className="text-green-400 font-medium">기타:</span>
                        <span className="ml-2">의무실, 카페, 휴게실, WiFi 완비</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <h4 className="text-lg font-semibold text-white mb-3">교통 안내</h4>
                    <div className="space-y-3 text-gray-300 text-sm">
                      <div>
                        <span className="text-blue-400 font-medium">전세버스:</span>
                        <div className="ml-2 mt-1 space-y-1">
                          <p>• 서울 출발: 오전 11:00 (강남역)</p>
                          <p>• 경기 출발: 오전 11:30 (수원역)</p>
                          <p>• 인천 출발: 오전 10:30 (인천역)</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-blue-400 font-medium">개별 차량:</span>
                        <span className="ml-2">네비 "강원도 평창군 AURI 수련원" 검색</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Google Map */}
                  <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                    <div className="aspect-video">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019284833133!2d128.6830!3d37.6553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM1LCsDM5JzE5LjEiTiAxMjjCsDQwJzU4LjgiRQ!5e0!3m2!1sko!2skr!4v1609459200000!5m2!1sko!2skr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="AURI 수련원 위치"
                      ></iframe>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-medium mb-2">위치 안내</h4>
                      <p className="text-gray-400 text-sm">강원도 평창군 대관령면 수련원길 123</p>
                    </div>
                  </div>

                  {/* Facility Images */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                      <Image
                        src="/images/auri-facility-1.jpg"
                        alt="수련원 외경"
                        width={250}
                        height={150}
                        className="w-full h-24 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg?height=150&width=250&text=수련원+외경';
                        }}
                      />
                      <div className="p-3">
                        <p className="text-white text-sm font-medium">수련원 외경</p>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                      <Image
                        src="/images/auri-facility-2.jpg"
                        alt="대강당"
                        width={250}
                        height={150}
                        className="w-full h-24 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg?height=150&width=250&text=대강당';
                        }}
                      />
                      <div className="p-3">
                        <p className="text-white text-sm font-medium">대강당</p>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                      <Image
                        src="/images/auri-facility-3.jpg"
                        alt="숙박시설"
                        width={250}
                        height={150}
                        className="w-full h-24 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg?height=150&width=250&text=숙박시설';
                        }}
                      />
                      <div className="p-3">
                        <p className="text-white text-sm font-medium">숙박시설</p>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                      <Image
                        src="/images/auri-facility-4.jpg"
                        alt="식당"
                        width={250}
                        height={150}
                        className="w-full h-24 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg?height=150&width=250&text=식당';
                        }}
                      />
                      <div className="p-3">
                        <p className="text-white text-sm font-medium">식당</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Poster Tab */}
          {activeTab === 'poster' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white text-center">캠프 포스터</h2>
              
              <div className="max-w-2xl mx-auto">
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                  <Image
                    src="/images/auri-camp-poster.jpg"
                    alt="AURI 캠프 공식 포스터"
                    width={600}
                    height={800}
                    className="w-full h-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg?height=800&width=600&text=AURI+캠프+포스터';
                    }}
                  />
                </div>
                
                <div className="mt-6 text-center">
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>포스터 다운로드</span>
                  </button>
                  <p className="text-gray-400 text-sm mt-2">고해상도 포스터를 다운로드하여 인쇄하거나 공유하세요.</p>
                </div>
              </div>
            </div>
          )}

          {/* Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-bold text-white">참가 안내</h2>
              
              <div className="space-y-8">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4">캠프 기본 정보</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">개최 일정</span>
                      <span className="text-white">2025년 7월 15일 ~ 17일</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">캠프 기간</span>
                      <span className="text-white">2박 3일</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">참가 대상</span>
                      <span className="text-white">초등학교 4학년 ~ 고등학교 3학년</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">모집 정원</span>
                      <span className="text-white">120명 (선착순)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">참가비</span>
                      <span className="text-white font-semibold">180,000원</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4">자주 묻는 질문</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Q. 캠프 참가 조건이 있나요?</h4>
                      <p className="text-gray-400 text-sm leading-relaxed pl-4">
                        A. 초등학교 4학년부터 고등학교 3학년까지 참가 가능합니다. 신앙 유무는 상관없으며, 캠프에 대한 열린 마음과 적극적인 참여 의지만 있으면 됩니다.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Q. 준비물은 무엇인가요?</h4>
                      <p className="text-gray-400 text-sm leading-relaxed pl-4">
                        A. 개인 세면도구, 2박 3일분 의류, 성경, 필기도구, 개인 상비약, 운동화를 준비해 주세요.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Q. 캠프비는 무엇이 포함되나요?</h4>
                      <p className="text-gray-400 text-sm leading-relaxed pl-4">
                        A. 180,000원에 2박 3일 숙박비, 6회 식사비, 모든 프로그램 비용, 교재비, 기념품이 포함됩니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 AURI 캠프에 신청하세요
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            하나님의 사랑을 경험하고 평생 잊지 못할 추억을 만들어갈 특별한 경험이 여러분을 기다리고 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors">
              지금 신청하기
            </button>
            <button className="px-8 py-3 border border-gray-600 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              상담 문의하기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-lg font-medium tracking-wide">AURI COMMUNITY</span>
              </div>
              <p className="text-gray-400 text-sm">하나님의 사랑으로 하나 되는 공동체</p>
            </div>
            
            <div>
              <h4 className="text-white mb-4 text-sm">CONTACT</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>서울시 강남구 테헤란로 427</p>
                <p>02-1234-5678</p>
                <p>info@auricommunity.org</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-white mb-4 text-sm">SOCIAL</h4>
              <div className="flex space-x-3">
                <Instagram className="w-4 h-4" />
                <Youtube className="w-4 h-4" />
                <Facebook className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">&copy; 2025 AURI COMMUNITY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
