"use client"

import { useMemo, useState } from "react"
import { ProductCard } from "@/components/ProductCard"
import type { Product } from "@/lib/products"

type Props = { allProducts: Product[] }
type Scope = "All" | "Women" | "Men" | "Sale"
type SortKey = "featured" | "priceAsc" | "priceDesc" | "new"
type Density = "comfortable" | "compact"

// Heuristic scope (non-breaking with your current data)
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

  const filtered = useMemo(() => {
    let arr = allProducts.slice()

    if (scope !== "All") {
      arr = arr.filter(p => inferScope(p) === scope)
    }

    switch (sort) {
      case "priceAsc":
        arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
        break
      case "priceDesc":
        arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
        break
      case "new":
        // simple bias to items with "new" in title/badges (keeps base order otherwise)
        arr.sort((a, b) => {
          const as = +(a.title?.toLowerCase().includes("new") || (a.badges ?? []).join(" ").toLowerCase().includes("new"))
          const bs = +(b.title?.toLowerCase().includes("new") || (b.badges ?? []).join(" ").toLowerCase().includes("new"))
          return bs - as
        })
        break
      case "featured":
      default:
        // keep catalogue order (treat as curated)
        break
    }

    return arr
  }, [allProducts, scope, sort])

  // grid template based on density (more columns when compact)
  const gridCols =
    density === "compact"
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"

  return (
    <>
      {/* Toolbar (monochrome, minimal) */}
      <div className="border-y border-black/10 bg-white">
        <div className="container py-3 flex flex-wrap items-center gap-3">
          {/* Scope chips */}
          <div className="flex items-center gap-2">
            {(["All","Women","Men","Sale"] as const).map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setScope(s)}
                className={[
                  "rounded-full px-3 py-1.5 text-xs border transition",
                  scope === s
                    ? "border-black bg-black text-white"
                    : "border-black/15 text-black/80 hover:bg-black/[0.04]"
                ].join(" ")}
                aria-pressed={scope === s}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Sort (segmented control) */}
          <div className="inline-flex items-center gap-2">
            <span className="text-xs text-black/60">Sort</span>
            <div className="inline-flex rounded-full border border-black/15 bg-white p-1">
              {([
                { key: "featured", label: "Featured" },
                { key: "new", label: "New" },
                { key: "priceAsc", label: "Low → High" },
                { key: "priceDesc", label: "High → Low" },
              ] as const).map(opt => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSort(opt.key)}
                  className={[
                    "px-3 py-1.5 text-xs rounded-full transition",
                    sort === opt.key
                      ? "bg-black text-white"
                      : "text-black/80 hover:bg-black/[0.04]"
                  ].join(" ")}
                  aria-pressed={sort === opt.key}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Density toggle */}
          <div className="inline-flex items-center gap-2">
            <span className="text-xs text-black/60">View</span>
            <div className="inline-flex rounded-full border border-black/15 bg-white p-1">
              <button
                type="button"
                onClick={() => setDensity("comfortable")}
                className={[
                  "px-3 py-1.5 text-xs rounded-full transition",
                  density === "comfortable" ? "bg-black text-white" : "text-black/80 hover:bg-black/[0.04]"
                ].join(" ")}
              >
                Comfortable
              </button>
              <button
                type="button"
                onClick={() => setDensity("compact")}
                className={[
                  "px-3 py-1.5 text-xs rounded-full transition",
                  density === "compact" ? "bg-black text-white" : "text-black/80 hover:bg-black/[0.04]"
                ].join(" ")}
              >
                Compact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Count */}
      <div className="container pt-4 pb-2">
        <div className="text-sm text-black/60">
          Showing <span className="font-medium text-black">{filtered.length}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="container pb-16">
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-black/10 bg-white p-10 text-center shadow-sm">
            <h2 className="text-lg font-semibold">No items found</h2>
            <p className="mt-1 text-black/60">Try another scope or sort.</p>
          </div>
        ) : (
          <div className={`mt-4 grid ${gridCols} gap-6`}>
            {filtered.map((p, i) => (
              <ProductCard key={p.slug ?? String(i)} product={p as Product} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
