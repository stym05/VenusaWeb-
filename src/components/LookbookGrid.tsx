"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"

type Look = {
  src: string
  w?: number
  h?: number
  city: "Tokyo" | "Paris" | "New York" | "Seoul" | "Mumbai" | "London" | "Milan" | "Global"
  season: "SS" | "AW" | "Resort"
  year: number
  caption?: string
}

const LOOKS: Look[] = [
  // Replace these paths with your real images under /public/lookbook/...
  { src: "/lookbook/tokyo-01.jpg", w: 1200, h: 1600, city: "Tokyo", season: "SS", year: 2025, caption: "Stone-wash layers in Shibuya" },
  { src: "/lookbook/paris-01.jpg", w: 1400, h: 1600, city: "Paris", season: "AW", year: 2025, caption: "Double-pleat drape near Canal Saint-Martin" },
  { src: "/lookbook/ny-01.jpg", w: 1400, h: 1600, city: "New York", season: "AW", year: 2024, caption: "Boxy overcoat, late dusk in SoHo" },
  { src: "/lookbook/seoul-01.jpg", w: 1400, h: 1700, city: "Seoul", season: "Resort", year: 2025, caption: "Sheer + tech nylon at Dongdaemun" },
  { src: "/lookbook/mumbai-01.jpg", w: 1400, h: 1750, city: "Mumbai", season: "SS", year: 2024, caption: "Matte monochrome at Ballard Estate" },
  { src: "/lookbook/london-01.jpg", w: 1400, h: 1600, city: "London", season: "AW", year: 2024, caption: "Structured knit under soft rain" },
  { src: "/lookbook/milan-01.jpg", w: 1400, h: 1600, city: "Milan", season: "Resort", year: 2025, caption: "Tailored cargo with satin edge" },
  { src: "/lookbook/global-01.jpg", w: 1400, h: 1600, city: "Global", season: "SS", year: 2025, caption: "Studio lighting, technical twill" },
  // add more…
]

const CITIES = ["All", "Tokyo", "Paris", "New York", "Seoul", "Mumbai", "London", "Milan", "Global"] as const
const SEASONS = ["All", "SS", "AW", "Resort"] as const
const YEARS = ["All", "2025", "2024"] as const

export default function LookbookGrid() {
  const [city, setCity] = useState<typeof CITIES[number]>("All")
  const [season, setSeason] = useState<typeof SEASONS[number]>("All")
  const [year, setYear] = useState<typeof YEARS[number]>("All")

  const filtered = useMemo(() => {
    return LOOKS.filter(l =>
      (city === "All" || l.city === city) &&
      (season === "All" || l.season === season) &&
      (year === "All" || String(l.year) === year)
    )
  }, [city, season, year])

  const [active, setActive] = useState<number | null>(null)
  const open = (i: number) => setActive(i)
  const close = () => setActive(null)
  const next = () => setActive(a => (a === null ? 0 : (a + 1) % filtered.length))
  const prev = () => setActive(a => (a === null ? 0 : (a - 1 + filtered.length) % filtered.length))

  // keyboard nav when lightbox open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active === null) return
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, filtered.length])

  return (
    <div className="bg-white">
      {/* Filters */}
      <div className="container pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <ChipGroup label="City" value={city} onChange={setCity} options={CITIES} />
          <ChipGroup label="Season" value={season} onChange={setSeason} options={SEASONS} />
          <ChipGroup label="Year" value={year} onChange={setYear} options={YEARS} />
        </div>
      </div>

      {/* Masonry grid */}
      <div className="container pb-16">
        <div
          className="
            [column-fill:_balance]
            columns-1 sm:columns-2 lg:columns-3
            gap-4 md:gap-6
          "
        >
          {filtered.map((l, i) => (
            <figure
              key={l.src + i}
              className="
                mb-4 md:mb-6 break-inside-avoid
                group relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm
                transition will-change-transform hover:-translate-y-0.5 hover:shadow-lg
              "
              onClick={() => open(i)}
            >
              <div className="relative w-full h-auto">
                {/* Maintain aspect by intrinsic ratio (fallback if w/h not provided) */}
                <Aspect>
                  <Image
                    src={l.src}
                    alt={l.caption || `${l.city} ${l.year}`}
                    fill
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                    className="object-cover"
                    priority={i < 6}
                  />
                </Aspect>
              </div>

              {/* Overlay meta */}
              <figcaption
                className="
                  pointer-events-none absolute inset-x-0 bottom-0
                  flex items-center justify-between gap-3 px-3 py-2
                  bg-gradient-to-t from-white/90 via-white/50 to-transparent
                "
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{l.city} · {l.season} {l.year}</div>
                  {l.caption && <div className="truncate text-xs text-black/60">{l.caption}</div>}
                </div>
                <span className="rounded-full border border-black/10 bg-white/80 px-2 py-0.5 text-xs text-black/70">
                  View
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-black/60">No looks for this filter.</div>
        )}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <Lightbox
          look={filtered[active]}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  )
}

/* ---------- UI bits ---------- */

function ChipGroup<T extends string>({
  label, value, onChange, options,
}: { label: string; value: T; onChange: (v: T) => void; options: readonly T[] }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-black/50">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={[
              "rounded-full px-3 py-1.5 text-xs border transition",
              value === opt
                ? "border-black bg-black text-white"
                : "border-black/15 text-black/75 hover:bg-black/[0.04]",
            ].join(" ")}
            aria-pressed={value === opt}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

function Aspect({ ratio = 4/5, children }: { ratio?: number; children: React.ReactNode }) {
  // simple aspect-box via padding-top
  return (
    <div className="relative w-full" style={{ paddingTop: `${100 / ratio}%` }}>
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}

function Lightbox({
  look, onClose, onPrev, onNext,
}: {
  look: Look
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const backdropRef = useRef<HTMLDivElement | null>(null)
  const clickBackdrop: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === backdropRef.current) onClose()
  }

  return (
    <div
      ref={backdropRef}
      onClick={clickBackdrop}
      className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-white text-black shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
          <div className="text-sm">
            <span className="font-medium">{look.city}</span>
            <span className="mx-1.5">·</span>
            <span>{look.season} {look.year}</span>
          </div>
          <button
            className="rounded-full border border-black/10 px-3 py-1.5 text-sm hover:bg-black/[0.04]"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {/* image */}
        <div className="relative">
          <Aspect>
            <Image
              src={look.src}
              alt={look.caption || `${look.city} ${look.year}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </Aspect>

          {/* controls */}
          <button
            aria-label="Previous"
            onClick={onPrev}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={onNext}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            ›
          </button>
        </div>

        {/* caption */}
        {(look.caption || look.city) && (
          <div className="px-4 py-3 text-sm text-black/70">
            {look.caption ?? `${look.city} — ${look.season} ${look.year}`}
          </div>
        )}
      </div>
    </div>
  )
}
