"use client"

import { useWishlist } from "./useWishlist"

export default function WishButton({ slug, small = false }: { slug: string; small?: boolean }) {
  const { slugs, toggle } = useWishlist()
  const wished = slugs.includes(slug)
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); toggle(slug) }}
      aria-pressed={wished}
      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      className={[
        "inline-flex items-center gap-1 rounded-full border transition",
        small ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm",
        wished ? "bg-black text-white border-black" : "border-black/10 text-black hover:bg-black/[0.04]"
      ].join(" ")}
    >
      <HeartIcon filled={wished} className={small ? "h-3.5 w-3.5" : "h-4 w-4"} />
      <span>{wished ? "Wishlisted" : "Add to wishlist"}</span>
    </button>
  )
}

function HeartIcon({ filled, className = "" }: { filled?: boolean; className?: string }) {
  return filled ? (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.3 5.7a5 5 0 0 0-7.1 0L12 6.9l-1.2-1.2a5 5 0 1 0-7.1 7.1l1.2 1.2L12 21l7.1-7.1 1.2-1.2a5 5 0 0 0 0-7.1Z"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M20.3 5.7a5 5 0 0 0-7.1 0L12 6.9l-1.2-1.2a5 5 0 1 0-7.1 7.1l1.2 1.2L12 21l7.1-7.1 1.2-1.2a5 5 0 0 0 0-7.1Z" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  )
}
