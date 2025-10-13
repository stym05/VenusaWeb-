"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type QA = { q: string; a: string }
type Group = { title: string; items: QA[] }

// ---- Content (trimmed/organized from your FAQ file) ----
const GROUPS: Group[] = [
  {
    title: "Products & Fit",
    items: [
      { q: "What does VENUSA specialize in?", a: "Premium casual and streetwear — oversized t-shirts, hoodies, shirts and pants for everyday expression." },
      { q: "What sizes do you offer?", a: "XS to XL (varies by product). Each item page includes a size chart for easy comparison." },
      { q: "Are your clothes unisex?", a: "Many pieces are gender-neutral or designed for all body types, especially our oversized fits." },
      { q: "Do your clothes shrink after wash?", a: "Fabrics are pre-shrunk and tested. Follow wash-care to maintain shape and color." },
      { q: "Are products made in India?", a: "Yes — proudly made in India with local craftsmanship." },
    ],
  },
  {
    title: "Ordering & Payments",
    items: [
      { q: "How do I place an order?", a: "Select a product and size, add to cart, and complete checkout on venusa.co.in." },
      { q: "What payment methods are available?", a: "UPI, cards, Net Banking, and wallets. COD is not available." },
      { q: "Can I cancel or change my order?", a: "Yes, within 2 hours of placing it. Contact support immediately." },
      { q: "Is it safe to pay online?", a: "Yes — our site is SSL-encrypted and payments are processed securely." },
    ],
  },
  {
    title: "Shipping & Tracking",
    items: [
      { q: "Do you deliver across India?", a: "Yes, to most PIN codes via trusted courier partners." },
      { q: "How long is delivery?", a: "Typically 3–7 working days depending on location." },
      { q: "How do I track my order?", a: "We send a tracking link via SMS/email after dispatch; you can also use Track Order on our site." },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      { q: "What is your policy?", a: "Exchanges within 7 days of delivery. Items must be unused, unwashed, and in original condition." },
      { q: "Are refunds available?", a: "No refunds; exchange or store credit only per policy." },
      { q: "How do I request an exchange?", a: "Use the Returns & Exchange flow with your order number; we’ll schedule pickup and process after QC." },
    ],
  },
  {
    title: "Support & General",
    items: [
      { q: "How can I contact VENUSA?", a: "Email info@venusa.co.in. Hours: 10 AM – 7 PM, Mon–Sat." },
      { q: "Do you have a physical store?", a: "Online-only for now; pop-ups are coming." },
      { q: "Where can I see new drops?", a: "Follow @venusa.co.in on Instagram and subscribe to the newsletter." },
    ],
  },
]

// ---- Animations ----
const listAnim = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto", transition: { duration: 0.35, ease: "easeInOut" as const } },
  exit:    { opacity: 0, height: 0, transition: { duration: 0.25, ease: "easeInOut" as const } },
}

export default function FAQ() {
  const [query, setQuery] = useState("")
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return GROUPS
    return GROUPS.map(g => ({
      ...g,
      items: g.items.filter(item =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
      ),
    })).filter(g => g.items.length > 0)
  }, [query])

  // Auto-open groups when searching
  const isSearching = query.trim().length > 0

  return (
    <div>
      {/* Search bar */}
      <div className="rounded-xl border border-white/10 bg-black/20 p-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search FAQs…"
          className="w-full rounded-lg bg-transparent px-3 py-2 text-white placeholder:text-white/40 focus:outline-none"
          aria-label="Search FAQs"
        />
      </div>

      {/* Result meta */}
      <div className="mt-3 text-sm text-white/60">
        {isSearching ? `Showing ${filtered.reduce((n, g) => n + g.items.length, 0)} results` : "Browse by topic"}
      </div>

      <div className="mt-6 space-y-8">
        {filtered.map((g, idx) => {
          const open = isSearching ? true : openGroups[g.title] ?? idx === 0
          return (
            <section key={g.title}>
              <button
                type="button"
                onClick={() => setOpenGroups(s => ({ ...s, [g.title]: !(s[g.title] ?? idx === 0) }))}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-left"
              >
                <span className="font-body font-regular text-lg">{g.title}</span>
                <span className="text-white/60">{open ? "–" : "+"}</span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.ul {...listAnim} className="overflow-hidden">
                    {g.items.map((qa) => (
                      <li key={qa.q} className="border-b border-white/10 last:border-none">
                        <QAItem qa={qa} />
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </section>
          )
        })}

        {/* No results state */}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
            No results. Try a different keyword (e.g., <span className="text-white">size</span>, <span className="text-white">shipping</span>, <span className="text-white">exchange</span>).
          </div>
        )}
      </div>
    </div>
  )
}

function QAItem({ qa }: { qa: QA }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="px-3">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between gap-4 py-3 text-left"
      >
        <span className="font-medium">{qa.q}</span>
        <span className="text-white/60">{open ? "–" : "+"}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 4 }}
            animate={{ opacity: 1, height: "auto", y: 0, transition: { duration: 0.35, ease: "easeInOut" as const } }}
            exit={{ opacity: 0, height: 0, y: 4, transition: { duration: 0.25, ease: "easeInOut" as const } }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-white/80">{qa.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
