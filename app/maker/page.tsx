import { BiodataMaker } from '@/components/biodata-maker'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Bio Data | Kalyanam Bio Data',
  description: 'Create your professional Tamil marriage bio data with horoscope charts. Fill in your details and download as a beautiful PDF.',
}

export default function MakerPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <BiodataMaker />
    </main>
  )
}
