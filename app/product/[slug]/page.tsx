// app/product/[slug]/page.tsx
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { products } from "@/lib/products"
import type { Product } from "@/lib/products"
import WishButton from "@/components/WishButton"
import ProductGallery from "./ProductGallery"
import SizePicker from "./SizePicker"
import AddToCartRow from "@/components/AddToCartRow"

type Props = { params: { slug: string } }

type ExtraFields = {
  mrp: number
  rating: number
  ratingCount: number
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) return {}
  return {
    title: `${product.title} | VENUSA`,
    description: product.subtitle || product.description?.slice(0, 160),
    openGraph: { title: `${product.title} | VENUSA`, images: product.images?.slice(0, 1) ?? [] },
  }
}

function formatINR(n: number) {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)
  } catch {
    return `₹ ${Number(n || 0).toLocaleString("en-IN")}`
  }
}

export default function ProductPage({ params }: Props) {
  const base = products.find((p) => p.slug === params.slug)
  if (!base) return notFound()
  const product = base as Product & Partial<ExtraFields>

  const hasDiscount = typeof product.mrp === "number" && product.mrp > (product.price ?? 0)
  const discountPct = hasDiscount && product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0

  return (
    // hard-force white page background and black text
    <div className="bg-white text-black">
      <section className="container max-w-5xl px-6 md:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-black/60">
          <a href="/" className="hover:text-black">Home</a>
          <span className="mx-2">/</span>
          <a href="/shop" className="hover:text-black">Shop</a>
          <span className="mx-2">/</span>
          <span className="text-black/80">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* GALLERY: small/medium with click-to-advance */}
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-black/10 bg-white shadow-sm">
              <ProductGallery
                images={product.images ?? []}
                title={product.title}
                hasDiscount={hasDiscount}
                discountPct={discountPct}
                size="md" // small/medium sizing control
              />
            </div>
          </div>

          {/* SUMMARY */}
          <div className="md:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="badge">VENUSA</div>
              {typeof product.rating === "number" && product.rating >= 0 && product.rating <= 5 && (
                <div className="flex items-center gap-1 text-xs text-black/60">
                  <StarRow value={product.rating} />
                  <span className="tabular-nums">{product.rating.toFixed(1)}</span>
                  {typeof product.ratingCount === "number" && product.ratingCount > 0 && (
                    <span className="text-black/50">({product.ratingCount})</span>
                  )}
                </div>
              )}
            </div>

            <header>
              <h1 className="text-2xl md:text-[28px] font-semibold leading-tight">{product.title}</h1>
              {product.subtitle && <p className="mt-1 text-black/60">{product.subtitle}</p>}
            </header>

            {/* Price row */}
            <div className="flex items-baseline gap-3">
              <p className="text-xl md:text-2xl font-semibold text-[#d12a2a]">{formatINR(product.price)}</p>
              {hasDiscount && product.mrp && (
                <>
                  <p className="tabular-nums text-sm text-black/50 line-through">{formatINR(product.mrp)}</p>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-700">
                    -{discountPct}%
                  </span>
                </>
              )}
              {!hasDiscount && <p className="text-xs text-black/50">Inclusive of all taxes</p>}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-black/70 leading-relaxed">{product.description}</p>
            )}

            {/* Options / CTA */}
            <form className="space-y-5">
              {Array.isArray(product.sizes) && product.sizes.length > 0 && (
                <div>
                  <label className="text-sm text-black/70">Size</label>
                  <div className="mt-2">
                    <SizePicker sizes={product.sizes} light /> {/* light = white theme */}
                  </div>
                </div>
              )}
                
              <div className="flex flex-wrap gap-3 pt-1">
                <button type="button" className="btn btn-primary min-w-40">Add to Cart</button>
                <button type="button" className="btn btn-outline min-w-40">Buy Now</button>
                <WishButton slug={product.slug} />
              </div>
            </form>

            <div className="pt-6 border-t border-black/10 text-sm text-black/70 grid gap-1.5">
              <p>• COD & prepaid available across India</p>
              <p>• Free exchanges within 7 days</p>
              <p>• Secure checkout · GST invoice</p>
            </div>
          </div>
        </div>
      </section>
    </div>
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
      {hasHalf && "☆"}
      {"☆".repeat(empty)}
    </span>
  )
}
