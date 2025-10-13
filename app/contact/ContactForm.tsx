"use client"

import { useState } from "react"

export default function ContactForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { type: "ok" | "err"; text: string }>(null)

  const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v)
  const cleanPhone = (v: string) => v.replace(/[^\d]/g, "")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)

    if (!fullName.trim()) return setStatus({ type: "err", text: "Please enter your name." })
    if (!isEmail(email)) return setStatus({ type: "err", text: "Please enter a valid email." })
    if (!message.trim()) return setStatus({ type: "err", text: "Please enter a message." })

    setLoading(true)
    try {
      // TODO: post to your handler /api/contact
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify({ fullName, email, phone: cleanPhone(phone), subject, message }) })
      await new Promise(r => setTimeout(r, 600)) // demo
      setStatus({ type: "ok", text: "Thanks! We’ll get back to you soon." })
      setFullName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("")
    } catch (err: any) {
      setStatus({ type: "err", text: err?.message ?? "Something went wrong. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* status */}
      {status && (
        <div
          role="status"
          className={`rounded-xl border px-4 py-3 text-sm ${
            status.type === "ok"
              ? "border-white/10 bg-white/5 text-white/80"
              : "border-white/20 bg-white/5 text-white/80"
          }`}
        >
          {status.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Name">
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Your full name"
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="you@email.com"
            autoComplete="email"
          />
        </Field>
      </div>

      <Field label="Phone (optional)">
        <input
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          placeholder="+91 98XX-XXXXXX"
        />
      </Field>

      <Field label="Subject">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          placeholder="Order support, wholesale, collaboration…"
        />
      </Field>

      <Field label="Message">
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          placeholder="Write your message…"
        />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send"}
      </button>

      <p className="text-xs text-white/60">
        By submitting, you agree to our{" "}
        <a href="/terms" className="underline hover:text-white">Terms</a> and{" "}
        <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>.
      </p>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm text-white/80">{label}</label>
      {children}
    </div>
  )
}
