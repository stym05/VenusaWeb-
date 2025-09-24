"use client"

import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeInOut" as const },
}

export default function AboutPage() {
  return (
    <div className="relative bg-[#0a0a0b] text-white">
      {/* Subtle BG glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="mx-auto mt-[-10vh] h-[36rem] w-[36rem] rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)",
          }}
        />
      </div>

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-20 space-y-24">
        {/* Title */}
        <motion.section {...fadeUp} className="text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-regular tracking-tight">
            VENUSA: <span className="text-white/75 font-body font-regular">Fashion with a Soul</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-body">
            A story of bold beginnings, fearless intent, and fashion that speaks louder than words.
          </p>
        </motion.section>

        {/* Image collage (kept) */}
        <motion.section {...fadeUp} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img
              src="/images/about-1.jpg"
              alt="Venusa studio — materials and trims"
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3 text-sm text-white/80">
              Materials & Trims
            </figcaption>
          </figure>
          <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img
              src="/images/about-2.jpg"
              alt="Venusa minimal silhouettes"
              className="h-64 w-full object-cover sm:h-full transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3 text-sm text-white/80">
              Minimal Silhouettes
            </figcaption>
          </figure>
          <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img
              src="/images/about-3.jpg"
              alt="Venusa craft and finish"
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3 text-sm text-white/80">
              Craft & Finish
            </figcaption>
          </figure>
        </motion.section>

        {/* Prose sections — just text, like before */}
        <motion.section {...fadeUp} className="prose prose-invert max-w-5xl mx-auto font-body">
          <h2>A Story of Bold Beginnings</h2>
          <p>
            In a quiet corner of a city humming with noise and ambition, a dream was stitched — not with
            threads, but with vision, fire, and fearless intent. VENUSA was born not in a glossy studio,
            but across college benches and late-night conversations between friends who saw fashion differently.
          </p>
          <p>
            The founder, brimming with purpose, wanted a brand where confidence wasn’t worn — it was owned.
            Alongside her stood the co-founder, a mind wired for momentum, turning scraps into samples and
            obstacles into opportunities. Together they weren’t just building a brand, they were building a culture.
          </p>
        </motion.section>

        <motion.section {...fadeUp} className="prose prose-invert max-w-5xl mx-auto font-body">
          <h2>Made for the Fearless. Built for the Bold.</h2>
          <p>
            VENUSA isn’t just fashion — it’s a movement. Urban elegance with an edge, minimalist yet powerful.
            Each collection is designed for streets and spotlight alike: modern streetwear meets everyday luxury.
          </p>
          <ul>
            <li>Clothes that elevate the soul</li>
            <li>Pieces that dare you to own your vibe</li>
            <li>Designs that celebrate unapologetic authenticity</li>
          </ul>
        </motion.section>

        <motion.section {...fadeUp} className="prose prose-invert max-w-5xl mx-auto font-body">
          <h2>More Than Just Clothing</h2>
          <p>
            At its core, VENUSA is a tribute to the raw, the real, and the rising — to those who dream out loud,
            express without apology, and refuse to shrink for the comfort of others.
          </p>
        </motion.section>

        <motion.section {...fadeUp} className="prose prose-invert max-w-5xl mx-auto font-body">
          <h2>The People Behind the Power</h2>
          <ul>
            <li><strong>Founder:</strong> Visionary with big dreams and a bigger heart — empowerment, ethics, expression.</li>
            <li><strong>Co-founder:</strong> The engine behind execution, carrying the mission with grit and grace.</li>
            <li><strong>Designer:</strong> Young talent — rebellion, art, and youth culture in refined forms.</li>
            <li><strong>Tech Lead:</strong> Building VENUSA’s digital backbone with quiet strength.</li>
          </ul>
        </motion.section>

        <motion.section {...fadeUp} className="prose prose-invert max-w-5xl mx-auto font-body">
          <h2>More Than Fashion — It’s a Movement</h2>
          <p>
            Every drop is limited but timeless, crafted with a sustainable, ethical approach. VENUSA connects with a
            community of creators, dreamers, and doers — those who aren’t afraid to be different.
          </p>
        </motion.section>

        <motion.section {...fadeUp} className="prose prose-invert max-w-5xl mx-auto text-center font-body">
          <h2>Own Your Vibe. Elevate Your Identity.</h2>
          <ul className="!text-left">
            <li>Speak louder through style</li>
            <li>Choose purpose over popularity</li>
            <li>Live unapologetically and dress accordingly</li>
          </ul>
          <p>
            Every hoodie, tee, and silhouette is designed to help you own your vibe. Because fashion should free you — not define you.
          </p>
          <h3>VENUSA — Where Style Meets Purpose</h3>
          <p className="text-white/70">
            Born from the streets, built for the future. No shortcuts, just vision, hustle, and heart. This isn’t the end of the story — it’s just the beginning.
          </p>
        </motion.section>
      </main>
    </div>
  )
}
