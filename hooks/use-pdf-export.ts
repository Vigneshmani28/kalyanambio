'use client'

import { useState, useCallback } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { toast } from 'sonner'

export function usePdfExport() {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadPdf = useCallback(async (elementId: string, filename: string = 'biodata.pdf') => {
    setIsDownloading(true)

    try {
      const element = document.getElementById(elementId)
      if (!element) {
        throw new Error('Preview element not found')
      }

      // Get the first child which is the actual template content
      const templateContent = element.firstElementChild as HTMLElement
      if (!templateContent) {
        throw new Error('Template content not found')
      }

      // Create a wrapper div with explicit white background and no CSS variables
      const wrapper = document.createElement('div')
      wrapper.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: 210mm;
        min-height: 297mm;
        background-color: #ffffff;
        color: #000000;
        font-family: Georgia, serif;
      `

      // Clone the template content
      const clone = templateContent.cloneNode(true) as HTMLElement
      clone.style.transform = 'none'
      clone.style.margin = '0'

      wrapper.appendChild(clone)
      document.body.appendChild(wrapper)

      // Wait for images to load
      const images = wrapper.querySelectorAll('img')
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) {
                resolve()
              } else {
                img.onload = () => resolve()
                img.onerror = () => resolve()
              }
            })
        )
      )

      // Small delay to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 200))

      // Generate canvas - onclone strips the global CSS that contains lab()/oklch()
      // color functions which html2canvas cannot parse. Templates use only inline
      // hex styles so this has no visual impact on the output.
      const canvas = await html2canvas(wrapper, {
        scale: 3,          // 192 DPI - sharp for print, reasonable file size
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        removeContainer: false,
        ignoreElements: (element) => {
          if (element.classList?.contains('sr-only')) return true
          return false
        },
        onclone: (clonedDoc) => {
          // Remove ALL linked / embedded stylesheets so lab()/oklch() values
          // from the global Tailwind/shadcn CSS never reach html2canvas.
          const sheets = Array.from(
            clonedDoc.querySelectorAll('link[rel="stylesheet"], style')
          )
          sheets.forEach((s) => s.remove())

          // Inject a minimal safe reset so basic box-model still works.
          const safeStyle = clonedDoc.createElement('style')
          safeStyle.textContent = `
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: #ffffff; color: #111827; font-family: Georgia, serif; }
            table { border-collapse: collapse; width: 100%; }
            img { display: block; max-width: 100%; }
          `
          clonedDoc.head.appendChild(safeStyle)

          // Belt-and-suspenders: walk every element and neutralise any remaining
          // inline lab()/oklch() values that might have been set by JS.
          clonedDoc.querySelectorAll<HTMLElement>('*').forEach((el) => {
            const s = el.style
            for (const prop of Array.from(s)) {
              const val = s.getPropertyValue(prop)
              if (val.includes('lab(') || val.includes('oklch(')) {
                // Replace with a safe transparent/black fallback
                s.setProperty(prop, prop.toLowerCase().includes('background') ? '#ffffff' : '#111827')
              }
            }
          })
        },
      })

      // Remove wrapper
      document.body.removeChild(wrapper)

      // Calculate PDF dimensions (A4)
      const imgWidth = 210  // mm
      const pageHeight = 297 // mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      // JPEG at 0.95 quality: sharp enough for document text, ~1-3 MB file size
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgData = canvas.toDataURL('image/jpeg', 0.95)

      // First page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Additional pages only if there is meaningful content remaining
      while (heightLeft > 0.5) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Download
      pdf.save(filename)
      toast.success('Biodata downloaded successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }, [])

  return { downloadPdf, isDownloading }
}
