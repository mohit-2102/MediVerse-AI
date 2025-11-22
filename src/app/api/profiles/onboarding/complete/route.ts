// src/app/api/profiles/onboarding/complete/route.ts
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { getInitials, generateCandidate } from "@/lib/patient-id"

const MAX_ATTEMPTS = 6
const BACKEND_ONBOARDING_URL = process.env.BACKEND_ONBOARDING_URL || process.env.NEXT_PUBLIC_API_URL || ""

export async function POST(req: Request) {
    try {
        const supabase = await createServerSupabaseClient()
        const body = await req.json()

        // get current logged user from cookies/session
        const { data: sessionData } = await supabase.auth.getSession()
        const user = sessionData?.session?.user
        if (!user) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 })

        // check if onboarding already completed
        const { data: existing, error: exErr } = await supabase
            .from("profiles")
            .select("onboarding_completed, patient_id")
            .eq("id", user.id)
            .single()

        if (exErr) {
            // if row not found, continue (you may prefer insert instead of update)
            // but bubble up only unexpected errors
            if (exErr.code !== "PGRST116") { /* PostgREST "No rows returned" code can differ */ }
        }

        if (existing?.onboarding_completed) {
            return NextResponse.json({ detail: "Already completed" }, { status: 400 })
        }

        // generate unique patient ID (INITIALS-7digits)
        const initials = getInitials(body.full_name || user.user_metadata?.full_name || "")
        let patientID = ""
        let attempt = 0

        while (attempt < MAX_ATTEMPTS) {
            const candidate = generateCandidate(initials)

            // efficient existence check using head:true + count: "exact"
            const { count, error: cntErr } = await supabase
                .from("profiles")
                .select("*", { head: true, count: "exact" })
                .eq("patient_id", candidate)

            if (cntErr) {
                // if count fails, don't crash; try again a couple times then fail
                attempt++
                continue
            }

            if ((count ?? 0) === 0) {
                patientID = candidate
                break
            }
            attempt++
        }

        if (!patientID) {
            return NextResponse.json({ detail: "Failed to generate ID" }, { status: 500 })
        }

        // update profile row (minimal fields) — uses eq('id', user.id)
        const { error: updErr } = await supabase
            .from("profiles")
            .update({
                patient_id: patientID,
                onboarding_completed: true,
                full_name: body.full_name ?? undefined,
                email: body.email ?? undefined,
            })
            .eq("id", user.id)

        if (updErr) {
            console.error("Supabase update error:", updErr)
            return NextResponse.json({ detail: "Failed to save profile" }, { status: 500 })
        }



        // forward full payload to your external backend (if configured)

        if (BACKEND_ONBOARDING_URL) {
            try {
                const payload = {
                    user_id: user.id,
                    patient_id: patientID,
                    ...body,
                }

                // 🔥 PRINT CLEAN JSON IN TERMINAL
                console.log("📨 Forwarding Payload:\n" + JSON.stringify(payload, null, 2))

                await fetch(
                    BACKEND_ONBOARDING_URL.replace(/\/$/, "") + "/profiles/onboarding/complete",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    }
                )
            } catch (forwardErr) {
                console.error("Forward to backend failed:", forwardErr)
            }
        }

        return NextResponse.json({
            success: true,
            message: "Onboarding saved successfully",
            data: {
                patient_id: patientID,
                onboarding_completed: true
            }
        })

    } catch (err) {
        console.error("route error:", err)
        return NextResponse.json({ detail: "Server error" }, { status: 500 })
    }
}

