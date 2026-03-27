'use client'

import { cn } from '@/lib/utils'
import { User, Users, Phone, Star, FileText, Check } from 'lucide-react'

interface FormStepperProps {
  currentStep: number
  onStepClick: (step: number) => void
}

const steps = [
  { id: 0, label: 'Personal', tamilLabel: 'தனிநபர்', icon: User },
  { id: 1, label: 'Family', tamilLabel: 'குடும்பம்', icon: Users },
  { id: 2, label: 'Contact', tamilLabel: 'தொடர்பு', icon: Phone },
  { id: 3, label: 'Horoscope', tamilLabel: 'ஜாதகம்', icon: Star },
]

export function FormStepper({ currentStep, onStepClick }: FormStepperProps) {
  return (
    <div className="w-full">
      {/* Desktop Stepper */}
      <div className="hidden sm:flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id

          return (
            <div key={step.id} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => onStepClick(step.id)}
                className={cn(
                  'flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer',
                  isCurrent && 'scale-105',
                  'hover:opacity-80'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                    isCompleted && 'bg-primary text-primary-foreground',
                    isCurrent && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                    !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className="text-center">
                  <p
                    className={cn(
                      'text-xs font-medium',
                      isCurrent ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {step.tamilLabel}
                  </p>
                  <p
                    className={cn(
                      'text-[10px]',
                      isCurrent ? 'text-primary/80' : 'text-muted-foreground/60'
                    )}
                  >
                    {step.label}
                  </p>
                </div>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2',
                    currentStep > index ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile Stepper */}
      <div className="sm:hidden flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step) => {
          const Icon = step.icon
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick(step.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer',
                isCurrent && 'bg-primary text-primary-foreground',
                isCompleted && !isCurrent && 'bg-primary/10 text-primary',
                !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
              )}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              <span className="text-xs font-medium">{step.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
