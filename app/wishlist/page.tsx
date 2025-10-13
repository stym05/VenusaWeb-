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
    // TODO: integrate your cart add here
    // e.g., cart.add(slug); remove(slug)
    remove(slug)
    alert("Added to cart (demo). Wire to your real cart.")
  }

  return (
    <section className="container max-w-6xl px-6 md:px-8 py-12">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-body text-3xl md:text-4xl font-semibold tracking-tight">Wishlist</h1>
          <p className="mt-1 text-black/60">{count} {count === 1 ? "item" : "items"}</p>
        </div>
        {count > 0 && (
          <button
            onClick={clear}
            className="rounded-full border border-black/10 px-3 py-1.5 text-sm text-black/70 hover:bg-black/[0.04]"
          >
            Clear all
          </button>
        )}
      </header>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-10 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full border border-black/10 bg-black/[0.04] flex items-center justify-center">
            <HeartIcon className="h-5 w-5 text-black/60" />
          </div>
          <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
          <p className="mt-1 text-black/60">Save products you love and come back anytime.</p>
          <div className="mt-6">
            <Link href="/shop" className="inline-flex items-center rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              Start shopping
            </Link>
          </div>
        </div>
      )}

      {/* Grid */}
      {items.length > 0 && (
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <li key={p!.slug}>
              <article className="group overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
                {/* image */}
                <Link href={`/product/${p!.slug}`} className="block">
                  <div className="relative aspect-[3/4] bg-neutral-100">
                    <Image
                      src={p!.images?.[0] ?? "/images/placeholder-product.jpg"}
                      alt={p!.title}
                      fill
                      sizes="(min-width:1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    {/* subtle top badges */}
                    {!!p!.badges?.length && (
                      <div className="pointer-events-none absolute left-2 top-2 z-10 flex flex-wrap gap-1.5">
                        {p!.badges.slice(0, 2).map((b) => (
                          <span key={b} className="rounded-full bg-black/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                            {b}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* remove button */}
                    <button
                      onClick={(e) => { e.preventDefault(); remove(p!.slug) }}
                      aria-label="Remove from wishlist"
                      className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-2 shadow-sm ring-1 ring-black/10 hover:bg-white"
                    >
                      <TrashIcon className="h-4 w-4 text-black/70" />
                    </button>
                  </div>
                </Link>

                {/* content */}
                <div className="p-3">
                  <Link href={`/product/${p!.slug}`} className="block">
                    <h3 className="line-clamp-1 text-lg font-semibold">{p!.title}</h3>
                    {p!.subtitle && (
                      <p className="mt-0.5 line-clamp-1 text-sm text-black/60">{p!.subtitle}</p>
                    )}
                  </Link>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="tabular-nums font-semibold text-[#d12a2a]">
                      ₹ {Number(p!.price || 0).toLocaleString("en-IN")}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onMoveToCart(p!.slug)}
                        className="rounded-full border border-black/10 px-3 py-1.5 text-sm hover:bg-black/[0.04]"
                      >
                        Move to cart
                      </button>
                      <Link
                        href={`/product/${p!.slug}`}
                        className="rounded-full bg-black px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
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

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M20.3 5.7a5 5 0 0 0-7.1 0L12 6.9l-1.2-1.2a5 5 0 1 0-7.1 7.1l1.2 1.2L12 21l7.1-7.1 1.2-1.2a5 5 0 0 0 0-7.1Z" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  )
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M4 7h16" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  )
}
