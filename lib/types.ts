export interface CustomField {
  id: string
  label: string
  value: string
}

export type HeaderType = 'groom' | 'bride' | 'deity'

export interface PersonalDetails {
  profileType: 'groom' | 'bride'
  headerTitle: string
  name: string
  age: string
  dateOfBirth: string
  timeOfBirth: string
  birthPlace: string
  gotra: string
  rasi: string
  nakshatram: string
  lagnam: string
  education: string
  job: string
  salary: string
  height: string
  complexion: string
  religion: string
  caste: string
  familyDeityName: string
  photo: string | null
  customFields: CustomField[]
}

export interface FamilyDetails {
  fatherName: string
  fatherOccupation: string
  motherName: string
  motherOccupation: string
  siblings: string
  ancestry: string
  propertyDetails: string
  familyDeity: string
  customFields: CustomField[]
}

export interface ContactDetails {
  address: string
  phoneNumber: string
  customFields: CustomField[]
}

export type Planet = 'சூரியன்' | 'சந்திரன்' | 'செவ்வாய்' | 'புதன்' | 'குரு' | 'சுக்கிரன்' | 'சனி' | 'ராகு' | 'கேது' | 'லக்னம்' | ''

export interface HoroscopeChart {
  houses: string[]
}

export interface HoroscopeDetails {
  rasiChart: HoroscopeChart
  navamsamChart: HoroscopeChart
}

export interface BioData {
  personalDetails: PersonalDetails
  familyDetails: FamilyDetails
  contactDetails: ContactDetails
  horoscopeDetails: HoroscopeDetails
}

export type TemplateType = 'classic' | 'elegant' | 'floral' | 'elegant-marriage'

export const RASI_OPTIONS = [
  'மேஷம் (Mesham)',
  'ரிஷபம் (Rishabam)',
  'மிதுனம் (Mithunam)',
  'கடகம் (Kadakam)',
  'சிம்மம் (Simmam)',
  'கன்னி (Kanni)',
  'துலாம் (Thulam)',
  'விருச்சிகம் (Viruchikam)',
  'தனுசு (Dhanusu)',
  'மகரம் (Makaram)',
  'கும்பம் (Kumbam)',
  'மீனம் (Meenam)',
]

export const NAKSHATRAM_OPTIONS = [
  'அஸ்வினி (Ashwini)',
  'பரணி (Bharani)',
  'கிருத்திகை (Krittika)',
  'ரோகிணி (Rohini)',
  'மிருகசீரிஷம் (Mrigashira)',
  'திருவாதிரை (Thiruvathira)',
  'புனர்பூசம் (Punarvasu)',
  'பூசம் (Pushya)',
  'ஆயில்யம் (Ayilyam)',
  'மகம் (Magha)',
  'பூரம் (Pooram)',
  'உத்திரம் (Uthiram)',
  'ஹஸ்தம் (Hastam)',
  'சித்திரை (Chithirai)',
  'சுவாதி (Swathi)',
  'விசாகம் (Visakam)',
  'அனுஷம் (Anusham)',
  'கேட்டை (Kettai)',
  'மூலம் (Moolam)',
  'பூராடம் (Pooradam)',
  'உத்திராடம் (Uthiradam)',
  'திருவோணம் (Thiruvonam)',
  'அவிட்டம் (Avittam)',
  'சதயம் (Sathayam)',
  'பூரட்டாதி (Poorattathi)',
  'உத்திரட்டாதி (Uthirattathi)',
  'ரேவதி (Revathi)',
]

export const LAGNAM_OPTIONS = RASI_OPTIONS

export const PLANET_OPTIONS = [
  { value: '', label: 'காலியாக விடு (Empty)' },
  { value: 'சூரியன்', label: 'சூரியன் (Sun)' },
  { value: 'சந்திரன்', label: 'சந்திரன் (Moon)' },
  { value: 'செவ்வாய்', label: 'செவ்வாய் (Mars)' },
  { value: 'புதன்', label: 'புதன் (Mercury)' },
  { value: 'குரு', label: 'குரு (Jupiter)' },
  { value: 'சுக்கிரன்', label: 'சுக்கிரன் (Venus)' },
  { value: 'சனி', label: 'சனி (Saturn)' },
  { value: 'ராகு', label: 'ராகு (Rahu)' },
  { value: 'கேது', label: 'கேது (Ketu)' },
  { value: 'லக்னம்', label: 'லக்னம் (Lagna)' },
]

export const COMPLEXION_OPTIONS = [
  'மிக வெள்ளை (Very Fair)',
  'வெள்ளை (Fair)',
  'மாநிறம் (Wheatish)',
  'இருண்ட மாநிறம் (Wheatish Brown)',
  'கருமை (Dark)',
]

export const RELIGION_OPTIONS = [
  'இந்து (Hindu)',
  'கிறிஸ்துவம் (Christian)',
  'இஸ்லாம் (Muslim)',
  'சீக்கியம் (Sikh)',
  'ஜெயின் (Jain)',
  'புத்த மதம் (Buddhist)',
  'பிற (Other)',
]

export const getDefaultBioData = (): BioData => ({
  personalDetails: {
    profileType: 'groom',
    headerTitle: '',
    name: '',
    age: '',
    dateOfBirth: '',
    timeOfBirth: '',
    birthPlace: '',
    gotra: '',
    rasi: '',
    nakshatram: '',
    lagnam: '',
    education: '',
    job: '',
    salary: '',
    height: '',
    complexion: '',
    religion: '',
    caste: '',
    familyDeityName: '',
    photo: null,
    customFields: [],
  },
  familyDetails: {
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    siblings: '',
    ancestry: '',
    propertyDetails: '',
    familyDeity: '',
    customFields: [],
  },
  contactDetails: {
    address: '',
    phoneNumber: '',
    customFields: [],
  },
  horoscopeDetails: {
    rasiChart: {
      houses: Array(12).fill(''),
    },
    navamsamChart: {
      houses: Array(12).fill(''),
    },
  },
})

export const getSampleBioData = (): BioData => ({
  personalDetails: {
    profileType: 'groom',
    headerTitle: 'ஜாதக குறிப்பு',
    name: 'ராஜேஷ் குமார்',
    age: '28',
    dateOfBirth: '1996-05-15',
    timeOfBirth: '10:30 AM',
    birthPlace: 'சென்னை, தமிழ்நாடு',
    gotra: 'Gotra',
    rasi: 'மேஷம் (Mesham)',
    nakshatram: 'அஸ்வினி (Ashwini)',
    lagnam: 'மேஷம் (Mesham)',
    education: 'B.E. Computer Science',
    job: 'Software Engineer, TCS',
    salary: '100000',
    height: '5\' 10"',
    complexion: 'வெள்ளை (Fair)',
    religion: 'இந்து (Hindu)',
    caste: 'முதலியார்',
    familyDeityName: 'முருகன்',
    photo: null,
    customFields: [],
  },
  familyDetails: {
    fatherName: 'குமார் செல்வராஜ்',
    fatherOccupation: 'Retired Bank Manager',
    motherName: 'லக்ஷ்மி குமார்',
    motherOccupation: 'Homemaker',
    siblings: '1 Sister (Married)',
    ancestry: 'திருச்சி',
    propertyDetails: 'Own House in Chennai, Agricultural Land',
    familyDeity: 'முருகன்',
    customFields: [],
  },
  contactDetails: {
    address: '45, Gandhi Nagar, Anna Salai, Chennai - 600002, Tamil Nadu',
    phoneNumber: '+91 98765 43210',
    customFields: [],
  },
  horoscopeDetails: {
    rasiChart: {
      houses: ['லக்னம்', 'சந்திரன்', '', 'குரு', '', '', 'சனி', 'ராகு', '', 'சூரியன், புதன்', 'செவ்வாய், சுக்கிரன்', 'கேது'],
    },
    navamsamChart: {
      houses: ['', 'குரு', 'சந்திரன்', '', 'சனி', '', '', '', 'ராகு', 'சூரியன்', 'செவ்வாய்', 'கேது, சுக்கிரன், புதன்'],
    },
  },
})
