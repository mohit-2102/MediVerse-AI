import React from "react"
import { getRiskInfo } from "@/lib/analysis"

export function ConfidenceBar({ confidence }: { confidence: number }) {
  const info = getRiskInfo(confidence)
  const pct = Math.max(0, Math.min(100, confidence)) + "%"

  return (
    <div className="w-full mt-2">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-2 transition-all duration-500 ease-out"
          style={{
            width: pct,
            background: info.color,
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  )
}
