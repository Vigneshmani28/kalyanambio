'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  FileDown, Layers, Sparkles, Star, CheckCircle2,
  ArrowRight, Zap, Shield, Heart, ChevronDown, Phone, Mail, Menu, X,
  FileText,
  Download,
  CreditCard,
  PenTool,
  QrCode,
  Coffee
} from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

// ─── animation helpers ───────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── data ────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Layers,
    title: 'Premium Templates',
    desc: 'Classic, Elegant & Floral designs - all print-ready with A4 layout. Completely free!',
    color: 'bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400',
  },
  {
    icon: FileDown,
    title: 'Free PDF Download',
    desc: 'One click to export a crisp, high-quality PDF ready to share or print. No payment required.',
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
  },
  {
    icon: Sparkles,
    title: 'Horoscope Charts',
    desc: 'Built-in South Indian Rasi & Navamsam chart editor. Free for everyone.',
    color: 'bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400',
  },
  {
    icon: Zap,
    title: 'Auto-Save',
    desc: 'Your data is saved automatically as you type. Never lose your progress.',
    color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
  },
  {
    icon: Shield,
    title: '100% Private',
    desc: 'All data stays on your device. Nothing is uploaded to any server.',
    color: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400',
  },
  {
    icon: Heart,
    title: 'Tamil & English',
    desc: 'Bilingual support - enter labels in Tamil script, values in any language. Always free.',
    color: 'bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400',
  },
]

const steps = [
  { num: '01', title: 'Enter Your Details', desc: 'Fill in personal, family, contact and horoscope information step by step.', icon: <FileText className="h-6 w-6" /> },
  { num: '02', title: 'Pick a Template', desc: 'Choose from Classic, Elegant or Floral - preview live as you type.', icon: <PenTool className="h-6 w-6" /> },
  { num: '03', title: 'Review & Edit', desc: 'Make sure everything is perfect. Edit anytime - completely free.', icon: <CreditCard className="h-6 w-6" /> },
  { num: '04', title: 'Download Free PDF', desc: 'Save your professional bio data PDF with high quality. No payment needed!', icon: <Download className="h-6 w-6" /> },
]

const faqs = [
  {
    q: 'Is this really free?',
    a: 'Yes! This service is 100% free. You can create, edit, and download your Tamil marriage bio data PDF without any payment. No hidden charges, no credit card required.',
  },
  {
    q: 'Can I edit after downloading?',
    a: 'Absolutely! You can edit your data anytime and download again for free as many times as you want. There are no limits or restrictions.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account needed. Everything works directly in your browser. Your data is saved locally on your device.',
  },
  {
    q: 'How do I support this project?',
    a: 'While the service is free, if you find it helpful, you can support the developer by scanning the QR code in the Support section or using the donation links. Your support helps keep this tool free for everyone!',
  },
  {
    q: 'Is my personal data safe?',
    a: 'Yes - 100%. All data is stored only in your browser\'s local storage. Nothing is sent to any server. Your privacy is completely protected.',
  },
  {
    q: 'Can I add a photo?',
    a: 'Yes! You can upload and crop your photo directly in the form. It appears on all templates. Your photo is stored locally and never uploaded.',
  },
  {
    q: 'Is the PDF print-ready?',
    a: 'Yes - the PDF is formatted to A4 size at high quality, perfect for printing or sharing on WhatsApp.',
  },
  {
    q: 'Do you support horoscope charts?',
    a: 'Yes - the built-in South Indian style Rasi and Navamsam chart editor is included for free with all downloads.',
  },
  {
    q: 'Can I use this on mobile?',
    a: 'Yes! The bio data maker is fully responsive and works great on mobile phones, tablets, and desktop computers.',
  },
  {
    q: 'What if I find a bug or have a suggestion?',
    a: 'We\'d love to hear from you! Contact us via email or phone, and we\'ll do our best to improve the tool.',
  },
];

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how' },
  { label: 'Support', href: '/#support' },
  { label: 'FAQ', href: '/#faq' },
]

// ─── components ──────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" onClick={close}>
          <div className="h-9 w-9 rounded-lg overflow-hidden bg-muted relative flex items-center justify-center">
            <Image
              src="/logo/logo.png"
              alt="Kalyanam Bio Data"
              fill
              className="object-contain"
            />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-foreground">Kalyanam Bio Data</p>
            <p className="text-[10px] text-muted-foreground">கல்யாணம் பயோடேட்டா</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/maker"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 transition-opacity"
          >
            Create Now <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* Hamburger - mobile only */}
          <button
            onClick={() => setOpen((v: boolean) => !v)}
            className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t bg-background/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col px-4 py-3 gap-1">
              {NAV_LINKS.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className="px-3 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/maker"
                onClick={close}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                Start Creating Now <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 min-h-[85vh] flex items-center">
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Tamil wedding background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />
        {/* Teal/amber brand tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-transparent to-amber-900/25" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 text-center">
        {/* Badge - FREE badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-emerald-200 mb-6 shadow-sm"
        >
          <Star className="h-3.5 w-3.5 text-emerald-300" />
          Free Forever · No Signup · No Hidden Charges
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
        >
          Tamil Biodata,{" "}
          <span className="bg-gradient-to-r from-teal-500 to-emerald-400 bg-clip-text text-transparent">
            Designed Like Premium
          </span>
          <br />
          <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white/80">
            Offered Completely Free
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-white/80 leading-relaxed"
        >
          Create elegant Tamil marriage biodata with horoscope charts, photos, and beautiful templates -
          download instantly with zero cost, zero signup.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/maker"
            className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg hover:shadow-primary/30 hover:opacity-90 transition-all"
          >
            Start Creating Now
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#support"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm px-7 py-3.5 text-base font-medium text-white hover:bg-white/20 transition-all"
          >
            Support the Project
            <Heart className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Social proof - updated to free */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-xs text-white/60"
        >
          ✓ 100% Free &nbsp;·&nbsp; ✓ No account needed &nbsp;·&nbsp; ✓ Unlimited downloads &nbsp;·&nbsp; ✓ Data stays on your device
        </motion.p>

        {/* Preview mockup */}
        <FadeUp delay={0.4} className="mt-16">
          <div className="relative mx-auto max-w-4xl rounded-2xl border bg-card shadow-2xl overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b bg-muted/50">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-muted-foreground">kalyanambiodata.in/maker</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[320px]">
              {/* Left: form skeleton */}
              <div className="p-6 border-r space-y-4">
                <div className="h-4 rounded bg-muted w-1/3" />
                <div className="space-y-2">
                  {[80, 60, 90, 70, 55].map((w, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <div className="h-3 rounded bg-muted/80 w-1/4 shrink-0" />
                      <div className={`h-8 rounded-lg bg-muted/60`} style={{ width: `${w}%` }} />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-9 rounded-lg bg-muted w-20" />
                  <div className="h-9 rounded-lg bg-emerald-500/30 w-24" />
                </div>
              </div>
              {/* Right: bio preview skeleton */}
              <div className="p-6 flex flex-col items-center gap-4 bg-amber-50/40 dark:bg-amber-950/10">
                <div className="h-5 w-40 rounded bg-amber-200/60 dark:bg-amber-800/30" />
                <div className="h-20 w-20 rounded-full bg-muted" />
                <div className="space-y-2 w-full max-w-[200px]">
                  {[100, 80, 60, 75, 55].map((w, i) => (
                    <div key={i} className="h-2.5 rounded bg-muted/70 mx-auto" style={{ width: `${w}%` }} />
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-1 w-full max-w-[160px] aspect-square mt-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="border border-amber-300/50 dark:border-amber-700/30 rounded-sm" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeUp className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
              Premium Features
            </p>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Built for
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent ml-2">
              தமிழ் families
            </span>
          </h2>

          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every feature crafted to make creating your marriage bio data effortless and professional -
            <span className="text-foreground font-semibold"> completely free.</span>
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.08}>
              <div className="group h-full relative">
                {/* Gradient border effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative h-full rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out">
                  {/* Icon container with enhanced styling */}
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.color} mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className="h-5 w-5 stroke-[1.5]" />
                  </div>

                  {/* Title with gradient text on hover */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {f.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {f.desc}
                  </p>

                  {/* Decorative line that expands on hover */}
                  <div className="mt-4 h-0.5 w-8 bg-primary/20 rounded-full group-hover:w-12 transition-all duration-300" />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto px-4">
        <FadeUp className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Simple & Fast</span>
          </div>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Ready in 4 easy steps
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create your professional biodata in minutes with our simple, guided process - always free.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector lines - improved visibility */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2 z-0" />

          {steps.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.1}>
              <div className="relative group h-full">
                {/* Step number badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-lg z-10">
                  {s.num}
                </div>

                <div className="relative h-full rounded-2xl border bg-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group-hover:border-primary/30 flex flex-col">
                  {/* Icon */}
                  <div className="mb-4 relative">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      {s.icon}
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                    {s.desc}
                  </p>

                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1 text-xs text-primary">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Step {s.num} of 4</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Support Section with QR Code ────────────────────────────────────────────
function Support() {
  return (
    <section id="support" className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-4">
        <FadeUp className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>Support the Project</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Love This Tool? ❤️
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            This service is completely free and will always remain free. If you find it helpful,
            consider supporting the development with a small contribution.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="rounded-3xl border-2 border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Left: Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50">
                    <Coffee className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold">Buy me a coffee ☕</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Your support helps cover hosting costs, development time, and keeps this tool
                  free for everyone in the Tamil community. Every contribution, big or small, is deeply appreciated!
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm">100% of donations go to maintaining this service</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm">No pressure - the tool is always free either way</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Thank you for being awesome! 🙏</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-dashed">
                  <p className="text-xs text-muted-foreground text-center">
                    Scan QR code with any UPI app (Google Pay, PhonePe, Paytm) to support
                  </p>
                </div>
              </div>

              {/* Right: QR Code */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative bg-white p-4 rounded-2xl shadow-lg border">
                  {/* QR Code Image - Replace with your actual QR code image */}
                  <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Image
                      src="/qr.png"
                      alt="UPI QR Code for donation"
                      width={300}
                      height={300}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
                    UPI ID: <span className="font-bold">vickyanbu292001-2@oksbi</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Or scan QR code with any UPI app
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Alternative message */}
        <FadeUp delay={0.2} className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Can't donate? No worries! Just share this tool with your friends and family who might need it. 🙌
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4">
        <FadeUp className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Common questions</h2>
        </FadeUp>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeUp key={faq.q} delay={i * 0.06}>
              <AccordionItem
                value={faq.q}
                className="rounded-2xl border bg-card overflow-hidden px-6"
              >
                <AccordionTrigger className="py-4 font-semibold text-sm hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </FadeUp>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-amber-400/10" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(20,184,166,0.08),transparent)]" />
      <FadeUp>
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Always Free
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
            Create your Tamil bio data<br />
            <span className="bg-gradient-to-r from-teal-500 to-emerald-400 bg-clip-text text-transparent">
              beautifully, today
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            No account needed. No payment required. Start creating your free bio data now.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/maker"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-xl hover:opacity-90 transition-opacity"
            >
              Create My Bio Data <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#support"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-8 py-4 text-base font-semibold hover:bg-muted transition-colors"
            >
              <Heart className="h-4 w-4 text-rose-500" /> Support the Project
            </a>
          </div>
        </div>
      </FadeUp>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg overflow-hidden bg-muted">
                <Image src="/logo/logo.png" alt="Kalyanam Bio Data" width={32} height={32} className="object-contain" />
              </div>
              <div>
                <p className="text-sm font-bold">Kalyanam Bio Data</p>
                <p className="text-[10px] text-muted-foreground">கல்யாணம் பயோடேட்டா</p>
              </div>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Professional Tamil marriage bio data maker with horoscope charts.
              Create, preview, and download your bio data - completely free.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Navigation</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/#features" className="hover:text-foreground transition-colors">Features</Link>
              <Link href="/#how" className="hover:text-foreground transition-colors">How it works</Link>
              <Link href="/#support" className="hover:text-foreground transition-colors">Support</Link>
              <Link href="/#faq" className="hover:text-foreground transition-colors">FAQ</Link>
              <Link href="/maker" className="hover:text-foreground transition-colors">Create Bio Data</Link>
            </div>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Contact &amp; Legal</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="mailto:vigneshwaranm.me@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                vigneshwaranm.me@gmail.com
              </a>
              <a href="tel:+918072873118" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                +91 80728 73118
              </a>
              <Link href="/contact" className="hover:text-foreground transition-colors mt-1">Contact Us</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms &amp; Conditions</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kalyanam Bio Data. Made with ❤️ for தமிழ் families. 100% Free Forever.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── page ────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Support />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}