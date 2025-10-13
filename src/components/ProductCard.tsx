"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Product } from "@/lib/products"
import WishButton from "@/components/WishButton"

type ExtraFields = {
  mrp: number
  rating: number
  ratingCount: number
  blurDataURL: string
}

function formatINR(amount: number) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`
  }
}

export function ProductCard({
  product,
}: {
  product: Product & Partial<ExtraFields>
}) {
  const {
    slug,
    title = "Untitled Product",
    subtitle,
    images = [],
    price = 0,
    badges = [],
    mrp,
    rating,
    ratingCount,
    blurDataURL,
  } = product

  const primaryImage = images?.[0] ?? "/images/placeholder-product.jpg"
  const hoverImage = images?.[1] ?? null
  const hasDiscount = typeof mrp === "number" && mrp > price
  const discountPct = hasDiscount && mrp ? Math.round(((mrp - price) / mrp) * 100) : 0

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="group relative"
    >
      <Link
        href={`/product/${slug}`}
        prefetch={false}
        className="block overflow-hidden border border-neutral-200 bg-white transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
      >
        {/* Product Image */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full"
          >
            <Image
              src={primaryImage}
              alt={title}
              width={600}
              height={750}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
              className="w-full h-auto object-cover transition-transform duration-500 ease-out"
              placeholder={blurDataURL ? "blur" : "empty"}
              blurDataURL={blurDataURL}
            />
            {hoverImage && (
              <Image
                src={hoverImage}
                alt=""
                width={600}
                height={750}
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                aria-hidden="true"
              />
            )}
          </motion.div>


          {/* Wishlist */}
          <div className="absolute right-3 top-3 z-20">
            <WishButton slug={slug} small />
          </div>

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute left-3 top-3 z-10 bg-[#d12a2a] text-white px-2 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-sm">
              -{discountPct}%
            </div>
          )}

          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 z-20 flex justify-center bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <button
              onClick={(e) => {
                e.preventDefault()
                // handle add-to-cart logic here
                console.log("Add to cart:", slug)
              }}
              className="w-full text-sm font-medium uppercase tracking-wide py-3 hover:bg-black hover:text-white transition-all"
            >
              Quick Add
            </button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="px-3 sm:px-4 py-5 space-y-1">
          <h3 className="line-clamp-2 text-[16px] font-medium tracking-tight text-neutral-900 group-hover:text-black transition-colors">
            {title}
          </h3>

          {subtitle && (
            <p className="line-clamp-1 text-sm text-neutral-500">{subtitle}</p>
          )}

          {/* Rating */}
          {typeof rating === "number" && rating >= 0 && rating <= 5 && (
            <div className="flex items-center gap-1 text-xs text-amber-500">
              <StarRow value={rating} />
              <span className="text-black/70">{rating.toFixed(1)}</span>
              {ratingCount && (
                <span className="text-black/50">({ratingCount})</span>
              )}
            </div>
          )}

          {/* Pricing */}
          <div className="pt-1 flex items-baseline gap-2">
            <span className="tabular-nums font-semibold text-[17px] text-black">
              {formatINR(price)}
            </span>
            {hasDiscount && mrp && (
              <span className="tabular-nums text-sm text-neutral-400 line-through">
                {formatINR(mrp)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function StarRow({ value }: { value: number }) {
  const v = Math.max(0, Math.min(5, value))
  const full = Math.floor(v)
  const hasHalf = v - full >= 0.5
  const empty = 5 - full - (hasHalf ? 1 : 0)
  return (
    <span aria-label={`${v.toFixed(1)} out of 5`} className="flex text-amber-500">
      {"★".repeat(full)}
      {hasHalf && "⯨"}
      {"☆".repeat(empty)}
    </span>
  )
}
