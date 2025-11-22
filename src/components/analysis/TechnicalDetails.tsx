// src/components/analysis/TechnicalDetails.tsx
'use client'

import React from 'react'

export default function TechnicalDetails({ technical }: { technical: any }) {
  if (!technical) return null

  return (
    <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h4 className="text-md font-semibold mb-4">Technical Details</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Image Properties</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><strong>Dimensions:</strong> {technical.dimensions}</li>
            <li><strong>Voxel Size:</strong> {technical.voxel_size}</li>
            <li><strong>Slice Thickness:</strong> {technical.slice_thickness}</li>
            <li><strong>Field of View:</strong> {technical.field_of_view}</li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">AI Model Information</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><strong>Model Version:</strong> {technical.model_version}</li>
            <li><strong>Training Dataset:</strong> {technical.training_dataset}</li>
            <li><strong>Accuracy:</strong> {technical.accuracy}</li>
            <li><strong>Last Updated:</strong> {technical.last_updated}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
