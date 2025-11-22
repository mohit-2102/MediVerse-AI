// src/components/analysis/ImagePanels.tsx
'use client'

import React from 'react'

export default function ImagePanels({ original, segmentation }: { original: string | null; segmentation?: string | null }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="text-sm text-gray-600 mb-2">Original MRI Scan</div>
        <div className="w-full rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center" style={{ minHeight: 280 }}>
          {original ? (
            // original image
            <img src={original} alt="Original" className="object-contain max-h-[420px] w-full" />
          ) : (
            <div className="text-gray-400">No image</div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="text-sm text-gray-600 mb-2">AI Segmentation</div>
        <div className="w-full rounded-lg overflow-hidden bg-black flex items-center justify-center" style={{ minHeight: 280 }}>
          {segmentation ? (
            <img src={segmentation} alt="Segmentation" className="object-contain max-h-[420px] w-full" />
          ) : (
            <div className="text-white/60">Waiting for analysis...</div>
          )}
        </div>
      </div>
    </div>
  )
}
