// app/shop/ShopFilters.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type Props = {
  availableSizes: string[]
  initial: { q: string; size: string; price: string; sort: string }
  layout: "mobile" | "desktop"
}

export default function ShopFilters({ availableSizes, initial, layout }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const search = useSearchParams()

  // Local UI state
  const [open, setOpen] = useState(false) // drawer (mobile)
  const [q, setQ] = useState(initial.q)
  const [size, setSize] = useState(initial.size)
  const [price, setPrice] = useState(initial.price)
  const [sort, setSort] = useState(initial.sort)

  // Active chips
  const activeChips = useMemo(() => {
    const chips: { key: "q" | "size" | "price"; label: string }[] = []
    if (q) chips.push({ key: "q", label: `“${q}”` })
    if (size) chips.push({ key: "size", label: size })
    if (price) chips.push({ key: "price", label: prettyPrice(price) })
    return chips
  }, [q, size, price])

  useEffect(() => {
    // keep local state in sync when user navigates back/forward
    setQ(initial.q)
    setSize(initial.size)
    setPrice(initial.price)
    setSort(initial.sort)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search?.toString()])

  function apply(patch?: Partial<{ q: string; size: string; price: string; sort: string }>) {
    const params = new URLSearchParams(search?.toString() || "")
    const next = { q, size, price, sort, ...(patch || {}) }

    setQ(next.q)
    setSize(next.size)
    setPrice(next.price)
    setSort(next.sort)

    setParam(params, "q", next.q)
    setParam(params, "size", next.size)
    setParam(params, "price", next.price)
    setParam(params, "sort", next.sort || "new")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function clearAll() {
    setQ(""); setSize(""); setPrice(""); setSort("new")
    router.push(pathname, { scroll: false })
  }

  /* Desktop layout */
  if (layout === "desktop") {
    return (
      <div className="space-y-4">
        {/* Search */}
        <label className="block text-sm text-white/80">
          Search
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            placeholder="Hoodie, tee…"
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </label>

        {/* Size */}
        <div>
          <p className="text-sm text-white/80 mb-2">Size</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => apply({ size: "" })}
              className={`filter-chip ${size === "" ? "chip-active" : ""}`}
            >
              Any
            </button>
            {availableSizes.map(s => (
              <button
                key={s}
                onClick={() => apply({ size: s === size ? "" : s })}
                className={`filter-chip ${size === s ? "chip-active" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="text-sm text-white/80 mb-2">Price</p>
          <div className="grid grid-cols-2 gap-2">
            {PRICE_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => apply({ price: price === opt.value ? "" : opt.value })}
                className={`filter-chip ${price === opt.value ? "chip-active" : ""}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <label className="block text-sm text-white/80">
          Sort
          <select
            value={sort}
            onChange={(e) => apply({ sort: e.target.value })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <option value="new">Newest</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </label>

        {/* Active chips + Clear */}
        {activeChips.length > 0 && (
          <div className="pt-2">
            <div className="flex flex-wrap gap-2">
              {activeChips.map(c => (
                <button
                  key={c.key}
                  onClick={() => apply({ [c.key]: "" } as any)}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/80 hover:bg-white/15"
                >
                  {c.label} ×
                </button>
              ))}
            </div>
            <button onClick={clearAll} className="mt-3 text-xs text-white/60 hover:text-white">
              Clear all
            </button>
          </div>
        )}

        {/* Styles */}
        <FilterStyles />
      </div>
    )
  }

  /* Mobile layout */
  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/90"
        >
          Filters & Sort
        </button>
        <button
          onClick={() => apply({ sort: toggleSort(sort) })}
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/90"
          aria-label="Toggle sort"
        >
          {sortLabel(sort)}
        </button>
      </div>

      {/* Drawer */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[1000]"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-2xl border border-white/10 bg-black/85 p-4 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-white/25" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">Filters & Sort</span>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">✕</button>
            </div>

            <label className="block text-sm text-white/80">
              Search
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Hoodie, tee…"
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </label>

            <div>
              <p className="text-sm text-white/80 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setSize(size === "" ? "" : "")} className={`filter-chip ${size === "" ? "chip-active" : ""}`}>Any</button>
                {availableSizes.map(s => (
                  <button key={s} onClick={() => setSize(size === s ? "" : s)} className={`filter-chip ${size === s ? "chip-active" : ""}`}>{s}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-white/80 mb-2">Price</p>
              <div className="grid grid-cols-2 gap-2">
                {PRICE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setPrice(price === opt.value ? "" : opt.value)}
                    className={`filter-chip ${price === opt.value ? "chip-active" : ""}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="block text-sm text-white/80">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="new">Newest</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </label>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => { apply({ q, size, price, sort }); setOpen(false) }}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
              >
                Apply
              </button>
              <button
                onClick={() => { clearAll(); setOpen(false) }}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-4 py-2 text-sm text-white/80"
              >
                Clear
              </button>
            </div>

            <FilterStyles />
          </div>
        </div>
      )}
    </>
  )
}

/* ------------- utils/styles ------------- */

const PRICE_OPTIONS = [
  { value: "0-1499", label: "₹0 – ₹1,499" },
  { value: "1500-2999", label: "₹1,500 – ₹2,999" },
  { value: "3000-", label: "₹3,000+" },
]

function prettyPrice(v: string) {
  const m = PRICE_OPTIONS.find(o => o.value === v)
  return m?.label ?? v
}
function setParam(params: URLSearchParams, key: string, val?: string) {
  if (val && val.trim()) params.set(key, val.trim())
  else params.delete(key)
}
function toggleSort(s: string) {
  if (s === "price-asc") return "price-desc"
  if (s === "price-desc") return "price-asc"
  return "price-asc"
}
function sortLabel(s: string) {
  if (s === "price-asc") return "Low→High"
  if (s === "price-desc") return "High→Low"
  return "Newest"
}

function FilterStyles() {
  return (
    <style jsx global>{`
      .filter-chip {
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,.15);
        background: rgba(255,255,255,.06);
        padding: 8px 10px;
        font-size: 12px;
        color: rgba(255,255,255,.85);
      }
      .filter-chip:hover { background: rgba(255,255,255,.12); }
      .chip-active {
        background: #fff;
        color: #000;
        border-color: rgba(255,255,255,.6);
      }
    `}</style>
  )
}
