import { ProductCard } from "@/components/ProductCard"
import { abs } from "@/lib/abs-url"
import { motion } from "framer-motion"

// ✅ This runs on the server, fetches data before rendering
export default async function FeaturedProducts() {
  const res = await fetch(abs("/api/products"), {
    next: { revalidate: 60 }, // cache for 1 minute
  })

  if (!res.ok) {
    console.error("Failed to load products:", res.status)
    return <div className="text-center text-neutral-500 py-12">Unable to load products</div>
  }

  const products = await res.json()
  const featured = products.slice(0, 8)

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.12, ease: "easeOut" },
        },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10"
    >
      {featured.map((p: any) => (
        <motion.div
          key={p.id || p.slug}
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
        >
          <ProductCard product={p} />
        </motion.div>
      ))}
    </motion.div>
  )
}
