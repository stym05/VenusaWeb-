"use client"

import { useEffect, useState } from "react"

export type CartLine = {
  slug: string
  qty: number
  size?: string
}

export const CART_KEY = "venusa_cart_v1"
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([])

  // ✅ Load from localStorage + backend
  useEffect(() => {
    const loadCart = async () => {
      try {
        // 1️⃣ Load from localStorage instantly
        const raw = localStorage.getItem(CART_KEY)
        if (raw) setLines(JSON.parse(raw))

        // 2️⃣ Sync from backend if logged in
        const res = await fetch(`${API_BASE}/api/cart/`, {
          credentials: "include",
        })
        if (res.ok) {
          const data = await res.json()
          const backendLines = data.map((item: any) => ({
            slug: item.product_slug || item.product?.slug,
            qty: item.quantity,
            size: item.size || undefined,
          }))
          setLines(backendLines)
          localStorage.setItem(CART_KEY, JSON.stringify(backendLines))
        }
      } catch (err) {
        console.error("Cart sync failed:", err)
      }
    }
    loadCart()
  }, [])

  // ✅ Persist + notify
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines))
      window.dispatchEvent(
        new CustomEvent("cart:updated", {
          detail: lines.reduce((n, l) => n + l.qty, 0),
        })
      )
    } catch {}
  }, [lines])

  // ✅ Add or update item
  const add = async (item: CartLine) => {
    setLines(prev => {
      const i = prev.findIndex(p => p.slug === item.slug && p.size === item.size)
      if (i >= 0) {
        const copy = [...prev]
        copy[i] = { ...copy[i], qty: copy[i].qty + item.qty }
        return copy
      }
      return [{ ...item }, ...prev]
    })

    try {
      await fetch(`${API_BASE}/api/cart/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })
    } catch (err) {
      console.error("Add cart failed:", err)
    }
  }

  // ✅ Remove item
  const remove = async (slug: string, size?: string) => {
    setLines(prev => prev.filter(p => !(p.slug === slug && p.size === size)))
    try {
      await fetch(`${API_BASE}/api/cart/remove/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, size }),
      })
    } catch (err) {
      console.error("Remove cart failed:", err)
    }
  }

  // ✅ Update quantity
  const setQty = async (slug: string, qty: number, size?: string) => {
    const safeQty = Math.max(1, qty)
    setLines(prev =>
      prev.map(p =>
        p.slug === slug && p.size === size ? { ...p, qty: safeQty } : p
      )
    )
    try {
      await fetch(`${API_BASE}/api/cart/update/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, size, quantity: safeQty }),
      })
    } catch (err) {
      console.error("Update qty failed:", err)
    }
  }

  // ✅ Increment / Decrement
  const inc = (slug: string, size?: string) =>
    setQty(slug, (lines.find(p => p.slug === slug && p.size === size)?.qty || 0) + 1, size)
  const dec = (slug: string, size?: string) =>
    setQty(slug, (lines.find(p => p.slug === slug && p.size === size)?.qty || 0) - 1, size)

  // ✅ Clear cart
  const clear = async () => {
    setLines([])
    try {
      await fetch(`${API_BASE}/api/cart/clear/`, {
        method: "POST",
        credentials: "include",
      })
    } catch (err) {
      console.error("Clear cart failed:", err)
    }
  }

  const count = lines.reduce((n, l) => n + l.qty, 0)

  return { lines, add, remove, setQty, inc, dec, clear, count }
}
