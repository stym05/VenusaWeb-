"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const STORAGE_KEY = "venusa_notice_v1"
const REMEMBER_DAYS = 7

export default function SiteNotice() {
  const [open, setOpen] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return setOpen(true)
      const last = JSON.parse(raw) as { ts: number }
      const age = Date.now() - (last?.ts ?? 0)
      if (age > REMEMBER_DAYS * 24 * 60 * 60 * 1000) setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const id = setTimeout(() => closeBtnRef.current?.focus(), 0)
    return () => clearTimeout(id)
  }, [open])

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now() }))
    } catch {}
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="venusa-notice-title"
      aria-describedby="venusa-notice-desc"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      onKeyDown={(e) => e.key === "Escape" && dismiss()}
    >
      {/* Backdrop (soft + blur) */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={dismiss} />

      {/* Panel — GLASS */}
      <div
        className={[
          "relative w-full max-w-xl",           // a little wider than before
          "rounded-2xl border",
          "border-white/15 bg-white/[0.06] backdrop-blur-xl", // glass
          "shadow-2xl ring-1 ring-white/10",
          "p-6 md:p-7 animate-scale-in",
        ].join(" ")}
      >
        {/* Close */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={dismiss}
          aria-label="Close announcement"
          className="absolute right-3 top-3 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          ×
        </button>

        {/* Content */}
        <div className="space-y-3.5">
          <h2 id="venusa-notice-title" className="font-heading text-2xl md:text-[28px] font-semibold text-white">
            We’re crafting something special.
          </h2>

          <p id="venusa-notice-desc" className="text-white/80 leading-relaxed">
            The website is currently <span className="font-semibold text-white">under development</span>.
            You can still explore and experience the journey of <span className="font-semibold text-white">VENUSA</span>.
          </p>

          {/* Actions — sleek buttons */}
          <div className="pt-1.5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={dismiss}
              className={[
                "inline-flex w-full items-center justify-center",
                "rounded-xl px-4 py-2.5",                // sleeker
                "bg-white text-black",
                "transition hover:bg-white/90",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
              ].join(" ")}
            >
              Continue to site
            </button>

            <Link
              href="/about"
              onClick={dismiss}
              className={[
                "inline-flex w-full items-center justify-center",
                "rounded-xl px-4 py-2.5",                // sleeker
                "border border-white/25 text-white/90",
                "hover:border-white/60 hover:bg-white/10",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
              ].join(" ")}
            >
              Learn about VENUSA
            </Link>
          </div>

          {/* Micro-footnote */}
          <p className="text-xs text-white/55">
            Feedback helps —{" "}
            <Link href="/contact" onClick={dismiss} className="underline hover:text-white">
              drop us a noteeee
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Minimal motion (global to avoid styled-jsx client-only errors) */}
      <style jsx global>{`
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scale-in { from { opacity: 0; transform: translateY(8px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
        .animate-fade-in { animation: fade-in .25s ease-out both }
        .animate-scale-in { animation: scale-in .24s ease-out both }
      `}</style>
    </div>
  )
}
