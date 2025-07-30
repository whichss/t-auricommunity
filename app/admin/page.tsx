"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '../api/blog/route'

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== id))
        alert('삭제되었습니다.')
      }
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="AURI COMMUNITY 로고"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg sm:text-xl font-light tracking-wider">
                AURI COMMUNITY Admin
              </span>
            </Link>
            <Link href="/" className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 sm:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl sm:text-4xl font-thin tracking-wide text-white mb-2">
                블로그 관리
              </h1>
              <p className="text-white/60 font-light text-sm sm:text-base">
                블로그 포스트를 생성, 수정, 삭제할 수 있습니다.
              </p>
            </div>
            <Link
              href="/admin/create"
              className="bg-white text-black px-4 sm:px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors duration-300 rounded whitespace-nowrap"
            >
              새 포스트 작성
            </Link>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/60">로딩 중...</p>
            </div>
          ) : (
            <div className="bg-zinc-900/50 rounded-lg overflow-hidden">
              {/* 모바일에서는 카드 형태, 데스크톱에서는 테이블 */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead className="bg-zinc-800/50">
                    <tr>
                      <th className="text-left py-4 px-6 text-white/80 font-light">제목</th>
                      <th className="text-left py-4 px-6 text-white/80 font-light">카테고리</th>
                      <th className="text-left py-4 px-6 text-white/80 font-light">작성일</th>
                      <th className="text-left py-4 px-6 text-white/80 font-light">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => (
                      <tr key={post.id} className={index % 2 === 0 ? 'bg-zinc-800/20' : ''}>
                        <td className="py-4 px-6">
                          <div>
                            <h3 className="text-white font-light">{post.title}</h3>
                            <p className="text-white/50 text-sm mt-1">{post.excerpt}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">
                            {post.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-white/60 text-sm">
                          {formatDate(post.publishedAt)}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-2">
                            <Link
                              href={`/admin/edit/${post.id}`}
                              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                            >
                              수정
                            </Link>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="text-red-400 hover:text-red-300 text-sm transition-colors"
                            >
                              삭제
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* 모바일 카드 레이아웃 */}
              <div className="md:hidden">
                {posts.map((post) => (
                  <div key={post.id} className="p-4 border-b border-white/10 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-light text-sm leading-tight flex-1 mr-2">
                        {post.title}
                      </h3>
                      <span className="bg-white/10 text-white/80 px-2 py-1 rounded-full text-xs whitespace-nowrap">
                        {post.category}
                      </span>
                    </div>
                    <p className="text-white/50 text-xs mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-white/40 text-xs">
                        {formatDate(post.publishedAt)}
                      </span>
                      <div className="flex space-x-3">
                        <Link
                          href={`/admin/edit/${post.id}`}
                          className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
                        >
                          수정
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-400 hover:text-red-300 text-xs transition-colors"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {posts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-white/50">게시글이 없습니다.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}