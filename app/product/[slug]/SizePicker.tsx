// app/product/[slug]/SizePicker.tsx
"use client"

import { useState } from "react"

export default function SizePicker({ sizes, light = false }: { sizes: string[]; light?: boolean }) {
  const [sel, setSel] = useState<string | null>(null)
  const base = light
    ? "border border-black/15 bg-white text-black hover:bg-black/[0.04]"
    : "border border-white/20 bg-white/5 text-white hover:bg-white/10"

  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((s) => {
        const active = sel === s
        return (
          <button
            key={s}
            type="button"
            onClick={() => setSel(s)}
            aria-pressed={active}
            className={[
              "min-w-12 rounded-full px-3 py-2 text-sm transition",
              active ? "bg-black text-white border border-black" : base,
            ].join(" ")}
          >
            {s}
          </button>
        )
      })}
    </div>
  )
}
