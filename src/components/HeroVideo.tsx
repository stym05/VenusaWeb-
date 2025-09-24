// src/components/HeroVideo.tsx
'use client'

export default function HeroVideo() {
  return (
    <section className="relative h-[90vh] w-full mt-14 overflow-hidden bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/hero-poster.jpg"  // optional: add a poster image in /public/videos/
      >
        <source src="/videos/hero.webm" type="video/webm" />   {/* optional but recommended */}
        <source src="/videos/hero.mp4"  type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold">
          Minimal. Modern. <span className="text-brand-red">VENUSA</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl">
          Premium essentials engineered for comfort and built to last.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="/shop" className="btn btn-primary">Shop Now</a>
          <a href="/lookbook" className="btn btn-outline text-white border-white/50">Lookbook</a>
        </div>
      </div>
    </section>
  )
}
