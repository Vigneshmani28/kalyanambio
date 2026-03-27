'use client'

import { BioData } from '@/lib/types'
import { HoroscopeChart } from '@/components/horoscope/horoscope-chart'

interface TemplateProps {
  bioData: BioData
}

export function ClassicTemplate({ bioData }: TemplateProps) {
  const { personalDetails, familyDetails, contactDetails, horoscopeDetails } = bioData

  const scale = personalDetails.headerTitle ? 0.96 : 1

  return (
    <div
      style={{
        width: '794px',   // A4 width in px
        height: '1123px', // A4 height in px
        margin: '0 auto',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '18px 16px',
          transformOrigin: 'top center',
          fontFamily: 'Georgia, serif',
          color: '#111827',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            borderBottom: '1px solid #b45309',
            paddingBottom: '6px',
            marginBottom: '20px',
          }}
        >
          {personalDetails.headerTitle && (
            <h1
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#b45309',
              }}
            >
              {personalDetails.headerTitle}
            </h1>
          )}

          <h1
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#b45309',
              marginBottom: '14px',
            }}
          >
            ஜாதக குறிப்பு
          </h1>
        </div>

        {/* Personal */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <SectionTitle title="தனிநபர் விவரங்கள் / Personal Details" />
            <table style={{ width: '100%' }}>
              <tbody>
                <DetailRow label="பெயர் / Name" value={personalDetails.name} />
                <DetailRow label="வயது / Age" value={personalDetails.age} />
                <DetailRow label="பிறந்த தேதி / DOB" value={personalDetails.dateOfBirth} />
                <DetailRow label="பிறந்த நேரம் / Time" value={personalDetails.timeOfBirth} />
                <DetailRow label="பிறந்த இடம் / Place" value={personalDetails.birthPlace} />
                <DetailRow label="ராசி / Rasi" value={personalDetails.rasi} />
                <DetailRow label="நட்சத்திரம் / Star" value={personalDetails.nakshatram} />
                <DetailRow label="லக்னம் / Lagnam" value={personalDetails.lagnam} />
                <DetailRow label="கல்வி / Education" value={personalDetails.education} />
                <DetailRow label="தொழில் / Job" value={personalDetails.job} />
                <DetailRow label="சம்பளம் / Salary" value={personalDetails.salary} />
                <DetailRow label="உயரம் / Height" value={personalDetails.height} />
                <DetailRow label="நிறம் / Complexion" value={personalDetails.complexion} />
                <DetailRow label="மதம் / Religion" value={personalDetails.religion} />
                <DetailRow label="ஜாதி / Caste" value={personalDetails.caste} />

                {personalDetails.customFields.map((field) => (
                  <DetailRow key={field.id} label={field.label} value={field.value} />
                ))}
              </tbody>
            </table>
          </div>

          {personalDetails.photo && personalDetails.photo.length > 0 && (
            <div style={{ flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={personalDetails.photo}
                alt="Profile"
                style={{
                  width: '110px',
                  height: '140px',
                  objectFit: 'cover',
                  border: '1.5px solid #b45309',
                  borderRadius: '4px',
                }}
              />
            </div>
          )}
        </div>

        {/* Family */}
        <div style={{ marginTop: '10px' }}>
          <SectionTitle title="குடும்ப விவரங்கள் / Family Details" />
          <table style={{ width: '100%' }}>
            <tbody>
              <DetailRow label="தந்தை பெயர் / Father" value={`${familyDetails.fatherName}${familyDetails.fatherOccupation ? ` (${familyDetails.fatherOccupation})` : ''}`} />
              <DetailRow label="தாய் பெயர் / Mother" value={`${familyDetails.motherName}${familyDetails.motherOccupation ? ` (${familyDetails.motherOccupation})` : ''}`} />
              <DetailRow label="உடன்பிறப்புகள் / Siblings" value={familyDetails.siblings} />
              <DetailRow label="பூர்வீகம் / Ancestry" value={familyDetails.ancestry} />
              <DetailRow label="சொத்து / Property" value={familyDetails.propertyDetails} />
              <DetailRow label="குலதெய்வம் / Family Deity" value={familyDetails.familyDeity} />

              {familyDetails.customFields.map((field) => (
                <DetailRow key={field.id} label={field.label} value={field.value} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Horoscope - EXPANDS */}
        <div
          style={{
            marginTop: '10px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <SectionTitle title="ஜாதகம் / Horoscope" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              justifyItems: 'center',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <HoroscopeChart
                houses={horoscopeDetails.rasiChart.houses}
                onChange={() => { }}
                title="ராசி கட்டம்"
                readonly
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <HoroscopeChart
                houses={horoscopeDetails.navamsamChart.houses}
                onChange={() => { }}
                title="நவாம்ச கட்டம்"
                readonly
              />
            </div>
          </div>
        </div>

        {/* Contact - sticks bottom */}
        <div style={{ marginTop: 'auto' }}>
          <SectionTitle title="தொடர்பு விவரங்கள் / Contact Details" />
          <table style={{ width: '100%' }}>
            <tbody>
              <DetailRow label="முகவரி / Address" value={contactDetails.address} />
              <DetailRow label="தொலைபேசி / Phone" value={contactDetails.phoneNumber} />

              {contactDetails.customFields.map((field) => (
                <DetailRow key={field.id} label={field.label} value={field.value} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ---------- Components ---------- */

function SectionTitle({ title }: { title: string }) {
  return (
    <div style={{ marginBottom: '6px' }}>
      <div
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#b45309',
          paddingBottom: '8px', // padding (not margin) so html2canvas renders the gap reliably
        }}
      >
        {title}
      </div>

      {/* Underline - sits below text with clear separation */}
      <div
        style={{
          height: '1.5px',
          backgroundColor: '#fcd34d',
          width: '100%',
          marginTop: '0px', // keep flush with padding above
        }}
      />
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value) return null

  return (
    <tr>
      <td
        style={{
          padding: '2px 6px 2px 0',
          fontWeight: 500,
          color: '#374151',
          fontSize: '13px',
          width: '35%',
          verticalAlign: 'top',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: '2px 0',
          fontSize: '13px',
          color: '#111827',
        }}
      >
        : {value}
      </td>
    </tr>
  )
}