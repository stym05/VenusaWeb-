import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import twilio from "twilio"

export const runtime = "nodejs"

const prisma = new PrismaClient()

const VerifySchema = z.object({
  userId: z.string().min(10),
  phone: z.string().min(8).max(20),
  code: z.string().min(4).max(8),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = VerifySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }
    const { userId, phone, code } = parsed.data

    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_VERIFY_SID) {
      return NextResponse.json({ error: "Twilio not configured" }, { status: 500 })
    }

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    const check = await client.verify.v2.services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks
      .create({ to: phone, code })

    if (check.status !== "approved") {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: userId },
      data: { phoneVerified: true }
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
