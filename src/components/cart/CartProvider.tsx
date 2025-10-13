"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

export type CartItem = {
  id: string
  qty: number
  size?: string
  price: number
  title: string
  image?: string
}

type CartState = { items: CartItem[] }

type CartContextType = {
  state: CartState
  add: (item: CartItem) => void
  setQty: (id: string, size: string | undefined, qty: number) => void
  remove: (id: string, size?: string) => void
  clear: () => void
}

const CART_KEY = "venusa_cart_v1"
const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  // persist + badge notify
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items))
      const count = items.reduce((n, i) => n + i.qty, 0)
      window.dispatchEvent(new CustomEvent("cart:updated", { detail: count }))
    } catch {}
  }, [items])

  const add: CartContextType["add"] = (item) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === item.id && p.size === item.size)
      if (i >= 0) {
        const copy = [...prev]
        copy[i] = { ...copy[i], qty: copy[i].qty + item.qty }
        return copy
      }
      return [{ ...item }, ...prev]
    })
  }

  const setQty: CartContextType["setQty"] = (id, size, qty) => {
    const safe = Math.max(1, qty)
    setItems((prev) =>
      prev.map((p) => (p.id === id && p.size === size ? { ...p, qty: safe } : p))
    )
  }

  const remove: CartContextType["remove"] = (id, size) => {
    setItems((prev) => prev.filter((p) => !(p.id === id && p.size === size)))
  }

  const clear: CartContextType["clear"] = () => setItems([])

  const value = useMemo<CartContextType>(
    () => ({ state: { items }, add, setQty, remove, clear }),
    [items]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within <CartProvider>")
  return ctx
}
