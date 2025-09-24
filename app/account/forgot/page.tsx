// app/account/forgot/page.tsx
import type { Metadata } from "next"
import ForgotForm from "./ForgotForm"

export const metadata: Metadata = {
  title: "Forgot Password | VENUSA",
  description: "Reset your VENUSA account password.",
}

export default function ForgotPage() {
  return (
    <section className="container max-w-xl px-6 md:px-8 py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">Reset password</h1>
      <p className="mt-2 text-white/70">Enter your email and we’ll send you a reset link.</p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <ForgotForm />
      </div>

      <p className="mt-6 text-xs text-white/60">
        Remembered it? <a href="/account" className="underline hover:text-white">Back to sign in</a>
      </p>
    </section>
  )
}
