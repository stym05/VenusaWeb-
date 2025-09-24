"use client"

import { useMemo, useState } from "react"

type Mode = "signin" | "signup"

export default function AccountAuth() {
  const [mode, setMode] = useState<Mode>("signin")
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Sign in
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)

  // Sign up
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [newsletter, setNewsletter] = useState(true)
  const [agree, setAgree] = useState(true)

  const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v)
  const phoneClean = (p: string) => p.replace(/[^\d]/g, "")
  const validPhone = useMemo(() => phoneClean(phone).length >= 10, [phone])

  async function onSignIn(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    if (!isEmail(email)) return setMsg({ type: "error", text: "Enter a valid email." })
    if (password.length < 8) return setMsg({ type: "error", text: "Min 8 characters." })

    setLoading(true)
    try {
      // TODO: call /api/auth/signin
      await new Promise(r => setTimeout(r, 500))
      setMsg({ type: "success", text: "Signed in. Redirecting…" })
      // TODO: redirect
    } catch (err: any) {
      setMsg({ type: "error", text: err?.message ?? "Sign in failed." })
    } finally {
      setLoading(false)
    }
  }

  async function onSignUp(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    if (!fullName.trim()) return setMsg({ type: "error", text: "Enter your name." })
    if (!isEmail(signupEmail)) return setMsg({ type: "error", text: "Enter a valid email." })
    if (!validPhone) return setMsg({ type: "error", text: "Enter a valid phone." })
    if (signupPassword.length < 8) return setMsg({ type: "error", text: "Min 8 characters." })
    if (signupPassword !== confirmPassword) return setMsg({ type: "error", text: "Passwords do not match." })
    if (!agree) return setMsg({ type: "error", text: "You must agree to continue." })

    setLoading(true)
    try {
      // TODO: call /api/auth/signup
      await new Promise(r => setTimeout(r, 600))
      setMsg({ type: "success", text: "Account created. Please verify email." })
      setMode("signin")
      setEmail(signupEmail)
    } catch (err: any) {
      setMsg({ type: "error", text: err?.message ?? "Sign up failed." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Tabs — monochrome */}
      <div className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-1">
        <button
          type="button"
          onClick={() => setMode("signin")}
          aria-pressed={mode === "signin"}
          className={[
            "px-4 py-2 rounded-lg text-sm font-medium transition",
            mode === "signin" ? "bg-white text-black" : "text-white/80 hover:bg-white/10",
          ].join(" ")}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          aria-pressed={mode === "signup"}
          className={[
            "px-4 py-2 rounded-lg text-sm font-medium transition",
            mode === "signup" ? "bg-white text-black" : "text-white/80 hover:bg-white/10",
          ].join(" ")}
        >
          Create Account
        </button>
      </div>

      {/* Message — grey only */}
      {msg && (
        <div
          role="status"
          className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            msg.type === "error"
              ? "border-white/20 bg-white/5 text-white/80"
              : "border-white/10 bg-white/5 text-white/80"
          }`}
        >
          {msg.text}
        </div>
      )}

      {mode === "signin" ? (
        <form onSubmit={onSignIn} className="mt-6 space-y-4">
          <Field label="Email">
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="you@email.com"
            />
          </Field>

          <Field label="Password">
            <input
              type="password"
              required
              minLength={8}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="••••••••"
            />
          </Field>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-black/30"
              />
              Remember me
            </label>
            <a href="/account/forgot" className="text-sm text-white/70 hover:text-white">Forgot?</a>
          </div>

          <button type="submit" disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      ) : (
        <form onSubmit={onSignUp} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Full name">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Riya Sharma"
              />
            </Field>
            <Field label="Phone">
              <input
                type="tel"
                inputMode="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="+91 98XX-XXXXXX"
              />
            </Field>
          </div>

          <Field label="Email">
            <input
              type="email"
              required
              autoComplete="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="you@email.com"
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Password">
              <input
                type="password"
                required
                minLength={8}
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Min 8 characters"
              />
            </Field>
            <Field label="Confirm password">
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Re-enter password"
              />
            </Field>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <label className="inline-flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-black/30"
              />
              Subscribe to product updates (optional)
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-black/30"
              />
              I agree to the <a className="underline hover:text-white" href="/terms">Terms</a> &{" "}
              <a className="underline hover:text-white" href="/privacy">Privacy</a>
            </label>
          </div>

          <button type="submit" disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>
      )}

      <p className="mt-6 text-xs text-white/60">
        Problems? <a href="/account/forgot" className="underline hover:text-white">Reset password</a> ·{" "}
        <a href="/contact" className="underline hover:text-white">Contact support</a>
      </p>
    </div>
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
