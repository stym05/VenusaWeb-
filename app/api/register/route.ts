import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { z } from "zod"
import sgMail from "@sendgrid/mail"
import twilio from "twilio"

export const runtime = "nodejs"

const prisma = new PrismaClient()
if (process.env.SENDGRID_API_KEY) sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const RegisterSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(8).max(20), // include country code on UI like +91...
  password: z.string().min(8).max(128),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = RegisterSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", issues: parsed.error.flatten() }, { status: 400 })
    }
    const { name, email, phone, password } = parsed.data

    // ensure uniqueness
    const exists = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
      select: { id: true, email: true, phone: true }
    })
    if (exists) {
      return NextResponse.json({ error: "Email or phone already registered" }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { name, email, phone, passwordHash }
    })

    // Send Welcome email (informational; verification remains via OTP)
    if (process.env.SENDGRID_API_KEY) {
      const msg = {
        to: email,
        from: {
          email: process.env.SENDGRID_FROM_EMAIL!,
          name: process.env.SENDGRID_FROM_NAME || "VENUSA"
        },
        subject: `Welcome to ${process.env.NEXT_PUBLIC_APP_NAME || "VENUSA"}`,
        text: `Hi ${name}, welcome to ${process.env.NEXT_PUBLIC_APP_NAME || "VENUSA"}!`,
        html: `<p>Hi ${name},</p><p>Welcome to <b>${process.env.NEXT_PUBLIC_APP_NAME || "VENUSA"}</b>!</p>`,
      }
      // fire-and-forget
      sgMail.send(msg).catch(() => {})
    }

    // Kick off Twilio Verify OTP to phone
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_VERIFY_SID) {
      return NextResponse.json(
        { userId: user.id, message: "User created. Twilio not configured—OTP not sent." },
        { status: 201 }
      )
    }

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    await client.verify.v2.services(process.env.TWILIO_VERIFY_SID)
      .verifications
      .create({ to: phone, channel: "sms" })

    return NextResponse.json({ userId: user.id, message: "OTP sent" }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
