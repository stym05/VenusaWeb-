import { formatINR } from "@/lib/money"

export default function SummaryCard({
  subtotal,
  shipping,
  setShipping,
  discount,
  coupon,
  setCoupon,
  applyCoupon,
  total,
  loading,
  checkout,
  email,
}: any) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-medium text-neutral-900 mb-4">Order Summary</h2>

      <Row label="Subtotal" value={formatINR(subtotal * 100)} />
      <Row label="Shipping" value={shipping === "express" ? "₹199" : "Free"} />
      <Row label="Discount" value={discount ? `-₹${discount}` : "—"} />
      <div className="border-t border-neutral-200 mt-3 pt-3">
        <Row label="Total" value={formatINR(total * 100)} bold />
      </div>

      {/* Coupon */}
      <div className="mt-4 flex gap-2">
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Discount code"
          className="flex-1 border border-neutral-300 rounded-xl px-3 py-2 text-sm"
        />
        <button
          onClick={applyCoupon}
          className="px-4 py-2 text-sm rounded-xl border border-neutral-300 hover:bg-neutral-100"
        >
          Apply
        </button>
      </div>

      {/* Shipping option */}
      <div className="mt-5 space-y-2 text-sm text-neutral-700">
        <label className="font-medium">Delivery Option</label>
        <div className="flex flex-col gap-2 mt-1">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="ship"
              checked={shipping === "standard"}
              onChange={() => setShipping("standard")}
            />
            Standard (Free, 3–6 days)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="ship"
              checked={shipping === "express"}
              onChange={() => setShipping("express")}
            />
            Express (₹199, 1–2 days)
          </label>
        </div>
      </div>

      {/* Checkout CTA */}
      <button
        onClick={checkout}
        disabled={loading || !email}
        className="mt-6 w-full bg-black text-white rounded-2xl py-3 text-sm font-medium hover:bg-neutral-900 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>

      <p className="mt-3 text-[11px] text-neutral-500">
        By continuing, you agree to our{" "}
        <a href="/terms" className="underline hover:text-neutral-900">Terms</a>,{" "}
        <a href="/returns" className="underline hover:text-neutral-900">Returns Policy</a>, and{" "}
        <a href="/privacy" className="underline hover:text-neutral-900">Privacy Policy</a>.
      </p>
    </div>
  )
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={bold ? "font-medium text-neutral-800" : "text-neutral-600"}>{label}</span>
      <span className={bold ? "font-semibold text-neutral-900" : "text-neutral-700"}>{value}</span>
    </div>
  )
}
