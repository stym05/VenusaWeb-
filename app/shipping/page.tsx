import type { Metadata } from "next"
import ShippingClient from "./ShippingClient"

export const metadata: Metadata = {
  title: "Shipping & Returns | VENUSA",
  description:
    "Learn about VENUSA shipping timelines, order confirmation, tracking, and returns policy.",
}

export default function ShippingPage() {
  return (
    <div className="w-full bg-[#0a0a0b]">
      <section className="container max-w-3xl px-6 md:px-8 py-12 text-white min-h-[100dvh]">
        {/* Header */}
        <h1 className="font-Body text-3xl md:text-4xl font-regular tracking-tight">
          Shipping & Returns
        </h1>
        <p className="mt-2 text-white/70">
          Last updated:{" "}
          <span className="text-white font-medium">[October 11, 2025]</span>
        </p>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-white/10" />

        {/* Animated subtle intro */}
        <div className="mb-10 text-white/80 leading-relaxed">
          At VENUSA, we ensure your orders are shipped promptly and arrive in
          perfect condition. Learn about our delivery timelines, cash-on-delivery
          options, and return process below.
        </div>

        {/* Main Content */}
        <div className="animate-fadeInUp">
          <ShippingClient />
        </div>

        {/* Soft footer divider */}
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/60">
          Need assistance?{" "}
          <a
            href="/contact"
            className="text-white underline underline-offset-4 hover:text-white/90 transition"
          >
            Contact our support team
          </a>
          .
        </div>
      </section>
    </div>
  )
}
