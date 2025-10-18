"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupUser, verifyUserOtp } from "@/lib/api"

const Step1Schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Include country code e.g. +91..."),
  password: z.string().min(8, "At least 8 characters"),
})
type Step1Values = z.infer<typeof Step1Schema>

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false)
  const [otpMode, setOtpMode] = useState(false)
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm<Step1Values>({
    resolver: zodResolver(Step1Schema),
    defaultValues: { name: "", email: "", phone: "", password: "" },
  })

  async function onSubmit(values: Step1Values) {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await signupUser(values)
      if (res.message) {
        setSuccess("OTP sent to your phone!")
        setPhone(values.phone)
        setOtpMode(true)
      } else {
        throw new Error(res.error || "Failed to send OTP")
      }
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleVerify() {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await verifyUserOtp(phone, otp)
      if (res.message) {
        setSuccess("Account created successfully! Redirecting...")
      } else {
        throw new Error(res.error || "Invalid OTP")
      }
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // Shared input style
  const inputStyle =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition"

  // OTP View
  if (otpMode) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 px-5">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 shadow-2xl ring-1 ring-gray-100">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight text-center">
            Verify OTP
          </h1>
          <p className="mt-3 text-center text-sm text-gray-500">
            Code sent to <span className="font-medium text-gray-900">{phone}</span>
          </p>

          <div className="mt-8 space-y-5">
            <label className="text-sm font-medium text-gray-700">Enter OTP</label>
            <input
              value={otp}
              onChange={e => setOtp(e.target.value)}
              placeholder="123456"
              className={inputStyle}
            />

            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                disabled={loading || otp.length < 4}
                onClick={handleVerify}
                className="w-full rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white shadow-md hover:bg-neutral-900 transition"
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => onSubmit(form.getValues())}
                className="w-full rounded-xl border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 transition"
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Step 1 View
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 px-5">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 shadow-2xl ring-1 ring-gray-100">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight text-center">
          Create Account
        </h1>
        <p className="mt-3 text-center text-sm text-gray-500">
          Join VENUSA — where confidence meets design.
        </p>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-5 sm:space-y-6">
          <div>
            <input
              className={inputStyle}
              placeholder="Full name"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              className={inputStyle}
              placeholder="Email address"
              type="email"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              className={inputStyle}
              placeholder="Phone (with country code)"
              {...form.register("phone")}
            />
            {form.formState.errors.phone && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div>
            <input
              className={inputStyle}
              placeholder="Password"
              type="password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white shadow-md hover:bg-neutral-900 focus:ring-2 focus:ring-black/30 transition"
          >
            {loading ? "Creating..." : "Continue"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-gray-900 underline underline-offset-4 hover:text-gray-700 transition"
          >
            Sign in
          </a>
        </p>
      </div>
    </section>
  )
}
