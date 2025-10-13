"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useWishlist } from "@/components/useWishlist"
import { useState } from "react"

export default function WishButton({ slug, small = false }: { slug: string; small?: boolean }) {
  const { slugs, toggle } = useWishlist()
  const [loading, setLoading] = useState(false)
  const active = slugs.includes(slug)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    await toggle(slug)
    setTimeout(() => setLoading(false), 250)
  }

  return (
    <motion.button
      onClick={handleClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      whileTap={{ scale: 0.9 }}
      className={[
        "relative flex items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur-sm shadow-sm",
        small ? "h-8 w-8" : "h-10 w-10",
      ].join(" ")}
      disabled={loading}
    >
      <AnimatePresence mode="wait" initial={false}>
        {active ? (
          <motion.svg
            key="filled"
            viewBox="0 0 24 24"
            fill="#d12a2a"
            stroke="none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={small ? "h-4 w-4" : "h-5 w-5"}
          >
            <path d="M20.3 5.7a5 5 0 0 0-7.1 0L12 6.9l-1.2-1.2a5 5 0 1 0-7.1 7.1l1.2 1.2L12 21l7.1-7.1 1.2-1.2a5 5 0 0 0 0-7.1Z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="outline"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="1.6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={small ? "h-4 w-4" : "h-5 w-5"}
          >
            <path d="M20.3 5.7a5 5 0 0 0-7.1 0L12 6.9l-1.2-1.2a5 5 0 1 0-7.1 7.1l1.2 1.2L12 21l7.1-7.1 1.2-1.2a5 5 0 0 0 0-7.1Z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
