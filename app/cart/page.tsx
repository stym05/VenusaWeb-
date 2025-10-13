// app/cart/page.tsx
import type { Metadata } from "next"
import CartClient from "./CartClient"

export const metadata: Metadata = {
  title: "Cart | VENUSA",
  description: "Review your items and complete checkout.",
}

export default function CartPage() {
  return (
    <section className="bg-white text-black">
      {/* Header */}
      <div className="container pt-12 pb-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Your Cart
        </h1>
        <p className="mt-2 text-black/60">
          Review your selection and proceed to secure checkout.
        </p>
      </div>

      {/* Main Content */}
      <div className="container pb-12">
        <CartClient />
      </div>
    </section>
  )
}
