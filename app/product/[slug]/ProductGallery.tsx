// app/product/[slug]/ProductGallery.tsx
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type Size = "sm" | "md"
export default function ProductGallery({
  images,
  title,
  hasDiscount,
  discountPct,
  size = "md",
}: {
  images: string[]
  title: string
  hasDiscount?: boolean
  discountPct?: number
  size?: Size
}) {
  const [active, setActive] = useState(0)
  const imgs = Array.isArray(images) && images.length > 0 ? images : ["/images/placeholder-product.jpg"]

  const mainClass =
    size === "sm"
      ? "aspect-[4/5] max-h-[420px]"
      : "aspect-[4/5] max-h-[500px]" // medium by default

  // arrow-key nav (optional, nice UX)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % imgs.length)
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + imgs.length) % imgs.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [imgs.length])

  // click main to go next
  const next = () => setActive((i) => (i + 1) % imgs.length)

  return (
    <div className="p-3 md:p-4">
      {/* Main image (clickable) */}
      <button
        type="button"
        onClick={next}
        aria-label="Next image"
        className={`relative w-full ${mainClass} mx-auto overflow-hidden rounded-xl border border-black/10 bg-white`}
      >
        <Image
          key={imgs[active]}
          src={imgs[active]}
          alt={`${title} – image ${active + 1}`}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover transition-transform duration-300 will-change-transform"
          priority={false}
        />
        {hasDiscount && typeof discountPct === "number" && (
          <div className="absolute right-3 top-3 z-10 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
            -{discountPct}%
          </div>
        )}
        {/* subtle cue */}
        {imgs.length > 1 && (
          <div className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white">
            Click to view next
          </div>
        )}
      </button>

      {/* Thumbnails */}
      {imgs.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {imgs.slice(0, 10).map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={[
                "relative aspect-square overflow-hidden rounded-lg border transition bg-white",
                i === active ? "border-black/60 ring-2 ring-black/10" : "border-black/10 hover:border-black/30",
              ].join(" ")}
            >
              <Image src={src} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
