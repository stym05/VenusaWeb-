"use client"

import Link from "next/link"
import Image from "next/image"
import { useWishlist } from "@/components/useWishlist"
import { products } from "@/lib/products"

export default function WishlistPage() {
  const { slugs, remove, clear, count } = useWishlist()

  const items = slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean)

  const onMoveToCart = (slug: string) => {
    remove(slug)
    alert("Added to cart (demo). Wire to your real cart.")
  }

  return (
    <section className="container max-w-6xl px-6 md:px-8 py-16">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h1 className="font-body text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
            Wishlist
          </h1>
          <p className="mt-1 text-neutral-500">
            {count} {count === 1 ? "item" : "items"}
          </p>
        </div>
        {count > 0 && (
          <button
            onClick={clear}
            className="self-start sm:self-auto rounded-full border border-neutral-300 px-4 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-100"
          >
            Clear all
          </button>
        )}
      </header>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-neutral-300 bg-neutral-50">
            <HeartIcon className="h-6 w-6 text-neutral-500" />
          </div>
          <h2 className="text-xl font-medium text-neutral-900">Your wishlist is empty</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Save products you love and come back anytime.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center justify-center rounded-none bg-neutral-900 px-6 py-2 text-sm font-medium text-white tracking-wide transition hover:bg-neutral-800"
          >
            Start shopping
          </Link>
        </div>
      )}

      {/* Wishlist Grid */}
      {items.length > 0 && (
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((p) => (
            <li key={p!.slug}>
              <article className="group relative overflow-hidden border border-neutral-200 bg-white transition-transform hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
                {/* Image */}
                <Link href={`/product/${p!.slug}`} className="block relative aspect-[3/4] bg-neutral-100">
                  <Image
                    src={p!.images?.[0] ?? "/images/placeholder-product.jpg"}
                    alt={p!.title}
                    fill
                    sizes="(min-width:1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Badges */}
                  {!!p!.badges?.length && (
                    <div className="absolute left-2 top-2 z-10 flex flex-wrap gap-1.5">
                      {p!.badges.slice(0, 2).map((b) => (
                        <span
                          key={b}
                          className="rounded-sm bg-neutral-900/80 px-2.5 py-0.5 text-[11px] font-medium text-white"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      remove(p!.slug)
                    }}
                    aria-label="Remove from wishlist"
                    className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-1.5 shadow-sm ring-1 ring-neutral-200 hover:bg-white"
                  >
                    <TrashIcon className="h-4 w-4 text-neutral-700" />
                  </button>
                </Link>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <Link href={`/product/${p!.slug}`} className="block">
                    <h3 className="line-clamp-1 text-[15px] font-medium text-neutral-900 group-hover:underline underline-offset-2">
                      {p!.title}
                    </h3>
                    {p!.subtitle && (
                      <p className="line-clamp-1 text-sm text-neutral-500">{p!.subtitle}</p>
                    )}
                  </Link>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="tabular-nums font-medium text-[15px] text-[#b91c1c]">
                      ₹ {Number(p!.price || 0).toLocaleString("en-IN")}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onMoveToCart(p!.slug)}
                        className="rounded-none border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition"
                      >
                        Move to cart
                      </button>
                      <Link
                        href={`/product/${p!.slug}`}
                        className="rounded-none bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 transition"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/* Icons */
function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M20.3 5.7a5 5 0 0 0-7.1 0L12 6.9l-1.2-1.2a5 5 0 1 0-7.1 7.1l1.2 1.2L12 21l7.1-7.1 1.2-1.2a5 5 0 0 0 0-7.1Z"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M4 7h16" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
