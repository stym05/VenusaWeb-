"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { products } from "@/lib/products"

type Props = { open: boolean; onClose: () => void }
type Result = {
  slug: string
  title: string
  subtitle?: string
  price: number
  thumb: string
  hay: string
  badges?: string[]
}

const HOTKEY = "Ctrl/⌘ K"
const MAX_RESULTS = 14
const RECENT_KEY = "venusa_search_recent_v1"

export default function SearchOverlay({ open, onClose }: Props) {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [idx, setIdx] = useState(0)           // highlighted result index
  const [scope, setScope] = useState<"all" | "women" | "men" | "sale">("all")
  const [recent, setRecent] = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef  = useRef<HTMLUListElement | null>(null)

  // build lightweight index once
  const index: Result[] = useMemo(
    () =>
      products.map((p) => ({
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        price: p.price,
        thumb: p.images?.[0] ?? "/images/placeholder-product.jpg",
        hay: [
          p.title,
          p.subtitle ?? "",
          ...(p.badges ?? []),
          p.slug.includes("men") ? "men" : "",
          p.slug.includes("women") ? "women" : "",
          p.slug.includes("sale") ? "sale" : "",
        ]
          .join(" ")
          .toLowerCase(),
        badges: p.badges ?? [],
      })),
    []
  )

  // recent searches
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]")
      if (Array.isArray(saved)) setRecent(saved.slice(0, 6))
    } catch {}
  }, [])
  const pushRecent = (term: string) => {
    const t = term.trim()
    if (!t) return
    const next = [t, ...recent.filter((x) => x !== t)].slice(0, 6)
    setRecent(next)
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)) } catch {}
  }

  // filter + rank
  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    let subset = index
    if (scope !== "all") subset = subset.filter((r) => r.hay.includes(scope))

    if (!query) return subset.slice(0, MAX_RESULTS)

    return subset
      .map((r) => {
        const titleHit = scoreMatch(r.title.toLowerCase(), query) * 2
        const subHit = scoreMatch((r.subtitle ?? "").toLowerCase(), query)
        const hayHit = r.hay.includes(query) ? 0.5 : 0
        return { r, s: titleHit + subHit + hayHit }
      })
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, MAX_RESULTS)
      .map((x) => x.r)
  }, [q, index, scope])

  // focus & reset on open/close
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 20)
      return () => clearTimeout(t)
    } else {
      setQ("")
      setIdx(0)
      setScope("all")
    }
  }, [open])

  // keyboard nav
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setIdx((i) => Math.min(i + 1, Math.max(results.length - 1, 0)))
        scrollIntoView(idx + 1)
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setIdx((i) => Math.max(i - 1, 0))
        scrollIntoView(idx - 1)
      }
      if (e.key === "Enter" && results[idx]) go(results[idx].slug)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, idx, results]) // eslint-disable-line

  const go = (slug: string) => {
    pushRecent(q)
    onClose()
    router.push(`/product/${slug}`)
  }

  if (!open) return null

  const showSuggestions = !q.trim()
  const active = results[idx]

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Outer glass panel */}
      <div
        className="mt-16 w-full max-w-4xl rounded-3xl border border-white/10 bg-[rgba(15,15,15,0.9)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10 text-white animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: input + hotkey */}
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <SearchIcon />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setIdx(0) }}
            placeholder="Search the catalogue…"
            className="w-full bg-transparent outline-none placeholder:text-white/40"
            aria-label="Search products"
          />
          <kbd className="hidden md:inline-block text-[10px] text-white/70 px-2 py-1 rounded-lg border border-white/15">
            {HOTKEY}
          </kbd>
        </div>

        {/* Scope chips */}
        <div className="flex items-center gap-2 px-4 pt-3">
          {(["all","women","men","sale"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScope(s)}
              className={[
                "rounded-full px-3 py-1.5 text-xs border transition will-change-transform",
                scope === s
                  ? "border-white/80 bg-white text-black"
                  : "border-white/15 text-white/80 hover:bg-white/10",
              ].join(" ")}
            >
              {s[0].toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Two-pane content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {/* Left: results list */}
          <ul
            ref={listRef}
            className="md:col-span-3 max-h-[62vh] overflow-auto p-2"
            role="listbox"
            aria-activedescendant={results[idx]?.slug}
          >
            {showSuggestions ? (
              <Suggestions recent={recent} onPick={(term) => setQ(term)} />
            ) : results.length === 0 ? (
              <li className="px-4 py-12 text-sm text-white/70">
                No results for <span className="text-white">“{q}”</span>. Try different keywords.
              </li>
            ) : (
              results.map((r, i) => (
                <li key={r.slug} id={r.slug} role="option" aria-selected={i === idx}>
                  <button
                    type="button"
                    onMouseEnter={() => setIdx(i)}
                    onClick={() => go(r.slug)}
                    className={[
                      "w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition",
                      i === idx ? "bg-white/10" : "hover:bg-white/5",
                    ].join(" ")}
                  >
                    <div className="relative h-14 w-10 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                      <Image src={r.thumb} alt="" fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-medium leading-tight">
                        <Highlight text={r.title} q={q} />
                      </div>
                      <div className="flex items-center gap-2">
                        {r.subtitle && (
                          <div className="truncate text-xs text-white/60">
                            <Highlight text={r.subtitle} q={q} />
                          </div>
                        )}
                        {!!r.badges?.length && (
                          <div className="hidden sm:flex flex-wrap gap-1">
                            {r.badges.slice(0, 2).map((b) => (
                              <span key={b} className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
                                {b}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs tabular-nums text-white/80">
                        ₹ {Number(r.price || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </button>
                </li>
              ))
            )}
          </ul>

          {/* Right: live preview of highlighted result */}
          <div className="hidden md:block md:col-span-2 border-l border-white/10">
            {active ? (
              <div className="p-4">
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <Image
                    key={active.thumb}
                    src={active.thumb}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 will-change-transform"
                  />
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold">{active.title}</h3>
                    {!!active.badges?.length && (
                      <div className="flex gap-1">
                        {active.badges.slice(0, 2).map((b) => (
                          <span key={b} className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
                            {b}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {active.subtitle && (
                    <p className="mt-1 text-sm text-white/70">{active.subtitle}</p>
                  )}
                  <div className="mt-2 text-sm text-white/80">
                    Price: <span className="tabular-nums">₹ {Number(active.price || 0).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full w-full p-4">
                <div className="flex h-full items-center justify-center text-sm text-white/60">
                  Start typing to preview…
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[11px] text-white/70">
          <div>↑↓ navigate • Enter open • Esc close</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 px-2.5 py-1 hover:bg-white/5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )

  function scrollIntoView(nextIndex: number) {
    const el = listRef.current?.querySelectorAll<HTMLElement>("[role='option']")[nextIndex]
    if (!el) return
    const parent = listRef.current!
    const top = el.offsetTop - parent.scrollTop
    if (top < 0) parent.scrollTop = el.offsetTop
    const bottom = top + el.offsetHeight
    if (bottom > parent.clientHeight) parent.scrollTop = el.offsetTop - (parent.clientHeight - el.offsetHeight)
  }
}

/* ---------- helpers ---------- */

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
      <path d="M20 20l-3.2-3.2" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function Suggestions({ recent, onPick }: { recent: string[]; onPick: (t: string) => void }) {
  return (
    <div className="px-3 py-2">
      {recent.length > 0 && (
        <>
          <div className="px-1 pt-1 pb-2 text-[11px] uppercase tracking-wide text-white/50">Recent</div>
          <div className="flex flex-wrap gap-2 pb-2">
            {recent.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => onPick(term)}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
              >
                {term}
              </button>
            ))}
          </div>
        </>
      )}
      <div className="px-1 pt-2 pb-2 text-[11px] uppercase tracking-wide text-white/50">Popular</div>
      <div className="flex flex-wrap gap-2">
        {["tee", "hoodie", "oversized", "minimal", "street"].map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => onPick(term)}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  )
}

// simple substring scoring
function scoreMatch(text: string, q: string) {
  if (!q) return 0
  if (text.startsWith(q)) return 2
  if (text.includes(q)) return 1
  return 0
}

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>
  const t = text
  const i = t.toLowerCase().indexOf(q.toLowerCase())
  if (i === -1) return <>{text}</>
  const before = t.slice(0, i)
  const hit = t.slice(i, i + q.length)
  const after = t.slice(i + q.length)
  return (
    <>
      {before}
      <mark className="rounded-[4px] bg-yellow-300/40 px-0.5 text-black">{hit}</mark>
      {after}
    </>
  )
}
