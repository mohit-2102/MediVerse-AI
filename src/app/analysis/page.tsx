// src/app/analysis/page.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import UploadCard from '@/components/analysis/UploadCard'
import ImagePanels from '@/components/analysis/ImagePanels'
import AnalysisResult from '@/components/analysis/AnalysisResult'
import TechnicalDetails from '@/components/analysis/TechnicalDetails'
import { useAnalysisStore } from '@/store/analysisStore'
import * as analysisService from '@/services/analysisService'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'

export default function AnalysisPage() {
  const router = useRouter()
  const fileUrl = useAnalysisStore((s) => s.fileUrl)
  const analyzed = useAnalysisStore((s) => s.analyzed)
  const uploading = useAnalysisStore((s) => s.uploading)
  const analyzing = useAnalysisStore((s) => s.analyzing)
  const setFileUrl = useAnalysisStore((s) => s.setFileUrl)
  const setAnalyzed = useAnalysisStore((s) => s.setAnalyzed)
  const setUploading = useAnalysisStore((s) => s.setUploading)
  const setAnalyzing = useAnalysisStore((s) => s.setAnalyzing)
  const reset = useAnalysisStore((s) => s.reset)

  async function handleFileSelected(file: File) {
    try {
      setUploading(true)
      // upload to supabase
      const { file_url } = await analysisService.uploadToSupabase(file)
      setFileUrl(file_url)
    } catch (err) {
      console.error('Upload failed', err)
      alert('Upload failed. See console for details.')
    } finally {
      setUploading(false)
    }
  }

  async function handleAnalyze() {
  if (!fileUrl) return

  try {
    setAnalyzing(true)

    const supabase = createBrowserSupabaseClient()

    // get auth user
    const { data: userData } = await supabase.auth.getUser()
    const user = userData?.user

    // fetch REAL patient_id from onboarding table
    const { data: profile } = await supabase
      .from("profiles")
      .select("patient_id")
      .eq("id", user.id)
      .single()

    const patient_id = profile?.patient_id ?? null

    const res = await analysisService.startAnalysis(fileUrl, {
      patient_id,
      user_id: user?.id ?? null,
    })

    if (res?.success) {
      setAnalyzed(res.data)
    } else {
      alert("Analysis failed: " + (res?.message ?? "unknown"))
    }
  } catch (err) {
    console.error("Analysis error", err)
    alert("Analysis failed. See console.")
  } finally {
    setAnalyzing(false)
  }
}




  return (
    <main className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Segmentation Preview & Disease Prediction</h1>
          <p className="text-sm text-gray-500 mt-1">Upload an image and run AI segmentation & prediction.</p>
        </div>

        {/* If no image yet, show Upload */}
        {!fileUrl && (
          <UploadCard onFileSelected={handleFileSelected} uploading={uploading} />
        )}

        {/* If image uploaded but not analyzed yet */}
        {fileUrl && !analyzed && (
          <>
            <ImagePanels original={fileUrl} segmentation={null} />
            <div className="flex items-center gap-4 justify-center mt-6">
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="px-6 py-3 bg-blue-600 text-white rounded-md"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Image'}
              </button>

              <button
                onClick={() => {
                  reset()
                }}
                className="px-6 py-3 bg-white border border-gray-200 rounded-md"
              >
                Reset
              </button>
            </div>
          </>
        )}

        {/* If analyzed show full UI */}
        {analyzed && (
          <>
            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              {/* Patient info row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div><p className="text-xs text-gray-500">Patient ID</p><p className="font-semibold">{analyzed.patient.patient_id}</p></div>
                <div><p className="text-xs text-gray-500">Scan Date</p><p className="font-semibold">{analyzed.patient.scan_date}</p></div>
                <div><p className="text-xs text-gray-500">Modality</p><p className="font-semibold">{analyzed.patient.modality}</p></div>
                <div><p className="text-xs text-gray-500">Status</p><p className="font-semibold text-green-600">{analyzed.patient.status}</p></div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6">
              <ImagePanels original={analyzed.images.original} segmentation={analyzed.images.segmentation} />
              <AnalysisResult data={analyzed} />
              <TechnicalDetails technical={analyzed.technical} />
            </div>
          </>
        )}
      </div>
    </main>
  )
}
