// src/components/analysis/AnalysisResult.tsx
'use client'

import React from 'react'
import { RiskBadge } from './RiskBadge'
import { ConfidenceBar } from './ConfidenceBar'

// lucide icons
import { Activity, MapPin, AlertTriangle } from 'lucide-react'

export default function AnalysisResult({ data }: { data: any }) {
  const confidence = data?.prediction?.confidence ?? 0

  return (
    <div className="mt-6">
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">

        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <AlertTriangle className="text-red-500 w-5 h-5" />
              Predicted Disease: <span className="text-gray-900">{data.prediction.disease}</span>
            </h3>
            <p className="text-sm text-gray-500 mt-1">{data.prediction.description}</p>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-500">Processing Time</div>
            <div className="text-sm font-medium text-gray-700 mt-1">{data.metrics.processing_time}</div>
          </div>
        </div>

        {/* CONFIDENCE SCORE */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Confidence Score</div>
            <div className="text-sm font-medium text-gray-700">{confidence}%</div>
          </div>

          <div className="mt-3">
            <ConfidenceBar confidence={confidence} />
          </div>
        </div>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

          {/* TUMOR VOLUME */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
            <div>
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Tumor Volume</p>
              <p className="text-2xl font-bold mt-1">{data.metrics.tumor_volume}</p>
              <p className="text-xs text-gray-400 mt-1">Estimated volume</p>
            </div>
          </div>

          {/* LOCATION */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
            <div>
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-xl font-semibold mt-1">{data.metrics.location}</p>
              <p className="text-xs text-gray-400 mt-1">Left hemisphere</p>
            </div>
          </div>

          {/* RISK LEVEL */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
            <div>
              <AlertTriangle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Risk Level</p>
              <div className="mt-2">
                <RiskBadge confidence={confidence} />
              </div>
              <p className="text-xs text-gray-400 mt-2">Requires attention</p>
            </div>
          </div>

        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex gap-4 justify-center">
        <button className="px-5 py-2 bg-blue-600 text-white rounded-md shadow">
          View AI Diagnosis Summary
        </button>
        <button className="px-5 py-2 bg-gray-800 text-white rounded-md shadow">
          Re-run Segmentation
        </button>
      </div>
    </div>
  )
}



// // src/components/analysis/AnalysisResult.tsx
// 'use client'

// import React from 'react'
// import { RiskBadge } from './RiskBadge'
// import { ConfidenceBar } from './ConfidenceBar'

// export default function AnalysisResult({ data }: { data: any }) {
//   const confidence = data?.prediction?.confidence ?? 0

//   return (
//     <div className="mt-6">
//       <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
//         <div className="flex items-start justify-between">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">
//               Predicted Disease: <span className="text-gray-900">{data.prediction.disease}</span>
//             </h3>
//             <p className="text-sm text-gray-500 mt-1">{data.prediction.description}</p>
//           </div>

//           <div className="text-right">
//             <div className="text-xs text-gray-500">Processing Time</div>
//             <div className="text-sm font-medium text-gray-700 mt-1">{data.metrics.processing_time}</div>
//           </div>
//         </div>

//         <div className="mt-6">
//           <div className="flex items-center justify-between">
//             <div className="text-sm text-gray-600">Confidence Score</div>
//             <div className="text-sm font-medium text-gray-700">{confidence}%</div>
//           </div>

//           <div className="mt-3">
//             <ConfidenceBar confidence={confidence} />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//           <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
//             <p className="text-xs text-gray-500">Tumor Volume</p>
//             <p className="text-2xl font-bold mt-1">{data.metrics.tumor_volume}</p>
//             <p className="text-xs text-gray-400 mt-1">Estimated volume</p>
//           </div>

//           <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
//             <p className="text-xs text-gray-500">Location</p>
//             <p className="text-xl font-semibold mt-1">{data.metrics.location}</p>
//             <p className="text-xs text-gray-400 mt-1">Left hemisphere</p>
//           </div>

//           <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
//             <p className="text-xs text-gray-500">Risk Level</p>
//             <div className="mt-2">
//               <RiskBadge confidence={confidence} />
//             </div>
//             <p className="text-xs text-gray-400 mt-2">Requires attention</p>
//           </div>
//         </div>

//       </div>
//         <div className="mt-6 flex gap-4 justify-center">
//           <button className="px-5 py-2 bg-blue-600 text-white rounded-md shadow">View AI Diagnosis Summary</button>
//           <button className="px-5 py-2 bg-gray-800 text-white rounded-md shadow">Re-run Segmentation</button>
//         </div>
//     </div>
//   )
// }

