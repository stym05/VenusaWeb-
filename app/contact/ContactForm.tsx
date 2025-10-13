"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { type: "ok" | "err"; text: string }>(null)

  const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)

    if (!fullName.trim()) return setStatus({ type: "err", text: "Please enter your name." })
    if (!isEmail(email)) return setStatus({ type: "err", text: "Please enter a valid email." })
    if (!message.trim()) return setStatus({ type: "err", text: "Please enter a message." })

    setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 800))
      setStatus({ type: "ok", text: "Message sent successfully." })
      setFullName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("")
    } catch {
      setStatus({ type: "err", text: "Something went wrong. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-xl space-y-6 text-regular text-neutral-900 tracking-wide"
    >
      {/* Status message */}
      {status && (
        <div
          role="status"
          className={`rounded-md border px-3 py-2 text-xs text-center ${
            status.type === "ok"
              ? "border-emerald-500/40 bg-emerald-100/60 text-emerald-700"
              : "border-red-400/40 bg-red-100/70 text-red-700"
          }`}
        >
          {status.text}
        </div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Full Name">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            className="input"
            required
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="input"
            required
          />
        </Field>
      </div>

      <Field label="Phone (optional)">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 98XX-XXXXXX"
          className="input"
        />
      </Field>

      <Field label="Subject">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Collaboration, support, inquiry..."
          className="input"
        />
      </Field>

      <Field label="Message">
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          className="input resize-none"
          required
        />
      </Field>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        disabled={loading}
        type="submit"
        className="w-full rounded-none border border-neutral-800 bg-neutral-900 px-4 py-2 text-[13px] font-medium text-white tracking-wide transition-all hover:bg-neutral-800 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </motion.button>

      <p className="text-center text-[11px] text-neutral-500 pt-2 leading-relaxed">
        By submitting, you agree to our{" "}
        <a href="/terms" className="underline hover:text-black">Terms</a> and{" "}
        <a href="/privacy" className="underline hover:text-black">Privacy Policy</a>.
      </p>

      {/* Styles */}
      <style jsx>{`
        .input {
          width: 100%;
          border: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.15);
          background: transparent;
          color: #111;
          padding: 0.5rem 0.25rem;
          font-size: 13px;
          transition: all 0.25s ease;
        }
        .input:focus {
          outline: none;
          border-color: rgba(0, 0, 0, 0.6);
        }
        .input::placeholder {
          color: rgba(0, 0, 0, 0.35);
        }
      `}</style>
    </motion.form>
  )
}

/* Reusable Field Component */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="block text-[14px] uppercase tracking-wider text-neutral-600">
        {label}
      </label>
      {children}
    </div>
  )
}
