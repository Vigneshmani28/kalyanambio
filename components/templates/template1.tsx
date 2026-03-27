'use client'

import { BioData } from '@/lib/types'
import { HoroscopeChart } from '@/components/horoscope/horoscope-chart'

interface TemplateProps {
    bioData: BioData
}

export function ElegantTemplate({ bioData }: TemplateProps) {
    const { personalDetails, familyDetails, contactDetails, horoscopeDetails } = bioData

    return (
        <div
            style={{
                width: '794px',
                height: '1123px',
                margin: '0 auto',
                backgroundColor: '#fefaf5',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Decorative Border */}
            <div
                style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    right: '12px',
                    bottom: '12px',
                    border: '1px solid #d4af7a',
                    borderRadius: '12px',
                    pointerEvents: 'none',
                }}
            />

            {/* Decorative Corner Elements */}
            <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    width: '40px',
                    height: '40px',
                    borderTop: '2px solid #c9a87b',
                    borderLeft: '2px solid #c9a87b',
                    borderRadius: '8px 0 0 0',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '40px',
                    height: '40px',
                    borderTop: '2px solid #c9a87b',
                    borderRight: '2px solid #c9a87b',
                    borderRadius: '0 8px 0 0',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    width: '40px',
                    height: '40px',
                    borderBottom: '2px solid #c9a87b',
                    borderLeft: '2px solid #c9a87b',
                    borderRadius: '0 0 0 8px',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    width: '40px',
                    height: '40px',
                    borderBottom: '2px solid #c9a87b',
                    borderRight: '2px solid #c9a87b',
                    borderRadius: '0 0 8px 0',
                }}
            />

            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '32px 28px',
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#2c2418',
                    boxSizing: 'border-box',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Header with decorative pattern */}
                <div
                    style={{
                        textAlign: 'center',
                        position: 'relative',
                    }}
                >
                    {personalDetails.headerTitle && (
                        <div
                            style={{
                                fontSize: '11px',
                                fontWeight: '500',
                                color: '#b87c4f',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                marginBottom: '8px',
                            }}
                        >
                            {personalDetails.headerTitle}
                        </div>
                    )}

                    <div
                        style={{
                            position: 'relative',
                            display: 'inline-block',
                            marginBottom: '12px',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '18px',
                                color: '#b87c4f',
                                marginTop: '4px',
                                fontStyle: 'italic',
                            }}
                        >
                            ஜாதக குறிப்பு
                        </div>
                    </div>

                    {/* Decorative line */}
                    <div
                        style={{
                            width: '80px',
                            height: '2px',
                            background: 'linear-gradient(90deg, transparent, #d4af7a, #b87c4f, #d4af7a, transparent)',
                            margin: '12px auto 0',
                        }}
                    />
                </div>

                {/* Two column layout for Personal Details with Photo */}
                <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ flex: 2 }}>
                        <SectionTitle title="Personal Details" tamilTitle="தனிநபர் விவரங்கள்" />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                            <DetailRow label="Name" tamilLabel="பெயர்" value={personalDetails.name} />
                            <DetailRow label="Age" tamilLabel="வயது" value={personalDetails.age} />
                            <DetailRow label="Date of Birth" tamilLabel="பிறந்த தேதி" value={personalDetails.dateOfBirth} />
                            <DetailRow label="Time of Birth" tamilLabel="பிறந்த நேரம்" value={personalDetails.timeOfBirth} />
                            <DetailRow label="Birth Place" tamilLabel="பிறந்த இடம்" value={personalDetails.birthPlace} />
                            <DetailRow label="Rasi" tamilLabel="ராசி" value={personalDetails.rasi} />
                            <DetailRow label="Nakshatram" tamilLabel="நட்சத்திரம்" value={personalDetails.nakshatram} />
                            <DetailRow label="Lagnam" tamilLabel="லக்னம்" value={personalDetails.lagnam} />
                            <DetailRow label="Education" tamilLabel="கல்வி" value={personalDetails.education} />
                            <DetailRow label="Occupation" tamilLabel="தொழில்" value={personalDetails.job} />
                            <DetailRow label="Annual Income" tamilLabel="சம்பளம்" value={personalDetails.salary} />
                            <DetailRow label="Height" tamilLabel="உயரம்" value={personalDetails.height} />
                            <DetailRow label="Complexion" tamilLabel="நிறம்" value={personalDetails.complexion} />
                            <DetailRow label="Religion" tamilLabel="மதம்" value={personalDetails.religion} />
                            <DetailRow label="Caste" tamilLabel="ஜாதி" value={personalDetails.caste} />

                            {personalDetails.customFields.map((field) => (
                                <DetailRow key={field.id} label={field.label} tamilLabel="" value={field.value} />
                            ))}
                        </div>
                    </div>

                    {personalDetails.photo && personalDetails.photo.length > 0 && (
                        <div style={{ flexShrink: 0 }}>
                            <div
                                style={{
                                    width: '130px',
                                    height: '160px',
                                    border: '3px solid #d4af7a',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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
                <div>
                    <SectionTitle title="Family Details" tamilTitle="குடும்ப விவரங்கள்" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                        <DetailRow label="Father's Name" tamilLabel="தந்தை பெயர்" value={familyDetails.fatherName} />
                        {familyDetails.fatherOccupation && (
                            <DetailRow label="Father's Occupation" tamilLabel="தந்தை தொழில்" value={familyDetails.fatherOccupation} />
                        )}
                        <DetailRow label="Mother's Name" tamilLabel="தாய் பெயர்" value={familyDetails.motherName} />
                        {familyDetails.motherOccupation && (
                            <DetailRow label="Mother's Occupation" tamilLabel="தாய் தொழில்" value={familyDetails.motherOccupation} />
                        )}
                        <DetailRow label="Siblings" tamilLabel="உடன்பிறப்புகள்" value={familyDetails.siblings} />
                        <DetailRow label="Family Ancestry" tamilLabel="பூர்வீகம்" value={familyDetails.ancestry} />
                        <DetailRow label="Family Property" tamilLabel="சொத்து" value={familyDetails.propertyDetails} />
                        <DetailRow label="Family Deity" tamilLabel="குலதெய்வம்" value={familyDetails.familyDeity} />

                        {familyDetails.customFields.map((field) => (
                            <DetailRow key={field.id} label={field.label} tamilLabel="" value={field.value} />
                        ))}
                    </div>
                </div>

                {/* Horoscope Section - Side by Side */}
                <div>
                    <SectionTitle title="Horoscope" tamilTitle="ஜாதகம்" />
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '24px',
                            marginTop: '16px',
                        }}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <HoroscopeChart
                                    houses={horoscopeDetails.rasiChart.houses}
                                    onChange={() => { }}
                                    title="ராசி கட்டம்"
                                    readonly
                                />
                            </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
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
                </div>

                {/* Contact Details */}
                <div>
                    <SectionTitle title="Contact Information" tamilTitle="தொடர்பு விவரங்கள்" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                        <DetailRow label="Address" tamilLabel="முகவரி" value={contactDetails.address} />
                        <DetailRow label="Phone Number" tamilLabel="தொலைபேசி" value={contactDetails.phoneNumber} />

                        {contactDetails.customFields.map((field) => (
                            <DetailRow key={field.id} label={field.label} tamilLabel="" value={field.value} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ---------- Components ---------- */

function SectionTitle({ title, tamilTitle }: { title: string; tamilTitle: string }) {
    return (
        <div style={{ marginBottom: '12px' }}>
            <div
                style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#6b3e1c',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '12px',
                    flexWrap: 'wrap',
                }}
            >
                <span>{title}</span>
                <span
                    style={{
                        fontSize: '13px',
                        fontWeight: 'normal',
                        color: '#b87c4f',
                        fontStyle: 'italic',
                    }}
                >
                    {tamilTitle}
                </span>
            </div>
            <div
                style={{
                    height: '2px',
                    background: 'linear-gradient(90deg, #d4af7a, #f0e4d0)',
                    width: '100%',
                    marginTop: '6px',
                }}
            />
        </div>
    )
}

function DetailRow({ label, tamilLabel, value }: { label: string; tamilLabel: string; value: string }) {
    if (!value) return null

    return (
        <div
            style={{
                padding: '4px 0',
                borderBottom: '1px dotted #f0e4d0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '12px',
            }}
        >
            <div
                style={{
                    fontWeight: '500',
                    color: '#5a3e28',
                    fontSize: '12px',
                    minWidth: '100px',
                }}
            >
                {label}
                {tamilLabel && (
                    <span
                        style={{
                            fontSize: '10px',
                            color: '#b87c4f',
                            marginLeft: '6px',
                            fontWeight: 'normal',
                        }}
                    >
                        ({tamilLabel})
                    </span>
                )}
            </div>
            <div
                style={{
                    fontSize: '12px',
                    color: '#2c2418',
                    textAlign: 'right',
                    flex: 1,
                    wordBreak: 'break-word',
                }}
            >
                {value}
            </div>
        </div>
    )
}