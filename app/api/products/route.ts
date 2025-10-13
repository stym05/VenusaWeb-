import { NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products/`, { cache: "no-store" })
    if (!res.ok) throw new Error(`Backend returned ${res.status}`)

    const raw = await res.json()

    const data = Array.isArray(raw)
      ? raw.map(p => ({
          ...p,
          currency: p.currency || "INR",
        }))
      : []

    return NextResponse.json(data)
  } catch (err) {
    console.error("❌ API Error:", err)
    return NextResponse.json([], { status: 500 })
  }
}
