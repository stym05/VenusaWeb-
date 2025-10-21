import type { Metadata } from "next"
import ShopView from "./ShopView"
import type { Product } from "@/lib/products"


export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop | VENUSA",
  description:
    "Discover the latest collection from VENUSA — timeless pieces blending craftsmanship, minimalism, and modern elegance.",
}

export default async function ShopPage() {
  // 🖤 Use the same internal API route as HomePage (currency injected there)
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"

  let allProducts: Product[] = []

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`, { cache: 'no-store' })


    if (!res.ok) {
      console.error("❌ Failed to fetch products:", res.statusText)
    } else {
      const rows = await res.json()

      // ✅ Normalize backend response to match Product type
      allProducts = rows.map((p: any) => ({
        id: p.id?.toString() ?? crypto.randomUUID(),
        slug: p.slug ?? "",
        title: p.name ?? p.title ?? "Untitled Product",
        subtitle: p.category ?? p.subtitle ?? "",
        description: p.description ?? "",
        price: Math.round(Number(p.price) || 0),
        images: Array.isArray(p.images)
          ? p.images
          : p.image
          ? [p.image]
          : ["/images/placeholder-product.jpg"],
        sizes: p.sizes ?? [],
        badges: p.badges ?? [],
        currency: p.currency || "INR",
      }))
    }
  } catch (error) {
    console.error("❌ ShopPage fetch error:", error)
  }

  return (
    <main className="min-h-screen bg-[#FDFDFC] text-[#111]">
      {/* 🪶 Header */}
      <section className="container mx-auto px-6 md:px-10 pt-20 md:pt-14 text-center">
        <h1 className="text-3xl md:text-4xl font-body tracking-tight">
          The VENUSA Collection
        </h1>
        <p className="mt-4 text-sm md:text-md text-black/60 max-w-2xl mx-auto leading-relaxed">
          Explore our curated range of handcrafted designs — where modern silhouettes meet timeless craftsmanship.
        </p>
      </section>

      {/* 🛍️ Product Grid */}
      <section className="container mx-auto mt-12 md:mt-20 px-4 sm:px-6 md:px-10">
        {allProducts.length > 0 ? (
          <ShopView allProducts={allProducts} />
        ) : (
          <div className="text-center text-neutral-500 py-20">
            Loading collection...
          </div>
        )}
      </section>

      {/* ✨ Footer CTA */}
      <section className="mt-20 md:mt-40 bg-[#F7F7F5] py-20 md:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-[#F7F7F5]" />
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-serif mb-4">
            Redefine Modern Luxury
          </h2>
          <p className="text-black/60 text-sm md:text-base max-w-xl mx-auto">
            Every VENUSA piece tells a story of minimalism and meaning — built to
            last, designed to inspire.
          </p>
        </div>
      </section>
    </main>
  )
}
