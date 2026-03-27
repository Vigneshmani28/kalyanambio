'use client'

import { useState, useRef, useCallback } from 'react'
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ImageCropperProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageSrc: string
  onCropComplete: (croppedImage: string) => void
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

export function ImageCropper({ open, onOpenChange, imageSrc, onCropComplete }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<Crop>()
  const imgRef = useRef<HTMLImageElement>(null)
  const aspect = 3 / 4

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    },
    [aspect]
  )

  const getCroppedImg = useCallback(() => {
    if (!completedCrop || !imgRef.current) return

    const image = imgRef.current
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const pixelRatio = window.devicePixelRatio || 1

    canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio)
    canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(pixelRatio, pixelRatio)
    ctx.imageSmoothingQuality = 'high'

    const cropX = completedCrop.x * scaleX
    const cropY = completedCrop.y * scaleY
    const cropWidth = completedCrop.width * scaleX
    const cropHeight = completedCrop.height * scaleY

    ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

    const croppedImageUrl = canvas.toDataURL('image/jpeg', 0.9)
    onCropComplete(croppedImageUrl)
    onOpenChange(false)
  }, [completedCrop, onCropComplete, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>படத்தை வெட்டுங்கள் / Crop Image</DialogTitle>
          <DialogDescription>
            Adjust the crop area to fit your photo (3:4 ratio for best results)
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center overflow-auto max-h-[60vh]">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            className="max-w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {imageSrc?.trim() && (
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={onImageLoad}
                className="max-h-[55vh] object-contain"
                crossOrigin="anonymous"
              />
            )}
          </ReactCrop>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={getCroppedImg}>Apply Crop</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
