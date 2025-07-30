"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Share2, X } from "lucide-react"

interface PromotionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PromotionModal({ isOpen, onClose }: PromotionModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    purpose: "",
    materials: [] as string[],
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("홍보 자료 신청:", formData)
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        purpose: "",
        materials: [],
        message: "",
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMaterialToggle = (material: string) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter((m) => m !== material)
        : [...prev.materials, material],
    }))
  }

  const availableMaterials = [
    "희망재단 소개 브로셔",
    "캠프 프로그램 안내서",
    "후원 안내 자료",
    "활동 사진 및 영상",
    "로고 및 CI 자료",
    "연간 활동 보고서",
  ]

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">신청이 완료되었습니다!</h3>
            <p className="text-gray-600 mb-6">홍보 자료 신청이 접수되었습니다. 이메일로 자료를 보내드리겠습니다.</p>
            <div className="text-sm text-gray-500">이 창은 자동으로 닫힙니다...</div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Share2 className="h-6 w-6 text-blue-600" />
              홍보 자료 신청
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-purple-50 p-4 rounded-2xl">
            <h4 className="font-semibold text-purple-800 mb-2">홍보 자료 활용 안내</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• SNS 공유, 블로그 포스팅, 지인 추천 등에 활용</li>
              <li>• 학교, 직장, 동호회 등에서 희망재단 소개</li>
              <li>• 후원 모금 행사나 바자회 등에서 사용</li>
              <li>• 개인적인 홍보 활동에 자유롭게 활용 가능</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
                이름 *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="rounded-2xl border-gray-200 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2 block">
                전화번호
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="rounded-2xl border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
              이메일 *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="rounded-2xl border-gray-200 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <Label htmlFor="organization" className="text-sm font-semibold text-gray-700 mb-2 block">
              소속 (선택)
            </Label>
            <Input
              id="organization"
              value={formData.organization}
              onChange={(e) => handleInputChange("organization", e.target.value)}
              className="rounded-2xl border-gray-200 focus:border-blue-500"
              placeholder="학교, 회사, 단체명 등"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">필요한 홍보 자료 *</Label>
            <div className="grid grid-cols-2 gap-3">
              {availableMaterials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={material}
                    checked={formData.materials.includes(material)}
                    onChange={() => handleMaterialToggle(material)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor={material} className="text-sm cursor-pointer">
                    {material}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="purpose" className="text-sm font-semibold text-gray-700 mb-2 block">
              활용 목적 *
            </Label>
            <Textarea
              id="purpose"
              value={formData.purpose}
              onChange={(e) => handleInputChange("purpose", e.target.value)}
              className="rounded-2xl border-gray-200 focus:border-blue-500"
              rows={3}
              placeholder="홍보 자료를 어떻게 활용하실 예정인지 알려주세요"
              required
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-2 block">
              추가 메시지
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="rounded-2xl border-gray-200 focus:border-blue-500"
              rows={3}
              placeholder="기타 문의사항이나 요청사항이 있으시면 적어주세요"
            />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-2xl bg-transparent">
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl"
              disabled={formData.materials.length === 0}
            >
              신청하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
