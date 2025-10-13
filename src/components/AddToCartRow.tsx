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

export default function AddToCartRow({ id, title, price, image, sizes = [] }: Props) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "")

  const handleAdd = () => {
    add({
      id,
      qty,
      size: selectedSize || undefined,
      price: Number.isFinite(price) ? price : 0,
      title,
      image,
    })
  }

  return (
    <div className="flex flex-col gap-6 mt-8">
      {/* Size Picker */}
      {sizes.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
            Select Size
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 font-medium
                  ${
                    selectedSize === s
                      ? "border-black bg-black text-white shadow-sm"
                      : "border-neutral-300 text-neutral-800 hover:bg-neutral-100"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & CTA */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Quantity Selector */}
        <div className="inline-flex items-center border border-neutral-300 rounded-full bg-white shadow-sm">
          <button
            type="button"
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 py-1.5 text-neutral-700 hover:bg-neutral-100 rounded-l-full transition"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-4 py-1.5 text-sm text-neutral-900 tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty(qty + 1)}
            className="px-3 py-1.5 text-neutral-700 hover:bg-neutral-100 rounded-r-full transition"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-sm"
        >
          Add to Cart
        </button>

        {/* Buy Now */}
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-full border border-black/20 px-6 py-2.5 text-sm font-medium text-black hover:bg-black hover:text-white active:scale-[0.98] transition-all"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}
