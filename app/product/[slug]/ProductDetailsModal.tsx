"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
  description?: string
  composition?: string
  delivery?: string
}

const tabs = ["Details", "Composition & Care", "Delivery & Returns"] as const

export default function ProductDetailsModal({
  description = "No description available.",
  composition = "Material details coming soon.",
  delivery = "Standard shipping and easy returns available.",
}: Props) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<(typeof tabs)[number]>("Details")

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="mt-8 w-full border border-neutral-300 rounded-full py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition"
      >
        View Product Details
      </button>

      {/* Overlay + Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl md:max-w-2xl md:left-1/2 md:-translate-x-1/2"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
                <h2 className="text-base font-semibold tracking-tight">Product Information</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-neutral-500 hover:text-black text-xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-neutral-200 text-sm font-medium">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActive(t)}
                    className={`flex-1 py-3 transition ${
                      active === t
                        ? "border-b-2 border-black text-black"
                        : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="px-6 py-6 text-sm text-neutral-700 leading-relaxed min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
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
