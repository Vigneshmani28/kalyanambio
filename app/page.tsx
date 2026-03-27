import LandingPage from '@/components/landing-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kalyanam Bio Data | Tamil Marriage Bio Data Maker',
  description:
    'Create professional Tamil marriage bio data with horoscope charts, 3 premium templates and instant PDF download. Just ₹29 — no account needed.',
}

export default function Home() {
  return <LandingPage />
}
