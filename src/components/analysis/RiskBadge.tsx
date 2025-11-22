import React from "react"
import { getRiskInfo } from "@/lib/analysis"

export function RiskBadge({ confidence }: { confidence: number }) {
  const info = getRiskInfo(confidence)

  return (
    <span
      className="px-3 py-1 rounded-full text-sm font-semibold inline-block"
      style={{
        color: info.color,
        background: info.bg,
        border: `1px solid ${info.color}22`, // light tinted border
      }}
    >
      {info.label}
    </span>
  )
}
