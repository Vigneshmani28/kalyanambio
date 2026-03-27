'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { BioData, getDefaultBioData, TemplateType } from './types'

interface BioDataContextType {
  bioData: BioData
  setBioData: (data: BioData) => void
  updatePersonalDetails: (data: Partial<BioData['personalDetails']>) => void
  updateFamilyDetails: (data: Partial<BioData['familyDetails']>) => void
  updateContactDetails: (data: Partial<BioData['contactDetails']>) => void
  updateHoroscopeDetails: (data: Partial<BioData['horoscopeDetails']>) => void
  resetForm: () => void
  selectedTemplate: TemplateType
  setSelectedTemplate: (template: TemplateType) => void
  currentStep: number
  setCurrentStep: (step: number) => void
}

const BioDataContext = createContext<BioDataContextType | undefined>(undefined)

const STORAGE_KEY = 'tamil-biodata-form'

export function BioDataProvider({ children }: { children: ReactNode }) {
  const [bioData, setBioDataState] = useState<BioData>(getDefaultBioData)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('classic')
  const [currentStep, setCurrentStep] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setBioDataState(parsed)
      } catch (e) {
        console.error('Failed to parse saved data', e)
      }
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bioData))
    }
  }, [bioData, isHydrated])

  const setBioData = useCallback((data: BioData) => {
    setBioDataState(data)
  }, [])

  const updatePersonalDetails = useCallback((data: Partial<BioData['personalDetails']>) => {
    setBioDataState((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, ...data },
    }))
  }, [])

  const updateFamilyDetails = useCallback((data: Partial<BioData['familyDetails']>) => {
    setBioDataState((prev) => ({
      ...prev,
      familyDetails: { ...prev.familyDetails, ...data },
    }))
  }, [])

  const updateContactDetails = useCallback((data: Partial<BioData['contactDetails']>) => {
    setBioDataState((prev) => ({
      ...prev,
      contactDetails: { ...prev.contactDetails, ...data },
    }))
  }, [])

  const updateHoroscopeDetails = useCallback((data: Partial<BioData['horoscopeDetails']>) => {
    setBioDataState((prev) => ({
      ...prev,
      horoscopeDetails: { ...prev.horoscopeDetails, ...data },
    }))
  }, [])

  const resetForm = useCallback(() => {
    setBioDataState(getDefaultBioData())
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <BioDataContext.Provider
      value={{
        bioData,
        setBioData,
        updatePersonalDetails,
        updateFamilyDetails,
        updateContactDetails,
        updateHoroscopeDetails,
        resetForm,
        selectedTemplate,
        setSelectedTemplate,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </BioDataContext.Provider>
  )
}

export function useBioData() {
  const context = useContext(BioDataContext)
  if (!context) {
    throw new Error('useBioData must be used within BioDataProvider')
  }
  return context
}
