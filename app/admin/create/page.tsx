"use client"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CreatePostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '사역소식',
    imageUrl: ''
  })
  const [saving, setSaving] = useState(false)
  const [currentTag, setCurrentTag] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [customCategories, setCustomCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState('')
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [currentFontSize, setCurrentFontSize] = useState('16')
  
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const defaultCategories = [
    '사역소식', '간증', '설교', '캠프', '봉사활동', '교육', '기도제목', '공지사항'
  ]

  const allCategories = [...defaultCategories, ...customCategories]

  // 커스텀 카테고리 로드
  useEffect(() => {
    const saved = localStorage.getItem('custom_categories')
    if (saved) {
      try {
        setCustomCategories(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load custom categories:', error)
      }
    }
  }, [])

  const addCategory = () => {
    if (newCategory.trim() && !allCategories.includes(newCategory.trim())) {
      const updatedCategories = [...customCategories, newCategory.trim()]
      setCustomCategories(updatedCategories)
      localStorage.setItem('custom_categories', JSON.stringify(updatedCategories))
      setFormData({ ...formData, category: newCategory.trim() })
      setNewCategory('')
      setShowCategoryModal(false)
    }
  }

  // 자동 저장
  useEffect(() => {
    const interval = setInterval(() => {
      if (formData.title.trim() || formData.content.trim()) {
        localStorage.setItem('blog_draft', JSON.stringify({
          ...formData,
          tags,
          lastSaved: new Date().toISOString()
        }))
        setLastSaved(new Date())
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [formData, tags])

  // 에디터 외부 클릭 시 iframe 비활성화
  useEffect(() => {
    const handleClickOutside = () => {
      if (editorRef.current) {
        const iframes = editorRef.current.querySelectorAll('.youtube-embed-container iframe')
        const overlays = editorRef.current.querySelectorAll('.youtube-embed-container .overlay')
        
        iframes.forEach((iframe: any) => {
          iframe.style.pointerEvents = 'none'
        })
        
        overlays.forEach((overlay: any) => {
          overlay.style.display = 'flex'
        })
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // 임시저장 복원
  useEffect(() => {
    const saved = localStorage.getItem('blog_draft')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (confirm('임시저장된 내용이 있습니다. 복원하시겠습니까?')) {
          setFormData({
            title: parsed.title || '',
            excerpt: parsed.excerpt || '',
            content: parsed.content || '',
            category: parsed.category || '사역소식',
            imageUrl: parsed.imageUrl || ''
          })
          setTags(parsed.tags || [])
        }
      } catch (error) {
        console.error('Failed to restore draft:', error)
      }
    }
  }, [])

  const deleteCategory = (categoryToDelete: string) => {
    if (defaultCategories.includes(categoryToDelete)) {
      alert('기본 카테고리는 삭제할 수 없습니다.')
      return
    }
    
    const updatedCategories = customCategories.filter(cat => cat !== categoryToDelete)
    setCustomCategories(updatedCategories)
    localStorage.setItem('custom_categories', JSON.stringify(updatedCategories))
    
    if (formData.category === categoryToDelete) {
      setFormData({ ...formData, category: '사역소식' })
    }
  }

  const handleSubmit = async (isDraft = false) => {
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    setSaving(true)

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
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
        localStorage.removeItem('blog_draft')
        setShowSaveModal(false)
        alert(isDraft ? '임시저장되었습니다.' : '발행되었습니다.')
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

  const uploadImage = async (file: File) => {
    setUploadingImage(true)
    try {
      // 실제 환경에서는 이미지 업로드 API 사용
      // 여기서는 로컬 파일 URL 생성
      const url = URL.createObjectURL(file)
      setFormData({ ...formData, imageUrl: url })
      setShowImageModal(false)
    } catch (error) {
      alert('이미지 업로드 중 오류가 발생했습니다.')
    } finally {
      setUploadingImage(false)
    }
  }

  // YouTube 우클릭 메뉴를 위한 삭제 버튼 추가
  const addDeleteButton = (element: HTMLElement, type: 'youtube' | 'image') => {
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = '×'
    deleteBtn.style.position = 'absolute'
    deleteBtn.style.top = '5px'
    deleteBtn.style.right = '5px'
    deleteBtn.style.width = '24px'
    deleteBtn.style.height = '24px'
    deleteBtn.style.background = 'rgba(255, 0, 0, 0.8)'
    deleteBtn.style.color = 'white'
    deleteBtn.style.border = 'none'
    deleteBtn.style.borderRadius = '50%'
    deleteBtn.style.cursor = 'pointer'
    deleteBtn.style.fontSize = '14px'
    deleteBtn.style.fontWeight = 'bold'
    deleteBtn.style.display = 'none'
    deleteBtn.style.zIndex = '10'
    deleteBtn.style.lineHeight = '1'
    deleteBtn.className = 'delete-btn'
    
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (confirm(`${type === 'youtube' ? 'YouTube 비디오' : '이미지'}를 삭제하시겠습니까?`)) {
        element.remove()
        if (editorRef.current) {
          setFormData({ ...formData, content: editorRef.current.innerHTML })
        }
      }
    })
    
    // hover 시 보이기/숨기기
    element.addEventListener('mouseenter', () => {
      deleteBtn.style.display = 'block'
    })
    
    element.addEventListener('mouseleave', () => {
      deleteBtn.style.display = 'none'
    })
    
    element.appendChild(deleteBtn)
  }

  const insertImage = () => {
    const url = formData.imageUrl
    if (!url || !editorRef.current) {
      alert('이미지 URL을 입력해주세요.')
      return
    }
    
    editorRef.current.focus()
    
    // Selection API를 사용해서 현재 커서 위치에 삽입
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      
      // 이미지 컸테이너 생성
      const imgContainer = document.createElement('div')
      imgContainer.style.position = 'relative'
      imgContainer.style.display = 'inline-block'
      imgContainer.style.margin = '20px 0'
      imgContainer.className = 'image-container'
      
      // 이미지 엘리먼트 생성
      const img = document.createElement('img')
      img.src = url
      img.alt = '삽입된 이미지'
      img.style.maxWidth = '100%'
      img.style.height = 'auto'
      img.style.borderRadius = '8px'
      img.style.display = 'block'
      
      imgContainer.appendChild(img)
      
      // 삭제 버튼 추가
      addDeleteButton(imgContainer, 'image')
      
      // 선택 영역 삭제 후 이미지 삽입
      range.deleteContents()
      range.insertNode(imgContainer)
      
      // 커서를 이미지 뒤로 이동
      range.setStartAfter(imgContainer)
      range.setEndAfter(imgContainer)
      selection.removeAllRanges()
      selection.addRange(range)
      
      // 콘텐트 업데이트
      setFormData({ ...formData, content: editorRef.current.innerHTML })
    }
    
    setShowImageModal(false)
  }

  const insertLink = () => {
    if (!linkUrl.trim() || !editorRef.current) return
    
    editorRef.current.focus()
    
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return
    
    const range = selection.getRangeAt(0)
    
    // YouTube 링크 처리
    if (linkUrl.includes('youtube.com') || linkUrl.includes('youtu.be')) {
      let videoId = ''
      
      try {
        if (linkUrl.includes('youtu.be')) {
          videoId = linkUrl.split('/').pop()?.split('?')[0] || ''
        } else if (linkUrl.includes('youtube.com')) {
          const url = new URL(linkUrl)
          videoId = url.searchParams.get('v') || ''
        }
        
        if (videoId) {
          // YouTube 컸테이너 생성
          const youtubeContainer = document.createElement('div')
          youtubeContainer.style.margin = '20px 0'
          youtubeContainer.style.position = 'relative'
          youtubeContainer.style.paddingBottom = '56.25%'
          youtubeContainer.style.height = '0'
          youtubeContainer.style.overflow = 'hidden'
          youtubeContainer.style.borderRadius = '8px'
          youtubeContainer.style.background = '#f0f0f0'
          youtubeContainer.className = 'youtube-embed-container'
          
          // 편집 모드에서는 iframe 비활성화
          const iframe = document.createElement('iframe')
          iframe.src = `https://www.youtube.com/embed/${videoId}`
          iframe.style.position = 'absolute'
          iframe.style.top = '0'
          iframe.style.left = '0'
          iframe.style.width = '100%'
          iframe.style.height = '100%'
          iframe.style.border = 'none'
          iframe.style.pointerEvents = 'none' // 편집 중에는 비활성화
          iframe.setAttribute('allowfullscreen', '')
          iframe.setAttribute('title', 'YouTube video')
          
          // 클릭 시 활성화/비활성화 토글
          const overlay = document.createElement('div')
          overlay.className = 'overlay'
          overlay.style.position = 'absolute'
          overlay.style.top = '0'
          overlay.style.left = '0'
          overlay.style.width = '100%'
          overlay.style.height = '100%'
          overlay.style.cursor = 'pointer'
          overlay.style.display = 'flex'
          overlay.style.alignItems = 'center'
          overlay.style.justifyContent = 'center'
          overlay.style.fontSize = '14px'
          overlay.style.color = 'white'
          overlay.style.textShadow = '0 1px 3px rgba(0,0,0,0.5)'
          overlay.style.fontWeight = '500'
          overlay.innerHTML = '▶️ 비디오 재생하려면 클릭'
          
          overlay.addEventListener('click', (e) => {
            e.stopPropagation()
            if (iframe.style.pointerEvents === 'none') {
              iframe.style.pointerEvents = 'auto'
              overlay.style.display = 'none'
            }
          })
          
          youtubeContainer.appendChild(iframe)
          youtubeContainer.appendChild(overlay)
          
          // 삭제 버튼 추가
          addDeleteButton(youtubeContainer, 'youtube')
          
          // 선택 영역에 삽입
          range.deleteContents()
          range.insertNode(youtubeContainer)
          
          // 커서를 YouTube 컴테이너 뒤로 이동
          range.setStartAfter(youtubeContainer)
          range.setEndAfter(youtubeContainer)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      } catch (error) {
        console.error('YouTube URL 처리 오류:', error)
        alert('YouTube URL을 처리할 수 없습니다.')
        return
      }
    } else {
      // 일반 링크 처리
      const linkElement = document.createElement('a')
      linkElement.href = linkUrl
      linkElement.target = '_blank'
      linkElement.style.color = '#3b82f6'
      linkElement.style.textDecoration = 'underline'
      linkElement.textContent = linkUrl
      
      // 선택 영역에 삽입
      range.deleteContents()
      range.insertNode(linkElement)
      
      // 커서를 링크 뒤로 이동
      range.setStartAfter(linkElement)
      range.setEndAfter(linkElement)
      selection.removeAllRanges()
      selection.addRange(range)
    }
    
    // 콘텐트 업데이트
    setFormData({ ...formData, content: editorRef.current.innerHTML })
    setLinkUrl('')
    setShowLinkModal(false)
  }

  // URL 직접 입력 시 자동 인식
  const handlePaste = async (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text')
    
    // YouTube URL 인식
    if (pastedText.includes('youtube.com') || pastedText.includes('youtu.be')) {
      e.preventDefault()
      setLinkUrl(pastedText)
      setTimeout(() => {
        insertLink()
      }, 100)
      return
    }
    
    // 이미지 URL 인식
    if (pastedText.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) || pastedText.includes('unsplash.com') || pastedText.includes('imgur.com')) {
      e.preventDefault()
      setFormData({ ...formData, imageUrl: pastedText })
      setTimeout(() => {
        insertImage()
      }, 100)
      return
    }
  }
  
  // 타이핑 중 URL 자동 인식 및 리스트 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter 키 처리 (리스트 안에서)
    if (e.key === 'Enter') {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        let currentElement = range.commonAncestorContainer
        
        // 현재 리스트 안에 있는지 확인
        while (currentElement && currentElement !== editorRef.current) {
          if (currentElement.nodeType === Node.ELEMENT_NODE) {
            const elem = currentElement as Element
            if (elem.tagName === 'LI') {
              e.preventDefault()
              
              // 새로운 li 엘리먼트 생성
              const newLi = document.createElement('li')
              newLi.innerHTML = '내용을 입력하세요'
              
              // 현재 li 뒤에 삽입
              elem.parentNode?.insertBefore(newLi, elem.nextSibling)
              
              // 커서를 새 li로 이동
              range.setStart(newLi, 0)
              range.setEnd(newLi, newLi.childNodes.length)
              selection.removeAllRanges()
              selection.addRange(range)
              
              setFormData({ ...formData, content: editorRef.current!.innerHTML })
              return
            }
          }
          currentElement = currentElement.parentNode
        }
      }
    }
    
    // URL 자동 인식 처리
    if (e.key === ' ' || e.key === 'Enter') {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const container = range.commonAncestorContainer
        const text = container.textContent || ''
        
        // 마지막 단어 추출
        const words = text.trim().split(/\s+/)
        const lastWord = words[words.length - 1]
        
        // YouTube URL 인식
        if (lastWord && (lastWord.includes('youtube.com') || lastWord.includes('youtu.be'))) {
          e.preventDefault()
          
          // 텍스트에서 URL 제거
          const newText = text.replace(lastWord, '').trim()
          if (container.nodeType === Node.TEXT_NODE && container.parentNode) {
            container.textContent = newText
          }
          
          setLinkUrl(lastWord)
          setTimeout(() => {
            insertLink()
          }, 100)
          return
        }
        
        // 이미지 URL 인식
        if (lastWord && (lastWord.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) || lastWord.includes('unsplash.com') || lastWord.includes('imgur.com'))) {
          e.preventDefault()
          
          // 텍스트에서 URL 제거
          const newText = text.replace(lastWord, '').trim()
          if (container.nodeType === Node.TEXT_NODE && container.parentNode) {
            container.textContent = newText
          }
          
          setFormData({ ...formData, imageUrl: lastWord })
          setTimeout(() => {
            insertImage()
          }, 100)
          return
        }
      }
    }
  }

  const wordCount = formData.content.replace(/<[^>]*>/g, '').length

  const formatText = (command: string, value?: string) => {
    editorRef.current?.focus()
    
    // 리스트 처리를 위한 특별 처리
    if (command === 'insertUnorderedList') {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        
        // 새로운 ul 엘리먼트 생성
        const ul = document.createElement('ul')
        ul.style.paddingLeft = '20px'
        ul.style.margin = '10px 0'
        
        const li = document.createElement('li')
        li.style.listStyleType = 'disc'
        li.innerHTML = selection.toString() || '내용을 입력하세요'
        
        ul.appendChild(li)
        
        range.deleteContents()
        range.insertNode(ul)
        
        // 커서를 li 내부로 이동
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
        
        // 새로운 ol 엘리먼트 생성
        const ol = document.createElement('ol')
        ol.style.paddingLeft = '20px'
        ol.style.margin = '10px 0'
        
        const li = document.createElement('li')
        li.innerHTML = selection.toString() || '내용을 입력하세요'
        
        ol.appendChild(li)
        
        range.deleteContents()
        range.insertNode(ol)
        
        // 커서를 li 내부로 이동
        range.setStart(li, 0)
        range.setEnd(li, li.childNodes.length)
        selection.removeAllRanges()
        selection.addRange(range)
        
        setFormData({ ...formData, content: editorRef.current!.innerHTML })
        return
      }
    }
    
    // 기본 execCommand 사용
    const result = document.execCommand(command, false, value)
    
    // 업데이트
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
        // 텍스트가 선택된 경우
        document.execCommand('fontSize', false, '7') // 임시로 큰 사이즈 설정
        // 그 다음 font 태그를 찾아서 스타일 변경
        const fontElements = editorRef.current.querySelectorAll('font[size="7"]')
        fontElements.forEach(font => {
          const span = document.createElement('span')
          span.style.fontSize = size + 'px'
          span.innerHTML = font.innerHTML
          font.parentNode?.replaceChild(span, font)
        })
      } else {
        // 전체 에디터에 적용
        editorRef.current.style.fontSize = size + 'px'
      }
      setFormData({ ...formData, content: editorRef.current.innerHTML })
    }
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
            </div>

            {/* Center - Title - 모바일에서 숨김 */}
            <div className="hidden sm:flex flex-1 max-w-2xl mx-8">
              <span className="text-lg text-gray-600">새 포스트 작성</span>
            </div>

            {/* Right */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {lastSaved && (
                <span className="hidden sm:inline text-xs text-gray-500">
                  마지막 저장: {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={() => setShowSaveModal(true)}
                className="px-4 sm:px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
              >
                저장/발행
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
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  카테고리
                </label>
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  관리
                </button>
              </div>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {allCategories.map((cat) => (
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
                  className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <button
                onClick={() => setShowImageModal(true)}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
              >
                {formData.imageUrl ? (
                  <img 
                    src={formData.imageUrl} 
                    alt="썸네일" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-gray-500">
                    <div className="text-2xl mb-2">📷</div>
                    <div className="text-sm">썸네일 추가</div>
                  </div>
                )}
              </button>
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
                className="px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              
              <div className="hidden sm:block w-px h-6 bg-gray-300 mx-2"></div>
              
              <button
                onClick={() => formatText('bold')}
                className="p-1.5 sm:p-2 rounded hover:bg-gray-100 transition-colors"
                title="굵게"
              >
                <strong className="text-gray-700 text-sm sm:text-base">B</strong>
              </button>
              <button
                onClick={() => formatText('italic')}
                className="p-1.5 sm:p-2 rounded hover:bg-gray-100 transition-colors"
                title="기울임"
              >
                <em className="text-gray-700 text-sm sm:text-base">I</em>
              </button>
              <button
                onClick={() => formatText('underline')}
                className="p-1.5 sm:p-2 rounded hover:bg-gray-100 transition-colors"
                title="밑줄"
              >
                <u className="text-gray-700 text-sm sm:text-base">U</u>
              </button>
              
              <div className="hidden sm:block w-px h-6 bg-gray-300 mx-2"></div>
              
              <button
                onClick={() => formatText('insertUnorderedList')}
                className="p-1.5 sm:p-2 rounded hover:bg-gray-100 transition-colors text-gray-700 text-sm sm:text-base"
                title="글머리 기호"
              >
                •
              </button>
              <button
                onClick={() => formatText('insertOrderedList')}
                className="p-1.5 sm:p-2 rounded hover:bg-gray-100 transition-colors text-gray-700 text-sm sm:text-base"
                title="번호 매기기"
              >
                1.
              </button>
              
              <div className="hidden sm:block w-px h-6 bg-gray-300 mx-2"></div>
              
              <button
                onClick={() => setShowImageModal(true)}
                className="p-1.5 sm:p-2 rounded hover:bg-gray-100 transition-colors text-gray-700 text-sm sm:text-base"
                title="이미지 삽입"
              >
                🖼️
              </button>
              <button
                onClick={() => setShowLinkModal(true)}
                className="p-1.5 sm:p-2 rounded hover:bg-gray-100 transition-colors text-gray-700 text-sm sm:text-base"
                title="링크/YouTube 삽입"
              >
                🔗
              </button>
            </div>

            {/* Content Editor */}
            <div
              ref={editorRef}
              contentEditable
              onInput={(e) => {
                const newContent = e.currentTarget.innerHTML
                setFormData({ ...formData, content: newContent })
              }}
              onBlur={(e) => {
                // 포커스 잃을 때도 내용 업데이트
                const newContent = e.currentTarget.innerHTML
                setFormData({ ...formData, content: newContent })
              }}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              className="min-h-96 text-gray-900 leading-relaxed focus:outline-none"
              style={{ 
                fontSize: `clamp(14px, 4vw, ${currentFontSize}px)`, 
                lineHeight: '1.8',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
              data-placeholder="최근 다른 곳을 지도와 함께 기록해보세요!"
              suppressContentEditableWarning={true}
            />
          </div>
        </main>
      </div>

      {/* 저장/발행 모달 */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm sm:max-w-md">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">저장 옵션</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={() => handleSubmit(true)}
                  disabled={saving}
                  className="w-full p-3 sm:p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">임시저장</div>
                  <div className="text-sm text-gray-500">나중에 계속 작성할 수 있습니다.</div>
                </button>
                
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={saving}
                  className="w-full p-3 sm:p-4 text-left border border-blue-300 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="font-medium text-blue-900">발행하기</div>
                  <div className="text-sm text-blue-600">즉시 블로그에 게시됩니다.</div>
                </button>
              </div>
              
              <div className="flex justify-end space-x-3 mt-4 sm:mt-6">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 이미지 모달 */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm sm:max-w-md">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">이미지 추가</h3>
              
              {/* 파일 업로드 */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    파일 업로드
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) uploadImage(file)
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                
                <div className="text-center text-gray-500 text-sm">또는</div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이미지 URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-4 sm:mt-6">
                <button
                  onClick={() => setShowImageModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
                >
                  취소
                </button>
                <button
                  onClick={insertImage}
                  disabled={!formData.imageUrl || uploadingImage}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base"
                >
                  {uploadingImage ? '업로드 중...' : '추가'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 링크 모달 */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm sm:max-w-md">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">링크 추가</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL (YouTube 링크도 지원)
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  YouTube 링크는 자동으로 플레이어로 변환됩니다.
                </p>
              </div>
              
              <div className="flex justify-end space-x-3 mt-4 sm:mt-6">
                <button
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
                >
                  취소
                </button>
                <button
                  onClick={insertLink}
                  disabled={!linkUrl.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base"
                >
                  추가
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 카테고리 관리 모달 */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm sm:max-w-md">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">카테고리 관리</h3>
              
              {/* 기존 카테고리 목록 */}
              <div className="space-y-2 mb-4 max-h-40 sm:max-h-48 overflow-y-auto">
                {allCategories.map((cat) => (
                  <div key={cat} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                    <span className="text-sm">{cat}</span>
                    {!defaultCategories.includes(cat) && (
                      <button
                        onClick={() => deleteCategory(cat)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {/* 새 카테고리 추가 */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    새 카테고리 추가
                  </label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                    placeholder="카테고리 이름"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                
                <button
                  onClick={addCategory}
                  disabled={!newCategory.trim() || allCategories.includes(newCategory.trim())}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base"
                >
                  추가
                </button>
              </div>
              
              <div className="flex justify-end space-x-3 mt-4 sm:mt-6">
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        [contenteditable]:empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          font-style: italic;
        }
        
        .youtube-embed-container {
          border: 2px dashed transparent;
          transition: border-color 0.2s ease;
        }
        
        .youtube-embed-container:hover {
          border-color: #e5e7eb;
        }
        
        .youtube-embed-container .overlay {
          background: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(2px);
        }
        
        .youtube-embed-container:hover .overlay {
          background: rgba(0, 0, 0, 0.2);
        }
        
        .image-container {
          position: relative;
          display: inline-block;
        }
        
        .image-container:hover .delete-btn,
        .youtube-embed-container:hover .delete-btn {
          display: block !important;
        }
        
        .delete-btn {
          transition: all 0.2s ease;
        }
        
        .delete-btn:hover {
          background: rgba(255, 0, 0, 1) !important;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  )
}