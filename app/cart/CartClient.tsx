"use client"

import Script from "next/script"
import { useMemo, useState } from "react"
import Image from "next/image"
import { useCart } from "@/components/cart/CartProvider"
import { formatINR } from "@/lib/money"

declare global { interface Window { Razorpay: any } }

export default function CartClient() {
  const { state, setQty, remove, clear } = useCart()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const items = state.items
  const subtotalRupees = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items])

  async function checkout() {
    if (!items.length) return
    setLoading(true)
    try {
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items, email, phone }),
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
        handler: () => { clear(); window.location.href = "/thank-you" },
      })
      rzp.open()
    } catch (e: any) {
      alert(e?.message || "Failed to start payment")
    } finally { setLoading(false) }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* LEFT: Items */}
        <div className="md:col-span-7 lg:col-span-8">
          {!items.length ? (
            <EmptyState />
          ) : (
            <ul className="rounded-2xl border border-neutral-200 bg-white backdrop-blur-xl shadow-sm divide-y divide-neutral-200">
              {items.map((i) => (
                <li key={`${i.id}-${i.size ?? "nosize"}`} className="p-5 flex items-start gap-4">
                  <div className="relative h-24 w-20 sm:h-28 sm:w-24 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 shrink-0">
                    {i.image && <Image src={i.image} alt={i.title} fill className="object-cover" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-neutral-900 truncate">{i.title}</p>
                        <p className="text-xs text-neutral-500">
                          {i.size ? `Size: ${i.size}` : "One size"}
                        </p>
                      </div>
                      <div className="text-right min-w-[96px]">
                        <p className="font-semibold text-sm text-neutral-900">
                          {formatINR(i.price * 100)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center rounded-full border border-neutral-300 bg-neutral-100">
                        <button
                          className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-200 rounded-l-full"
                          onClick={() => setQty(i.id, i.size, Math.max(1, i.qty - 1))}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-3 py-1.5 text-sm tabular-nums text-neutral-900">{i.qty}</span>
                        <button
                          className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-200 rounded-r-full"
                          onClick={() => setQty(i.id, i.size, i.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="text-xs text-neutral-500 hover:text-neutral-900 transition"
                        onClick={() => remove(i.id, i.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT: Summary */}
        <aside className="md:col-span-5 lg:col-span-4 self-start">
          <div
            className="md:sticky md:top-6 max-h-[calc(100vh-7rem)] overflow-auto
                       rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-xl
                       shadow-lg p-5"
          >
            <h2 className="font-body text-lg font-semibold text-neutral-900 tracking-tight">
              Order Summary
            </h2>

            <div className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={formatINR(subtotalRupees * 100)} />
              <Row label="Shipping" value="Calculated at checkout" dim />
              <Row label="Taxes" value="Calculated at checkout" dim />
            </div>

            <div className="mt-4 border-t border-neutral-200 pt-3 flex items-center justify-between">
              <span className="text-neutral-700 text-sm">Total</span>
              <span className="text-xl font-semibold text-neutral-900">
                {formatINR(subtotalRupees * 100)}
              </span>
            </div>

            {/* Discount code */}
            <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Gift / discount code"
                className="rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              />
              <button
                type="button"
                className="rounded-xl border border-neutral-300 px-3.5 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                onClick={() => code && setCode("")}
              >
                Apply
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <Field label="Email for receipt">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                />
              </Field>

              <Field label="Phone (optional)">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98XX-XXXXXX"
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                />
              </Field>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={checkout}
                disabled={loading || !email || !items.length}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:opacity-60"
              >
                {loading ? "Starting payment…" : "Checkout with Razorpay"}
              </button>
              <a
                href="/shop"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                Continue shopping
              </a>
            </div>

            <p className="mt-3 text-[11px] text-neutral-500">
              By continuing, you agree to our{" "}
              <a href="/terms" className="underline hover:text-neutral-900">Terms</a> &{" "}
              <a href="/privacy" className="underline hover:text-neutral-900">Privacy</a>.
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}

function Row({ label, value, dim }: { label: string; value: string; dim?: boolean }) {
  const cls = dim ? "text-neutral-500" : "text-neutral-700"
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${cls}`}>{label}</span>
      <span className={`text-sm ${cls}`}>{value}</span>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm text-neutral-700">
      {label}
      {children}
    </label>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-xl p-10 text-center shadow-md">
      <div className="mx-auto mb-3 h-12 w-12 rounded-full border border-neutral-200 bg-neutral-100 grid place-items-center text-neutral-500">
        <span className="material-icons">shopping_bag</span>
      </div>
      <h2 className="font-semibold text-base text-neutral-900">Your cart is empty</h2>
      <p className="mt-1 text-sm text-neutral-500">Find something you love and add it here.</p>
      <a
        href="/shop"
        className="mt-4 inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
      >
        Browse the shop
      </a>
    </div>
  )
}
