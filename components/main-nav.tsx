"use client"

import Link from "next/link"
import { Heart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-black">Hope Foundation</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
              ABOUT
            </Link>
            <Link href="/camp" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
              CAMP
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
              BLOG
            </Link>
            <Link href="/donation" className="text-black font-medium text-sm">
              DONATION
            </Link>
            <Button className="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded-full">
              <Link href="/donation">후원하기</Link>
            </Button>
          </div>
          
          {/* 모바일 메뉴 버튼 */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
