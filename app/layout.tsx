import type { Metadata, Viewport } from 'next'
import { Geist, Noto_Sans_Tamil } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'
import { BioDataProvider } from '@/lib/biodata-context'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const notoTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  variable: '--font-tamil',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Free Tamil Marriage Bio Data Maker | Kalyanam Bio Data',
    template: '%s | Kalyanam Bio Data - Free Tamil Biodata Maker',
  },
  description:
    'Create professional Tamil marriage bio data (jathaga kurippu) with horoscope charts, 3 beautiful templates & instant PDF download. 100% FREE - No payment required. Unlimited downloads.',
  keywords: [
    'free Tamil marriage bio data maker',
    'Tamil Marriage Bio Data',
    'Tamil Biodata Maker',
    'free Tamil biodata maker',
    'Jathaga Kurippu',
    'Tamil Matrimony',
    'Horoscope Chart',
    'Rasi Chart',
    'Navamsam Chart',
    'Tamil PDF Biodata',
    'free marriage bio data',
    'Tamil wedding biodata',
    'திருமண பயோடேட்டா',
    'இலவச திருமண பயோடேட்டா',
    'ஜாதக குறிப்பு',
    'free biodata maker',
    'Tamil horoscope chart',
    'South Indian horoscope',
    'biodata for marriage Tamil',
    'pdf biodata maker free',
    'matrimonial biodata Tamil',
    'kalyanam biodata',
    'திருமண விவரங்கள்',
  ],
  authors: [{ name: 'Kalyanam Bio Data' }],
  metadataBase: new URL('https://kalyanambiodata.in'),
  alternates: {
    canonical: 'https://kalyanambiodata.in',
  },
  openGraph: {
    title: 'Free Tamil Marriage Bio Data Maker | Kalyanam Bio Data',
    description:
      'Create beautiful Tamil marriage bio data with horoscope charts. 3 premium templates, instant PDF download. Completely FREE - no payment required.',
    url: 'https://kalyanambiodata.in',
    siteName: 'Kalyanam Bio Data - Free Tamil Biodata Maker',
    locale: 'ta_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kalyanam Bio Data - Free Tamil Marriage Biodata Maker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tamil Marriage Bio Data Maker | Kalyanam Bio Data',
    description:
      'Create professional Tamil marriage bio data with horoscope charts. 100% FREE - Instant PDF download. No payment needed.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'b2wjwnyAWVf2f2wD7n8MJY8B2TaI0X4s9JcltjQpYDo',
  },
  manifest: '/manifest.json',
  category: 'Matrimonial',
  classification: 'Bio Data Maker',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5fafa' },
    { media: '(prefers-color-scheme: dark)', color: '#112022' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ta" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Structured Data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Kalyanam Bio Data',
              applicationCategory: 'Lifestyle',
              operatingSystem: 'All',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'INR',
                availability: 'https://schema.org/OnlineOnly',
              },
              description:
                'Free Tamil marriage bio data maker with horoscope charts. Create professional biodata for marriage with 3 templates and instant PDF download.',
              url: 'https://kalyanambiodata.in',
              keywords: 'free Tamil marriage biodata, Tamil bio data maker, jathaga kurippu',
              inLanguage: 'ta',
              isAccessibleForFree: true,
            }),
          }}
        />
        {/* Additional SEO meta tags */}
        <meta name="author" content="Kalyanam Bio Data" />
        <meta name="copyright" content="Kalyanam Bio Data" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="Tamil, English" />
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Tamil Nadu" />
        <meta name="geo.position" content="10.7905;78.7047" />
        <meta name="ICBM" content="10.7905, 78.7047" />
        {/* Alternate language versions */}
        <link rel="alternate" hrefLang="ta" href="https://kalyanambiodata.in/ta" />
        <link rel="alternate" hrefLang="en" href="https://kalyanambiodata.in/en" />
        <link rel="alternate" hrefLang="x-default" href="https://kalyanambiodata.in" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geist.variable} ${notoTamil.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <BioDataProvider>
            {children}
          </BioDataProvider>
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}