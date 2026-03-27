import type { Metadata, Viewport } from 'next'
import { Geist, Noto_Sans_Tamil } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
    default: 'Kalyanam Bio Data | கல்யாணம் பயோடேட்டா',
    template: '%s | Kalyanam Bio Data',
  },
  description:
    'Create professional Tamil marriage bio data (jathaga kurippu) with horoscope charts, multiple templates & instant PDF download. Free, fast, and beautifully designed.',
  keywords: [
    'Kalyanam Bio Data',
    'Tamil Marriage Bio Data',
    'Tamil Biodata Maker',
    'Jathaga Kurippu',
    'Tamil Matrimony',
    'Horoscope Chart',
    'Rasi Chart',
    'Navamsam Chart',
    'Tamil PDF Biodata',
    'திருமண பயோடேட்டா',
    'ஜாதக குறிப்பு',
  ],
  authors: [{ name: 'Kalyanam Bio Data' }],
  metadataBase: new URL('https://kalyanambiodata.in'),
  openGraph: {
    title: 'Kalyanam Bio Data | கல்யாணம் பயோடேட்டா',
    description:
      'Create professional Tamil marriage bio data with horoscope charts and download as PDF. Free & easy.',
    url: 'https://kalyanambiodata.in',
    siteName: 'Kalyanam Bio Data',
    locale: 'ta_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalyanam Bio Data | கல்யாணம் பயோடேட்டா',
    description:
      'Professional Tamil marriage bio data maker with horoscope charts. Free PDF download.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: '/icon-32x32.ico' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5fafa' },
    { media: '(prefers-color-scheme: dark)', color: '#112022' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ta" suppressHydrationWarning>
      <body className={`${geist.variable} ${notoTamil.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <BioDataProvider>{children}</BioDataProvider>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
