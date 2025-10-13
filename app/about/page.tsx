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
    <div className="relative bg-[#0a0a0b] text-white overflow-hidden">
      {/* 🌌 Subtle Background Glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="mx-auto mt-[-10vh] h-[36rem] w-[36rem] rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)",
          }}
        />
      </div>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-12 md:py-20 space-y-16 md:space-y-24">
        {/* 🌟 Title */}
        <motion.section {...fadeUp} className="text-center space-y-4 px-2">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-tight">
            VENUSA:{" "}
            <span className="text-white/75 font-body font-light">
              Fashion with a Soul
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-3xl mx-auto font-body leading-relaxed">
            A story of bold beginnings, fearless intent, and fashion that speaks louder than words.
          </p>
        </motion.section>

        {/* 🖼️ Responsive Image Collage */}
        <motion.section
          {...fadeUp}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 px-2"
        >
          {[
            {
              src: "/images/about-1.jpg",
              caption: "Materials & Trims",
              alt: "Venusa studio — materials and trims",
            },
            {
              src: "/images/about-2.jpg",
              caption: "Minimal Silhouettes",
              alt: "Venusa minimal silhouettes",
            },
            {
              src: "/images/about-3.jpg",
              caption: "Craft & Finish",
              alt: "Venusa craft and finish",
            },
          ].map((img, idx) => (
            <figure
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_2px_20px_rgba(255,255,255,0.03)] transition-all duration-500 hover:shadow-[0_4px_30px_rgba(255,255,255,0.06)]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-64 sm:h-72 md:h-80 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm text-white/80">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </motion.section>

        {/* 🪶 Text Sections */}
        <motion.section
          {...fadeUp}
          className="prose prose-invert max-w-5xl mx-auto font-body"
        >
          <h2 className="font-semibold text-[22px]">A Story of Bold Beginnings</h2>
          <p className="font-light text-[16px] leading-relaxed text-white/80">
            In a quiet corner of a city humming with noise and ambition, a dream was stitched — not with
            threads, but with vision, fire, and fearless intent. VENUSA was born not in a glossy studio,
            but across college benches and late-night conversations between friends who saw fashion differently.
          </p>
          <p className="font-light text-[16px] leading-relaxed text-white/80">
            The founder, brimming with purpose, wanted a brand where confidence wasn’t worn — it was owned.
            Alongside her stood the co-founder, a mind wired for momentum, turning scraps into samples and
            obstacles into opportunities. Together they weren’t just building a brand; they were building a culture.
          </p>
        </motion.section>

        <motion.section
          {...fadeUp}
          className="prose prose-invert max-w-5xl mx-auto font-body"
        >
          <h2 className="font-semibold text-[22px]">Made for the Fearless. Built for the Bold.</h2>
          <p className="font-light text-[16px] leading-relaxed text-white/80">
            VENUSA isn’t just fashion — it’s a movement. Urban elegance with an edge, minimalist yet powerful.
            Each collection is designed for streets and spotlight alike: modern streetwear meets everyday luxury.
          </p>
          <ul className="font-light text-[16px] leading-relaxed text-white/80 list-disc list-inside space-y-1">
            <li>Clothes that elevate the soul</li>
            <li>Pieces that dare you to own your vibe</li>
            <li>Designs that celebrate unapologetic authenticity</li>
          </ul>
        </motion.section>

        <motion.section
          {...fadeUp}
          className="prose prose-invert max-w-5xl mx-auto font-body"
        >
          <h2 className="font-semibold text-[22px]">More Than Just Clothing</h2>
          <p className="font-light text-[16px] leading-relaxed text-white/80">
            At its core, VENUSA is a tribute to the raw, the real, and the rising — to those who dream out loud,
            express without apology, and refuse to shrink for the comfort of others.
          </p>
        </motion.section>

        <motion.section
          {...fadeUp}
          className="prose prose-invert max-w-5xl mx-auto font-body"
        >
          <h2 className="font-semibold text-[22px]">The People Behind the Power</h2>
          <ul className="font-light text-[16px] leading-relaxed text-white/80 list-disc list-inside space-y-1">
            <li>
              <strong>Founder:</strong> Visionary with big dreams and a bigger heart — empowerment, ethics, expression.
            </li>
            <li>
              <strong>Co-founder:</strong> The engine behind execution, carrying the mission with grit and grace.
            </li>
            <li>
              <strong>Designer:</strong> Young talent — rebellion, art, and youth culture in refined forms.
            </li>
            <li>
              <strong>Tech Lead:</strong> Building VENUSA’s digital backbone with quiet strength.
            </li>
          </ul>
        </motion.section>

        <motion.section
          {...fadeUp}
          className="prose prose-invert max-w-5xl mx-auto font-body"
        >
          <h2 className="font-semibold text-[22px]">More Than Fashion — It’s a Movement</h2>
          <p className="font-light text-[16px] leading-relaxed text-white/80">
            Every drop is limited but timeless, crafted with a sustainable, ethical approach. VENUSA connects with a
            community of creators, dreamers, and doers — those who aren’t afraid to be different.
          </p>
        </motion.section>

        {/* ✨ Closing Section */}
        <motion.section
          {...fadeUp}
          className="prose prose-invert max-w-5xl mx-auto text-center font-body"
        >
          <h2 className="font-semibold text-[22px]">Own Your Vibe. Elevate Your Identity.</h2>
          <ul className="!text-left font-light text-[16px] leading-relaxed text-white/80 list-disc list-inside space-y-1">
            <li>Speak louder through style</li>
            <li>Choose purpose over popularity</li>
            <li>Live unapologetically and dress accordingly</li>
          </ul>
          <p className="font-light text-[16px] leading-relaxed text-white/80">
            Every hoodie, tee, and silhouette is designed to help you own your vibe.
            Because fashion should free you — not define you.
          </p>
          <h3 className="text-[18px] font-medium mt-4">VENUSA — Where Style Meets Purpose</h3>
          <p className="text-white/70 text-[15px] leading-relaxed">
            Born from the streets, built for the future. No shortcuts, just vision, hustle, and heart.
            This isn’t the end of the story — it’s just the beginning.
          </p>
        </motion.section>
      </main>
    </div>
  )
}
