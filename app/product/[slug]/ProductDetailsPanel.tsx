"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
  description?: string
  composition?: string
  delivery?: string
}

const tabs = ["Details", "Composition & Care", "Delivery & Returns"] as const

export default function ProductDetailsPanel({
  description = "No description available.",
  composition = "Material details coming soon.",
  delivery = "Standard delivery and easy returns available.",
}: Props) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<(typeof tabs)[number]>("Details")

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="mt-8 w-full border border-black/15 rounded-full py-2.5 text-sm font-medium text-black hover:bg-black/[0.04] transition"
      >
        View Product Details
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Dim background */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Right panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
                <h2 className="text-base font-semibold tracking-tight">Product Information</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-neutral-500 hover:text-black text-xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-black/10 text-sm font-medium">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActive(t)}
                    className={`flex-1 py-3 transition ${
                      active === t
                        ? "border-b-2 border-black text-black"
                        : "text-black/50 hover:text-black"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="px-6 py-6 text-sm text-black/70 leading-relaxed flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {active === "Details" && <p>{description}</p>}
                    {active === "Composition & Care" && <p>{composition}</p>}
                    {active === "Delivery & Returns" && <p>{delivery}</p>}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
