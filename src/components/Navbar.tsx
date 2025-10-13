'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Logo } from "./Logo"
import SearchOverlay from "./SearchOverlay" // ← add this import
import { WISHLIST_KEY } from "./useWishlist" // adjust path if needed

const Icon = {
  Search: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="black" {...p}>
      <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
      <path d="M20 20l-3.2-3.2" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  User: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="black" {...p}>
      <circle cx="12" cy="8" r="4" strokeWidth="1.8" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  Heart: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="black" {...p}>
      <path d="M20.3 5.7a5 5 0 0 0-7.1 0L12 6.9l-1.2-1.2a5 5 0 1 0-7.1 7.1l1.2 1.2L12 21l7.1-7.1 1.2-1.2a5 5 0 0 0 0-7.1Z" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  Bag: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="black" {...p}>
      <path d="M6 8h12l-1 11H7L6 8Z" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 8a3 3 0 0 1 6 0" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
}
// ----- Simple catalogue data (edit to your taxonomy) -----
type MenuSection = { title: string; links: { label: string; href: string }[] }
const WOMEN: MenuSection[] = [
  { title: "New & Featured", links: [
    { label: "New Arrivals", href: "/shop?cat=women&sort=new" },
    { label: "Best Sellers", href: "/shop?cat=women&sort=top" },
  ]},
  { title: "Clothing", links: [
    { label: "Oversized Tees", href: "/shop?cat=women&tag=oversized-tee" },
    { label: "Hoodies & Sweatshirts", href: "/shop?cat=women&tag=hoodie" },
    { label: "Shirts", href: "/shop?cat=women&tag=shirt" },
    { label: "Bottoms", href: "/shop?cat=women&tag=bottoms" },
  ]},
  { title: "Shop By", links: [
    { label: "Minimal Staples", href: "/shop?cat=women&tag=minimal" },
    { label: "Street Essentials", href: "/shop?cat=women&tag=street" },
  ]},
]

const MEN: MenuSection[] = [
  { title: "New & Featured", links: [
    { label: "New Arrivals", href: "/shop?cat=men&sort=new" },
    { label: "Best Sellers", href: "/shop?cat=men&sort=top" },
  ]},
  { title: "Clothing", links: [
    { label: "Oversized Tees", href: "/shop?cat=men&tag=oversized-tee" },
    { label: "Hoodies & Sweatshirts", href: "/shop?cat=men&tag=hoodie" },
    { label: "Shirts", href: "/shop?cat=men&tag=shirt" },
    { label: "Bottoms", href: "/shop?cat=men&tag=bottoms" },
  ]},
  { title: "Shop By", links: [
    { label: "Minimal Staples", href: "/shop?cat=men&tag=minimal" },
    { label: "Street Essentials", href: "/shop?cat=men&tag=street" },
  ]},
]

const SALE: MenuSection[] = [
  { title: "Limited Offers", links: [
    { label: "All Sale", href: "/sale" },
    { label: "Under ₹999", href: "/sale?price=-999" },
    { label: "Last Chance", href: "/sale?tag=last-chance" },
  ]},
  { title: "By Category", links: [
    { label: "Tees", href: "/sale?tag=tee" },
    { label: "Hoodies", href: "/sale?tag=hoodie" },
    { label: "Shirts", href: "/sale?tag=shirt" },
    { label: "Bottoms", href: "/sale?tag=bottoms" },
  ]},
]

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)

  // This button id is used by the Cmd/Ctrl+K handler in the overlay
  const openSearch = () => setSearchOpen(true)

  const [openKey, setOpenKey] = useState<null | "women" | "men" | "sale">(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [wishCount, setWishCount] = useState(0)
// track which mobile sections are expanded
const [mExpand, setMExpand] = useState<{ women: boolean; men: boolean; sale: boolean }>({
  women: false,
  men: false,
  sale: false,
})
const toggleMobile = (k: keyof typeof mExpand) =>
  setMExpand(s => ({ women: false, men: false, sale: false, [k]: !s[k] }))
  // hover-intent lock
  const [hovering, setHovering] = useState(false)
  const closeTimer = useRef<number | null>(null)

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      if (!hovering) setOpenKey(null)
    }, 300) // small delay gives time to travel to panel
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenKey(null) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    // initial
    try {
      const arr = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]")
      if (Array.isArray(arr)) setWishCount(arr.length)
    } catch {}
  
    // listen to our custom events
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail
      if (typeof detail === "number") setWishCount(detail)
    }
    window.addEventListener("wishlist:updated", onCustom as EventListener)

    const onStorage = (e: StorageEvent) => {
      if (e.key === WISHLIST_KEY) {
        try {
          const arr = JSON.parse(e.newValue || "[]")
          setWishCount(Array.isArray(arr) ? arr.length : 0)
        } catch { setWishCount(0) }
      }
    }
    window.addEventListener("storage", onStorage)
  
    return () => {
      window.removeEventListener("wishlist:updated", onCustom as EventListener)
      window.removeEventListener("storage", onStorage)
    }
  }, [])


  // outside click closes
  const panelRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!panelRef.current) return
      if (panelRef.current.contains(e.target as Node)) return
      setOpenKey(null)
    }
    if (openKey) document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [openKey])
  
  return (
    <header className="fixed top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur"
    onMouseLeave={() => setOpenKey(null)}>
      <div className="container h-14 flex items-center justify-between relative">
        {/* Left: categories (removed onMouseLeave that was closing too aggressively) */}
        <nav className="hidden md:flex items-center gap-16 text-sm font-medium">
          <DropTrigger
            label="Women"
            href="/shop?cat=women"
            active={openKey === "women"}
            onEnter={() => { setOpenKey("women"); setHovering(true) }}
            onLeave={() => { setHovering(false); scheduleClose() }}
          />
          <DropTrigger
            label="Men"
            href="/shop?cat=men"
            active={openKey === "men"}
            onEnter={() => { setOpenKey("men"); setHovering(true) }}
            onLeave={() => { setHovering(false); scheduleClose() }}
          />
          <DropTrigger
            label="Sale"
            href="/sale"
            sale
            active={openKey === "sale"}
            onEnter={() => { setOpenKey("sale"); setHovering(true) }}
            onLeave={() => { setHovering(false); scheduleClose() }}
          />
        </nav>

        {/* Center: Logo */}
        <div className="h-6 absolute left-1/2 -translate-x-1/2">
          <Link href="/" aria-label="Venusa Home">
            <Logo className="h-5 md:h-6 text-xl" />
          </Link>
        </div>

        {/* Right: icons */}
        <div className="hidden md:flex items-center gap-6" >
        <Link
            id="__openSearch__"
            href="/search"
            aria-label="Search"
            className="p-2 rounded-full hover:bg-black/5"
            onClick={(e) => { e.preventDefault(); openSearch() }}
          >
            {/* your Icon.Search */}
            <svg viewBox="0 0 24 24" fill="none" stroke="black" className="h-5 w-5">
              <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
              <path d="M20 20l-3.2-3.2" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </Link>
          <Link href="/account" aria-label="Account" className="p-2 rounded-full hover:bg-black/5">
            <Icon.User className="h-5 w-5" />
          </Link>
          <Link href="/wishlist" aria-label="Wishlist" className="p-2 rounded-full hover:bg-black/5 relative">
            <Icon.Heart className="h-5 w-5" />
            {wishCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-[#d12a2a] px-1.5 text-[10px] leading-[18px] text-white text-center tabular-nums shadow">
                {wishCount}
              </span>
            )}
          </Link>
          <Link href="/cart" aria-label="Bag" className="p-2 rounded-full hover:bg-black/5 relative">
            <Icon.Bag className="h-5 w-5" />
          </Link>
          
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="md:hidden p-2 rounded-full hover:bg-black/5"
          aria-label="Menu"
        >
          <div className="h-0.5 w-5 bg-black mb-1" />
          <div className="h-0.5 w-5 bg-black mb-1" />
          <div className="h-0.5 w-5 bg-black" />
        </button>
      </div>

      {/* Desktop dropdown panel */}
      <div
        ref={panelRef}
        className={[
          "hidden md:block fixed left-0 right-0 top-14 z-40",
          "border-t border-black/10 backdrop-blur",
          openKey ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!openKey}
        onMouseEnter={() => { setHovering(true) }}
        onMouseLeave={() => { setHovering(false); scheduleClose() }}
      >
        <div className={["transition-all duration-400 ease-in-out", openKey ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"].join(" ")}>
          <div className="bg-white/95">
            <div className="container py-6">
              {openKey === "women" && <MegaColumns sections={WOMEN} onLink={() => setOpenKey(null)} />}
              {openKey === "men" && <MegaColumns sections={MEN} onLink={() => setOpenKey(null)} />}
              {openKey === "sale" && <MegaColumns sections={SALE} onLink={() => setOpenKey(null)} />}
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-black/0 via-black/10 to-black/0" />
        </div>
      </div>

      {/* Mobile drawer (unchanged) */}
              {mobileOpen && (
              <div className="md:hidden border-t border-black/10 bg-white">
              <div className="container py-2 text-sm font-body">
              {/* Women */}
              <button
                type="button"
                onClick={() => toggleMobile("women")}
                className="flex w-full items-center justify-between px-1 py-3 text-left text-black/80 hover:text-black"
                aria-expanded={mExpand.women}
                aria-controls="m-women"
              >
                <span className="font-medium">Women</span>
                <svg
                  className={`h-4 w-4 transition-transform ${mExpand.women ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="black"
                >
                  <path d="M6 9l6 6 6-6" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
              <div
                id="m-women"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${mExpand.women ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <ul className="pb-2 pl-3 space-y-1.5">
                  {WOMEN.flatMap(sec => sec.links).map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md px-2 py-2 text-black/70 hover:text-black hover:bg-black/[0.04]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Men */}
              <button
                type="button"
                onClick={() => toggleMobile("men")}
                className="mt-1 flex w-full items-center justify-between px-1 py-3 text-left text-black/80 hover:text-black"
                aria-expanded={mExpand.men}
                aria-controls="m-men"
              >
                <span className="font-medium">Men</span>
                <svg
                  className={`h-4 w-4 transition-transform ${mExpand.men ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="black"
                >
                  <path d="M6 9l6 6 6-6" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
              <div
                id="m-men"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${mExpand.men ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <ul className="pb-2 pl-3 space-y-1.5">
                  {MEN.flatMap(sec => sec.links).map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md px-2 py-2 text-black/70 hover:text-black hover:bg-black/[0.04]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sale */}
              <button
                type="button"
                onClick={() => toggleMobile("sale")}
                className="mt-1 flex w-full items-center justify-between px-1 py-3 text-left text-[#d12a2a] hover:opacity-90"
                aria-expanded={mExpand.sale}
                aria-controls="m-sale"
              >
                <span className="font-medium">Sale</span>
                <svg
                  className={`h-4 w-4 transition-transform ${mExpand.sale ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                >
                  <path d="M6 9l6 6 6-6" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
              <div
                id="m-sale"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${mExpand.sale ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <ul className="pb-2 pl-3 space-y-1.5">
                  {SALE.flatMap(sec => sec.links).map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md px-2 py-2 text-black/70 hover:text-black hover:bg-black/[0.04]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* 👇 Add this new section for icons */}
              <div className="mt-4 flex items-center justify-around border-t border-black/10 pt-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchOpen(true);
                    setMobileOpen(false);
                  }}
                  aria-label="Search"
                  className="p-2 rounded-full hover:bg-black/5"
                >
                  <Icon.Search className="h-5 w-5" />
                </button>

                <Link href="/account" onClick={() => setMobileOpen(false)} aria-label="Account" className="p-2 rounded-full hover:bg-black/5">
                  <Icon.User className="h-5 w-5" />
                </Link>

                <Link href="/wishlist" onClick={() => setMobileOpen(false)} aria-label="Wishlist" className="p-2 rounded-full hover:bg-black/5 relative">
                  <Icon.Heart className="h-5 w-5" />
                  {wishCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-[#d12a2a] px-1.5 text-[10px] leading-[18px] text-white text-center tabular-nums shadow">
                      {wishCount}
                    </span>
                  )}
                </Link>

                <Link href="/cart" onClick={() => setMobileOpen(false)} aria-label="Bag" className="p-2 rounded-full hover:bg-black/5 relative">
                  <Icon.Bag className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />         
    </header>
  )
}

function DropTrigger({
  label, href, active, onEnter, onLeave, sale = false,
}: {
  label: string; href: string; active: boolean; onEnter: () => void; onLeave: () => void; sale?: boolean
}) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Link
        href={href}
        className={["text-black/80 hover:text-black transition", sale ? "text-[#d12a2a] hover:opacity-90" : ""].join(" ")}
        aria-expanded={active}
        aria-haspopup="true"
      >
        {label}
      </Link>
      <span
        className={[
          "absolute -bottom-3 left-1/2 h-[2px] w-0 rounded-full bg-black/70 transition-all duration-200 ease-in-out",
          active ? "-translate-x-1/2 w-5" : "-translate-x-1/2 w-0",
        ].join(" ")}
        aria-hidden="true"
      />
    </div>
  )
}

function MegaColumns({ sections, onLink }: { sections: { title: string; links: { label: string; href: string }[] }[]; onLink: () => void }) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {sections.map((sec) => (
        <div key={sec.title}>
          <div className="text-xs uppercase tracking-wide text-black/50 mb-2">{sec.title}</div>
          <ul className="space-y-1.5">
            {sec.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onLink}
                  className="block rounded-md px-1 py-1.5 text-sm text-black/80 hover:text-black hover:bg-black/[0.04]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
