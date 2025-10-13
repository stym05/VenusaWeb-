"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { loginWithBackend } from "@/lib/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
  
    try {
      const res = await loginWithBackend(email, password)
      setLoading(false)
  
      if (res.message === "Login successful" && res.access) {
        // ✅ Store token
        localStorage.setItem("accessToken", res.access)
        localStorage.setItem("userEmail", res.user.email)
        // ✅ Redirect
        router.push("/account")
      } else {
        setError(res.error || "Invalid credentials")
      }
    } catch (err) {
      console.error(err)
      setLoading(false)
      setError("Something went wrong")
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-12 shadow-2xl ring-1 ring-gray-100">
        <h1 className="text-4xl font-light text-gray-900 tracking-tight text-center">Sign In</h1>
        <p className="mt-3 text-center text-sm text-gray-500">Your world, one login away</p>

        <form onSubmit={onSubmit} className="mt-10 space-y-6">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-black px-5 py-4 text-sm font-medium text-white shadow-lg transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black/30"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

        {error && <p className="mt-4 text-center text-red-500 text-sm">{error}</p>}

        <div className="mt-10 flex items-center justify-center">
          <div className="h-px w-full bg-gray-200" />
          <span className="px-3 text-xs uppercase tracking-wider text-gray-400">or</span>
          <div className="h-px w-full bg-gray-200" />
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          New here?{" "}
          <Link
            href="/register"
            className="font-medium text-gray-900 underline underline-offset-4 hover:text-gray-700 transition"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  )
}
