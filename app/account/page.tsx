// app/account/page.tsx
import type { Metadata } from "next"
import AccountAuth from "./AccountAuth"

export const metadata: Metadata = {
  title: "Account | VENUSA",
  description: "Sign in or create your VENUSA account.",
}

export default function AccountPage() {
  return (
    <section className="container max-w-xl px-6 md:px-8 py-12">
      <h1 className="font-body text-3xl font-semibold tracking-tight">Your Account</h1>
      <p className="mt-2 text-white/70">Sign in to manage orders — or create a new account.</p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <AccountAuth />
      </div>
    </section>
  )
}
