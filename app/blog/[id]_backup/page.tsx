"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, User, ArrowLeft, Share2, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useDataStore } from "@/lib/data-store"
import { useState } from "react"
import { NewsletterModal } from "@/components/newsletter-modal"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const { blogPosts } = useDataStore()
  const [newsletterModal, setNewsletterModal] = useState(false)
  const post = blogPosts.find((p) => p.id === Number.parseInt(params.id))

  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>
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
              <Link
                href="/camp"
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-medium relative group"
              >
                캠프
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/blog" className="text-gray-900 font-semibold text-sm relative">
                블로그
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></span>
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
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            블로그로 돌아가기
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="mb-12">
            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 mb-6">
              {post.category}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">{post.title}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{post.author}</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent rounded-2xl"
              >
                <Share2 className="h-4 w-4 mr-2" />
                공유하기
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative mb-12 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-2xl transform group-hover:scale-105 transition-all duration-700"></div>
            <div className="relative overflow-hidden rounded-[3rem] shadow-2xl">
              <Image
                src={`/placeholder.svg?height=500&width=800&query=${post.image}`}
                alt={post.title}
                width={800}
                height={500}
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-all duration-700"
              />
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-xl">
              <div className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</div>
            </div>
          </div>

          {/* Share & Actions */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">이 글이 도움이 되셨나요?</h3>
                <p className="text-gray-600">희망재단의 더 많은 소식을 받아보세요</p>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent rounded-2xl"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  공유하기
                </Button>
                <Button
                  onClick={() => setNewsletterModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl"
                >
                  뉴스레터 구독
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">관련 글</h2>
            <p className="text-xl text-gray-600">다른 소식도 확인해보세요</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts
              .filter((p) => p.id !== post.id && p.published)
              .slice(0, 3)
              .map((relatedPost) => (
                <article key={relatedPost.id} className="group">
                  <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                    <div className="relative overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=200&width=400&query=${relatedPost.image}`}
                        alt={relatedPost.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 mb-3">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{relatedPost.excerpt}</p>
                      <Link href={`/blog/${relatedPost.id}`}>
                        <Button
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 font-semibold"
                        >
                          읽기 →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
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
      {/* Modals */}
      <NewsletterModal isOpen={newsletterModal} onClose={() => setNewsletterModal(false)} />
    </div>
  )
}
