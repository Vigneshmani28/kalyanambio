'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CustomField } from '@/lib/types'

interface CustomFieldsProps {
  fields: CustomField[]
  onChange: (fields: CustomField[]) => void
}

export function CustomFields({ fields, onChange }: CustomFieldsProps) {
  const addField = () => {
    const newField: CustomField = {
      id: crypto.randomUUID(),
      label: '',
      value: '',
    }
    onChange([...fields, newField])
  }

  const updateField = (id: string, key: 'label' | 'value', value: string) => {
    onChange(fields.map((field) => (field.id === id ? { ...field, [key]: value } : field)))
  }

  const removeField = (id: string) => {
    onChange(fields.filter((field) => field.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          கூடுதல் விவரங்கள் / Custom Fields
        </Label>
        <Button type="button" variant="outline" size="sm" onClick={addField}>
          <Plus className="mr-1 h-3 w-3" />
          Add Field
        </Button>
      </div>

      {fields.length > 0 && (
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.id} className="flex items-start gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Field Name"
                  value={field.label}
                  onChange={(e) => updateField(field.id, 'label', e.target.value)}
                  className="mb-1"
                />
                <Input
                  placeholder="Value"
                  value={field.value}
                  onChange={(e) => updateField(field.id, 'value', e.target.value)}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeField(field.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
