'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'
import { useBioData } from '@/lib/biodata-context'
import { TemplateType } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ClassicTemplate } from '@/components/templates/classic-template'
import { ElegantTemplate } from '../templates/template1'
import { ElegantMarriageTemplate } from '../templates/template2'

// A4 at 96 dpi ≈ 794px wide, 1123px tall
const A4_PX_W = 794

interface PreviewPanelProps {
  onDownload: () => void
  isDownloading: boolean
}

export function PreviewPanel({ onDownload, isDownloading }: PreviewPanelProps) {
  const { bioData, selectedTemplate, setSelectedTemplate } = useBioData()
  const previewRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scale: fill the container width, cap at 0.7 for desktop
  const [scale, setScale] = useState(0.7)

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width - 16 // minus 8px padding each side
      const computed = available / A4_PX_W
      setScale(Math.min(0.7, Math.max(0.3, computed)))
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return <ClassicTemplate bioData={bioData} />
      case 'elegant':
        return <ElegantTemplate bioData={bioData} />
      case 'elegant-marriage':
        return <ElegantMarriageTemplate bioData={bioData} />
      default:
        return <ClassicTemplate bioData={bioData} />
    }
  }

  const hasContent = !!(bioData.personalDetails.name?.trim())

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Preview
            </CardTitle>
            <CardDescription>Live preview of your bio-data</CardDescription>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <Select
              value={selectedTemplate}
              onValueChange={(value: TemplateType) => setSelectedTemplate(value)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">Template 1</SelectItem>
                <SelectItem value="elegant">Template 2</SelectItem>
                <SelectItem value="elegant-marriage">Template 3</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={onDownload} disabled={isDownloading || !hasContent} size="sm">
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          {hasContent ? (
            /* Live preview - auto-scaled to fit container */
            <div ref={containerRef} className="h-full overflow-y-auto overflow-x-hidden">
              <div className="p-2 flex justify-center">
                {/*
                  Outer wrapper sized EXACTLY to the post-scale A4 dimensions
                  so it pushes the scroll area to the right height without clipping.
                */}
                <div
                  style={{
                    width: `${A4_PX_W * scale}px`,
                    height: `${A4_PX_W * scale * (297 / 210)}px`, // maintain A4 ratio
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <div
                    ref={previewRef}
                    id="biodata-preview"
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: 'top left',
                      width: '210mm',
                      minHeight: '297mm',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  >
                    {renderTemplate()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty state */
            <div className="h-full flex flex-col items-center justify-center gap-5 px-8 text-center">
              <div className="rounded-full bg-muted p-6">
                <FileText className="h-12 w-12 text-muted-foreground/50" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-foreground">Your preview will appear here</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Start filling in your personal details - the bio-data preview updates live as you type.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground border rounded-full px-4 py-2 bg-muted/40">
                <span>← Begin with your name in Personal Details</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
