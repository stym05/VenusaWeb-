// app/terms/page.tsx
import type { Metadata } from "next"
import TermsContent from "./TermsContent"

export const metadata: Metadata = {
  title: "Terms & Conditions | VENUSA",
  description: "VENUSA Terms & Conditions…",
}

export default function TermsPage() {
  return (
    <div className="w-full bg-[#0a0a0b]">
      <section className="container max-w-3xl px-6 md:px-8 py-12 text-white min-h-[100dvh]">
        <h1 className="font-Body text-3xl md:text-4xl font-regular tracking-tight">
          Terms & Conditions
        </h1>
        <p className="mt-2 text-white/70">
          Last updated: <span className="text-white font-regular">[October 11, 2025]</span>
        </p>

        {/* … your nav … */}

        <TermsContent />
      </section>
    </div>
  )
}
