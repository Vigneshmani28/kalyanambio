'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, AlertTriangle, CheckCircle2, Lock, Smartphone,
  CreditCard, ArrowLeft, Download, Shield, ZoomIn, ZoomOut, Eye
} from 'lucide-react'
import { useBioData } from '@/lib/biodata-context'
import { Button } from '@/components/ui/button'
import { ClassicTemplate } from '@/components/templates/classic-template'
import { ElegantTemplate } from '@/components/templates/template1'
import { ElegantMarriageTemplate } from '@/components/templates/template2'

// ── constants ─────────────────────────────────────────────────────────────────
const A4_W = 794
const A4_H = 1123
type Step = 'preview' | 'payment' | 'processing' | 'success'
type PayTab = 'upi' | 'card'
/** Mobile-only inner tab for the "preview" step */
type MobileTab = 'preview' | 'confirm'

interface Props {
  open: boolean
  onClose: () => void
  onPaid: () => void
}

// ── Watermark ─────────────────────────────────────────────────────────────────
function Watermark() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden select-none" aria-hidden>
      {Array.from({ length: 7 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => (
          <div
            key={`${row}-${col}`}
            className="absolute text-red-400/25 font-bold whitespace-nowrap"
            style={{
              top: `${row * 15 + 5}%`,
              left: `${col * 28 - 5}%`,
              transform: 'rotate(-35deg)',
              fontFamily: 'Georgia, serif',
              fontSize: '22px',
              letterSpacing: '2px',
            }}
          >
            PREVIEW ONLY
          </div>
        ))
      )}
    </div>
  )
}

// ── Bio preview pane ──────────────────────────────────────────────────────────
function BiodataPreview() {
  const { bioData, selectedTemplate } = useBioData()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.45)
  const [manualScale, setManualScale] = useState<number | null>(null)
  const effectiveScale = manualScale ?? scale

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width - 32
      setScale(Math.max(0.25, Math.min(0.75, w / A4_W)))
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'elegant': return <ElegantTemplate bioData={bioData} />
      case 'elegant-marriage': return <ElegantMarriageTemplate bioData={bioData} />
      default: return <ClassicTemplate bioData={bioData} />
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Zoom bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b bg-muted/30 flex-shrink-0">
        <span className="text-[11px] text-muted-foreground mr-auto truncate">
          Watermarked - pay to download clean PDF
        </span>
        <button onClick={() => setManualScale(s => Math.max(0.25, (s ?? effectiveScale) - 0.08))}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors shrink-0">
          <ZoomOut className="h-3.5 w-3.5" />
        </button>
        <span className="text-xs w-9 text-center tabular-nums shrink-0">{Math.round(effectiveScale * 100)}%</span>
        <button onClick={() => setManualScale(s => Math.min(1, (s ?? effectiveScale) + 0.08))}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors shrink-0">
          <ZoomIn className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Scrollable A4 */}
      <div ref={containerRef} className="flex-1 overflow-auto bg-muted/10">
        <div className="p-3 flex justify-center">
          <div style={{ width: A4_W * effectiveScale, height: A4_H * effectiveScale, position: 'relative', flexShrink: 0 }}>
            <div style={{
              transform: `scale(${effectiveScale})`,
              transformOrigin: 'top left',
              width: A4_W, height: A4_H,
              position: 'absolute', top: 0, left: 0,
              background: '#fff',
              boxShadow: '0 4px 32px rgba(0,0,0,0.15)',
              overflow: 'hidden',
            }}>
              {renderTemplate()}
              <Watermark />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Warning / confirmation pane ───────────────────────────────────────────────
function ConfirmPane({ onBack, onProceed }: { onBack: () => void; onProceed: () => void }) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Warning */}
        <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/40 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-800 dark:text-amber-300 text-sm">⚠️ Triple-check before paying!</p>
              <p className="mt-1 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                Once payment is done and the PDF is downloaded,{' '}
                <strong>you cannot edit</strong> this bio data without paying again. Go back now to fix any mistakes.
              </p>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="rounded-2xl border bg-card p-4 space-y-2.5">
          <p className="font-semibold text-xs text-muted-foreground uppercase tracking-wide">Verify before proceeding</p>
          {[
            'Name, age & date of birth are correct',
            'Family details are accurate',
            'Contact number & address are correct',
            'Horoscope chart is verified',
            'Chosen the right template',
            'Photo looks good (if added)',
          ].map(item => (
            <div key={item} className="flex items-start gap-2.5 text-sm">
              <CheckCircle2 className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>

        {/* Consent checkbox */}
        <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-xl border hover:border-primary/40 transition-colors">
          <div
            onClick={() => setAgreed(v => !v)}
            className={`mt-0.5 h-5 w-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all
              ${agreed ? 'bg-primary border-primary' : 'border-border group-hover:border-primary/50'}`}
          >
            {agreed && <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />}
          </div>
          <span className="text-sm text-muted-foreground leading-relaxed">
            I have reviewed everything and understand that{' '}
            <strong className="text-foreground">each download requires a ₹29 payment.</strong>
          </span>
        </label>
      </div>

      {/* Sticky action buttons */}
      <div className="flex-shrink-0 border-t bg-background p-4 flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={onBack} className="gap-2 sm:flex-none">
          <ArrowLeft className="h-4 w-4" /> Go Back &amp; Edit
        </Button>
        <Button onClick={onProceed} disabled={!agreed} className="gap-2 flex-1">
          <Lock className="h-4 w-4" /> Proceed to Pay ₹29
        </Button>
      </div>
    </div>
  )
}

// ── Payment form ──────────────────────────────────────────────────────────────
function PaymentForm({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const [tab, setTab] = useState<PayTab>('upi')
  const [upiId, setUpiId] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [cardExp, setCardExp] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [error, setError] = useState('')

  const handlePay = () => {
    setError('')
    if (tab === 'upi') {
      if (!upiId.match(/^[\w.\-+]+@[\w]+$/)) { setError('Enter a valid UPI ID (e.g. name@upi)'); return }
    } else {
      if (cardNum.replace(/\s/g, '').length < 16) { setError('Enter a valid 16-digit card number'); return }
      if (!cardExp.match(/^\d{2}\/\d{2}$/)) { setError('Enter expiry as MM/YY'); return }
      if (cardCvv.length < 3) { setError('Enter a valid CVV'); return }
      if (!cardName.trim()) { setError('Enter the name on card'); return }
    }
    onSuccess()
  }

  const fmtCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const fmtExp = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Order summary */}
        <div className="rounded-2xl border bg-muted/30 p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Kalyanam Bio Data PDF</p>
            <p className="text-xs text-muted-foreground">One-time · High quality · Print-ready</p>
          </div>
          <p className="text-2xl font-black text-primary">₹29</p>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 gap-1.5 rounded-xl border bg-muted/30 p-1.5">
          {([['upi', 'UPI / GPay', Smartphone], ['card', 'Debit / Credit', CreditCard]] as const).map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => { setTab(id); setError('') }}
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all
                ${tab === id ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>

        {/* UPI */}
        {tab === 'upi' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">UPI ID</label>
              <input type="text" placeholder="yourname@gpay / @paytm"
                value={upiId} onChange={e => setUpiId(e.target.value)}
                className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <p className="mt-1 text-xs text-muted-foreground">Accepts GPay, PhonePe, Paytm</p>
            </div>
            <div className="rounded-xl border-2 border-dashed p-4 flex flex-col items-center gap-2 bg-muted/20">
              <div className="h-20 w-20 rounded-xl grid grid-cols-3 gap-0.5 bg-foreground/5 p-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className={`rounded-sm ${i % 3 === 0 || i === 4 ? 'bg-foreground/80' : 'bg-foreground/20'}`} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Or scan QR in any UPI app</p>
            </div>
          </div>
        )}

        {/* Card */}
        {tab === 'card' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456"
                value={cardNum} onChange={e => setCardNum(fmtCard(e.target.value))}
                className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">Expiry</label>
                <input type="text" placeholder="MM/YY" value={cardExp}
                  onChange={e => setCardExp(fmtExp(e.target.value))}
                  className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">CVV</label>
                <input type="password" placeholder="•••" maxLength={4}
                  value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, ''))}
                  className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Name on Card</label>
              <input type="text" placeholder="FULL NAME" value={cardName}
                onChange={e => setCardName(e.target.value)}
                className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm uppercase placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />{error}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          256-bit SSL secured · ₹29 one-time · No auto-renewal
        </div>
      </div>

      {/* Sticky action buttons */}
      <div className="flex-shrink-0 border-t bg-background p-4 flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={onBack} className="gap-2 sm:flex-none">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={handlePay} className="gap-2 flex-1">
          <Lock className="h-4 w-4" /> Pay ₹29 &amp; Download PDF
        </Button>
      </div>
    </div>
  )
}

// ── Processing screen ─────────────────────────────────────────────────────────
function Processing() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 p-8 text-center">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <Lock className="absolute inset-0 m-auto h-8 w-8 text-primary" />
      </div>
      <div>
        <p className="font-bold text-lg">Processing Payment…</p>
        <p className="text-sm text-muted-foreground mt-1">Please wait, do not close this window</p>
      </div>
    </div>
  )
}

// ── Success screen ────────────────────────────────────────────────────────────
function Success({ onDownload, isDownloading }: { onDownload: () => void; isDownloading: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center"
      >
        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
      </motion.div>
      <div className="space-y-1.5">
        <p className="font-bold text-xl">Payment Successful! 🎉</p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
          Your ₹29 payment is confirmed. Downloading your clean, watermark-free PDF now…
        </p>
      </div>

      {isDownloading ? (
        <div className="flex flex-col items-center gap-3">
          <div className="h-1.5 w-48 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </div>
          <p className="text-xs text-muted-foreground">Preparing PDF…</p>
        </div>
      ) : (
        <Button onClick={onDownload} size="lg" className="gap-2 px-8">
          <Download className="h-5 w-5" />
          Download Again
        </Button>
      )}

      <p className="text-xs text-muted-foreground">Best wishes for a happy marriage! 💐</p>
    </div>
  )
}

// ── Main modal ────────────────────────────────────────────────────────────────
export function PaymentModal({ open, onClose, onPaid }: Props) {
  const [step, setStep] = useState<Step>('preview')
  const [mobileTab, setMobileTab] = useState<MobileTab>('preview')
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    if (open) { setStep('preview'); setMobileTab('preview') }
  }, [open])

  const triggerDownload = useCallback(() => {
    setIsDownloading(true)
    setTimeout(() => {
      onPaid()
      setIsDownloading(false)
    }, 1200)
  }, [onPaid])

  const handlePaySuccess = () => {
    setStep('processing')
    setTimeout(() => {
      setStep('success')
      // Auto-download after a short animation delay
      setTimeout(() => triggerDownload(), 600)
    }, 2800)
  }

  const stepTitles: Record<Step, string> = {
    preview: 'Preview Your Bio Data',
    payment: 'Complete Payment - ₹29',
    processing: 'Processing…',
    success: 'Payment Confirmed',
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={step === 'success' || step === 'processing' ? undefined : onClose}
          />

          {/* Modal shell */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-4"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            <div
              className="relative w-full sm:max-w-6xl bg-background rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
              style={{ height: 'min(96dvh, 840px)' }}
            >
              {/* ── Modal header ── */}
              <div className="flex-shrink-0 flex items-center px-5 py-3.5 border-b">
                {/* Step dots */}
                <div className="flex items-center gap-1.5">
                  {(['preview', 'payment', 'success'] as const).map((s, i) => {
                    const stepOrder = ['preview', 'payment', 'processing', 'success']
                    const currentIdx = stepOrder.indexOf(step)
                    const dotIdx = stepOrder.indexOf(s === 'payment' ? (step === 'processing' ? 'processing' : 'payment') : s)
                    const active = step === s || (step === 'processing' && s === 'payment')
                    const done = currentIdx > stepOrder.indexOf(s === 'success' ? 'success' : s)
                    return (
                      <div key={s} className="flex items-center gap-1.5">
                        <div className={`rounded-full transition-all ${active ? 'h-2.5 w-2.5 bg-primary' : done ? 'h-2 w-2 bg-emerald-500' : 'h-2 w-2 bg-muted-foreground/30'}`} />
                        {i < 2 && <div className="h-px w-5 bg-border" />}
                      </div>
                    )
                  })}
                </div>

                {/* Title - centred */}
                <h2 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold pointer-events-none">
                  {stepTitles[step]}
                </h2>

                {/* Close (hidden during processing/success) */}
                {step !== 'processing' && step !== 'success' && (
                  <button onClick={onClose} className="ml-auto p-2 rounded-xl hover:bg-muted transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* ── Mobile tab bar (only on preview step) ── */}
              {step === 'preview' && (
                <div className="lg:hidden flex-shrink-0 grid grid-cols-2 border-b">
                  {([['preview', 'View Bio Data', Eye], ['confirm', 'Confirm & Pay', Lock]] as const).map(([id, label, Icon]) => (
                    <button
                      key={id}
                      onClick={() => setMobileTab(id as MobileTab)}
                      className={`flex items-center justify-center gap-2 py-3 text-sm font-semibold border-b-2 transition-all
                        ${mobileTab === id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                    >
                      <Icon className="h-4 w-4" />{label}
                    </button>
                  ))}
                </div>
              )}

              {/* ── Body ── */}
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div key={step} className="h-full"
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}
                  >
                    {/* PREVIEW STEP */}
                    {step === 'preview' && (
                      <div className="h-full">
                        {/* Desktop: side by side */}
                        <div className="hidden lg:flex h-full">
                          <div className="flex-1 overflow-hidden border-r"><BiodataPreview /></div>
                          <div className="w-[380px] flex-shrink-0"><ConfirmPane onBack={onClose} onProceed={() => setStep('payment')} /></div>
                        </div>
                        {/* Mobile: tabs */}
                        <div className="lg:hidden h-full">
                          {mobileTab === 'preview'
                            ? <BiodataPreview />
                            : <ConfirmPane onBack={onClose} onProceed={() => setStep('payment')} />
                          }
                        </div>
                      </div>
                    )}

                    {/* PAYMENT STEP */}
                    {step === 'payment' && (
                      <div className="h-full">
                        {/* Desktop: preview + form */}
                        <div className="hidden lg:flex h-full">
                          <div className="flex-1 overflow-hidden border-r"><BiodataPreview /></div>
                          <div className="w-[420px] flex-shrink-0">
                            <PaymentForm onSuccess={handlePaySuccess} onBack={() => setStep('preview')} />
                          </div>
                        </div>
                        {/* Mobile: just form (full screen) */}
                        <div className="lg:hidden h-full">
                          <PaymentForm onSuccess={handlePaySuccess} onBack={() => setStep('preview')} />
                        </div>
                      </div>
                    )}

                    {step === 'processing' && <Processing />}

                    {step === 'success' && (
                      <Success onDownload={triggerDownload} isDownloading={isDownloading} />
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
