'use client'

import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { useBioData } from '@/lib/biodata-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CustomFields } from './custom-fields'

export function FamilyDetailsForm() {
  const { bioData, updateFamilyDetails } = useBioData()
  const { familyDetails } = bioData

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            குடும்ப விவரங்கள் / Family Details
          </CardTitle>
          <CardDescription>Enter your family information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Father Details */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>தந்தை பெயர் / Father Name</Label>
              <Input
                placeholder="Father's full name"
                value={familyDetails.fatherName}
                onChange={(e) => updateFamilyDetails({ fatherName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>தந்தை தொழில் / Father Occupation</Label>
              <Input
                placeholder="Father's occupation"
                value={familyDetails.fatherOccupation}
                onChange={(e) => updateFamilyDetails({ fatherOccupation: e.target.value })}
              />
            </div>
          </div>

          {/* Mother Details */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>தாய் பெயர் / Mother Name</Label>
              <Input
                placeholder="Mother's full name"
                value={familyDetails.motherName}
                onChange={(e) => updateFamilyDetails({ motherName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>தாய் தொழில் / Mother Occupation</Label>
              <Input
                placeholder="Mother's occupation"
                value={familyDetails.motherOccupation}
                onChange={(e) => updateFamilyDetails({ motherOccupation: e.target.value })}
              />
            </div>
          </div>

          {/* Siblings & Ancestry */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>உடன்பிறப்புகள் / Siblings</Label>
              <Input
                placeholder="e.g., 1 Brother, 1 Sister (Married)"
                value={familyDetails.siblings}
                onChange={(e) => updateFamilyDetails({ siblings: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>பூர்வீகம் / Ancestry</Label>
              <Input
                placeholder="Native place"
                value={familyDetails.ancestry}
                onChange={(e) => updateFamilyDetails({ ancestry: e.target.value })}
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-2">
            <Label>சொத்து விவரங்கள் / Property Details</Label>
            <Textarea
              placeholder="Own house, agricultural land, etc."
              value={familyDetails.propertyDetails}
              onChange={(e) => updateFamilyDetails({ propertyDetails: e.target.value })}
              rows={3}
            />
          </div>

          {/* Family Deity */}
          <div className="space-y-2">
            <Label>குலதெய்வம் / Family Deity</Label>
            <Input
              placeholder="e.g., Murugan Temple, Palani"
              value={familyDetails.familyDeity}
              onChange={(e) => updateFamilyDetails({ familyDeity: e.target.value })}
            />
          </div>

          {/* Custom Fields */}
          <CustomFields
            fields={familyDetails.customFields}
            onChange={(fields) => updateFamilyDetails({ customFields: fields })}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
