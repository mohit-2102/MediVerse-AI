// src/app/api/analysis/start/route.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// ✅ Force Node.js runtime → ensures console.log prints in terminal
export const runtime = "nodejs"

/**
 * Mock analysis route.
 * In production you will forward payload to backend ML server and return its response.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // ✅ Print payload cleanly like your onboarding route does
    console.log("📨 Incoming /analysis/start Payload:\n" + JSON.stringify(body, null, 2))

    const imageUrl = body?.image_url ?? ""

    // Try forwarding to a local U-Net backend if available. Configure via
    // env var ANALYSIS_BACKEND_URL or default to localhost:8050
    const backendUrl = process.env.ANALYSIS_BACKEND_URL ?? "http://localhost:8050/api/uploadfile"
    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        const json = await res.json()
        console.log(`➡️ Forwarded to analysis backend (${backendUrl}) — status=${res.status}`)
        return NextResponse.json(json, { status: res.status })
      }

      console.warn(`⚠️ Analysis backend responded with status=${res.status}, falling back to mock.`)
    } catch (forwardErr) {
      console.warn("⚠️ Could not reach analysis backend, using mock response:", forwardErr)
    }

    // mock segmentation image
    const segmentation = "/images/mock-segmentation.png"

    const mock = {
      success: true,
      data: {
        patient: {
          patient_id: body?.patient_id ?? "MRI-2024-0892",
          scan_date: "March 15, 2024",
          modality: "T1-weighted MRI",
          status: "Analyzed",
        },
        images: {
          original: imageUrl,
          segmentation,
        },
        prediction: {
          disease: "Brain Tumor",
          description: "Glioblastoma multiforme (Grade IV)",
          confidence: 92,
        },
        metrics: {
          tumor_volume: "2.3 cm³",
          location: "Frontal",
          risk_level: "High",
          processing_time: "2.3 seconds",
        },
        technical: {
          dimensions: "512 × 512 × 120",
          voxel_size: "0.5 × 0.5 × 3.0 mm",
          slice_thickness: "3.0 mm",
          field_of_view: "256 × 256 mm",
          model_version: "BrainSeg v2.1",
          training_dataset: "BRATS 2023",
          accuracy: "94.2%",
          last_updated: "Feb 2024",
        },
      },
    }

    // simulate delay
    await new Promise((r) => setTimeout(r, 600))

    return NextResponse.json(mock)
  } catch (err) {
    console.error("❌ analysis/start error:", err)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}



// // src/app/api/analysis/start/route.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// /**
//  * Mock analysis route.
//  * In production you will forward payload to backend ML server and return its response.
//  * For now, returns a deterministic mock response that matches your UI screenshot.
//  */

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const imageUrl = body?.image_url ?? ''

//     // mock segmentation image (place file at public/images/mock-segmentation.png)
//     const segmentation = '/images/mock-segmentation.png'

//     const mock = {
//       success: true,
//       data: {
//         patient: {
//           patient_id: body?.patient_id ?? 'MRI-2024-0892',
//           scan_date: 'March 15, 2024',
//           modality: 'T1-weighted MRI',
//           status: 'Analyzed',
//         },
//         images: {
//           original: imageUrl,
//           segmentation,
//         },
//         prediction: {
//           disease: 'Brain Tumor',
//           description: 'Glioblastoma multiforme (Grade IV)',
//           confidence: 92,
//         },
//         metrics: {
//           tumor_volume: '2.3 cm³',
//           location: 'Frontal',
//           risk_level: 'High',
//           processing_time: '2.3 seconds',
//         },
//         technical: {
//           dimensions: '512 × 512 × 120',
//           voxel_size: '0.5 × 0.5 × 3.0 mm',
//           slice_thickness: '3.0 mm',
//           field_of_view: '256 × 256 mm',
//           model_version: 'BrainSeg v2.1',
//           training_dataset: 'BRATS 2023',
//           accuracy: '94.2%',
//           last_updated: 'Feb 2024',
//         },
//       },
//     }

//     // simulate processing delay if needed:
//     await new Promise((r) => setTimeout(r, 600))

//     return NextResponse.json(mock)
//   } catch (err) {
//     console.error('analysis/start error:', err)
//     return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
//   }
// }
