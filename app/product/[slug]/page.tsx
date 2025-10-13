import Image from "next/image"
import { notFound } from "next/navigation"
import { abs } from "@/lib/abs-url"
import AddToCartRow from "@/components/AddToCartRow"
import ProductDetailsPanel from "./ProductDetailsPanel"

export const revalidate = 60

type DBProduct = {
  slug: string
  title: string
  subtitle?: string
  description?: string
  composition?: string
  delivery_returns?: string
  pricePaise: number
  images: { url: string }[]
  sizes: { label: string }[]
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const res = await fetch(abs(`/api/products/${params.slug}`), { cache: "no-store" })
  if (!res.ok) return notFound()
  const p: DBProduct = await res.json()

  const rupees = Math.round(p.pricePaise / 100)
  const sizes = p.sizes.map((s) => s.label)
  const images = p.images.length ? p.images.map((i) => i.url) : ["/images/placeholder-product.jpg"]

  return (
    <section className="container max-w-6xl px-6 md:px-10 py-12 text-neutral-900">
      <nav className="mb-8 text-sm text-neutral-500">
        <a href="/" className="hover:text-neutral-800">Home</a>
        <span className="mx-2">/</span>
        <a href="/shop" className="hover:text-neutral-800">Shop</a>
        <span className="mx-2">/</span>
        <span className="text-neutral-800 font-medium">{p.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Gallery */}
        <div className="md:col-span-6">
          <div className="rounded-xl overflow-hidden bg-neutral-50 border border-neutral-200 shadow-sm">
            <div className="relative w-full aspect-[4/5]">
              <Image src={images[0]} alt={p.title} fill className="object-cover" />
            </div>
          </div>

          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.slice(1, 5).map((src, i) => (
                <div key={i} className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                  <div className="relative aspect-square">
                    <Image src={src} alt={`${p.title} view ${i + 2}`} fill className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="md:col-span-6 space-y-6">
          <h1 className="text-3xl md:text-[32px] font-semibold tracking-tight">{p.title}</h1>
          {p.subtitle && <p className="text-neutral-600">{p.subtitle}</p>}

          <div className="flex items-baseline gap-3">
            <p className="text-2xl font-semibold text-[#d12a2a]">₹{rupees.toLocaleString("en-IN")}</p>
            <p className="text-xs text-neutral-500">Incl. of all taxes</p>
          </div>

          <AddToCartRow
            id={p.slug}
            title={p.title}
            price={rupees}
            image={images[0]}
            sizes={sizes}
          />

          <ProductDetailsPanel
            description={p.description}
            composition={p.composition}
            delivery={p.delivery_returns}
          />
        </div>
      </div>
    </section>
  )
}
