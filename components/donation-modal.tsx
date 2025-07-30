"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, CreditCard, X } from "lucide-react"

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  type: "regular" | "onetime"
}

export function DonationModal({ isOpen, onClose, type }: DonationModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    amount: type === "regular" ? "30000" : "50000",
    customAmount: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    paymentMethod: "card",
    agreement: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalAmount = formData.customAmount || formData.amount
    console.log("후원 신청:", { type, amount: finalAmount, ...formData })
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({
        amount: type === "regular" ? "30000" : "50000",
        customAmount: "",
        name: "",
        email: "",
        phone: "",
        message: "",
        paymentMethod: "card",
        agreement: false,
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const options =
    type === "regular"
      ? [
          { value: "10000", label: "월 10,000원" },
          { value: "30000", label: "월 30,000원" },
          { value: "50000", label: "월 50,000원" },
          { value: "100000", label: "월 100,000원" },
        ]
      : [
          { value: "20000", label: "20,000원" },
          { value: "50000", label: "50,000원" },
          { value: "100000", label: "100,000원" },
          { value: "200000", label: "200,000원" },
        ]

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">후원 신청이 완료되었습니다!</h3>
            <p className="text-gray-600 mb-6">소중한 후원 감사드립니다. 결제 안내를 위해 곧 연락드리겠습니다.</p>
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
              <CreditCard className="h-6 w-6 text-blue-600" />
              {type === "regular" ? "정기 후원" : "일시 후원"} 신청
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">후원 금액 선택</Label>
            <RadioGroup
              value={formData.amount}
              onValueChange={(value) => handleInputChange("amount", value)}
              className="grid grid-cols-2 gap-4"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="customAmount" className="text-sm font-semibold text-gray-700 mb-2 block">
              직접 입력
            </Label>
            <Input
              id="customAmount"
              type="number"
              value={formData.customAmount}
              onChange={(e) => handleInputChange("customAmount", e.target.value)}
              className="rounded-2xl border-gray-200 focus:border-blue-500"
              placeholder="원하는 금액을 입력하세요"
            />
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

          {type === "onetime" && (
            <div>
              <Label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-2 block">
                응원 메시지 (선택)
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="rounded-2xl border-gray-200 focus:border-blue-500"
                rows={3}
                placeholder="아이들에게 전하고 싶은 메시지를 남겨주세요"
              />
            </div>
          )}

          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">결제 방법</Label>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => handleInputChange("paymentMethod", value)}
              className="grid grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="cursor-pointer">
                  신용카드
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="cursor-pointer">
                  계좌이체
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone" />
                <Label htmlFor="phone" className="cursor-pointer">
                  휴대폰
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreement"
              checked={formData.agreement}
              onChange={(e) => handleInputChange("agreement", e.target.checked)}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              required
            />
            <Label htmlFor="agreement" className="text-sm text-gray-700 leading-relaxed">
              개인정보 수집 및 이용에 동의하며, 후원금이 희망재단의 교육 프로그램과 아이들을 위해 사용되는 것에
              동의합니다.
            </Label>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-2xl bg-transparent">
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl"
              disabled={!formData.agreement}
            >
              {type === "regular" ? "정기 후원 신청" : "일시 후원하기"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
