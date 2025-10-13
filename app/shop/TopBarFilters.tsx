// app/shop/TopBarFilters.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type Props = {
  availableSizes: string[]
  initial: { q: string; size: string; price: string; sort: string }
  total: number
}

const PRICE_OPTIONS = [
  { value: "0-1499", label: "₹0 – ₹1,499" },
  { value: "1500-2999", label: "₹1,500 – ₹2,999" },
  { value: "3000-", label: "₹3,000+" },
]

export default function TopBarFilters({ availableSizes, initial, total }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const search = useSearchParams()

  const [q, setQ] = useState(initial.q)
  const [size, setSize] = useState(initial.size)
  const [price, setPrice] = useState(initial.price)
  const [sort, setSort] = useState(initial.sort || "new")

  useEffect(() => {
    setQ(initial.q); setSize(initial.size); setPrice(initial.price); setSort(initial.sort)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search?.toString()])

  const active = useMemo(() => {
    const chips: { key: "q" | "size" | "price"; label: string }[] = []
    if (q) chips.push({ key: "q", label: `“${q}”` })
    if (size) chips.push({ key: "size", label: size })
    if (price) chips.push({ key: "price", label: prettyPrice(price) })
    return chips
  }, [q, size, price])

  function apply(patch?: Partial<{ q: string; size: string; price: string; sort: string }>) {
    const params = new URLSearchParams(search?.toString() || "")
    const next = { q, size, price, sort, ...(patch || {}) }
    setQ(next.q); setSize(next.size); setPrice(next.price); setSort(next.sort)

    setParam(params, "q", next.q)
    setParam(params, "size", next.size)
    setParam(params, "price", next.price)
    setParam(params, "sort", next.sort || "new")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function clearKey(key: "q" | "size" | "price") {
    apply({ [key]: "" } as any)
  }
  function clearAll() {
    router.push(pathname, { scroll: false })
  }

  return (
    <div className="py-3">
      {/* Row 1: search + size + price + sort + count */}
      <div className="flex flex-wrap items-center gap-2 py-2">
        {/* Search */}
        <div className="flex-1 min-w-[160px]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            placeholder="Search products"
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            aria-label="Search"
          />
        </div>

        {/* Size */}
        <div>
          <select
            value={size}
            onChange={(e) => apply({ size: e.target.value })}
            className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[13px] text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            aria-label="Size"
          >
            <option value="">Size: Any</option>
            {availableSizes.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <select
            value={price}
            onChange={(e) => apply({ price: e.target.value })}
            className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[13px] text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            aria-label="Price"
          >
            <option value="">Price: Any</option>
            {PRICE_OPTIONS.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <select
            value={sort}
            onChange={(e) => apply({ sort: e.target.value })}
            className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[13px] text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            aria-label="Sort"
          >
            <option value="new">Newest</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>

        {/* Count */}
        <div className="ml-auto pl-2 text-[12px] text-neutral-600">
          {total} {total === 1 ? "item" : "items"}
        </div>
      </div>

      {/* Row 2: active chips */}
      {active.length > 0 && (
        <div className="pb-2 flex flex-wrap items-center gap-2">
          {active.map(c => (
            <button
              key={c.key}
              onClick={() => clearKey(c.key)}
              className="rounded-full border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-[12px] text-neutral-700 hover:bg-neutral-200"
            >
              {c.label} ×
            </button>
          ))}
          <button
            onClick={clearAll}
            className="text-[12px] text-neutral-600 hover:text-neutral-900"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}

/* utils */
function prettyPrice(v: string) {
  const m = PRICE_OPTIONS.find(o => o.value === v)
  return m?.label ?? v
}
function setParam(params: URLSearchParams, key: string, val?: string) {
  if (val && val.trim()) params.set(key, val.trim())
  else params.delete(key)
}
