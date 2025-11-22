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
  
  async submitHealthProfile(data: Record<string, any>) {
    return apiClient.post<{ patient_id: string, onboarding_completed: boolean }>(
      "/profiles/onboarding/complete",
      data
    )
  }
  async getProfile() {
    return apiClient.get("/profiles/me")
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
