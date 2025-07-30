'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Link2,
  Image as ImageIcon,
  Video,
  Hash,
  Type,
  Palette,
  Eye,
  Save,
  Upload,
  X,
  Plus,
  Settings,
  ChevronDown,
  Smile,
  Calendar,
  Tag,
  Users
} from 'lucide-react';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}

function ToolbarButton({ icon, label, onClick, isActive, className = '' }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`p-2 rounded-lg transition-all duration-200 hover:bg-zinc-100 hover:scale-105 ${
        isActive ? 'bg-blue-100 text-blue-600' : 'text-zinc-600'
      } ${className}`}
    >
      {icon}
    </button>
  );
}

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function Dropdown({ trigger, children, isOpen, onToggle }: DropdownProps) {
  return (
    <div className="relative">
      <button onClick={onToggle} className="flex items-center space-x-1 p-2 rounded-lg hover:bg-zinc-100 transition-colors">
        {trigger}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 min-w-48">
          {children}
        </div>
      )}
    </div>
  );
}

export default function BlogWritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('일반');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [scheduledDate, setScheduledDate] = useState('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [isPreview, setIsPreview] = useState(false);
  
  // Dropdown states
  const [fontDropdown, setFontDropdown] = useState(false);
  const [sizeDropdown, setSizeDropdown] = useState(false);
  const [colorDropdown, setColorDropdown] = useState(false);
  
  // Editor states
  const [fontSize, setFontSize] = useState('16');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [textColor, setTextColor] = useState('#000000');
  
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    '일반', '사역소식', '간증', '설교', '캠프', '봉사활동', '교육', '기도제목', '공지사항'
  ];

  const fontSizes = ['12', '14', '16', '18', '20', '24', '28', '32', '36', '48'];
  const fontFamilies = ['Inter', 'Noto Sans KR', 'Malgun Gothic', 'Arial', 'Times New Roman', 'Georgia'];

  const colors = [
    '#000000', '#333333', '#666666', '#999999', '#CCCCCC',
    '#FF0000', '#FF6600', '#FFCC00', '#00FF00', '#0066FF',
    '#6600FF', '#FF0066', '#00FFFF', '#FF00FF', '#800000',
    '#008000', '#000080', '#808000', '#800080', '#008080'
  ];

  // Toolbar functions
  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const insertImage = useCallback(() => {
    const url = prompt('이미지 URL을 입력하세요:');
    if (url) {
      execCommand('insertImage', url);
    }
  }, [execCommand]);

  const insertLink = useCallback(() => {
    const url = prompt('링크 URL을 입력하세요:');
    if (url) {
      const text = window.getSelection()?.toString() || url;
      execCommand('insertHTML', `<a href="${url}" target="_blank">${text}</a>`);
    }
  }, [execCommand]);

  const changeFontSize = useCallback((size: string) => {
    execCommand('fontSize', '3');
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const span = document.createElement('span');
      span.style.fontSize = size + 'px';
      try {
        selection.getRangeAt(0).surroundContents(span);
      } catch (e) {
        execCommand('insertHTML', `<span style="font-size: ${size}px">${selection.toString()}</span>`);
      }
    }
    setFontSize(size);
    setSizeDropdown(false);
  }, [execCommand]);

  const changeFontFamily = useCallback((family: string) => {
    execCommand('fontName', family);
    setFontFamily(family);
    setFontDropdown(false);
  }, [execCommand]);

  const changeTextColor = useCallback((color: string) => {
    execCommand('foreColor', color);
    setTextColor(color);
    setColorDropdown(false);
  }, [execCommand]);

  const addTag = useCallback(() => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  }, [currentTag, tags]);

  const removeTag = useCallback((tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  }, [tags]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setThumbnail(result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const savePost = useCallback(() => {
    const postData = {
      title,
      content: editorRef.current?.innerHTML || '',
      category,
      tags,
      isPublic,
      scheduledDate,
      thumbnail,
      createdAt: new Date().toISOString()
    };
    
    console.log('저장된 포스트:', postData);
    alert('포스트가 저장되었습니다!');
  }, [title, category, tags, isPublic, scheduledDate, thumbnail]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/blog" className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors">
                <span className="text-xl font-bold">← 블로그</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{isPreview ? '편집' : '미리보기'}</span>
              </button>
              <button
                onClick={savePost}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>저장</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Title Input */}
              <div className="p-6 border-b border-gray-100">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="포스트 제목을 입력하세요..."
                  className="w-full text-3xl font-bold border-none outline-none placeholder-gray-400"
                />
              </div>

              {/* Toolbar */}
              {!isPreview && (
                <div className="border-b border-gray-100 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Font Family */}
                    <Dropdown
                      trigger={
                        <>
                          <Type className="w-4 h-4" />
                          <span className="text-sm">{fontFamily}</span>
                        </>
                      }
                      isOpen={fontDropdown}
                      onToggle={() => setFontDropdown(!fontDropdown)}
                    >
                      <div className="p-2">
                        {fontFamilies.map((font) => (
                          <button
                            key={font}
                            onClick={() => changeFontFamily(font)}
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                            style={{ fontFamily: font }}
                          >
                            {font}
                          </button>
                        ))}
                      </div>
                    </Dropdown>

                    {/* Font Size */}
                    <Dropdown
                      trigger={
                        <>
                          <span className="text-sm font-mono">{fontSize}px</span>
                        </>
                      }
                      isOpen={sizeDropdown}
                      onToggle={() => setSizeDropdown(!sizeDropdown)}
                    >
                      <div className="p-2">
                        {fontSizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => changeFontSize(size)}
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                          >
                            {size}px
                          </button>
                        ))}
                      </div>
                    </Dropdown>

                    <div className="w-px h-6 bg-gray-300 mx-1"></div>

                    {/* Text Formatting */}
                    <ToolbarButton icon={<Bold className="w-4 h-4" />} label="굵게" onClick={() => execCommand('bold')} />
                    <ToolbarButton icon={<Italic className="w-4 h-4" />} label="기울임" onClick={() => execCommand('italic')} />
                    <ToolbarButton icon={<Underline className="w-4 h-4" />} label="밑줄" onClick={() => execCommand('underline')} />

                    <div className="w-px h-6 bg-gray-300 mx-1"></div>

                    {/* Text Color */}
                    <Dropdown
                      trigger={
                        <>
                          <Palette className="w-4 h-4" />
                          <div className="w-4 h-4 rounded border" style={{ backgroundColor: textColor }}></div>
                        </>
                      }
                      isOpen={colorDropdown}
                      onToggle={() => setColorDropdown(!colorDropdown)}
                    >
                      <div className="p-3">
                        <div className="grid grid-cols-5 gap-1">
                          {colors.map((color) => (
                            <button
                              key={color}
                              onClick={() => changeTextColor(color)}
                              className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </Dropdown>

                    <div className="w-px h-6 bg-gray-300 mx-1"></div>

                    {/* Alignment */}
                    <ToolbarButton icon={<AlignLeft className="w-4 h-4" />} label="왼쪽 정렬" onClick={() => execCommand('justifyLeft')} />
                    <ToolbarButton icon={<AlignCenter className="w-4 h-4" />} label="가운데 정렬" onClick={() => execCommand('justifyCenter')} />
                    <ToolbarButton icon={<AlignRight className="w-4 h-4" />} label="오른쪽 정렬" onClick={() => execCommand('justifyRight')} />

                    <div className="w-px h-6 bg-gray-300 mx-1"></div>

                    {/* Lists */}
                    <ToolbarButton icon={<List className="w-4 h-4" />} label="글머리 기호" onClick={() => execCommand('insertUnorderedList')} />
                    <ToolbarButton icon={<ListOrdered className="w-4 h-4" />} label="번호 매기기" onClick={() => execCommand('insertOrderedList')} />
                    <ToolbarButton icon={<Quote className="w-4 h-4" />} label="인용" onClick={() => execCommand('formatBlock', 'blockquote')} />

                    <div className="w-px h-6 bg-gray-300 mx-1"></div>

                    {/* Media */}
                    <ToolbarButton icon={<ImageIcon className="w-4 h-4" />} label="이미지 삽입" onClick={insertImage} />
                    <ToolbarButton icon={<Link2 className="w-4 h-4" />} label="링크 삽입" onClick={insertLink} />
                    <ToolbarButton icon={<Video className="w-4 h-4" />} label="동영상" onClick={() => {}} />
                    <ToolbarButton icon={<Smile className="w-4 h-4" />} label="이모티콘" onClick={() => {}} />

                    <div className="w-px h-6 bg-gray-300 mx-1"></div>

                    {/* Headings */}
                    <select
                      onChange={(e) => execCommand('formatBlock', e.target.value)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded"
                    >
                      <option value="">스타일</option>
                      <option value="h1">제목 1</option>
                      <option value="h2">제목 2</option>
                      <option value="h3">제목 3</option>
                      <option value="h4">제목 4</option>
                      <option value="p">본문</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Editor Content */}
              <div className="p-6">
                {isPreview ? (
                  <div className="prose max-w-none">
                    <h1 className="text-3xl font-bold mb-6">{title || '제목 없음'}</h1>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </div>
                ) : (
                  <div
                    ref={editorRef}
                    contentEditable
                    onInput={(e) => setContent(e.currentTarget.innerHTML)}
                    className="min-h-96 outline-none prose max-w-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 rounded-lg p-4"
                    style={{ fontFamily, fontSize: fontSize + 'px' }}
                    data-placeholder="여기에 내용을 작성하세요..."
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                발행 설정
              </h3>
              
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        <Hash className="w-3 h-3 mr-1" />
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      placeholder="태그 입력"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Visibility */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">공개 설정</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={isPublic}
                        onChange={() => setIsPublic(true)}
                        className="mr-2"
                      />
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">전체 공개</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={!isPublic}
                        onChange={() => setIsPublic(false)}
                        className="mr-2"
                      />
                      <span className="text-sm">비공개</span>
                    </label>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">예약 발행</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <input
                      type="datetime-local"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">썸네일</h3>
              
              <div className="space-y-4">
                {thumbnail ? (
                  <div className="relative">
                    <Image
                      src={thumbnail}
                      alt="썸네일 미리보기"
                      width={200}
                      height={120}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setThumbnail('')}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  >
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">클릭하여 썸네일 업로드</p>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">작성 정보</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">글자 수</span>
                  <span className="font-medium">{content.replace(/<[^>]*>/g, '').length}자</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">예상 읽기 시간</span>
                  <span className="font-medium">{Math.max(1, Math.ceil(content.replace(/<[^>]*>/g, '').length / 200))}분</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">태그</span>
                  <span className="font-medium">{tags.length}개</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }
        
        .prose h1, .prose h2, .prose h3, .prose h4 {
          color: #1F2937;
          font-weight: 600;
        }
        
        .prose blockquote {
          border-left: 4px solid #3B82F6;
          padding-left: 1rem;
          font-style: italic;
          background-color: #F8FAFC;
          margin: 1rem 0;
          padding: 1rem;
          border-radius: 0.5rem;
        }
        
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        
        .prose a {
          color: #3B82F6;
          text-decoration: underline;
        }
        
        .prose ul, .prose ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        .prose li {
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
}
