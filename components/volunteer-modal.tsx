"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, Users, X } from "lucide-react"

interface VolunteerModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VolunteerModal({ isOpen, onClose }: VolunteerModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    experience: "",
    motivation: "",
    availability: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 실제로는 서버에 데이터를 전송
    console.log("자원봉사 신청:", formData)
    setIsSubmitted(true)

    // 3초 후 모달 닫기
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        experience: "",
        motivation: "",
        availability: "",
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">신청이 완료되었습니다!</h3>
            <p className="text-gray-600 mb-6">소중한 신청 감사드립니다. 빠른 시일 내에 연락드리겠습니다.</p>
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
              <Users className="h-6 w-6 text-blue-600" />
              자원봉사 신청
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              <Label htmlFor="age" className="text-sm font-semibold text-gray-700 mb-2 block">
                나이
              </Label>
              <Input
                id="age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="rounded-2xl border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">참여 가능 시간 *</Label>
            <RadioGroup
              value={formData.availability}
              onValueChange={(value) => handleInputChange("availability", value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekday" id="weekday" />
                <Label htmlFor="weekday" className="cursor-pointer">
                  평일
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekend" id="weekend" />
                <Label htmlFor="weekend" className="cursor-pointer">
                  주말
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flexible" id="flexible" />
                <Label htmlFor="flexible" className="cursor-pointer">
                  유동적
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="evening" id="evening" />
                <Label htmlFor="evening" className="cursor-pointer">
                  저녁시간
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="experience" className="text-sm font-semibold text-gray-700 mb-2 block">
              관련 경험 또는 특기
            </Label>
            <Textarea
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              className="rounded-2xl border-gray-200 focus:border-blue-500"
              rows={3}
              placeholder="교육, 상담, 요리, 컴퓨터 등 관련 경험이나 특기를 알려주세요"
            />
          </div>

          <div>
            <Label htmlFor="motivation" className="text-sm font-semibold text-gray-700 mb-2 block">
              지원 동기 *
            </Label>
            <Textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) => handleInputChange("motivation", e.target.value)}
              className="rounded-2xl border-gray-200 focus:border-blue-500"
              rows={4}
              placeholder="자원봉사에 참여하고 싶은 이유를 알려주세요"
              required
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-2xl">
            <h4 className="font-semibold text-blue-800 mb-2">자원봉사 활동 안내</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 캠프 운영 보조 및 아이들 멘토링</li>
              <li>• 교육 자료 준비 및 행정 업무</li>
              <li>• 이벤트 기획 및 홍보 활동</li>
              <li>• 월 1회 이상 참여 권장</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-2xl bg-transparent">
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl"
            >
              신청하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
