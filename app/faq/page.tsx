// app/faq/page.tsx
import type { Metadata } from "next"
import FAQ from "./FAQ"

export const metadata: Metadata = {
  title: "FAQs | VENUSA",
  description:
    "Answers about products & fit, ordering & payments, shipping & tracking, returns & exchanges, and general support.",
}

export default function FaqPage() {
  return (
    // Force solid dark page background that grows with content
    <div className="w-full bg-[#0a0a0b]">
      <section className="container max-w-3xl px-6 md:px-8 py-12 text-white min-h-[100dvh]">
        <h1 className="font-body text-3xl md:text-4xl font-regular tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-white/70">
          Find quick answers about products, orders, shipping, returns, and more.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <FAQ />
        </div>
      </section>
    </div>
  )
}
