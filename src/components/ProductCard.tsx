import Link from "next/link"
import Image from "next/image"
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
    return `₹ ${Number(amount || 0).toLocaleString("en-IN")}`
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
    // Optional extras (may or may not exist on your Product)
    mrp,
    rating,
    ratingCount,
    blurDataURL,
  } = product

  const primaryImage = images?.[0] ?? "/images/placeholder-product.jpg"
  const hoverImage = images?.[1] ?? null

  const hasDiscount = typeof mrp === "number" && mrp > price
  const discountPct =
    hasDiscount && mrp ? Math.round(((mrp - price) / mrp) * 100) : 0

  return (
    <Link
      href={`/product/${slug}`}
      aria-label={`${title}${subtitle ? ` – ${subtitle}` : ""}`}
      className="group relative block overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
      prefetch={false}
    >
      {/* Image area */}
      <div className="relative aspect-[3/4] bg-neutral-100">
        <Image
          src={primaryImage}
          alt={title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className={`object-cover transition-transform duration-500 ${hoverImage ? "group-hover:scale-[1.03]" : ""}`}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          priority={false}
        />

        {hoverImage && (
          <Image
            src={hoverImage}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
            priority={false}
          />
        )}

        {/* Top-right wish toggle (non-navigating) */}
            <div className="absolute right-2 top-2 z-10">
              <WishButton slug={slug} small />
            </div>

        {/* Badges */}
        {badges?.length ? (
          <div className="pointer-events-none absolute left-2 top-2 z-10 flex flex-wrap gap-1.5">
            {badges.slice(0, 3).map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="rounded-full bg-black/80 px-2.5 py-1 text-xs font-medium text-white shadow-sm backdrop-blur"
              >
                {b}
              </span>
            ))}
            {badges.length > 3 && (
              <span className="rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white/90">
                +{badges.length - 3}
              </span>
            )}
          </div>
        ) : null}

        {/* Discount */}
        {hasDiscount && (
          <div className="absolute right-2 top-2 z-10 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
            -{discountPct}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="mt-1 line-clamp-2 text-lg font-semibold leading-snug">
          {title}
        </h3>

        {subtitle ? (
          <p className="mt-1 line-clamp-1 text-sm text-black/60">{subtitle}</p>
        ) : null}

        {/* Rating (optional) */}
        {typeof rating === "number" && rating >= 0 && rating <= 5 && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-black/60">
            <StarRow value={rating} />
            <span className="tabular-nums">{rating.toFixed(1)}</span>
            {typeof ratingCount === "number" && ratingCount > 0 && (
              <span className="text-black/50">({ratingCount})</span>
            )}
          </div>
        )}

        {/* Price row */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="tabular-nums font-semibold text-[#d12a2a]">
            {formatINR(price)}
          </span>
          {hasDiscount && mrp && (
            <span className="tabular-nums text-sm text-black/50 line-through">
              {formatINR(mrp)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

function StarRow({ value }: { value: number }) {
  const v = Math.max(0, Math.min(5, value))
  const full = Math.floor(v)
  const hasHalf = v - full >= 0.5
  const empty = 5 - full - (hasHalf ? 1 : 0)

  return (
    <span aria-label={`${v.toFixed(1)} out of 5`} className="flex">
      {"★".repeat(full)}
      {hasHalf && "☆"}
      {"☆".repeat(empty)}
    </span>
  )
}
