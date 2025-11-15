import { apiClient } from '@/lib/api'
import { getApiUrl } from '@/config/env'

class ProfileService {
  /**
   * Fetch profile details
   */
  async getProfile(): Promise<Record<string, any>> {
    return apiClient.get<Record<string, any>>(getApiUrl('/profiles/me'))
  }

  /**
   * Update profile fields
   */
  async updateProfile(data: Record<string, any>): Promise<{ success: boolean }> {
    return apiClient.put<{ success: boolean }>(getApiUrl('/profiles/me'), data)
  }

  /**
   * Upload profile picture
   */
  async uploadProfilePicture(file: File): Promise<{ profile_picture_url: string }> {
    return apiClient.uploadFile<{ profile_picture_url: string }>(
      getApiUrl('/profiles/profile-picture/upload'),
      file
    )
  }
}

export const profileService = new ProfileService()
