// src/lib/analysis.ts
export type RiskInfo = {
  label: 'Safe' | 'Neutral' | 'Risk' | 'High Risk'
  color: string        // hex color for badges/labels
  bg: string           // hex or rgba for background panels
  numericBand: [number, number]
}

export function getRiskInfo(confidence: number): RiskInfo {
  // clamp 0..100
  const c = Math.max(0, Math.min(100, Math.round(confidence)))

  if (c < 25) {
    return {
      label: 'Safe',
      color: '#16A34A',         // green-600
      bg: 'rgba(16,163,127,0.08)',
      numericBand: [0, 24],
    }
  }

  if (c <= 50) {
    return {
      label: 'Neutral',
      color: '#6B7280',         // gray-500
      bg: 'rgba(107,114,128,0.06)',
      numericBand: [25, 50],
    }
  }

  if (c <= 75) {
    return {
      label: 'Risk',
      color: '#EF4444',         // red-500
      bg: 'rgba(239,68,68,0.06)',
      numericBand: [51, 75],
    }
  }

  return {
    label: 'High Risk',
    color: '#7F1D1D',         // dark red
    bg: 'rgba(127,29,29,0.08)',
    numericBand: [76, 100],
  }
}
