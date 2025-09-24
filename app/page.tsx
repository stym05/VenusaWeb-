import VideoBanner from "@/components/VideoBanner";
import Hero from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import HomeNotice from "@/components/HomeNotice"

export default function HomePage() {
  return (
    <>
      
      {/* JUST BELOW NAVBAR */}
      <VideoBanner />
      <HomeNotice />
      {/* YOUR EXISTING HERO BELOW THE VIDEO */}
      <Hero />

      <section className="container mt-16">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">Featured</h2>
          <a className="link" href="/shop">View all</a>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  )
}
