"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"request" | "verify">("request")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      const res = await fetch("/api/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to send OTP")
      setMessage("OTP sent to your registered contact.")
      setStep("verify")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to reset password")
      setMessage("Password reset successful! Redirecting to login...")
      setTimeout(() => (window.location.href = "/login"), 1800)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-12 shadow-2xl ring-1 ring-gray-100">
        {step === "request" ? (
          <>
            <h1 className="text-4xl font-light text-gray-900 tracking-tight text-center">
              Forgot Password
            </h1>
            <p className="mt-3 text-center text-sm text-gray-500">
              Enter your registered email or phone number
            </p>
            <form onSubmit={handleSendOtp} className="mt-10 space-y-6">
              <Input
                type="text"
                placeholder="Email or phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:ring-2 focus:ring-black/20"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              {message && <p className="text-sm text-green-600">{message}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-black text-white py-4 text-sm font-medium shadow-lg hover:bg-gray-900"
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-light text-gray-900 tracking-tight text-center">
              Reset Password
            </h1>
            <p className="mt-3 text-center text-sm text-gray-500">
              Enter OTP and your new password
            </p>
            <form onSubmit={handleVerify} className="mt-10 space-y-6">
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:ring-2 focus:ring-black/20"
              />
              <Input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:ring-2 focus:ring-black/20"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              {message && <p className="text-sm text-green-600">{message}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-black text-white py-4 text-sm font-medium shadow-lg hover:bg-gray-900"
              >
                {loading ? "Verifying..." : "Reset Password"}
              </Button>
            </form>
          </>
        )}
      </div>
    </section>
  )
}
