'use client'

export default function VideoBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Keep this a fixed aspect ratio; change to h-[70vh] if you want a taller hero */}
      <div className="relative aspect-[20/9] w-full">
        <video
          className="absolute inset-0 h-full w-full object-fill"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // prevents video from intercepting pointer/scroll
          style={{ pointerEvents: "none" }}
          poster="/videos/hero-poster.jpg"  // optional image in /public/videos
        >
          <source src="/videos/hero.webm" type="video/webm" />   {/* optional fallback */}
          <source src="/videos/hero.mp4"  type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* optional dark wash so text below doesn’t clash visually */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  )
}
