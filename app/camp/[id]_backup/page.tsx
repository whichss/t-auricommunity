"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Calendar, MapPin, Clock, Star, ArrowLeft, CheckCircle, Award, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useDataStore } from "@/lib/data-store"

export default function CampDetailPage({ params }: { params: { id: string } }) {
  const { camps } = useDataStore()
  const camp = camps.find((c) => c.id === Number.parseInt(params.id))

  if (!camp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">캠프를 찾을 수 없습니다</h1>
          <Link href="/camp">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl">
              캠프 목록으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-2xl border-b border-white/20 z-50 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Hope Foundation
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-medium relative group"
              >
                소개
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/camp" className="text-gray-900 font-semibold text-sm relative">
                캠프
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></span>
              </Link>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-medium relative group"
              >
                블로그
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/donation"
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-medium relative group"
              >
                후원
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link href="/donation" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  후원하기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/camp"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            캠프 목록으로 돌아가기
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50"></div>
        <div className="absolute top-0 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 shadow-lg">
                  {camp.age}
                </Badge>
                <Badge variant="outline" className="border-gray-200 bg-white/80 shadow-lg">
                  {camp.duration}
                </Badge>
                <Badge variant="outline" className="border-gray-200 bg-white/80 shadow-lg">
                  {camp.participants} 정원
                </Badge>
              </div>
              <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">{camp.title}</h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{camp.fullDescription}</p>
              <div className="flex items-center gap-6 text-gray-600 mb-10">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">{camp.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">{camp.duration}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  캠프 신청하기
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  문의하기
                </Button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl transform group-hover:scale-105 transition-all duration-700"></div>
              <Image
                src={`/placeholder.svg?height=400&width=500&query=${camp.image}`}
                alt={camp.title}
                width={500}
                height={400}
                className="relative rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Camp Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Schedule */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                    <Calendar className="h-6 w-6 text-blue-600" />
                    캠프 일정
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {camp.schedule.map((day, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-gradient-to-b from-blue-600 to-purple-600 pl-6 relative"
                      >
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                        <h3 className="font-bold text-gray-900 mb-3 text-lg">{day.day}</h3>
                        <ul className="space-y-2">
                          {day.activities.map((activity, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Instructor */}
              <Card className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Award className="h-5 w-5 text-blue-600" />
                    강사 소개
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Award className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{camp.instructor.name}</h3>
                    <p className="text-sm text-blue-600 mb-3 font-semibold">{camp.instructor.specialty}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{camp.instructor.career}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Camp Info */}
              <Card className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">캠프 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-600 font-medium">참가비</span>
                      <span className="font-bold text-green-600 text-lg">{camp.price}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-3 font-medium">제공 물품</div>
                    <div className="space-y-2">
                      {camp.materials.map((material, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">캠프 특징</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {camp.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <h2 className="text-4xl font-black text-gray-900 text-center mb-12">캠프 활동 사진</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="relative group overflow-hidden rounded-3xl">
                <Image
                  src={`/placeholder.svg?height=250&width=400&query=${camp.image} activity ${item}`}
                  alt={`캠프 활동 ${item}`}
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-black text-white mb-6">지금 신청하세요!</h2>
            <p className="text-2xl text-gray-300 mb-10 leading-relaxed">
              {camp.title}에서 아이들의 꿈과 재능을 발견해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
              >
                <Users className="mr-2 h-6 w-6" />
                캠프 신청하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-6 text-xl font-bold rounded-2xl bg-white/5 backdrop-blur-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
              >
                더 많은 캠프 보기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Hope Foundation</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                함께 만드는 더 나은 세상을 위해 노력하는 비영리단체입니다.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">바로가기</h4>
              <div className="space-y-3">
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors duration-300">
                  소개
                </Link>
                <Link href="/camp" className="block text-gray-400 hover:text-white transition-colors duration-300">
                  캠프
                </Link>
                <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors duration-300">
                  블로그
                </Link>
                <Link href="/donation" className="block text-gray-400 hover:text-white transition-colors duration-300">
                  후원
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">연락처</h4>
              <div className="space-y-3 text-gray-400">
                <p>서울시 강남구 테헤란로 123</p>
                <p>전화: 02-1234-5678</p>
                <p>이메일: info@hopefoundation.org</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">후원 계좌</h4>
              <div className="space-y-3 text-gray-400">
                <p>국민은행 123-456-789012</p>
                <p>예금주: 희망재단</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-16 pt-8 text-center text-gray-500">
            <p>&copy; 2024 Hope Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
