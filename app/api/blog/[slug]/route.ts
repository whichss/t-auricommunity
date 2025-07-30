import { NextRequest, NextResponse } from 'next/server'
import { BlogPost } from '../route'

// 임시 데이터 (실제로는 데이터베이스에서 가져옴)
let blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '감동이 있던 지난 주 재즈 콘서트',
    excerpt: '아티스트와 관객이 하나 되는 마법같은 순간들을 담아보았습니다.',
    content: `지난 주 토요일 저녁, 더하우스콘서트에서 열린 재즈 콘서트는 정말 특별했습니다. 

김재민 트리오의 연주는 관객들의 마음을 사로잡았고, 특히 'Autumn Leaves'를 연주할 때는 객석이 완전히 조용해졌습니다. 

음악이 끝날 때까지 숨죽이며 듣던 관객들의 모습이 인상적이었습니다. 

이런 순간이야말로 더하우스콘서트가 추구하는 '아티스트와 관객이 하나 되는' 경험이 아닐까 생각합니다.`,
    category: '리뷰',
    author: '더하우스콘서트',
    publishedAt: '2024-07-20T10:00:00Z',
    imageUrl: '/placeholder.svg?height=400&width=600',
    featured: true,
    slug: 'jazz-concert-review-last-week'
  },
  {
    id: '2',
    title: '아티스트 인터뷰: 음악에 대한 열정',
    excerpt: '신예 아티스트를 만나 그들의 음악 여정과 철학에 대해 들어보았습니다.',
    content: `이번 주에는 차세대 싱어송라이터 이지은 씨를 만나보았습니다.

"음악은 제게 있어 언어입니다. 말로 표현하기 어려운 감정들을 멜로디와 가사로 전달하고 싶어요."

그녀의 진솔한 이야기와 함께 앞으로의 음악 계획에 대해서도 들어볼 수 있었습니다.`,
    category: '인터뷰',
    author: '더하우스콘서트',
    publishedAt: '2024-07-18T14:30:00Z',
    imageUrl: '/placeholder.svg?height=400&width=600',
    featured: true,
    slug: 'artist-interview-music-passion'
  },
  {
    id: '3',
    title: '다가오는 8월 스페셜 콘서트',
    excerpt: '여름 밤을 더욱 특별하게 만들어줄 스페셜 콘서트를 준비했습니다.',
    content: `8월 15일, 더하우스콘서트에서 특별한 여름 콘서트가 열립니다.

이번 콘서트는 '여름밤의 추억'이라는 주제로, 다양한 장르의 아티스트들이 참여합니다.

- 어쿠스틱 기타: 김민수
- 재즈 보컬: 박수영  
- 피아노 솔로: 정한별

티켓 예매는 7월 25일부터 시작됩니다.`,
    category: '이벤트',
    author: '더하우스콘서트',
    publishedAt: '2024-07-15T09:00:00Z',
    imageUrl: '/placeholder.svg?height=400&width=600',
    featured: true,
    slug: 'august-special-concert'
  }
]

// GET: 특정 slug의 블로그 포스트 가져오기
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const post = blogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
  
  return NextResponse.json(post)
}

// PUT: 블로그 포스트 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await request.json()
    const postIndex = blogPosts.findIndex(p => p.slug === params.slug)
    
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    blogPosts[postIndex] = {
      ...blogPosts[postIndex],
      ...data,
      slug: params.slug // slug는 변경되지 않도록
    }
    
    return NextResponse.json(blogPosts[postIndex])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

// DELETE: 블로그 포스트 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const postIndex = blogPosts.findIndex(p => p.slug === params.slug)
  
  if (postIndex === -1) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
  
  blogPosts.splice(postIndex, 1)
  
  return NextResponse.json({ message: 'Post deleted successfully' })
}
