import Link from 'next/link'
import type { Metadata } from 'next'
import { Mail, Phone, Clock, MapPin, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | Kalyanam Bio Data',
  description: 'Get in touch with Kalyanam Bio Data for support, payment issues, or feedback.',
}

const EMAIL = 'vigneshwaranm.me@gmail.com'
const PHONE = '+91 80728 73118'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-2">Contact Us</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            We're here to help. Reach out for any support or questions.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          <a
            href={`mailto:${EMAIL}`}
            className="group flex gap-4 items-start p-5 rounded-2xl border bg-card hover:border-primary/40 hover:shadow-lg transition-all"
          >
            <div className="h-11 w-11 shrink-0 rounded-xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Email</p>
              <p className="text-sm text-primary mt-0.5">{EMAIL}</p>
              <p className="text-xs text-muted-foreground mt-1">We reply within 24 hours</p>
            </div>
          </a>

          <a
            href={`tel:${PHONE.replace(/\s/g, '')}`}
            className="group flex gap-4 items-start p-5 rounded-2xl border bg-card hover:border-primary/40 hover:shadow-lg transition-all"
          >
            <div className="h-11 w-11 shrink-0 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Phone / WhatsApp</p>
              <p className="text-sm text-primary mt-0.5">{PHONE}</p>
              <p className="text-xs text-muted-foreground mt-1">Mon – Sat, 9 AM – 7 PM IST</p>
            </div>
          </a>

          <div className="flex gap-4 items-start p-5 rounded-2xl border bg-card">
            <div className="h-11 w-11 shrink-0 rounded-xl bg-violet-50 dark:bg-violet-950/60 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Support Hours</p>
              <p className="text-sm text-muted-foreground mt-0.5">Monday – Saturday</p>
              <p className="text-xs text-muted-foreground mt-0.5">9:00 AM – 7:00 PM IST</p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-5 rounded-2xl border bg-card">
            <div className="h-11 w-11 shrink-0 rounded-xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Location</p>
              <p className="text-sm text-muted-foreground mt-0.5">Tamil Nadu, India</p>
              <p className="text-xs text-muted-foreground mt-0.5">Online service - no walk-ins</p>
            </div>
          </div>
        </div>

        {/* FAQ shortcut */}
        <div className="rounded-2xl border bg-muted/30 p-6 space-y-3">
          <h2 className="font-semibold">Common support topics</h2>
          {[
            { q: 'Payment went through but PDF didn\'t download', a: 'Email us with your UPI/card transaction ID. We\'ll resolve within a few hours.' },
            { q: 'I made a mistake in my bio data after downloading', a: 'Edit your data anytime in the app and pay ₹29 again to download the corrected PDF.' },
            { q: 'How do I clear my saved data?', a: 'Use the Reset button in the top bar of the bio data maker, or clear your browser\'s localStorage.' },
            { q: 'Can I get a refund?', a: 'Once the PDF download link is delivered, payments are non-refundable. Contact us for technical errors.' },
          ].map(item => (
            <details key={item.q} className="group">
              <summary className="cursor-pointer text-sm font-medium py-2 list-none flex items-center justify-between">
                {item.q}
                <span className="text-muted-foreground group-open:rotate-180 transition-transform text-lg">⌄</span>
              </summary>
              <p className="text-sm text-muted-foreground pb-3 border-b last:border-0">{item.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kalyanam Bio Data.{' '}
          <Link href="/terms" className="underline hover:text-foreground">Terms</Link>
          {' · '}
          <Link href="/privacy" className="underline hover:text-foreground">Privacy</Link>
        </p>
      </div>
    </div>
  )
}
