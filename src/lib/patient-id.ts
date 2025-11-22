// src/lib/patient-id.ts
import crypto from "crypto"

/**
 * Extracts initials from full name. If name is empty, returns 'XX'.
 * Examples:
 *  "Prem Raj Mishra" -> "PRM"
 *  "Mary" -> "M"
 */
export function getInitials(fullName: string): string {
  if (!fullName || typeof fullName !== "string") return "XX"
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p.replace(/[^A-Za-z0-9]/g, "")) // strip punctuation
    .filter(Boolean)
  if (parts.length === 0) return "XX"
  // join first letters of all parts (up to 4 parts to avoid huge initials)
  return parts.slice(0, 4).map((w) => w[0].toUpperCase()).join("")
}

/**
 * Generate a candidate ID: {INITIALS}-{7 digit secure random}
 * Uses crypto.randomInt for secure randomness.
 */
export function generateCandidate(initials: string): string {
  const safeInitials = (initials || "XX").toString().toUpperCase()
  // ensure 7-digit number: 1000000..9999999 inclusive
  const rnd = crypto.randomInt(1_000_000, 10_000_000)
  return `${safeInitials}-${rnd}`
}




// import crypto from "crypto";

// export function getInitials(fullName: string) {
//   if (!fullName) return "USR";

//   return fullName
//     .trim()
//     .split(/\s+/)
//     .map((w) => w[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 3);
// }

// export function generateCandidate(initials: string) {
//   const random = crypto.randomBytes(4).readUInt32BE(0);
//   const eightDigit = (random % 100_000_000).toString().padStart(8, "0");
//   return `${initials}-${eightDigit}`;
// }
