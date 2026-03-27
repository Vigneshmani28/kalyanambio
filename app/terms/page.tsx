import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Kalyanam Bio Data',
  description: 'Terms and conditions for using Kalyanam Bio Data service - completely free.',
}

const EFFECTIVE_DATE = '27 March 2026'
const EMAIL = 'vigneshwaranm.me@gmail.com'
const PHONE = '+91 80728 73118'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-2">Terms &amp; Conditions</h1>
          <p className="text-muted-foreground mt-1 text-sm">Effective date: {EFFECTIVE_DATE}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8 text-sm leading-relaxed text-foreground/90">

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">1. Introduction</h2>
          <p>
            Welcome to <strong>Kalyanam Bio Data</strong> ("we", "us", or "our"). By accessing or using our
            website at <strong>kalyanambiodata.in</strong>, you agree to be bound by these Terms &amp; Conditions.
            Please read them carefully before using the service.
          </p>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-800 p-4 text-emerald-800 dark:text-emerald-300">
            <strong>Good news:</strong> This service is <strong>100% free</strong>! You can create, edit,
            and download your Tamil marriage bio data PDF without any payment. Donations are optional
            and help keep this service running.
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">2. Service Description</h2>
          <p>
            Kalyanam Bio Data is a free online tool that allows users to create Tamil marriage bio data (jathaga kurippu)
            with horoscope charts and download them as a PDF document.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
            <li>Creating your bio data is <strong>completely free</strong>.</li>
            <li>Downloading your PDF is <strong>completely free</strong> - unlimited downloads, no payment required.</li>
            <li>All data you enter is stored <strong>locally in your browser</strong> and is never uploaded to our servers.</li>
            <li>You can edit your bio data and re-download as many times as you want, at no cost.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">3. Donations (Optional Support)</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
            <li>Donations are <strong>completely optional</strong> and not required to use any feature of this service.</li>
            <li>If you choose to support the project, you can scan the QR code provided on the website.</li>
            <li>Donations are voluntary and non-refundable. They help cover hosting costs and development time.</li>
            <li>We are grateful for any support, but the service remains free regardless of whether you donate.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">4. User Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
            <li>You are solely responsible for the accuracy of the information you enter in your bio data.</li>
            <li>You confirm that all information provided is truthful and does not violate any applicable laws.</li>
            <li>You agree not to use this service for any fraudulent, misleading, or unlawful purpose.</li>
            <li>You must verify all details carefully before downloading your final PDF.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">5. Intellectual Property</h2>
          <p>
            The templates, design, layout, and all other content on this website are the intellectual property
            of Kalyanam Bio Data. The PDF generated using your personal data belongs to you. You may not
            copy, re-sell, or distribute our templates without prior written permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">6. Disclaimer of Warranties</h2>
          <p>
            This service is provided "as is" without warranties of any kind. We do not guarantee
            uninterrupted access to the service. We are not responsible for any errors in the generated PDF
            that result from incorrect information entered by the user.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Kalyanam Bio Data shall not be liable for any indirect,
            incidental, or consequential damages arising from the use of this service. Since the service is
            free, our liability is limited to the maximum extent allowed by applicable law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">8. Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms &amp; Conditions at any time. Changes will be posted
            on this page with an updated effective date. Continued use of the service constitutes acceptance
            of the revised terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">9. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction
            of courts in Tamil Nadu, India.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">10. Contact Us</h2>
          <p>For any questions about these Terms, please reach out:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
            <li>Email: <a href={`mailto:${EMAIL}`} className="text-primary underline">{EMAIL}</a></li>
            <li>Phone: <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-primary underline">{PHONE}</a></li>
          </ul>
        </section>

        <div className="pt-4 border-t text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kalyanam Bio Data. All rights reserved.{' '}
          <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
          {' · '}
          <Link href="/contact" className="underline hover:text-foreground">Contact</Link>
        </div>
      </div>
    </div>
  )
}