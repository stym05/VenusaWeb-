// app/api/checkout/razorpay/webhook/route.ts
import { NextResponse } from "next/server"
import crypto from "crypto"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) return new NextResponse("Missing webhook secret", { status: 500 })

  // get raw body for signature verification
  const rawBody = await req.text()
  const signature = req.headers.get("x-razorpay-signature") || ""
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex")
  if (expected !== signature) return new NextResponse("Invalid signature", { status: 400 })

  const event = JSON.parse(rawBody)

  try {
    switch (event.event) {
      case "payment.captured": {
        const payment = event.payload.payment.entity
        const rzpOrderId: string = payment.order_id
        const rzpPaymentId: string = payment.id

        // rzpOrderId must be unique on Order
        const order = await prisma.order.findUnique({ where: { rzpOrderId } })
        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: "paid", rzpPaymentId, rzpSignature: signature },
          })
        }
        break
      }

      case "payment.failed": {
        const payment = event.payload.payment.entity
        const rzpOrderId: string = payment.order_id
        const order = await prisma.order.findUnique({ where: { rzpOrderId } })
        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: "failed" },
          })
        }
        break
      }

      default:
        // ignore other events for now
        break
    }
  } catch (e) {
    // swallow errors so Razorpay doesn't retry aggressively
  }

  return NextResponse.json({ ok: true })
}
