/**
 * Environment configuration
 * Single source of truth for all API URLs
 */

const DEFAULT_URL = 'http://localhost:8000' // ✅ fallback for local dev

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_URL
export const API_URL = `${BASE_URL}` // If backend has `/api/v1`, append here if needed
export const UPLOADS_URL = BASE_URL

// Safe replace (only run if BASE_URL is defined)
export const WS_URL = BASE_URL
  ? BASE_URL.replace('https://', 'wss://').replace('http://', 'ws://')
  : 'ws://localhost:8000'

// Helper for uploaded media (profile pics, etc.)
export function getUploadUrl(relativePath: string): string {
  if (!relativePath) return ''
  if (relativePath.startsWith('http')) return relativePath

  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`
  return `${UPLOADS_URL}${path}`
}

// Helper for backend endpoints
export function getApiUrl(endpoint: string): string {
  const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  return `${API_URL}/${path}`
}
