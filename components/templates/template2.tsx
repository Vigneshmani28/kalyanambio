'use client'

import { BioData } from '@/lib/types'
import { HoroscopeChart } from '@/components/horoscope/horoscope-chart'

interface TemplateProps {
    bioData: BioData
}

export function ElegantMarriageTemplate({ bioData }: TemplateProps) {
    const { personalDetails, familyDetails, contactDetails, horoscopeDetails } = bioData

    return (
        <div
            style={{
                width: '794px',
                height: '1123px',
                margin: '0 auto',
                backgroundColor: '#fffef7',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Decorative Side Border */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 40,
                    bottom: 40,
                    width: '4px',
                    background: 'linear-gradient(180deg, #c9a87c, #e8d4b4, #c9a87c)',
                    borderRadius: '0 2px 2px 0',
                    zIndex: 2,
                }}
            />

            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px 32px 24px 40px',
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#2c2416',
                    boxSizing: 'border-box',
                    overflowY: 'auto',
                }}
            >
                {/* Header with Ornamental Design */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {personalDetails.headerTitle && (
                        <div
                            style={{
                                fontSize: '10px',
                                letterSpacing: '4px',
                                textTransform: 'uppercase',
                                color: '#b48b5a',
                                marginBottom: '8px',
                                fontWeight: '400',
                            }}
                        >
                            {personalDetails.headerTitle}
                        </div>
                    )}

                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <h1
                            style={{
                                fontSize: '26px',
                                fontWeight: 'normal',
                                color: '#8b5a2b',
                                margin: 0,
                                fontFamily: 'Georgia, serif',
                                letterSpacing: '2px',
                            }}
                        >
                            ஜாதக குறிப்பு
                        </h1>
                    </div>
                </div>

                {/* Two Column Layout for Personal Details */}
                <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
                    <div style={{ flex: 1.6 }}>
                        <SectionTitle title="தனிநபர் விவரங்கள்" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
                            <ElegantDetailRow label="பெயர் / Name" value={personalDetails.name} />
                            <ElegantDetailRow label="வயது / Age" value={personalDetails.age} />
                            <ElegantDetailRow label="பிறந்த தேதி / DOB" value={personalDetails.dateOfBirth} />
                            <ElegantDetailRow label="பிறந்த நேரம் / Time" value={personalDetails.timeOfBirth} />
                            <ElegantDetailRow label="பிறந்த இடம் / Place" value={personalDetails.birthPlace} />
                            <ElegantDetailRow label="கோத்திரம் / Gotra" value={personalDetails.gotra} />
                            <ElegantDetailRow label="ராசி / Rasi" value={personalDetails.rasi} />
                            <ElegantDetailRow label="நட்சத்திரம் / Star" value={personalDetails.nakshatram} />
                            <ElegantDetailRow label="லக்னம் / Lagnam" value={personalDetails.lagnam} />
                            <ElegantDetailRow label="கல்வி / Education" value={personalDetails.education} />
                            <ElegantDetailRow label="தொழில் / Job" value={personalDetails.job} />
                            <ElegantDetailRow label="சம்பளம் / Salary" value={personalDetails.salary} />
                            <ElegantDetailRow label="உயரம் / Height" value={personalDetails.height} />
                            <ElegantDetailRow label="நிறம் / Complexion" value={personalDetails.complexion} />
                            <ElegantDetailRow label="மதம் / Religion" value={personalDetails.religion} />
                            <ElegantDetailRow label="ஜாதி / Caste" value={personalDetails.caste} />

                            {personalDetails.customFields?.map((field) => (
                                <ElegantDetailRow key={field.id} label={field.label} value={field.value} />
                            ))}
                        </div>
                    </div>

                    {personalDetails.photo && personalDetails.photo.length > 0 && (
                        <div style={{ flex: 0.8, textAlign: 'center' }}>
                            <div
                                style={{
                                    width: '120px',
                                    height: '140px',
                                    margin: '0 auto',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '3px solid #e8d4b4',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    background: '#faf5ea',
                                }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={personalDetails.photo}
                                    alt="Profile"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Family Details */}
                <div style={{ marginBottom: '20px' }}>
                    <SectionTitle title="குடும்ப விவரங்கள்" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 20px', marginTop: '8px' }}>
                        <ElegantDetailRow
                            label="தந்தை / Father"
                            value={`${familyDetails.fatherName}${familyDetails.fatherOccupation ? ` (${familyDetails.fatherOccupation})` : ''}`}
                        />
                        <ElegantDetailRow
                            label="தாய் / Mother"
                            value={`${familyDetails.motherName}${familyDetails.motherOccupation ? ` (${familyDetails.motherOccupation})` : ''}`}
                        />
                        <ElegantDetailRow label="உடன்பிறப்புகள் / Siblings" value={familyDetails.siblings} />
                        <ElegantDetailRow label="பூர்வீகம் / Ancestry" value={familyDetails.ancestry} />
                        <ElegantDetailRow label="சொத்து / Property" value={familyDetails.propertyDetails} />
                        <ElegantDetailRow label="குலதெய்வம் / Family Deity" value={familyDetails.familyDeity} />

                        {familyDetails.customFields?.map((field) => (
                            <ElegantDetailRow key={field.id} label={field.label} value={field.value} />
                        ))}
                    </div>
                </div>

                {/* Horoscope Section */}
                <div style={{ marginBottom: '20px' }}>
                    <SectionTitle title="ஜாதகம்" />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '30px',
                            background: '#fefaf2',
                            padding: '16px 20px',
                            borderRadius: '12px',
                            border: '1px solid #f0e4d0',
                            marginTop: '8px',
                        }}
                    >
                        <div>
                            <HoroscopeChart
                                houses={horoscopeDetails.rasiChart.houses}
                                onChange={() => { }}
                                title="ராசி கட்டம்"
                                readonly
                            />
                        </div>

                        <div>
                            <HoroscopeChart
                                houses={horoscopeDetails.navamsamChart.houses}
                                onChange={() => { }}
                                title="நவாம்ச கட்டம்"
                                readonly
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Details */}
                <div style={{ marginTop: 'auto' }}>
                    <SectionTitle title="தொடர்பு விவரங்கள்" />
                    <div
                        style={{
                            background: '#fefaf2',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            border: '1px solid #f0e4d0',
                            marginTop: '8px',
                        }}
                    >
                        <ElegantDetailRow label="முகவரி / Address" value={contactDetails.address} />
                        <ElegantDetailRow label="தொலைபேசி / Phone" value={contactDetails.phoneNumber} />

                        {contactDetails.customFields?.map((field) => (
                            <ElegantDetailRow key={field.id} label={field.label} value={field.value} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

/* Section Title Component with Proper Underline */
function SectionTitle({ title }: { title: string }) {
    return (
        <div style={{ marginBottom: '0px' }}>
            <div
                style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#8b5a2b',
                    letterSpacing: '1px',
                    paddingBottom: '6px',
                    display: 'inline-block',
                    borderBottom: '2px solid #e8d4b4',
                }}
            >
                {title}
            </div>
        </div>
    )
}

/* Elegant Detail Row Component */
function ElegantDetailRow({ label, value }: { label: string; value: string }) {
    if (!value || value.trim() === '') return null

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'baseline',
                fontSize: '11px',
                padding: '2px 0',
            }}
        >
            <span
                style={{
                    fontWeight: '500',
                    color: '#8b6b42',
                    minWidth: '120px',
                    fontSize: '10.5px',
                }}
            >
                {label}
            </span>
            <span
                style={{
                    color: '#3a2c1c',
                    marginLeft: '8px',
                    flex: 1,
                    fontSize: '10.5px',
                    lineHeight: '1.3',
                }}
            >
                : {value}
            </span>
        </div>
    )
}