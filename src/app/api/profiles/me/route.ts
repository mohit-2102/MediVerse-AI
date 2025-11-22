import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    // ❗ MUST await
    const supabase = await createServerSupabaseClient();

    // 1️⃣ Get session
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;

    if (!user) {
      return NextResponse.json(
        { detail: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Fetch profile
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      return NextResponse.json(
        { detail: error.message },
        { status: 500 }
      );
    }

    // 3️⃣ Return profile object
    return NextResponse.json(profile, { status: 200 });

  } catch {
    return NextResponse.json(
      { detail: "Server error" },
      { status: 500 }
    );
  }
}
