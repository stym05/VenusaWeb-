"use client"

import { useState } from "react"

export default function ForgotForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; text: string }>(null)

  const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)
    if (!isEmail(email)) return setStatus({ ok: false, text: "Enter a valid email." })

    setLoading(true)
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error(await res.text())
      setStatus({ ok: true, text: "If an account exists, a reset link has been sent." })
      setEmail("")
    } catch (err: any) {
      setStatus({ ok: false, text: err?.message ?? "Something went wrong. Try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {status && (
        <div
          role="status"
          className={`rounded-xl border px-4 py-3 text-sm ${
            status.ok ? "border-white/10 bg-white/5 text-white/80" : "border-white/20 bg-white/5 text-white/80"
          }`}
        >
          {status.text}
        </div>
      )}

      <div>
        <label className="block text-sm text-white/80">Email</label>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          placeholder="you@email.com"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send reset link"}
      </button>
    </form>
  )
}
