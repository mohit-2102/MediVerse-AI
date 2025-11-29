'use client'

import React, { useEffect, useState } from 'react'
import UploadCard from '@/components/medical-upload/UploadCard'
import StatusList from '@/components/medical-upload/StatusList'
import FeatureCard from '@/components/medical-upload/FeatureCard'
import { useMedicalUploadStore } from '@/store/medicalUploadStore'
import { useMedicalDataStore } from '@/store/medicalDataStore'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { ShieldIcon, FastResultsIcon, DoctorVerifiedIcon } from "@/components/icons/FeatureIcons"


function StickyNavbar() {
    return (
        <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center">
                        UY
                    </div>
                    <div className="text-sm font-semibold">MediVerse</div>
                </div>
                <div className="text-gray-400">🔔</div>
            </div>
        </div>
    )
}

export default function MedicalUploadsPage() {
    const { medicineStatus, prescriptionStatus, voiceStatus } = useMedicalUploadStore()
    const { queryMedicalHistory, queryResult, isQuerying, error, clearError } = useMedicalDataStore()
    
    const [uploadedType, setUploadedType] = useState<'medicine' | 'prescription' | 'voice' | null>(null)
    const [queryText, setQueryText] = useState('')
    const [showQuery, setShowQuery] = useState(false)

    // Track which upload completes
    useEffect(() => {
        if (!uploadedType) {
            if (medicineStatus === 'uploaded') {
                setUploadedType('medicine')
                setShowQuery(true)
            } else if (prescriptionStatus === 'uploaded') {
                setUploadedType('prescription')
                setShowQuery(true)
            } else if (voiceStatus === 'uploaded') {
                setUploadedType('voice')
                setShowQuery(true)
            }
        }
    }, [medicineStatus, prescriptionStatus, voiceStatus, uploadedType])

    const anyUploaded = medicineStatus === 'uploaded' || prescriptionStatus === 'uploaded' || voiceStatus === 'uploaded'

    const handleQuery = async () => {
        if (queryText.trim()) {
            await queryMedicalHistory(queryText)
            setQueryText('')
        }
    }

    return (
        <>
            <StickyNavbar />

            <main className="min-h-screen bg-[#F8FAFF] py-6 md:py-10">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Progress bar card */}
                    <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <div className="text-sm font-semibold">Medical Data Upload</div>
                            </div>
                            {anyUploaded && <div className="text-xs text-green-600 flex items-center gap-1">
                                <Check size={14} /> Ready to Query
                            </div>}
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div
                                    className="h-2 bg-blue-600 rounded-full"
                                    style={{ width: anyUploaded ? '100%' : '0%' }}
                                />
                            </div>
                            <div className="text-xs text-gray-400 whitespace-nowrap">{anyUploaded ? 'Uploaded' : 'Select one'}</div>
                        </div>
                    </div>

                    {/* Upload Section */}
                    {!anyUploaded ? (
                        <div className="bg-white rounded-xl shadow border border-gray-200 p-0 overflow-hidden mb-10">
                            {/* Gradient Header */}
                            <div className="w-full h-[230px] bg-linear-to-b from-[#E3F2FD] to-[#BBDEFB] flex flex-col items-center justify-center text-center border-b border-gray-200">
                                <Image
                                    src="/images/medical-uploads.png"
                                    alt="medical upload"
                                    width={80}
                                    height={80}
                                    className="rounded-full bg-white shadow flex items-center justify-center mb-4 object-contain"
                                />
                                <h2 className="text-[22px] font-semibold text-gray-800">Upload Medical Data</h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    Choose any one type to get started
                                </p>
                            </div>

                            {/* Upload Cards */}
                            <div className="p-6">
                                <UploadCard />
                            </div>

                            {/* Status List */}
                            <div className="px-6 pb-10">
                                <StatusList />
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Success Message */}
                            <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <Check className="text-green-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Upload Complete!</p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Your {uploadedType} data has been processed and stored. Now you can query it with our AI assistant.
                                        </p>
                                    </div>
                                </div>

                                {/* Query Section */}
                                {showQuery && (
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ask About Your Medical Data</h3>
                                        
                                        {error && (
                                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
                                                <p className="text-sm text-red-600">{error}</p>
                                                <button onClick={clearError} className="text-red-600 hover:text-red-800">
                                                    ✕
                                                </button>
                                            </div>
                                        )}

                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={queryText}
                                                onChange={(e) => setQueryText(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                                                placeholder="Ask a question about your medical data..."
                                                disabled={isQuerying}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <button
                                                onClick={handleQuery}
                                                disabled={isQuerying || !queryText.trim()}
                                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium transition-colors"
                                            >
                                                {isQuerying ? 'Searching...' : 'Search'}
                                            </button>
                                        </div>

                                        {queryResult && (
                                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-2">
                                                    <strong>Q:</strong> {queryResult.query}
                                                </p>
                                                <p className="text-gray-800 whitespace-pre-wrap">
                                                    <strong>A:</strong> {queryResult.response}
                                                </p>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => {
                                                setUploadedType(null)
                                                setShowQuery(false)
                                                setQueryText('')
                                                window.location.reload()
                                            }}
                                            className="mt-6 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            ← Upload Different Data
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* HIPAA Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-12">
                        <FeatureCard
                            icon={<ShieldIcon />}
                            title="HIPAA Compliant"
                            description="Your medical data is encrypted and secure"
                            bgColor="bg-[#E8F0FF]"
                        />

                        <FeatureCard
                            icon={<FastResultsIcon />}
                            title="Fast Results"
                            description="Get AI analysis within 2–3 minutes"
                            bgColor="bg-[#E6F8EA]"
                        />

                        <FeatureCard
                            icon={<DoctorVerifiedIcon />}
                            title="Doctor Verified"
                            description="Results reviewed by certified physicians"
                            bgColor="bg-[#F3E8FF]"
                        />
                    </div>

                </div>
            </main>
        </>
    )
}


