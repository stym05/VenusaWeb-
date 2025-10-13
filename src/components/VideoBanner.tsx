'use client'

export default function VideoBanner() {
  return (
    <div className="relative w-full h-[92vh] overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-fill"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ pointerEvents: "none" }}
        poster="/videos/hero-poster.jpg"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Removed gradient overlay for a clean look */}
    </div>
  )
}
