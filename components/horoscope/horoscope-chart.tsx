'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PLANET_OPTIONS } from '@/lib/types'
import { cn } from '@/lib/utils'

interface HoroscopeChartProps {
  houses: string[]
  onChange: (houses: string[]) => void
  title: string
  readonly?: boolean
}

// South Indian Horoscope Layout mapping
// Position in grid to house number
const HOUSE_POSITIONS = [
  { gridPos: '3', house: 0 },  // House 1 - Top row, col 2
  { gridPos: '2', house: 1 },  // House 2 - Top row, col 1
  { gridPos: '1', house: 2 },  // House 3 - Top row, col 0
  { gridPos: '5', house: 3 },  // House 4 - Row 2, col 0
  { gridPos: '9', house: 4 },  // House 5 - Row 3, col 0
  { gridPos: '13', house: 5 }, // House 6 - Bottom row, col 0
  { gridPos: '14', house: 6 }, // House 7 - Bottom row, col 1
  { gridPos: '15', house: 7 }, // House 8 - Bottom row, col 2
  { gridPos: '16', house: 8 }, // House 9 - Bottom row, col 3
  { gridPos: '12', house: 9 }, // House 10 - Row 3, col 3
  { gridPos: '8', house: 10 }, // House 11 - Row 2, col 3
  { gridPos: '4', house: 11 }, // House 12 - Top row, col 3
]

// Grid position to CSS class mapping for South Indian style
const getGridPosition = (index: number): string => {
  const positions: Record<number, string> = {
    0: 'col-start-2 row-start-1',
    1: 'col-start-1 row-start-1',
    2: 'col-start-1 row-start-2',
    3: 'col-start-1 row-start-3',
    4: 'col-start-1 row-start-4',
    5: 'col-start-2 row-start-4',
    6: 'col-start-3 row-start-4',
    7: 'col-start-4 row-start-4',
    8: 'col-start-4 row-start-3',
    9: 'col-start-4 row-start-2',
    10: 'col-start-4 row-start-1',
    11: 'col-start-3 row-start-1',
  }
  return positions[index] || ''
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

/** Abbreviate comma-separated planet string for a tiny cell */
function formatCell(raw: string): string {
  if (!raw?.trim()) return ''
  return raw
    .split(',')
    .map(p => PLANET_SHORT[p.trim()] ?? p.trim())
    .join('\n')
}

export function HoroscopeChart({ houses, onChange, title, readonly = false }: HoroscopeChartProps) {
  const handleHouseChange = (index: number, value: string) => {
    const newHouses = [...houses]
    newHouses[index] = value
    onChange(newHouses)
  }

  const handleCustomInput = (index: number, value: string) => {
    handleHouseChange(index, value)
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
      {/*
        Use a square container with a min-width so cells never collapse on mobile.
        The 4×4 grid with col-span-2 / row-span-2 center cell works via CSS grid auto-placement.
      */}
      <div
        className="grid gap-[2px] w-full mx-auto"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          minWidth: '260px',
          aspectRatio: '1',
        }}
      >
        {/* Top row: 12, 1, 2, 3 */}
        <HouseCell index={11} houses={houses} onChange={handleHouseChange} onCustomInput={handleCustomInput} />
        <HouseCell index={0} houses={houses} onChange={handleHouseChange} onCustomInput={handleCustomInput} />
        <HouseCell index={1} houses={houses} onChange={handleHouseChange} onCustomInput={handleCustomInput} />
        <HouseCell index={2} houses={houses} onChange={handleHouseChange} onCustomInput={handleCustomInput} />

        {/* Second row: 11, [center], 4 */}
        <HouseCell index={10} houses={houses} onChange={handleHouseChange} onCustomInput={handleCustomInput} />
        <div className="col-span-2 row-span-2 border rounded-md flex items-center justify-center bg-muted/50 text-xs font-semibold text-muted-foreground">
          {title.includes('ராசி') ? 'ராசி' : 'நவாம்சம்'}
        </div>
        <HouseCell index={3} houses={houses} onChange={handleHouseChange} onCustomInput={handleCustomInput} />

        {/* Third row: 10, [center continues], 5 */}
        <HouseCell index={9} houses={houses} onChange={handleHouseChange} onCustomInput={handleCustomInput} />
        <HouseCell index={4} houses={houses} onChange={handleHouseChange} onCustomInput={handleCustomInput} />

        {/* Bottom row: 9, 8, 7, 6 */}
        <HouseCell index={8} houses={houses} onChange={handleHouseChange} onCustomInput={handleCustomInput} />
        <HouseCell index={7} houses={houses} onChange={handleHouseChange} onCustomInput={handleCustomInput} />
        <HouseCell index={6} houses={houses} onChange={handleHouseChange} onCustomInput={handleCustomInput} />
        <HouseCell index={5} houses={houses} onChange={handleHouseChange} onCustomInput={handleCustomInput} />
      </div>
    </div>
  )
}

interface HouseCellProps {
  index: number
  houses: string[]
  onChange: (index: number, value: string) => void
  onCustomInput: (index: number, value: string) => void
}

function HouseCell({ index, houses, onChange, onCustomInput }: HouseCellProps) {
  const value = houses[index] || ''
  const isPlanetValue = PLANET_OPTIONS.some(p => p.value === value)

  return (
    // aspect-square keeps all cells uniform regardless of screen width
    <div className="border rounded-md p-[2px] aspect-square flex flex-col gap-[2px] overflow-hidden bg-background">
      <span className="text-[9px] text-muted-foreground text-center leading-none pt-[2px]">{index + 1}</span>
      <Select
        value={isPlanetValue ? value : '__custom__'}
        onValueChange={(v) => {
          if (v === '__custom__') return          // keep current free-text
          if (v === '__empty__') onChange(index, '') // "Empty" option → clear
          else onChange(index, v)
        }}
      >
        <SelectTrigger className="h-5 text-[9px] px-[2px] flex-shrink-0">
          <SelectValue placeholder="+" />
        </SelectTrigger>
        <SelectContent>
          {PLANET_OPTIONS.map((planet) => (
            <SelectItem key={planet.value || 'empty'} value={planet.value || '__empty__'} className="text-xs">
              {planet.label}
            </SelectItem>
          ))}
          <SelectItem value="__custom__" className="text-xs">Custom...</SelectItem>
        </SelectContent>
      </Select>
      <Input
        className="h-4 text-[9px] px-[2px] flex-1 min-h-0"
        placeholder="type here"
        value={value}
        onChange={(e) => onCustomInput(index, e.target.value)}
      />
    </div>
  )
}
