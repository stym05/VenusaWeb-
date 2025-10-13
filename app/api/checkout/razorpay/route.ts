import { NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:8000"
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID!
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, email, phone } = body

    // 1️⃣ Create order in Django (store cart as an order)
    const orderRes = await fetch(`${BACKEND_URL}/api/checkout/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        phone,
        full_name: email.split("@")[0],
        address: "Online Order via Razorpay",
        city: "Auto",
        postal_code: "000000",
        country: "India",
      }),
    })

    if (!orderRes.ok) {
      const error = await orderRes.text()
      return NextResponse.json({ error }, { status: 400 })
    }

    const orderData = await orderRes.json()
    const orderId = orderData.id

    // 2️⃣ Compute total amount
    const totalAmount = items.reduce((sum: number, i: any) => sum + i.price * i.qty, 0)

    // 3️⃣ Create Razorpay order
    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64"),
      },
      body: JSON.stringify({
        amount: totalAmount * 100, // in paise
        currency: "INR",
        receipt: `VENUSA-${orderId}`,
      }),
    })

    const rzpData = await rzpRes.json()

    return NextResponse.json({
      key: RAZORPAY_KEY_ID,
      amount: rzpData.amount,
      currency: rzpData.currency,
      rzpOrderId: rzpData.id,
      orderId,
    })
  } catch (error: any) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}
