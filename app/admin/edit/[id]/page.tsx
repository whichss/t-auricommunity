"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { BlogPost } from '../../../api/blog/route'

interface EditPostPageProps {
  params: {
    id: string
  }
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '사역소식',
    imageUrl: ''
  })
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentTag, setCurrentTag] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [currentFontSize, setCurrentFontSize] = useState('16')
  
  const editorRef = useRef<HTMLDivElement>(null)

  const categories = [
    '사역소식', '간증', '설교', '캠프', '봉사활동', '교육', '기도제목', '공지사항'
  ]

  useEffect(() => {
    fetchPost()
  }, [params.id])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${params.id}`)
      if (response.ok) {
        const postData = await response.json()
        setPost(postData)
        setFormData({
          title: postData.title || '',
          excerpt: postData.excerpt || '',
          content: postData.content || '',
          category: postData.category || '사역소식',
          imageUrl: postData.imageUrl || ''
        })
        setTags(postData.tags || [])
      } else {
        alert('포스트를 찾을 수 없습니다.')
        router.push('/admin')
      }
    } catch (error) {
      console.error('Failed to fetch post:', error)
      alert('포스트를 불러오는 중 오류가 발생했습니다.')
      router.push('/admin')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (isDraft = false) => {
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    setSaving(true)

    try {
      const response = await fetch(`/api/blog/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          tags,
          isDraft
        })
      })

      if (response.ok) {
        alert('수정되었습니다.')
        router.push('/admin')
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 10) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const formatText = (command: string, value?: string) => {
    editorRef.current?.focus()
    
    // 리스트 처리를 위한 특별 처리
    if (command === 'insertUnorderedList') {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        
        const ul = document.createElement('ul')
        ul.style.paddingLeft = '20px'
        ul.style.margin = '10px 0'
        
        const li = document.createElement('li')
        li.style.listStyleType = 'disc'
        li.innerHTML = selection.toString() || '내용을 입력하세요'
        
        ul.appendChild(li)
        range.deleteContents()
        range.insertNode(ul)
        
        range.setStart(li, 0)
        range.setEnd(li, li.childNodes.length)
        selection.removeAllRanges()
        selection.addRange(range)
        
        setFormData({ ...formData, content: editorRef.current!.innerHTML })
        return
      }
    }
    
    if (command === 'insertOrderedList') {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        
        const ol = document.createElement('ol')
        ol.style.paddingLeft = '20px'
        ol.style.margin = '10px 0'
        
        const li = document.createElement('li')
        li.innerHTML = selection.toString() || '내용을 입력하세요'
        
        ol.appendChild(li)
        range.deleteContents()
        range.insertNode(ol)
        
        range.setStart(li, 0)
        range.setEnd(li, li.childNodes.length)
        selection.removeAllRanges()
        selection.addRange(range)
        
        setFormData({ ...formData, content: editorRef.current!.innerHTML })
        return
      }
    }
    
    const result = document.execCommand(command, false, value)
    
    if (editorRef.current) {
      setFormData({ ...formData, content: editorRef.current.innerHTML })
    }
    
    return result
  }
  
  const changeFontSize = (size: string) => {
    setCurrentFontSize(size)
    if (editorRef.current) {
      const selection = window.getSelection()
      if (selection && selection.toString()) {
        document.execCommand('fontSize', false, '7')
        const fontElements = editorRef.current.querySelectorAll('font[size="7"]')
        fontElements.forEach(font => {
          const span = document.createElement('span')
          span.style.fontSize = size + 'px'
          span.innerHTML = font.innerHTML
          font.parentNode?.replaceChild(span, font)
        })
      } else {
        editorRef.current.style.fontSize = size + 'px'
      }
      setFormData({ ...formData, content: editorRef.current.innerHTML })
    }
  }

  const wordCount = formData.content.replace(/<[^>]*>/g, '').length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">포스트를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left */}
            <div className="flex items-center space-x-3 sm:space-x-6">
              <Link href="/admin" className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="AURI COMMUNITY 로고"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-lg sm:text-xl font-medium text-gray-900">blog</span>
              </Link>
              
              <span className="hidden sm:inline text-sm text-gray-500">포스트 수정</span>
            </div>

            {/* Center - Title - 모바일에서 숨김 */}
            <div className="hidden sm:flex flex-1 max-w-2xl mx-8">
              <span className="text-lg text-gray-600">포스트 수정</span>
            </div>

            {/* Right */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => handleSubmit(true)}
                disabled={saving}
                className="hidden sm:inline px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                임시저장
              </button>
              <button
                onClick={() => handleSubmit(false)}
                disabled={saving}
                className="px-4 sm:px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? '저장 중...' : '수정 완료'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 lg:h-screen lg:sticky lg:top-16 overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* 카테고리 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* 요약 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                요약
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                placeholder="포스트 요약을 입력하세요"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>

            {/* 태그 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                태그 ({tags.length}/10)
              </label>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="태그 입력"
                  className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  maxLength={20}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  추가
                </button>
              </div>
            </div>

            {/* 썸네일 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                썸네일 이미지
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="이미지 URL을 입력하세요"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {formData.imageUrl && (
                <div className="mt-3">
                  <img 
                    src={formData.imageUrl} 
                    alt="썸네일 미리보기" 
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>

            {/* 통계 */}
            <div className="pt-4 border-t border-gray-200">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>글자 수</span>
                  <span>{wordCount.toLocaleString()}자</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Editor */}
        <main className="flex-1 bg-white">
          <div className="p-4 sm:p-8">
            {/* Editor Title */}
            <div className="mb-4 sm:mb-6">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="제목을 입력하세요"
                className="w-full text-2xl sm:text-3xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent"
                style={{ fontSize: 'clamp(24px, 5vw, 28px)', fontWeight: '700', lineHeight: '1.2' }}
              />
            </div>
            
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-4 sm:mb-6 pb-4 border-b border-gray-200">
              {/* 폰트 사이즈 */}
              <select
                value={currentFontSize}
                onChange={(e) => changeFontSize(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
                <option value="20">20px</option>
                <option value="24">24px</option>
                <option value="28">28px</option>
                <option value="32">32px</option>
              </select>
              
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
              
              <button
                onClick={() => formatText('bold')}
                className="p-2 rounded hover:bg-gray-100 transition-colors"
                title="굵게"
              >
                <strong className="text-gray-700">B</strong>
              </button>
              <button
                onClick={() => formatText('italic')}
                className="p-2 rounded hover:bg-gray-100 transition-colors"
                title="기울임"
              >
                <em className="text-gray-700">I</em>
              </button>
              <button
                onClick={() => formatText('underline')}
                className="p-2 rounded hover:bg-gray-100 transition-colors"
                title="밑줄"
              >
                <u className="text-gray-700">U</u>
              </button>
              
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
              
              <button
                onClick={() => formatText('insertUnorderedList')}
                className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-700"
                title="글머리 기호"
              >
                •
              </button>
              <button
                onClick={() => formatText('insertOrderedList')}
                className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-700"
                title="번호 매기기"
              >
                1.
              </button>
            </div>

            {/* Content Editor */}
            <div
              ref={editorRef}
              contentEditable
              onInput={(e) => setFormData({ ...formData, content: e.currentTarget.innerHTML })}
              className="min-h-96 text-gray-900 leading-relaxed focus:outline-none"
              style={{ 
                fontSize: `clamp(14px, 4vw, ${currentFontSize}px)`, 
                lineHeight: '1.8',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
              dangerouslySetInnerHTML={{ __html: formData.content }}
              suppressContentEditableWarning={true}
            />
          </div>
        </main>
      </div>
    </div>
  )
}