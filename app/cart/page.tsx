"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { useCart } from "@/components/useCart"
import { useWishlist } from "@/components/useWishlist"
import { products } from "@/lib/products"

// If your Product sometimes has MRP, pick it up for savings calc
type Extra = { mrp?: number }

function formatINR(n: number) {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)
  } catch {
    return `₹ ${Number(n || 0).toLocaleString("en-IN")}`
  }
}

export default function CartPage() {
  const { lines, inc, dec, setQty, remove, clear, count } = useCart()
  const { add: wishAdd } = useWishlist()

  // Join cart lines to catalogue
  const items = useMemo(() => {
    return lines
      .map(l => {
        const p = products.find(pp => pp.slug === l.slug) as (typeof products)[number] & Extra | undefined
        if (!p) return null
        const price = p.price
        const mrp = p.mrp
        const savings = mrp && mrp > price ? (mrp - price) * l.qty : 0
        return {
          slug: p.slug,
          title: p.title,
          subtitle: p.subtitle,
          thumb: p.images?.[0] ?? "/images/placeholder-product.jpg",
          price,
          mrp,
          qty: l.qty,
          size: l.size,
          savings,
        }
      })
      .filter(Boolean) as Array<{
        slug: string; title: string; subtitle?: string; thumb: string;
        price: number; mrp?: number; qty: number; size?: string; savings: number
      }>
  }, [lines])

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0)
  const mrpTotal = items.reduce((s, it) => s + (it.mrp ?? it.price) * it.qty, 0)
  const savings = Math.max(0, mrpTotal - subtotal)
  const shipping = subtotal >= 1499 || subtotal === 0 ? 0 : 79
  const total = subtotal + shipping

  const moveToWishlist = (slug: string) => {
    wishAdd(slug)
    remove(slug)
  }

  return (
    <div className="bg-white text-black">
      <section className="container max-w-6xl px-6 md:px-8 py-10">
        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Your Bag</h1>
            <p className="mt-1 text-black/60">{count} {count === 1 ? "item" : "items"}</p>
          </div>
          {count > 0 && (
            <button
              onClick={clear}
              className="rounded-full border border-black/10 px-3 py-1.5 text-sm text-black/70 hover:bg-black/[0.04]"
            >
              Clear bag
            </button>
          )}
        </header>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="mt-10 rounded-2xl border border-black/10 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full border border-black/10 bg-black/[0.04] flex items-center justify-center">
              <BagIcon className="h-5 w-5 text-black/60" />
            </div>
            <h2 className="text-xl font-semibold">Your bag is empty</h2>
            <p className="mt-1 text-black/60">Add products you love and check out when ready.</p>
            <div className="mt-6">
              <Link href="/shop" className="inline-flex items-center rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                Start shopping
              </Link>
            </div>
          </div>
        )}

        {/* Grid layout */}
        {items.length > 0 && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Items */}
            <ul className="lg:col-span-8 space-y-4">
              {items.map(it => (
                <li key={`${it.slug}-${it.size ?? "nosize"}`}>
                  <article className="group grid grid-cols-[88px_1fr_auto] gap-4 rounded-2xl border border-black/10 bg-white p-3 shadow-sm hover:shadow-lg transition">
                    {/* thumb */}
                    <Link href={`/product/${it.slug}`} className="relative h-24 w-20 overflow-hidden rounded-xl border border-black/10 bg-white">
                      <Image src={it.thumb} alt="" fill className="object-cover" sizes="(min-width:1024px) 120px, 25vw" />
                    </Link>

                    {/* info */}
                    <div className="min-w-0">
                      <Link href={`/product/${it.slug}`} className="block">
                        <h3 className="truncate font-medium">{it.title}</h3>
                        {it.subtitle && <p className="truncate text-sm text-black/60">{it.subtitle}</p>}
                      </Link>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-black/60">
                        {it.size && <span className="rounded-full border border-black/10 px-2 py-0.5">Size: {it.size}</span>}

                        {/* qty stepper */}
                        <div className="inline-flex items-center rounded-full border border-black/10 overflow-hidden">
                          <button onClick={() => dec(it.slug, it.size)} className="px-2 py-1 hover:bg-black/[0.04]" aria-label="Decrease quantity">−</button>
                          <input
                            value={it.qty}
                            onChange={(e) => {
                              const v = parseInt(e.target.value || "1", 10)
                              setQty(it.slug, isNaN(v) ? 1 : v, it.size)
                            }}
                            className="w-10 text-center outline-none"
                            inputMode="numeric"
                          />
                          <button onClick={() => inc(it.slug, it.size)} className="px-2 py-1 hover:bg-black/[0.04]" aria-label="Increase quantity">+</button>
                        </div>

                        <button
                          onClick={() => moveToWishlist(it.slug)}
                          className="rounded-full border border-black/10 px-2.5 py-1 hover:bg-black/[0.04]"
                        >
                          Move to wishlist
                        </button>

                        <button
                          onClick={() => remove(it.slug, it.size)}
                          className="rounded-full border border-black/10 px-2.5 py-1 hover:bg-black/[0.04]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* price column */}
                    <div className="text-right">
                      <div className="tabular-nums font-semibold text-[#d12a2a]">{formatINR(it.price * it.qty)}</div>
                      {it.mrp && it.mrp > it.price && (
                        <div className="mt-0.5 text-xs text-black/50 line-through">{formatINR(it.mrp * it.qty)}</div>
                      )}
                      {it.savings > 0 && (
                        <div className="mt-1 text-[11px] rounded-full border border-emerald-600/25 bg-emerald-500/10 px-2 py-0.5 text-emerald-700">
                          You save {formatINR(it.savings)}
                        </div>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <aside className="lg:col-span-4">
              <div className="sticky top-20 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold">Order Summary</h2>

                {/* Coupon */}
                <form
                  onSubmit={(e) => { e.preventDefault(); alert("Apply coupon: demo only") }}
                  className="mt-4 flex gap-2"
                >
                  <input
                    placeholder="Coupon code"
                    className="flex-1 rounded-xl border border-black/10 bg-white px-3 py-2 outline-none placeholder:text-black/40"
                  />
                  <button className="rounded-xl border border-black/10 px-3 py-2 text-sm hover:bg-black/[0.04]">
                    Apply
                  </button>
                </form>

                {/* Totals */}
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd className="tabular-nums">{formatINR(subtotal)}</dd>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <dt>Discounts</dt>
                      <dd className="tabular-nums">−{formatINR(savings)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt>Shipping</dt>
                    <dd>{shipping === 0 ? <span className="text-emerald-700">Free</span> : formatINR(shipping)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-black/10 pt-3 text-base font-semibold">
                    <dt>Total</dt>
                    <dd className="tabular-nums">{formatINR(total)}</dd>
                  </div>
                </dl>

                <button
                  className="mt-5 w-full rounded-2xl bg-black px-4 py-3 text-white font-medium hover:opacity-90"
                  onClick={() => alert("Proceed to Checkout (demo)")}
                >
                  Checkout
                </button>

                <p className="mt-3 text-xs text-black/60">
                  • COD & prepaid available · Secure payment · GST invoice
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  )
}

/* Icons */
function BagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M6 8h12l-1 11H7L6 8Z" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 8a3 3 0 0 1 6 0" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}
