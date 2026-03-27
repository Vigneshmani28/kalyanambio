'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Eye, X } from 'lucide-react'
import { useBioData } from '@/lib/biodata-context'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { FormStepper } from '@/components/forms/form-stepper'
import { PersonalDetailsForm } from '@/components/forms/personal-details-form'
import { FamilyDetailsForm } from '@/components/forms/family-details-form'
import { ContactDetailsForm } from '@/components/forms/contact-details-form'
import { HoroscopeForm } from '@/components/horoscope/horoscope-form'
import { PreviewPanel } from '@/components/preview/preview-panel'
import { usePdfExport } from '@/hooks/use-pdf-export'
import { PaymentModal } from './payment-modal'

const TOTAL_STEPS = 4

export function BiodataMaker() {
  const { currentStep, setCurrentStep } = useBioData()
  const { downloadPdf, isDownloading } = usePdfExport()
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  // Opens the payment modal instead of downloading directly
  const handleDownload = () => {
    downloadPdf('biodata-preview', 'kalyanam-biodata.pdf')
  }

  // Called by PaymentModal after successful mock payment
  const handlePaid = () => {
    downloadPdf('biodata-preview', 'kalyanam-biodata.pdf')
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalDetailsForm />
      case 1: return <FamilyDetailsForm />
      case 2: return <ContactDetailsForm />
      case 3: return <HoroscopeForm />
      default: return null
    }
  }

  return (
    <>
      {/* Header lives here so it can access mobilePreviewOpen */}
      <Header onOpenPreview={() => setMobilePreviewOpen(true)} />

      <div className="flex flex-col min-h-[calc(100vh-5rem)]">

        {/* Stepper */}
        <div className="flex-shrink-0 bg-background border-b px-4 py-4 sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto">
            <FormStepper currentStep={currentStep} onStepClick={setCurrentStep} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="max-w-[1700px] mx-auto py-6 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_560px] xl:grid-cols-[1fr_620px] gap-8">

              {/* FORM */}
              <div className="min-w-0 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6 pb-4 gap-2">
                  <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </Button>

                  {currentStep < TOTAL_STEPS - 1 ? (
                    <Button onClick={handleNext}>
                      Next
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={handleDownload} disabled={isDownloading} className="lg:hidden">
                      {isDownloading ? 'Generating...' : 'Download PDF'}
                    </Button>
                  )}
                </div>
              </div>

              {/* PREVIEW - Desktop only sidebar */}
              <div className="hidden lg:block sticky top-28 h-fit max-h-[calc(100vh-5rem)] overflow-auto rounded-2xl border bg-background shadow-sm">
                <PreviewPanel onDownload={handleDownload} isDownloading={isDownloading} />
              </div>

            </div>
          </div>
        </div>

        {/* ── Mobile preview bottom sheet ── */}
        <AnimatePresence>
          {mobilePreviewOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobilePreviewOpen(false)}
              />

              {/* Slide-up panel */}
              <motion.div
                className="lg:hidden fixed inset-x-0 bottom-0 z-50 flex flex-col bg-background rounded-t-2xl shadow-2xl"
                style={{ height: '92dvh' }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              >
                {/* Handle bar + header */}
                <div className="relative flex items-center justify-between px-4 pt-4 pb-3 border-b flex-shrink-0">
                  <div className="absolute left-1/2 top-2 -translate-x-1/2 w-10 h-1 rounded-full bg-muted-foreground/30" />
                  <span className="text-sm font-semibold">Bio-data Preview</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setMobilePreviewOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Preview panel fills remaining height */}
                <div className="flex-1 overflow-hidden">
                  <PreviewPanel onDownload={handleDownload} isDownloading={isDownloading} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
      {/* Payment Modal */}
      <PaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        onPaid={handlePaid}
      />
    </>
  )
}