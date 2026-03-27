'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, User, Camera, Info } from 'lucide-react'
import { useBioData } from '@/lib/biodata-context'
import { RASI_OPTIONS, NAKSHATRAM_OPTIONS, LAGNAM_OPTIONS, COMPLEXION_OPTIONS, RELIGION_OPTIONS, HeaderType } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CustomFields } from './custom-fields'
import { ImageCropper } from './image-cropper'

export function PersonalDetailsForm() {
  const { bioData, updatePersonalDetails } = useBioData()
  const { personalDetails } = bioData
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [cropperOpen, setCropperOpen] = useState(false)
  const [tempImage, setTempImage] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setTempImage(reader.result as string)
        setCropperOpen(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = (croppedImage: string) => {
    updatePersonalDetails({ photo: croppedImage })
    setTempImage('')
  }

  const removePhoto = () => {
    updatePersonalDetails({ photo: null })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Helper to render section title with Tamil/English
  const SectionTitle = ({ tamil, english, icon: Icon }: { tamil: string; english: string; icon?: any }) => (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      <h3 className="text-lg font-semibold">
        {tamil} <span className="text-sm font-normal text-muted-foreground">/ {english}</span>
      </h3>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <User className="h-6 w-6 text-primary" />
            <span>தனிநபர் விவரங்கள் / Personal Details</span>
          </CardTitle>
          <CardDescription className="mt-1">
            Fill in your personal information to create your bio-data profile
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">

          {/* Photo Upload Section */}
          <div className="space-y-4">
            <SectionTitle tamil="புகைப்படம்" english="Photo" icon={Camera} />
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div className="relative">
                {personalDetails.photo ? (
                  <div className="relative group">
                    {personalDetails.photo ? (
                      <img
                        src={personalDetails.photo}
                        alt="Profile"
                        className="h-36 w-28 rounded-lg border-2 border-primary/20 object-cover shadow-md transition-all group-hover:opacity-90"
                      />
                    ) : null}
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -right-2 -top-2 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={removePhoto}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-36 w-28 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 transition-all hover:border-primary hover:bg-muted/50 hover:shadow-md"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-xs font-medium">Upload Photo</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Profile Photo Guidelines</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                  <li>Passport size photo recommended (3:4 ratio)</li>
                  <li>Clear, recent photo with neutral background</li>
                  <li>JPG or PNG format, max 5MB</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator />

          {/* Basic Information Section */}
          <div className="space-y-4">
            <SectionTitle tamil="அடிப்படை விவரங்கள்" english="Basic Information" />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">
                  வகை / Profile Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={personalDetails.profileType}
                  onValueChange={(value: 'groom' | 'bride') =>
                    updatePersonalDetails({ profileType: value })
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select profile type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="groom">👨 மாப்பிள்ளை / Groom</SelectItem>
                    <SelectItem value="bride">👩 மணப்பெண் / Bride</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">
                  தலைப்பு / Header Style
                </Label>
                <Input
                  placeholder="எ.கா : ஜாதக குறிப்பு, முருகன் துணை"
                  value={personalDetails.headerTitle}
                  onChange={(e) => updatePersonalDetails({ headerTitle: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">
                  பெயர் / Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  placeholder="Enter your full name"
                  value={personalDetails.name}
                  onChange={(e) => updatePersonalDetails({ name: e.target.value })}
                  className="bg-background"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Birth Details Section */}
          <div className="space-y-4">
            <SectionTitle tamil="பிறப்பு விவரங்கள்" english="Birth Details" />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">வயது / Age</Label>
                <Input
                  type="number"
                  placeholder="Enter age"
                  value={personalDetails.age}
                  onChange={(e) => updatePersonalDetails({ age: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">பிறந்த தேதி / Date of Birth</Label>
                <Input
                  type="date"
                  value={personalDetails.dateOfBirth}
                  onChange={(e) => updatePersonalDetails({ dateOfBirth: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">பிறந்த நேரம் / Time of Birth</Label>
                <Input
                  placeholder="e.g., 10:30 AM"
                  value={personalDetails.timeOfBirth}
                  onChange={(e) => updatePersonalDetails({ timeOfBirth: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">பிறந்த இடம் / Birth Place</Label>
                <Input
                  placeholder="City, State, Country"
                  value={personalDetails.birthPlace}
                  onChange={(e) => updatePersonalDetails({ birthPlace: e.target.value })}
                  className="bg-background"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Astrological Details Section */}
          <div className="space-y-4">
            <SectionTitle tamil="ஜோதிட விவரங்கள்" english="Astrological Details" />
            <div className="grid gap-5 md:grid-cols-3">

              <div className="space-y-2">
                <Label className="text-sm font-semibold">கோத்திரம் / Gotra</Label>
                <Input
                  placeholder="Type your gotra"
                  value={personalDetails.gotra}
                  onChange={(e) => updatePersonalDetails({ gotra: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">ராசி / Rasi</Label>
                <Select
                  value={personalDetails.rasi}
                  onValueChange={(value) => updatePersonalDetails({ rasi: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Rasi" />
                  </SelectTrigger>
                  <SelectContent>
                    {RASI_OPTIONS.map((rasi) => (
                      <SelectItem key={rasi} value={rasi}>{rasi}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">நட்சத்திரம் / Nakshatram</Label>
                <Select
                  value={personalDetails.nakshatram}
                  onValueChange={(value) => updatePersonalDetails({ nakshatram: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Nakshatram" />
                  </SelectTrigger>
                  <SelectContent>
                    {NAKSHATRAM_OPTIONS.map((naksh) => (
                      <SelectItem key={naksh} value={naksh}>{naksh}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">லக்னம் / Lagnam</Label>
                <Select
                  value={personalDetails.lagnam}
                  onValueChange={(value) => updatePersonalDetails({ lagnam: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Lagnam" />
                  </SelectTrigger>
                  <SelectContent>
                    {LAGNAM_OPTIONS.map((lagnam) => (
                      <SelectItem key={lagnam} value={lagnam}>{lagnam}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Professional Details Section */}
          <div className="space-y-4">
            <SectionTitle tamil="கல்வி & தொழில்" english="Education & Career" />
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">கல்வி / Education</Label>
                <Input
                  placeholder="e.g., B.E. Computer Science, M.B.A."
                  value={personalDetails.education}
                  onChange={(e) => updatePersonalDetails({ education: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">தொழில் / Occupation</Label>
                <Input
                  placeholder="e.g., Software Engineer, Doctor"
                  value={personalDetails.job}
                  onChange={(e) => updatePersonalDetails({ job: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">சம்பளம் / Salary</Label>
                <Input
                  placeholder="e.g., 100000"
                  value={personalDetails.salary}
                  onChange={(e) => updatePersonalDetails({ salary: e.target.value })}
                  className="bg-background"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Physical & Cultural Details Section */}
          <div className="space-y-4">
            <SectionTitle tamil="உடல் & பண்பாட்டு விவரங்கள்" english="Physical & Cultural Details" />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">உயரம் / Height</Label>
                <Input
                  placeholder="e.g., 5' 8&quot;"
                  value={personalDetails.height}
                  onChange={(e) => updatePersonalDetails({ height: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">நிறம் / Complexion</Label>
                <Input
                  placeholder="எ.கா. வெள்ளை, மாநிறம், கருமை"
                  value={personalDetails.complexion}
                  onChange={(e) => updatePersonalDetails({ complexion: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">மதம் / Religion</Label>
                <Select
                  value={personalDetails.religion}
                  onValueChange={(value) => updatePersonalDetails({ religion: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select religion" />
                  </SelectTrigger>
                  <SelectContent>
                    {RELIGION_OPTIONS.map((rel) => (
                      <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">ஜாதி / Caste</Label>
                <Input
                  placeholder="Enter caste"
                  value={personalDetails.caste}
                  onChange={(e) => updatePersonalDetails({ caste: e.target.value })}
                  className="bg-background"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Additional Information Section */}
          <div className="space-y-4">
            <SectionTitle tamil="கூடுதல் தகவல்கள்" english="Additional Information" />
            <CustomFields
              fields={personalDetails.customFields}
              onChange={(fields) => updatePersonalDetails({ customFields: fields })}
            />
          </div>

        </CardContent>
      </Card>

      <ImageCropper
        open={cropperOpen}
        onOpenChange={setCropperOpen}
        imageSrc={tempImage}
        onCropComplete={handleCropComplete}
      />
    </motion.div>
  )
}