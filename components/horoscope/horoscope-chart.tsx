'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { PLANET_OPTIONS } from '@/lib/types'
import { X, ChevronDown, Edit } from 'lucide-react'
import { useState } from 'react'

interface HoroscopeChartProps {
  houses: string[]
  onChange: (houses: string[]) => void
  title: string
  readonly?: boolean
}

// Standard Tamil horoscope abbreviations for the readonly chart cells
const PLANET_SHORT: Record<string, string> = {
  'சூரியன்': 'சூ',
  'சந்திரன்': 'ச',
  'செவ்வாய்': 'செ',
  'புதன்': 'பு',
  'குரு': 'கு',
  'சுக்கிரன்': 'சு',
  'சனி': 'ச',
  'ராகு': 'ரா',
  'கேது': 'கே',
  'லக்னம்': 'ல',
}

/** Format multiple planets for display */
function formatCell(raw: string): string {
  if (!raw?.trim()) return ''
  return raw
    .split(',')
    .map(p => PLANET_SHORT[p.trim()] ?? p.trim())
    .slice(0, 4) // Show max 4 planets per cell in readonly mode
    .join('\n')
}

export function HoroscopeChart({ houses, onChange, title, readonly = false }: HoroscopeChartProps) {
  const handleHouseChange = (index: number, planets: string[]) => {
    const newHouses = [...houses]
    newHouses[index] = planets.join(',')
    onChange(newHouses)
  }

  if (readonly) {
    const cellStyle: React.CSSProperties = {
      border: '1px solid #374151',
      padding: '3px 2px',
      textAlign: 'center',
      fontSize: '9px',
      lineHeight: 1.3,
      color: '#111827',
      whiteSpace: 'pre-line',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }

    const centerStyle: React.CSSProperties = {
      gridColumn: 'span 2',
      gridRow: 'span 2',
      border: '1px solid #374151',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 500,
      color: '#111827',
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h4 style={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#111827' }}>{title}</h4>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 48px)',
            gridTemplateRows: 'repeat(4, 48px)',
            border: '1px solid #374151',
            width: 'fit-content',
            margin: '0 auto',
            backgroundColor: '#ffffff'
          }}
        >
          {/* Top row: 12, 1, 2, 3 */}
          <div style={cellStyle}>{formatCell(houses[11])}</div>
          <div style={cellStyle}>{formatCell(houses[0])}</div>
          <div style={cellStyle}>{formatCell(houses[1])}</div>
          <div style={cellStyle}>{formatCell(houses[2])}</div>

          {/* Second row: 11, [center], 4 */}
          <div style={cellStyle}>{formatCell(houses[10])}</div>
          <div style={centerStyle}>
            {title === 'ராசி கட்டம்' ? 'ராசி' : 'நவாம்சம்'}
          </div>
          <div style={cellStyle}>{formatCell(houses[3])}</div>

          {/* Third row: 10, [center continues], 5 */}
          <div style={cellStyle}>{formatCell(houses[9])}</div>
          <div style={cellStyle}>{formatCell(houses[4])}</div>

          {/* Bottom row: 9, 8, 7, 6 */}
          <div style={cellStyle}>{formatCell(houses[8])}</div>
          <div style={cellStyle}>{formatCell(houses[7])}</div>
          <div style={cellStyle}>{formatCell(houses[6])}</div>
          <div style={cellStyle}>{formatCell(houses[5])}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h4 className="text-center text-sm font-semibold">{title}</h4>
      <div
        className="grid gap-[2px] w-full mx-auto"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          minWidth: '280px',
          aspectRatio: '1',
        }}
      >
        {/* Top row: 12, 1, 2, 3 */}
        <HouseCell
          index={11}
          houses={houses}
          onChange={handleHouseChange}
        />
        <HouseCell
          index={0}
          houses={houses}
          onChange={handleHouseChange}
        />
        <HouseCell
          index={1}
          houses={houses}
          onChange={handleHouseChange}
        />
        <HouseCell
          index={2}
          houses={houses}
          onChange={handleHouseChange}
        />

        {/* Second row: 11, [center], 4 */}
        <HouseCell
          index={10}
          houses={houses}
          onChange={handleHouseChange}
        />
        <div className="col-span-2 row-span-2 border rounded-md flex items-center justify-center bg-muted/50 text-xs font-semibold text-muted-foreground">
          {title.includes('ராசி') ? 'ராசி' : 'நவாம்சம்'}
        </div>
        <HouseCell
          index={3}
          houses={houses}
          onChange={handleHouseChange}
        />

        {/* Third row: 10, [center continues], 5 */}
        <HouseCell
          index={9}
          houses={houses}
          onChange={handleHouseChange}
        />
        <HouseCell
          index={4}
          houses={houses}
          onChange={handleHouseChange}
        />

        {/* Bottom row: 9, 8, 7, 6 */}
        <HouseCell
          index={8}
          houses={houses}
          onChange={handleHouseChange}
        />
        <HouseCell
          index={7}
          houses={houses}
          onChange={handleHouseChange}
        />
        <HouseCell
          index={6}
          houses={houses}
          onChange={handleHouseChange}
        />
        <HouseCell
          index={5}
          houses={houses}
          onChange={handleHouseChange}
        />
      </div>
    </div>
  )
}

interface HouseCellProps {
  index: number
  houses: string[]
  onChange: (index: number, planets: string[]) => void
}

function HouseCell({ index, houses, onChange }: HouseCellProps) {
  const [isCustomMode, setIsCustomMode] = useState(false)
  const [customValue, setCustomValue] = useState('')

  // Get current planets as array
  const currentValue = houses[index] || ''
  const selectedPlanets = currentValue ? currentValue.split(',').filter(p => p.trim()) : []

  // Check if any planet is custom (not in PLANET_OPTIONS)
  const hasCustomPlanets = selectedPlanets.some(p => !PLANET_OPTIONS.some(opt => opt.value === p))

  // Handle planet toggle
  const togglePlanet = (planetValue: string) => {
    let newPlanets: string[]
    if (selectedPlanets.includes(planetValue)) {
      newPlanets = selectedPlanets.filter(p => p !== planetValue)
    } else {
      newPlanets = [...selectedPlanets, planetValue]
    }
    onChange(index, newPlanets)
  }

  // Handle custom planet addition
  const addCustomPlanet = () => {
    if (customValue.trim() && !selectedPlanets.includes(customValue.trim())) {
      const newPlanets = [...selectedPlanets, customValue.trim()]
      onChange(index, newPlanets)
      setCustomValue('')
      setIsCustomMode(false)
    }
  }

  // Remove a planet
  const removePlanet = (planet: string) => {
    const newPlanets = selectedPlanets.filter(p => p !== planet)
    onChange(index, newPlanets)
  }

  // Get planet label for display
  const getPlanetLabel = (planetValue: string): string => {
    const planet = PLANET_OPTIONS.find(p => p.value === planetValue)
    return planet?.label || planetValue
  }

  return (
    <div className="border rounded-md p-1 flex flex-col gap-1 bg-background">
      {/* House number */}
      <div className="text-[10px] text-muted-foreground text-center font-medium">
        {index + 1}
      </div>

      {/* Selected planets badges */}
      <div className="flex flex-wrap gap-1 min-h-[48px] max-h-[60px] overflow-y-auto">
        {selectedPlanets.map((planet) => (
          <Badge
            key={planet}
            variant="secondary"
            className="text-[9px] px-1 py-0 h-4 gap-0.5"
          >
            {getPlanetLabel(planet)}
            <button
              onClick={() => removePlanet(planet)}
              className="ml-0.5 hover:text-destructive"
            >
              <X className="h-2 w-2" />
            </button>
          </Badge>
        ))}
        {selectedPlanets.length === 0 && (
          <div className="text-[9px] text-muted-foreground text-center w-full">
            Click + to add
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-5 px-1 text-[9px] flex-1"
            >
              <ChevronDown className="h-3 w-3 mr-0.5" />
              Add
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="start">
            <div className="space-y-2">
              <div className="text-xs font-medium mb-1">Select Planets</div>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {PLANET_OPTIONS.map((planet) => (
                  <div key={planet.value || 'empty'} className="flex items-center space-x-2">
                    <Checkbox
                      id={`planet-${index}-${planet.value}`}
                      checked={selectedPlanets.includes(planet.value || '')}
                      onCheckedChange={() => togglePlanet(planet.value || '')}
                    />
                    <label
                      htmlFor={`planet-${index}-${planet.value}`}
                      className="text-xs cursor-pointer"
                    >
                      {planet.label}
                    </label>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs mt-2"
                onClick={() => setIsCustomMode(true)}
              >
                <Edit className="h-3 w-3 mr-1" />
                Add Custom
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear all button */}
        {selectedPlanets.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-5 px-1 text-[9px]"
            onClick={() => onChange(index, [])}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Custom planet input dialog */}
      {isCustomMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-4 w-80 shadow-lg">
            <h3 className="text-sm font-semibold mb-3">Add Custom Planet</h3>
            <Input
              placeholder="Enter planet name"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="mb-3"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') addCustomPlanet()
              }}
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsCustomMode(false)
                  setCustomValue('')
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={addCustomPlanet}
                disabled={!customValue.trim()}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}