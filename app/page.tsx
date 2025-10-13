"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import VideoBanner from "@/components/VideoBanner"
import { ProductCard } from "@/components/ProductCard"
import HomeNotice from "@/components/HomeNotice"
import Link from "next/link"
import type { Product } from "@/lib/products"



export default function HomePage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  const buttonY = useTransform(scrollYProgress, [0, 0.5], [0, 120])

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // ✅ Client-side fetch from your backend API
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products")
        if (!res.ok) throw new Error("Failed to fetch products")
        const data = await res.json()
        setFeaturedProducts(data.slice(0, 8)) // show first 8
      } catch (err) {
        console.error("❌ Failed to load products:", err)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  return (
    <main
      ref={ref}
      className="overflow-x-hidden bg-[#FCFCFA] text-[#111] selection:bg-black/10 scroll-smooth"
    >
      {/* 🩶 Hero Video Banner */}
      <section className="relative w-full h-[92vh] overflow-hidden flex items-center justify-center">
  <VideoBanner />

  {/* Floating Button - centered over video */}
  <motion.div
    style={{ y: buttonY }}
    className="absolute bottom-24 center -translate-x-1/2 z-20"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.4 }}
  >
    <Link
            href="/shop"
            className="inline-block rounded-full border border-white px-14 py-3 text-sm text-white font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-300"
          >
            Shop Now
          </Link>
  </motion.div>
</section>

      {/* 🔔 Home Notice */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HomeNotice />
      </motion.div>

      {/* 🛍️ Featured Collection */}
      <section
        id="featured"
        className="container mx-auto mt-24 md:mt-32 px-6 md:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <h2 className="text-[2.2rem] md:text-4xl font-serif tracking-tight">
            Discover New Arrivals
          </h2>
          <Link
            href="/shop"
            className="text-sm md:text-base text-black/60 hover:text-black transition-colors"
          >
            View all →
          </Link>
        </motion.div>

        {/* ✅ Products Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1, ease: "easeOut" },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        >
          {loading ? (
            <div className="col-span-full text-center text-neutral-500 py-16">
              Loading products...
            </div>
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((p) => (
              <motion.div
                key={p.id || p.slug}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-neutral-500 py-16">
              No products found.
            </div>
          )}
        </motion.div>
      </section>

      {/* 🌿 Hero Section (below products) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto mt-36 md:mt-48 px-6 md:px-10 text-center"
      >
        <h3 className="text-3xl md:text-4xl font-serif mb-6">
          Redefining Modern Elegance
        </h3>
        <p className="text-black/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          From handcrafted fabrics to minimal design, Venusa blends timeless artistry
          with the spirit of innovation — creating pieces that whisper luxury.
        </p>
        <div className="mt-10">
          <Link
            href="/shop"
            className="inline-block rounded-full border border-black px-8 py-3 text-sm font-medium tracking-wide hover:bg-black hover:text-white transition-all duration-300"
          >
            Explore the Collection
          </Link>
        </div>
      </motion.section>

      {/* 🖼️ Full-Width Visual Banner Between Products & Hero */}
      <section className="relative w-full mt-32 md:mt-44 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
            <img
              src="/images/midlux-banner.jpg"
              alt="Venusa Mid-Luxe Collection"
              className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            />

            {/* Subtle gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Overlay content */}
            <div className="absolute bottom-20 left-10 md:left-20 text-white max-w-xl">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-serif mb-4 tracking-tight"
              >
                Mid-Luxe Collection
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-sm md:text-lg text-white/85 max-w-md leading-relaxed"
              >
                Where simplicity meets sophistication. Explore timeless craftsmanship redefined.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-6"
              >
                <Link
                  href="/shop"
                  className="inline-block rounded-full bg-white text-black px-8 py-3 text-sm md:text-base font-medium tracking-wide hover:bg-neutral-200 transition-all duration-300"
                >
                  Explore Now →
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>


      {/* 🌸 Footer CTA */}
      <section className="relative w-full mt-36 overflow-hidden">
        {/* Background Image Layer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/midlux-banner2.jpg"
            alt="Venusa Mid-Luxe Collection"
            className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        </motion.div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white py-32 md:py-48 px-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-serif mb-6 tracking-tight"
          >
            Elevate Your Everyday
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Discover essentials that blend understated elegance with a poetic touch — crafted for the discerning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <a
              href="/shop"
              className="inline-block rounded-full bg-white/90 text-black px-8 py-3 text-sm md:text-base font-medium tracking-wide hover:bg-white transition-all duration-300 shadow-md shadow-black/10"
            >
              Shop the Collection →
            </a>
          </motion.div>
        </div>
      </section>


    </main>
  )
}
