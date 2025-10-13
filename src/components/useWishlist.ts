"use client"

import { useEffect, useState } from "react"

export const WISHLIST_KEY = "venusa_wishlist_v1" // local cache key

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export function useWishlist() {
  const [slugs, setSlugs] = useState<string[]>([])

  // ✅ Load wishlist from backend + localStorage
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        // 1️⃣ Load from localStorage instantly (for UX)
        const raw = localStorage.getItem(WISHLIST_KEY)
        if (raw) setSlugs(JSON.parse(raw))

        // 2️⃣ Fetch from backend if logged in
        const res = await fetch(`${API_BASE}/api/wishlist/`, {
          credentials: "include", // sends Django session cookie
        })
        if (res.ok) {
          const data = await res.json()
          const productSlugs = data.map((item: any) => item.product_slug || item.product?.slug)
          setSlugs(productSlugs)
          localStorage.setItem(WISHLIST_KEY, JSON.stringify(productSlugs))
        }
      } catch (err) {
        console.error("Wishlist sync failed:", err)
      }
    }
    loadWishlist()
  }, [])

  // ✅ Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(slugs))
      window.dispatchEvent(new CustomEvent("wishlist:updated", { detail: slugs.length }))
    } catch {}
  }, [slugs])

  // ✅ Add to wishlist (frontend + backend)
  const add = async (slug: string) => {
    setSlugs(prev => (prev.includes(slug) ? prev : [slug, ...prev]))
    try {
      await fetch(`${API_BASE}/api/wishlist/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })
    } catch (err) {
      console.error("Add wishlist failed:", err)
    }
  }

  // ✅ Remove item
  const remove = async (slug: string) => {
    setSlugs(prev => prev.filter(s => s !== slug))
    try {
      await fetch(`${API_BASE}/api/wishlist/remove/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })
    } catch (err) {
      console.error("Remove wishlist failed:", err)
    }
  }

  // ✅ Toggle add/remove
  const toggle = (slug: string) => {
    if (slugs.includes(slug)) remove(slug)
    else add(slug)
  }

  // ✅ Clear wishlist
  const clear = async () => {
    setSlugs([])
    try {
      await fetch(`${API_BASE}/api/wishlist/clear/`, {
        method: "POST",
        credentials: "include",
      })
    } catch (err) {
      console.error("Clear wishlist failed:", err)
    }
  }

  return { slugs, add, remove, toggle, clear, count: slugs.length }
}
