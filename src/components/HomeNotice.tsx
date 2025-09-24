"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function HomeNotice() {
  const [open, setOpen] = useState(true)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return
    const id = setTimeout(() => closeBtnRef.current?.focus(), 0)
    return () => clearTimeout(id)
  }, [open])

  const dismiss = () => setOpen(false)

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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={dismiss} />

      {/* Glass panel */}
      <div className="relative w-full max-w-xl rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-2xl ring-1 ring-white/10 p-6 md:p-7 animate-scale-in">
        <button
          ref={closeBtnRef}
          type="button"
          onClick={dismiss}
          aria-label="Close announcement"
          className="absolute right-3 top-3 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          ×
        </button>

        <div className="space-y-3.5">
          <h2 id="venusa-notice-title" className="font-Body text-2xl md:text-[28px] font-regular text-white">
            We’re crafting something special.
          </h2>
          <p id="venusa-notice-desc" className="text-white/80 leading-relaxed">
            The website is currently <span className="font-semibold text-white">under development</span>.
            You can still explore and experience the journey of <span className="font-semibold text-white">VENUSA</span>.
          </p>

          <div className="pt-1.5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 bg-white text-black transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Continue to site
            </button>
            <Link
              href="/about"
              onClick={dismiss}
              className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 border border-white/25 text-white/90 hover:border-white/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Learn about VENUSA
            </Link>
          </div>

          <p className="text-xs text-white/55">
            Feedback helps — <Link href="/contact" onClick={dismiss} className="underline hover:text-white">drop us a note</Link>.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scale-in { from { opacity: 0; transform: translateY(8px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
        .animate-fade-in { animation: fade-in .25s ease-out both }
        .animate-scale-in { animation: scale-in .24s ease-out both }
      `}</style>
    </div>
  )
}
