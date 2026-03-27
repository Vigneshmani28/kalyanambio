'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useBioData } from '@/lib/biodata-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HoroscopeChart } from './horoscope-chart'

export function HoroscopeForm() {
  const { bioData, updateHoroscopeDetails } = useBioData()
  const { horoscopeDetails } = bioData

  const handleRasiChange = (houses: string[]) => {
    updateHoroscopeDetails({
      rasiChart: { houses },
    })
  }

  const handleNavamsamChange = (houses: string[]) => {
    updateHoroscopeDetails({
      navamsamChart: { houses },
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            ஜாதக கட்டம் உருவாக்கி / Horoscope Chart Builder
          </CardTitle>
          <CardDescription>
            Build your Rasi and Navamsam charts. Select planets from dropdown or type custom text for each house.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8 items-center">
            <div className="w-full max-w-[420px]">
              <HoroscopeChart
                houses={horoscopeDetails.rasiChart.houses}
                onChange={handleRasiChange}
                title="ராசி கட்டம் / Rasi Chart"
              />
            </div>
            <div className="w-full max-w-[420px]">
              <HoroscopeChart
                houses={horoscopeDetails.navamsamChart.houses}
                onChange={handleNavamsamChange}
                title="நவாம்ச கட்டம் / Navamsam Chart"
              />
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Tip:</strong> Click on each house (box) to add planets. You can select from common planets
              or type custom text like multiple planets separated by commas.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
