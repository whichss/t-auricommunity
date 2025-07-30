"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Gift, X } from "lucide-react"

interface ItemDonationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ItemDonationModal({ isOpen, onClose }: ItemDonationModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    items: "",
    quantity: "",
    condition: "",
    pickupAddress: "",
    preferredDate: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("물품 기부 문의:", formData)
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({
        name: "",
        email: "",
        phone: "",
        items: "",
        quantity: "",
        condition: "",
        pickupAddress: "",
        preferredDate: "",
        message: "",
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">문의가 접수되었습니다!</h3>
            <p className="text-gray-600 mb-6">소중한 물품 기부 의사 감사드립니다. 담당자가 확인 후 연락드리겠습니다.</p>
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
              <Gift className="h-6 w-6 text-blue-600" />
              물품 기부 문의
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-2xl">
            <h4 className="font-semibold text-blue-800 mb-2">기부 가능한 물품</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 학용품: 연필, 공책, 가방, 문구류 등</li>
              <li>• 도서: 아동도서, 학습서적, 만화책 등</li>
              <li>• 의류: 아동복, 신발 (깨끗한 상태)</li>
              <li>• 교육용품: 장난감, 교구, 악기 등</li>
              <li>• 생필품: 비누, 샴푸, 수건 등</li>
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
                전화번호 *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="rounded-2xl border-gray-200 focus:border-blue-500"
                required
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
            <Label htmlFor="items" className="text-sm font-semibold text-gray-700 mb-2 block">
              기부하실 물품 *
            </Label>
            <Textarea
              id="items"
              value={formData.items}
              onChange={(e) => handleInputChange("items", e.target.value)}
              className="rounded-2xl border-gray-200 focus:border-blue-500"
              rows={3}
              placeholder="기부하실 물품의 종류와 상세 내용을 알려주세요"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity" className="text-sm font-semibold text-gray-700 mb-2 block">
                수량
              </Label>
              <Input
                id="quantity"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                className="rounded-2xl border-gray-200 focus:border-blue-500"
                placeholder="예: 공책 20권, 연필 50자루"
              />
            </div>
            <div>
              <Label htmlFor="condition" className="text-sm font-semibold text-gray-700 mb-2 block">
                물품 상태
              </Label>
              <Input
                id="condition"
                value={formData.condition}
                onChange={(e) => handleInputChange("condition", e.target.value)}
                className="rounded-2xl border-gray-200 focus:border-blue-500"
                placeholder="새 제품, 사용감 있음 등"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="pickupAddress" className="text-sm font-semibold text-gray-700 mb-2 block">
              수거 주소
            </Label>
            <Input
              id="pickupAddress"
              value={formData.pickupAddress}
              onChange={(e) => handleInputChange("pickupAddress", e.target.value)}
              className="rounded-2xl border-gray-200 focus:border-blue-500"
              placeholder="물품 수거가 가능한 주소를 알려주세요"
            />
          </div>

          <div>
            <Label htmlFor="preferredDate" className="text-sm font-semibold text-gray-700 mb-2 block">
              희망 수거일
            </Label>
            <Input
              id="preferredDate"
              value={formData.preferredDate}
              onChange={(e) => handleInputChange("preferredDate", e.target.value)}
              className="rounded-2xl border-gray-200 focus:border-blue-500"
              placeholder="언제 수거하면 좋을지 알려주세요"
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
              placeholder="기타 문의사항이나 전하고 싶은 말씀이 있으시면 적어주세요"
            />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-2xl bg-transparent">
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl"
            >
              문의하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
