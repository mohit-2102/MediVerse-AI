// src/store/analysisStore.ts
'use client'

import { create } from 'zustand'


export type AnalysisResult = {
  patient?: {
    patient_id?: string
    scan_date?: string
    modality?: string
    status?: string
  }
  images?: {
    original?: string
    segmentation?: string
  }
  prediction?: {
    disease?: string
    description?: string
    confidence?: number
  }
  metrics?: {
    tumor_volume?: string
    location?: string
    risk_level?: string
    processing_time?: string
  }
  technical?: Record<string, any>
}

type AnalysisState = {
  fileUrl: string | null
  analyzed: AnalysisResult | null
  uploading: boolean
  analyzing: boolean
  setFileUrl: (u: string | null) => void
  setAnalyzed: (r: AnalysisResult | null) => void
  setUploading: (v: boolean) => void
  setAnalyzing: (v: boolean) => void
  reset: () => void
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  fileUrl: null,
  analyzed: null,
  uploading: false,
  analyzing: false,
  setFileUrl: (u) => set({ fileUrl: u }),
  setAnalyzed: (r) => set({ analyzed: r }),
  setUploading: (v) => set({ uploading: v }),
  setAnalyzing: (v) => set({ analyzing: v }),
  reset: () =>
    set({
      fileUrl: null,
      analyzed: null,
      uploading: false,
      analyzing: false,
    }),
}))
