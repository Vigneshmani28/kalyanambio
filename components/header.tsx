'use client'

import { Moon, Sun, RotateCcw, Eye } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useBioData } from '@/lib/biodata-context'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import Image from 'next/image'

interface HeaderProps {
  /** Called when the user taps "Preview" on mobile */
  onOpenPreview?: () => void
}

export function Header({ onOpenPreview }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const { resetForm } = useBioData()

  const handleReset = () => {
    resetForm()
    toast.success('Form reset successfully!')
  }

  return (
    <header className="flex justify-center z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-primary-foreground shadow-sm overflow-hidden">
            <Image
              src="/logo/logo.png"
              alt="Logo"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Kalyanam Bio Data</h1>
            <p className="text-xs text-muted-foreground">திருமண பயோடேட்டா</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">

          {/* Preview — mobile only, replaces Sample Data */}
          {onOpenPreview && (
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden gap-1"
              onClick={onOpenPreview}
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
            </Button>
          )}

          {/* Reset */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline ml-1">Reset</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Form?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will clear all your entered data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Dark mode */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

      </div>
    </header>
  )
}