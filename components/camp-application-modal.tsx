"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Calendar, X } from "lucide-react"
import type { Camp } from "@/lib/data-store"

interface CampApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  camp: Camp
}

export function CampApplicationModal({ isOpen, onClose, camp }: CampApplicationModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    childName: "",
    childAge: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    address: "",
    medicalInfo: "",
    emergencyContact: "",
    emergencyPhone: "",
    experience: "",
    expectations: "",
    agreement: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 실제로는 서버에 데이터를 전송
    console.log("캠프 신청:", { camp: camp.title, ...formData })
    setIsSubmitted(true)

    // 3초 후 모달 닫기
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({
        childName: "",
        childAge: "",
        parentName: "",
        parentPhone: "",
        parentEmail: "",
        address: "",
        medicalInfo: "",
        emergencyContact: "",
        emergencyPhone: "",
        experience: "",
        expectations: "",
        agreement: false,
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
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
            <p className="text-gray-600 mb-6">
              <strong>{camp.title}</strong> 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
            </p>
            <div className="text-sm text-gray-500">이 창은 자동으로 닫힙니다...</div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              {camp.title} 신청
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 캠프 정보 */}
          <div className="bg-blue-50 p-4 rounded-2xl">
            <h4 className="font-semibold text-blue-800 mb-2">캠프 정보</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>
                <strong>일정:</strong> {camp.date}
              </p>
              <p>
                <strong>장소:</strong> {camp.location}
              </p>
              <p>
                <strong>대상:</strong> {camp.age}
              </p>
              <p>
                <strong>참가비:</strong> {camp.price}
              </p>
            </div>
          </div>

          {/* 아이 정보 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">참가 아이 정보</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="childName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  아이 이름 *
                </Label>
                <Input
                  id="childName"
                  value={formData.childName}
                  onChange={(e) => handleInputChange("childName", e.target.value)}
                  className="rounded-2xl border-gray-200 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="childAge" className="text-sm font-semibold text-gray-700 mb-2 block">
                  나이 *
                </Label>
                <Input
                  id="childAge"
                  value={formData.childAge}
                  onChange={(e) => handleInputChange("childAge", e.target.value)}
                  className="rounded-2xl border-gray-200 focus:border-blue-500"
                  placeholder="만 8세"
                  required
                />
              </div>
            </div>
          </div>

          {/* 보호자 정보 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">보호자 정보</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  보호자 이름 *
                </Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => handleInputChange("parentName", e.target.value)}
                  className="rounded-2xl border-gray-200 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="parentPhone" className="text-sm font-semibold text-gray-700 mb-2 block">
                  연락처 *
                </Label>
                <Input
                  id="parentPhone"
                  value={formData.parentPhone}
                  onChange={(e) => handleInputChange("parentPhone", e.target.value)}
                  className="rounded-2xl border-gray-200 focus:border-blue-500"
                  placeholder="010-1234-5678"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="parentEmail" className="text-sm font-semibold text-gray-700 mb-2 block">
                이메일 *
              </Label>
              <Input
                id="parentEmail"
                type="email"
                value={formData.parentEmail}
                onChange={(e) => handleInputChange("parentEmail", e.target.value)}
                className="rounded-2xl border-gray-200 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-sm font-semibold text-gray-700 mb-2 block">
                주소
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="rounded-2xl border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>

          {/* 응급 연락처 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">응급 연락처</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact" className="text-sm font-semibold text-gray-700 mb-2 block">
                  응급 연락처 이름 *
                </Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  className="rounded-2xl border-gray-200 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone" className="text-sm font-semibold text-gray-700 mb-2 block">
                  응급 연락처 번호 *
                </Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  className="rounded-2xl border-gray-200 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="medicalInfo" className="text-sm font-semibold text-gray-700 mb-2 block">
                건강상 주의사항 또는 알레르기
              </Label>
              <Textarea
                id="medicalInfo"
                value={formData.medicalInfo}
                onChange={(e) => handleInputChange("medicalInfo", e.target.value)}
                className="rounded-2xl border-gray-200 focus:border-blue-500"
                rows={3}
                placeholder="특별히 주의해야 할 건강상 문제나 알레르기가 있다면 알려주세요"
              />
            </div>
            <div>
              <Label htmlFor="experience" className="text-sm font-semibold text-gray-700 mb-2 block">
                관련 경험
              </Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                className="rounded-2xl border-gray-200 focus:border-blue-500"
                rows={3}
                placeholder="비슷한 캠프나 활동 경험이 있다면 알려주세요"
              />
            </div>
            <div>
              <Label htmlFor="expectations" className="text-sm font-semibold text-gray-700 mb-2 block">
                캠프 참여 목적 및 기대사항
              </Label>
              <Textarea
                id="expectations"
                value={formData.expectations}
                onChange={(e) => handleInputChange("expectations", e.target.value)}
                className="rounded-2xl border-gray-200 focus:border-blue-500"
                rows={3}
                placeholder="이 캠프를 통해 아이가 얻기를 바라는 것이 있다면 알려주세요"
              />
            </div>
          </div>

          {/* 동의사항 */}
          <div className="space-y-4">
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
                개인정보 수집 및 이용에 동의하며, 캠프 운영을 위한 사진 촬영 및 활용에 동의합니다. 또한 캠프 참여 중
                발생할 수 있는 안전사고에 대해 희망재단의 안전 수칙을 준수할 것을 약속합니다.
              </Label>
            </div>
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
              신청하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
