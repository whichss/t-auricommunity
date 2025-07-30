"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Mail, X } from "lucide-react"

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 실제로는 서버에 데이터를 전송
    console.log("뉴스레터 구독:", email)
    setIsSubmitted(true)

    // 3초 후 모달 닫기
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setEmail("")
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">구독이 완료되었습니다!</h3>
            <p className="text-gray-600 mb-6">희망재단의 최신 소식을 이메일로 받아보실 수 있습니다.</p>
            <div className="text-sm text-gray-500">이 창은 자동으로 닫힙니다...</div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Mail className="h-6 w-6 text-blue-600" />
              뉴스레터 구독
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="newsletter-email" className="text-sm font-semibold text-gray-700 mb-2 block">
              이메일 주소
            </Label>
            <Input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-2xl border-gray-200 focus:border-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-2xl">
            <h4 className="font-semibold text-blue-800 mb-2">뉴스레터 내용</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 새로운 캠프 및 프로그램 소식</li>
              <li>• 아이들의 성장 스토리</li>
              <li>• 후원금 사용 현황 보고</li>
              <li>• 자원봉사 기회 안내</li>
            </ul>
          </div>

          <div className="text-xs text-gray-500">언제든지 구독을 취소할 수 있으며, 개인정보는 안전하게 보호됩니다.</div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-2xl bg-transparent">
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl"
            >
              구독하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
