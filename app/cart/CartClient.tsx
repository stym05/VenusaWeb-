"use client"

import { useMemo, useState } from "react"
import Script from "next/script"
import { useCart } from "@/components/cart/CartProvider"
import { formatINR } from "@/lib/money"
import CartItems from "@/components/CartItems"
import AddressForm from "@/components/AddressForm"
import SummaryCard from "@/components/SummaryCard"
import EmptyState from "@/components/EmptyState"

declare global { interface Window { Razorpay: any } }

export default function CartClient() {
  const { state, setQty, remove, clear } = useCart()
  const items = state.items
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState({
    name: "",
    line1: "",
    city: "",
    state: "",
    zip: "",
  })
  const [shipping, setShipping] = useState<"standard" | "express">("standard")
  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)
  const [loading, setLoading] = useState(false)

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items])
  const shippingFee = shipping === "express" ? 199 : 0
  const total = Math.max(0, subtotal - discount + shippingFee)

  async function applyCoupon() {
    if (!coupon.trim()) return
    const res = await fetch(`/api/coupons?code=${coupon}`)
    const data = await res.json()
    if (data.valid) {
      setDiscount(data.amount)
      alert(`Coupon applied — ₹${data.amount} off`)
    } else alert("Invalid or expired coupon.")
  }

  async function checkout() {
    if (!email || !address.name) return alert("Please fill in all required fields")
    setLoading(true)
    try {
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items, email, phone, address, discount, shipping }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Checkout error")

      const rzp = new window.Razorpay({
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "VENUSA",
        description: "Order payment",
        order_id: data.rzpOrderId,
        prefill: { email, contact: phone },
        theme: { color: "#000000" },
        handler: () => { clear(); window.location.href = `/thank-you?order=${data.rzpOrderId}` },
      })
      rzp.open()
    } catch (e: any) {
      alert(e?.message || "Payment failed")
    } finally { setLoading(false) }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <section className="container max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: Items + Address */}
          <div className="lg:col-span-7 space-y-10">
            <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
              Checkout
            </h1>

            {items.length ? (
              <>
                <CartItems items={items} setQty={setQty} remove={remove} />
                <AddressForm address={address} setAddress={setAddress} />
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4">
                  <h2 className="text-lg font-medium text-neutral-900">Contact</h2>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-neutral-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-neutral-500"
                  />
                </div>
              </>
            ) : (
              <EmptyState />
            )}
          </div>

          {/* RIGHT: Summary */}
          <aside className="lg:col-span-5 space-y-6">
            <SummaryCard
              subtotal={subtotal}
              shipping={shipping}
              setShipping={setShipping}
              discount={discount}
              coupon={coupon}
              setCoupon={setCoupon}
              applyCoupon={applyCoupon}
              total={total}
              loading={loading}
              checkout={checkout}
              email={email}
            />
          </aside>
        </div>
      </section>
    </>
  )
}
