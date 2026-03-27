import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Kalyanam Bio Data',
  description: 'Privacy policy for Kalyanam Bio Data - how we handle your data.',
}

const EFFECTIVE_DATE = '27 March 2026'
const EMAIL = 'vigneshwaranm.me@gmail.com'
const PHONE = '+91 80728 73118'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-2">Privacy Policy</h1>
          <p className="text-muted-foreground mt-1 text-sm">Effective date: {EFFECTIVE_DATE}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8 text-sm leading-relaxed text-foreground/90">

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">1. Overview</h2>
          <p>
            Kalyanam Bio Data ("we", "us", "our") is committed to protecting your privacy.
            This policy explains what information we collect, how we use it, and your rights.
          </p>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-800 p-4 text-emerald-800 dark:text-emerald-300">
            <strong>Key fact:</strong> All bio data you create (name, family details, horoscope, photo) is stored
            <strong> only in your own browser's localStorage</strong>. It is never transmitted to or stored on our servers.
            The service is completely free - we never ask for payment to download your bio data.
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">2. Information We Collect</h2>
          <h3 className="font-medium text-foreground mt-4">a) Bio Data (stored only on your device)</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
            <li>Personal details: name, age, date of birth, education, occupation</li>
            <li>Family details: parents' names, siblings, ancestry</li>
            <li>Contact details: phone number, address (optional)</li>
            <li>Horoscope chart information (rasi, nakshatram, house placements)</li>
            <li>Profile photo (stored as a base64 string in your browser)</li>
          </ul>
          <p className="text-muted-foreground">This data never leaves your device. We cannot access it.</p>

          <h3 className="font-medium text-foreground mt-4">b) Donations (Optional Support)</h3>
          <p className="text-muted-foreground">
            If you choose to support the project via the donation QR code, your donation is processed
            through your preferred UPI app. We do not store any payment information. Donations are
            voluntary and help keep this service free for everyone.
          </p>

          <h3 className="font-medium text-foreground mt-4">c) Usage Analytics (if any)</h3>
          <p className="text-muted-foreground">
            We may collect anonymous usage data (page views, session duration) via privacy-respecting analytics
            to improve the service. This data is not linked to your identity or bio data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">3. How We Use Information</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
            <li>To provide you with a free bio data creation and download service</li>
            <li>To improve the website and its features</li>
            <li>To respond to support requests or inquiries</li>
          </ul>
          <p>We do <strong>not</strong> sell, rent, or share your personal data with any third parties for marketing.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">4. Data Security</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
            <li>Your bio data resides exclusively in your browser's localStorage. Clearing your browser data removes it permanently.</li>
            <li>Our website uses HTTPS (SSL/TLS) encryption for all communications.</li>
            <li>We do not store any personal data on our servers.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">5. Cookies</h2>
          <p className="text-muted-foreground">
            We use only essential cookies required for the website to function (e.g., theme preference,
            session state). We do not use advertising or tracking cookies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">6. Children's Privacy</h2>
          <p className="text-muted-foreground">
            Our service is intended for adults creating matrimonial bio data. We do not knowingly collect
            information from individuals under 18 years of age.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">7. Your Rights</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
            <li><strong>Access &amp; deletion:</strong> Since your bio data is in your browser, you can view or delete it at any time by clearing localStorage or using the Reset button in the app.</li>
            <li><strong>Opt-out:</strong> You may stop using the service at any time.</li>
            <li><strong>Contact us</strong> if you believe we have handled your data incorrectly.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">8. Third-Party Services</h2>
          <p className="text-muted-foreground">
            If you choose to make a voluntary donation, you will be redirected to your preferred UPI app.
            These apps have their own privacy policies. Donations are optional and not required to use the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">9. Policy Updates</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. Changes will be reflected on this page
            with a revised effective date. Continued use of the service implies acceptance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">10. Contact</h2>
          <p>For any privacy concerns or requests:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
            <li>Email: <a href={`mailto:${EMAIL}`} className="text-primary underline">{EMAIL}</a></li>
            <li>Phone: <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-primary underline">{PHONE}</a></li>
          </ul>
        </section>

        <div className="pt-4 border-t text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kalyanam Bio Data. All rights reserved.{' '}
          <Link href="/terms" className="underline hover:text-foreground">Terms &amp; Conditions</Link>
          {' · '}
          <Link href="/contact" className="underline hover:text-foreground">Contact</Link>
        </div>
      </div>
    </div>
  )
}