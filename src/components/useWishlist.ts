"use client"

import { useEffect, useState } from "react"

export const WISHLIST_KEY = "venusa_wishlist_v1" // ← export the key

export function useWishlist() {
  const [slugs, setSlugs] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY)
      if (raw) setSlugs(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(slugs))
      // notify listeners (navbar badge, etc.)
      window.dispatchEvent(new CustomEvent("wishlist:updated", { detail: slugs.length }))
    } catch {}
  }, [slugs])

  const add = (slug: string) => setSlugs(prev => (prev.includes(slug) ? prev : [slug, ...prev]))
  const remove = (slug: string) => setSlugs(prev => prev.filter(s => s !== slug))
  const toggle = (slug: string) => setSlugs(prev => (prev.includes(slug) ? prev.filter(s => s !== slug) : [slug, ...prev]))
  const clear = () => setSlugs([])

  return { slugs, add, remove, toggle, clear, count: slugs.length }
}
