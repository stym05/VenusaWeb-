// src/lib/auth.ts
"use client"

// This replaces NextAuth's session-based getCurrentUser()
// It now reads from localStorage JWT instead

export async function getCurrentUser() {
  if (typeof window === "undefined") return null

  const token = localStorage.getItem("accessToken")
  if (!token) return null

  try {
    const res = await fetch("http://127.0.0.1:8000/api/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("getCurrentUser() failed:", error)
    return null
  }
}
