"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, Play } from "lucide-react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black/95 backdrop-blur-xl border border-white/20 rounded-3xl p-0">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-3xl flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-white ml-1" />
              </div>
              <h3 className="text-2xl font-bold mb-2">희망재단 소개 영상</h3>
              <p className="text-gray-300 mb-6">아이들의 꿈을 키우는 희망재단의 이야기</p>
              <div className="text-sm text-gray-400">* 실제 서비스에서는 여기에 비디오가 재생됩니다</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
