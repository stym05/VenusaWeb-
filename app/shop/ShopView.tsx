"use client"

import { useMemo, useState } from "react"
import { ProductCard } from "@/components/ProductCard"
import type { Product } from "@/lib/products"
import { motion, AnimatePresence } from "framer-motion"

type Props = { allProducts: Product[] }
type Scope = "All" | "Women" | "Men" | "Sale"
type SortKey = "featured" | "priceAsc" | "priceDesc" | "new"
type Density = "comfortable" | "compact"

function inferScope(p: Product): Scope {
  const hay = [
    p.slug?.toLowerCase() ?? "",
    (p.badges ?? []).join(" ").toLowerCase(),
  ].join(" ")
  if (hay.includes("women")) return "Women"
  if (hay.includes("men")) return "Men"
  if (hay.includes("sale") || hay.includes("off")) return "Sale"
  return "All"
}

export default function ShopView({ allProducts }: Props) {
  const [scope, setScope] = useState<Scope>("All")
  const [sort, setSort] = useState<SortKey>("featured")
  const [density, setDensity] = useState<Density>("comfortable")
  const [page, setPage] = useState(1)

  const perPage = 9 // show 9 products per page (3x3)

  const filtered = useMemo(() => {
    let arr = allProducts.slice()

    if (scope !== "All") arr = arr.filter(p => inferScope(p) === scope)

    switch (sort) {
      case "priceAsc":
        arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
        break
      case "priceDesc":
        arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
        break
      case "new":
        arr.sort((a, b) => {
          const as =
            +(a.title?.toLowerCase().includes("new") ||
              (a.badges ?? []).join(" ").toLowerCase().includes("new"))
          const bs =
            +(b.title?.toLowerCase().includes("new") ||
              (b.badges ?? []).join(" ").toLowerCase().includes("new"))
          return bs - as
        })
        break
      case "featured":
      default:
        break
    }

    return arr
  }, [allProducts, scope, sort])

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / perPage)
  const start = (page - 1) * perPage
  const paginated = filtered.slice(start, start + perPage)

  const gridCols =
    density === "compact"
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"

  return (
    <>
      {/* 🌿 Sticky Filter Bar */}
      <div className="sticky top-14 z-40 border-b border-neutral-200/70 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 md:px-8">
          <div className="py-3 -mx-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 px-2 min-w-max">
              {(["All", "Women", "Men", "Sale"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => { setScope(s); setPage(1); }}
                  className={[
                    "whitespace-nowrap rounded-full px-4 py-1.5 text-sm border transition-all duration-300 font-medium",
                    scope === s
                      ? "border-black bg-black text-white shadow-sm"
                      : "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50",
                  ].join(" ")}
                >
                  {s}
                </button>
              ))}

              <span className="ml-auto pl-2 text-xs text-neutral-600 whitespace-nowrap">
                {filtered.length} {filtered.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          <div className="pb-3 flex flex-wrap items-center justify-between gap-3">
            {/* Sort */}
            <div className="inline-flex rounded-full border border-neutral-300 bg-white p-1 shadow-sm">
              {[
                { key: "featured", label: "Featured" },
                { key: "new", label: "New" },
                { key: "priceAsc", label: "Low → High" },
                { key: "priceDesc", label: "High → Low" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => { setSort(opt.key as SortKey); setPage(1); }}
                  className={[
                    "px-3.5 py-1.5 text-xs rounded-full transition-all duration-300",
                    sort === opt.key
                      ? "bg-black text-white"
                      : "text-neutral-700 hover:bg-neutral-50",
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Density */}
            <div className="inline-flex rounded-full border border-neutral-300 bg-white p-1 shadow-sm">
              {(["comfortable", "compact"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDensity(d)}
                  className={[
                    "px-3.5 py-1.5 text-xs rounded-full transition-all duration-300",
                    density === d
                      ? "bg-black text-white"
                      : "text-neutral-700 hover:bg-neutral-50",
                  ].join(" ")}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ✨ Subheader */}
      <div className="container px-4 md:px-8 pt-5 pb-2">
        <p className="text-sm md:text-[15px] text-neutral-600 text-center md:text-left tracking-wide">
          Elevated essentials. Tailored silhouettes. Designed to last.
        </p>
      </div>

      {/* 🛍️ Product Grid */}
      <div className="container px-4 md:px-8 pb-16">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 border border-neutral-200 bg-white p-10 text-center shadow-sm"
          >
            <h2 className="text-base font-semibold text-neutral-900">No items found</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Try a different category or sort order.
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              key={page} // reanimate on page change
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`mt-8 grid ${gridCols} max-w-7xl mx-auto gap-x-8 gap-y-16 items-start`}

            >
              <AnimatePresence>
                {paginated.map((p, i) => (
                  <motion.div
                    key={p.id ?? p.slug ?? String(i)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-sm rounded-md border border-neutral-300 hover:bg-neutral-100 disabled:opacity-30"
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={[
                      "w-8 h-8 text-sm rounded-md border transition-all duration-200",
                      page === i + 1
                        ? "bg-black text-white border-black"
                        : "border-neutral-300 text-neutral-700 hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-sm rounded-md border border-neutral-300 hover:bg-neutral-100 disabled:opacity-30"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Hide scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}
