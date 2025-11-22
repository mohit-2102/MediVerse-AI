// src/services/analysisService.ts
import { createBrowserSupabaseClient } from '@/lib/supabase/client'
import { apiClient } from '@/lib/api'

/**
 * Upload image to Supabase Storage 'analysis-images'
 * Returns { file_path, file_url }
 */
export async function uploadToSupabase(file: File, path?: string) {
  const supabase = createBrowserSupabaseClient()
  const key = `${path ?? 'public'}/${Date.now()}-${file.name}`.replace(/\s+/g, '-')
  const bucket = 'analysis-images'

  const { data, error } = await supabase.storage.from(bucket).upload(key, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    throw error
  }

  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path)

  return {
    file_path: data.path,
    file_url: publicUrlData.publicUrl,
  }
}

/**
 * Start Analysis API Call
 * Accepts: image_url + ANY extra fields using the `extras` object.
 *
 * Example:
 * startAnalysis(imageUrl, {
 *   patient_id: "PID123",
 *   user_id: user.id,
 *   scan_type: "MRI",
 *   modality: "T1",
 *   notes: "Testing"
 * })
 */
export async function startAnalysis(
  image_url: string,
  extras: Record<string, any> = {}
) {
  const payload = {
    image_url,
    patient_id: extras?.patient_id ?? undefined,
    user_id: extras?.user_id ?? undefined,
    ...extras,
  }

  console.log("🚀 Payload sent to /analysis/start:", payload)

  return apiClient.post('/analysis/start', payload)
}



// // src/services/analysisService.ts
// import { createBrowserSupabaseClient } from '@/lib/supabase/client'
// import { apiClient } from '@/lib/api'

// /**
//  * Upload image to Supabase Storage 'analysis-images' bucket and return public URL.
//  * Assumes you created a public bucket named 'analysis-images' in Supabase.
//  */
// export async function uploadToSupabase(file: File, path?: string) {
//   const supabase = createBrowserSupabaseClient()
//   const key = `${path ?? 'public'}/${Date.now()}-${file.name}`.replace(/\s+/g, '-')
//   const bucket = 'analysis-images'

//   const { data, error } = await supabase.storage.from(bucket).upload(key, file, {
//     cacheControl: '3600',
//     upsert: false,
//   })

//   if (error) {
//     throw error
//   }

//   // get public URL
//   const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
//   return {
//     file_path: data.path,
//     file_url: publicUrlData.publicUrl,
//   }
// }

// /**
//  * Start analysis - POST to your Next.js mock API which will forward to the backend when ready.
//  * Expects payload: { image_url, patient_id?, user_id? }
//  */
// export async function startAnalysis(image_url: string, patient_id?: string, user_id?: string) {
//   // internal API route in Next.js
//   const payload = { image_url, patient_id, user_id }
//   return apiClient.post('/analysis/start', payload)
// }
