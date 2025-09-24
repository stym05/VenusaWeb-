"use client"

import { useEffect, useState } from "react"

export type CartLine = {
  slug: string
  qty: number
  size?: string
}

export const CART_KEY = "venusa_cart_v1"

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([])

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      if (raw) setLines(JSON.parse(raw))
    } catch {}
  }, [])

  // persist + notify
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines))
      window.dispatchEvent(new CustomEvent("cart:updated", { detail: lines.reduce((n, l) => n + l.qty, 0) }))
    } catch {}
  }, [lines])

  const add = (item: CartLine) =>
    setLines(prev => {
      const i = prev.findIndex(p => p.slug === item.slug && p.size === item.size)
      if (i >= 0) {
        const copy = [...prev]
        copy[i] = { ...copy[i], qty: copy[i].qty + item.qty }
        return copy
      }
      return [{ ...item }, ...prev]
    })

  const remove = (slug: string, size?: string) =>
    setLines(prev => prev.filter(p => !(p.slug === slug && p.size === size)))

  const setQty = (slug: string, qty: number, size?: string) =>
    setLines(prev =>
      prev.map(p => (p.slug === slug && p.size === size ? { ...p, qty: Math.max(1, qty) } : p))
    )

  const inc = (slug: string, size?: string) =>
    setLines(prev =>
      prev.map(p => (p.slug === slug && p.size === size ? { ...p, qty: p.qty + 1 } : p))
    )

  const dec = (slug: string, size?: string) =>
    setLines(prev =>
      prev.map(p =>
        p.slug === slug && p.size === size ? { ...p, qty: Math.max(1, p.qty - 1) } : p
      )
    )

  const clear = () => setLines([])

  const count = lines.reduce((n, l) => n + l.qty, 0)

  return { lines, add, remove, setQty, inc, dec, clear, count }
}
