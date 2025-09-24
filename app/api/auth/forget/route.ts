// app/api/auth/forgot/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    // TODO: look up user by email, create a short-lived token, store it (DB) with expiry
    // const token = crypto.randomUUID()
    // await db.passwordReset.create({ data: { email, token, expiresAt } })

    // TODO: send email via your provider (Resend, AWS SES, etc.)
    // await sendResetEmail({ to: email, token })

    // Respond generically to avoid leaking which emails exist
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
