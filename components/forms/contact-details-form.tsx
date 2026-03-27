'use client'

import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { useBioData } from '@/lib/biodata-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CustomFields } from './custom-fields'

export function ContactDetailsForm() {
  const { bioData, updateContactDetails } = useBioData()
  const { contactDetails } = bioData

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            தொடர்பு விவரங்கள் / Contact Details
          </CardTitle>
          <CardDescription>Enter contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Address */}
          <div className="space-y-2">
            <Label>முகவரி / Address</Label>
            <Textarea
              placeholder="Full address with city, state, and pin code"
              value={contactDetails.address}
              onChange={(e) => updateContactDetails({ address: e.target.value })}
              rows={4}
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label>தொலைபேசி எண் / Phone Number</Label>
            <Input
              type="tel"
              placeholder="+91 98765 43210"
              value={contactDetails.phoneNumber}
              onChange={(e) => updateContactDetails({ phoneNumber: e.target.value })}
            />
          </div>

          {/* Custom Fields */}
          <CustomFields
            fields={contactDetails.customFields}
            onChange={(fields) => updateContactDetails({ customFields: fields })}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
