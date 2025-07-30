"use client"

import { create } from "zustand"

export interface Camp {
  id: number
  title: string
  age: string
  duration: string
  participants: string
  description: string
  features: string[]
  image: string
  status: "모집중" | "마감" | "모집예정"
  date: string
  location: string
  price: string
  spots: string
  fullDescription: string
  schedule: { day: string; activities: string[] }[]
  instructor: {
    name: string
    career: string
    specialty: string
  }
  materials: string[]
}

export interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  date: string
  author: string
  category: string
  image: string
  published: boolean
}

interface DataStore {
  camps: Camp[]
  blogPosts: BlogPost[]
  addCamp: (camp: Omit<Camp, "id">) => void
  updateCamp: (id: number, camp: Partial<Camp>) => void
  deleteCamp: (id: number) => void
  addBlogPost: (post: Omit<BlogPost, "id">) => void
  updateBlogPost: (id: number, post: Partial<BlogPost>) => void
  deleteBlogPost: (id: number) => void
}

export const useDataStore = create<DataStore>((set) => ({
  camps: [
    {
      id: 1,
      title: "창의 과학 캠프",
      age: "초등 3-6학년",
      duration: "5일",
      participants: "20명",
      description: "실험과 체험을 통해 과학의 재미를 발견하는 프로그램",
      features: ["실험 키트 제공", "전문 강사진", "개별 멘토링"],
      image: "science experiment for kids",
      status: "모집중",
      date: "2024.02.05-09",
      location: "서울 과학관",
      price: "무료",
      spots: "8/20",
      fullDescription: "창의 과학 캠프는 아이들이 과학의 원리를 직접 체험하고 탐구할 수 있는 특별한 프로그램입니다.",
      schedule: [
        { day: "1일차", activities: ["오리엔테이션", "기초 화학 실험", "현미경 관찰"] },
        { day: "2일차", activities: ["물리 법칙 체험", "로켓 만들기", "발표 준비"] },
      ],
      instructor: {
        name: "김과학 박사",
        career: "서울대학교 화학과 박사, 15년 교육 경력",
        specialty: "아동 과학교육 전문가",
      },
      materials: ["실험복", "안전 고글", "실험 키트", "관찰 노트", "수료증"],
    },
    {
      id: 2,
      title: "예술 창작 캠프",
      age: "초등 1-6학년",
      duration: "4일",
      participants: "15명",
      description: "미술, 음악, 연극을 통해 창의성을 기르는 프로그램",
      features: ["작품 전시회", "개인 포트폴리오", "예술가 멘토"],
      image: "children doing art and crafts",
      status: "모집중",
      date: "2024.03.15-18",
      location: "예술의전당",
      price: "무료",
      spots: "12/15",
      fullDescription:
        "예술 창작 캠프는 아이들의 무한한 상상력과 창의성을 예술을 통해 표현할 수 있도록 돕는 프로그램입니다.",
      schedule: [
        { day: "1일차", activities: ["미술 기초", "색칠 및 드로잉", "자유 창작"] },
        { day: "2일차", activities: ["음악 체험", "악기 연주", "리듬 게임"] },
      ],
      instructor: {
        name: "이예술 선생님",
        career: "홍익대학교 미술교육과 졸업, 10년 아동미술 경력",
        specialty: "통합예술교육 전문가",
      },
      materials: ["미술용품 세트", "악기 대여", "의상 소품", "작품집", "수료증"],
    },
    {
      id: 3,
      title: "코딩 체험 캠프",
      age: "초등 4-6학년",
      duration: "6일",
      participants: "12명",
      description: "게임과 로봇을 통해 프로그래밍의 기초를 배우는 프로그램",
      features: ["개인 노트북 제공", "프로젝트 발표", "수료증 발급"],
      image: "kids learning programming with computers",
      status: "마감",
      date: "2024.04.01-06",
      location: "IT 교육센터",
      price: "무료",
      spots: "12/12",
      fullDescription: "코딩 체험 캠프는 아이들이 프로그래밍의 기초를 재미있게 배울 수 있는 프로그램입니다.",
      schedule: [
        { day: "1일차", activities: ["컴퓨터 기초", "스크래치 입문", "간단한 애니메이션"] },
        { day: "2일차", activities: ["게임 만들기", "캐릭터 움직이기", "점수 시스템"] },
      ],
      instructor: {
        name: "박코딩 개발자",
        career: "KAIST 컴퓨터공학과 졸업, IT 기업 5년 근무",
        specialty: "아동 프로그래밍 교육 전문가",
      },
      materials: ["노트북 대여", "프로그래밍 교재", "로봇 키트", "USB", "수료증"],
    },
  ],
  blogPosts: [
    {
      id: 1,
      title: "2024 겨울 교육캠프 성공적 개최",
      content:
        "50명의 아이들과 함께한 겨울 교육캠프가 성공적으로 마무리되었습니다. 이번 캠프에서는 과학, 예술, 코딩 등 다양한 분야의 프로그램을 통해 아이들의 창의성과 학습 능력을 기를 수 있었습니다.",
      excerpt: "50명의 아이들과 함께한 겨울 교육캠프가 성공적으로 마무리되었습니다.",
      date: "2024.01.15",
      author: "희망재단",
      category: "캠프 소식",
      image: "winter camp success",
      published: true,
    },
    {
      id: 2,
      title: "새해 후원자 감사 인사",
      content:
        "2023년 한 해 동안 희망재단과 함께해주신 모든 후원자분들께 진심으로 감사드립니다. 여러분의 따뜻한 마음과 지원 덕분에 더 많은 아이들에게 희망을 전할 수 있었습니다.",
      excerpt: "2023년 한 해 동안 함께해주신 모든 후원자분들께 감사드립니다.",
      date: "2024.01.10",
      author: "희망재단",
      category: "감사 인사",
      image: "thank you supporters",
      published: true,
    },
    {
      id: 3,
      title: "2023년 활동 보고서 발간",
      content:
        "희망재단의 2023년 한 해 동안의 활동 성과와 변화를 담은 연간 보고서를 발간했습니다. 보고서에는 캠프 운영 현황, 참여 아이들의 성장 스토리, 후원금 사용 내역 등이 상세히 기록되어 있습니다.",
      excerpt: "지난 한 해 동안의 활동 성과와 변화를 담은 보고서를 발간했습니다.",
      date: "2024.01.05",
      author: "희망재단",
      category: "보고서",
      image: "annual report 2023",
      published: true,
    },
  ],
  addCamp: (camp) =>
    set((state) => ({
      camps: [...state.camps, { ...camp, id: Math.max(...state.camps.map((c) => c.id)) + 1 }],
    })),
  updateCamp: (id, updatedCamp) =>
    set((state) => ({
      camps: state.camps.map((camp) => (camp.id === id ? { ...camp, ...updatedCamp } : camp)),
    })),
  deleteCamp: (id) =>
    set((state) => ({
      camps: state.camps.filter((camp) => camp.id !== id),
    })),
  addBlogPost: (post) =>
    set((state) => ({
      blogPosts: [...state.blogPosts, { ...post, id: Math.max(...state.blogPosts.map((p) => p.id)) + 1 }],
    })),
  updateBlogPost: (id, updatedPost) =>
    set((state) => ({
      blogPosts: state.blogPosts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post)),
    })),
  deleteBlogPost: (id) =>
    set((state) => ({
      blogPosts: state.blogPosts.filter((post) => post.id !== id),
    })),
}))
