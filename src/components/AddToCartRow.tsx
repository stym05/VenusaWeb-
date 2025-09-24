"use client"

import { useState } from "react"
import { useCart } from "@/components/cart/CartProvider"

type Props = {
  id: string
  title: string
  price: number
  image?: string
  sizes?: string[]
}

export default function AddToCartRow({ id, title, price, image, sizes }: Props) {
  const { add } = useCart()
  const [size, setSize] = useState<string | undefined>(sizes?.[0])
  const [qty, setQty] = useState(1)
  const [adding, setAdding] = useState(false)

  const disabled = !!sizes?.length && !size

  const handleAdd = () => {
    if (disabled) return
    setAdding(true)
    add({ id, title, price, image, size, qty })
    setTimeout(() => setAdding(false), 300) // tiny affordance
  }

  return (
    <div className="space-y-4">
      {/* Sizes */}
      {Array.isArray(sizes) && sizes.length > 0 && (
        <div>
          <label className="text-sm text-white/75">Size</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map(s => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
                className={[
                  "size-btn", // your dark outline token from earlier
                  size === s ? "bg-white text-black border-white" : "",
                ].join(" ")}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Qty + CTAs */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center rounded-xl border border-white/15">
          <button type="button" className="px-3 py-2 text-white/80 hover:bg-white/10" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
          <span className="px-4 py-2 tabular-nums">{qty}</span>
          <button type="button" className="px-3 py-2 text-white/80 hover:bg-white/10" onClick={() => setQty(q => q + 1)}>+</button>
        </div>

        <button
          type="button"
          className="btn-primary min-w-40"
          onClick={handleAdd}
          disabled={adding || disabled}
        >
          {adding ? "Added ✓" : "Add to Cart"}
        </button>

        <button
          type="button"
          className="btn-outline min-w-40"
          onClick={handleAdd /* or go to checkout route */}
          disabled={disabled}
        >
          Buy Now
        </button>
      </div>

      {disabled && (
        <p className="text-xs text-white/60">Please select a size.</p>
      )}
    </div>
  )
}
