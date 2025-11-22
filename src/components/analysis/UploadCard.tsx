// src/components/analysis/UploadCard.tsx
'use client'

import React, { useRef } from 'react'

type Props = {
  onFileSelected: (file: File) => void
  uploading?: boolean
}

export default function UploadCard({ onFileSelected, uploading }: Props) {
  const ref = useRef<HTMLInputElement | null>(null)

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow border border-gray-100 text-center">
      <h3 className="text-lg font-semibold mb-2">Upload Medical Image</h3>
      <p className="text-sm text-gray-500 mb-4">Upload an MRI/CT scan (PNG/JPEG). We'll preview and analyze it.</p>

      <div className="flex flex-col items-center gap-4">
        <div className="w-full h-64 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="px-5 py-3 bg-blue-600 text-white rounded-md shadow"
          >
            {uploading ? 'Uploading...' : 'Select Image'}
          </button>
        </div>

        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onFileSelected(f)
            e.currentTarget.value = ''
          }}
        />

        <p className="text-xs text-gray-400">Recommended: high-resolution axial T1/T2 images</p>
      </div>
    </div>
  )
}
