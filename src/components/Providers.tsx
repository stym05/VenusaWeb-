"use client"

import React from "react"
import { CartProvider } from "@/components/cart/CartProvider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
