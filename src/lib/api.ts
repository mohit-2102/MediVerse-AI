/**
 * API Client (Frontend)
 * Handles all HTTP calls with automatic Bearer auth + clean error handling
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!

interface ApiError {
  detail: string
  status?: number
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    }

    if (includeAuth && typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token')
      if (token) headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let error: ApiError
      try {
        error = await response.json()
      } catch {
        error = { detail: `HTTP ${response.status}` }
      }
      throw new Error(error.detail || 'Something went wrong')
    }

    return response.json()
  }

  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    })
    return this.handleResponse<T>(res)
  }

  async post<T>(endpoint: string, data?: any, includeAuth = true): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(includeAuth),
      body: data ? JSON.stringify(data) : undefined,
    })
    return this.handleResponse<T>(res)
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })
    return this.handleResponse<T>(res)
  }

  async delete<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    })
    return this.handleResponse<T>(res)
  }

  async uploadFile<T>(endpoint: string, file: File): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    const token = localStorage.getItem('access_token')
    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    })
    return this.handleResponse<T>(res)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)

/** Utility for extracting clean error message */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'An unexpected error occurred'
}
