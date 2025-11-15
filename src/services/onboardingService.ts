import { apiClient } from '@/lib/api'

interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
}

class OnboardingService {
  /**
   * 🧾 Save the complete health profile in one go
   */
  async submitHealthProfile(data: Record<string, any>): Promise<ApiResponse<null>> {
    // Send the entire form data to backend
    return apiClient.post<ApiResponse<null>>('/profiles/onboarding/complete', data)
  }

  /**
   * 👤 Fetch user’s existing profile (for prefill)
   */
  async getProfile(): Promise<Record<string, any>> {
    return apiClient.get<Record<string, any>>('/profiles/me')
  }

  /**
   * 📄 Upload health documents or reports (optional future use)
   */
  async uploadDocument(file: File): Promise<ApiResponse<{ file_url: string }>> {
    return apiClient.uploadFile<ApiResponse<{ file_url: string }>>(
      '/profiles/documents/upload',
      file
    )
  }
}

export const onboardingService = new OnboardingService()
