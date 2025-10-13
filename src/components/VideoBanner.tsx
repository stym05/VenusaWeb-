'use client'

export default function VideoBanner() {
  return (
    <div className="relative w-full h-[92vh] overflow-hidden">
      {/* 🖥️ Desktop Video */}
      <video
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ pointerEvents: 'none' }}
        poster="/videos/hero-desktop-poster.jpg"
      >
        <source src="/videos/hero-desktop.webm" type="video/webm" />
        <source src="/videos/hero-desktop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 📱 Mobile Video */}
      <video
        className="block md:hidden absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ pointerEvents: 'none' }}
        poster="/videos/hero-mobile-poster.jpg"
      >
        <source src="/videos/hero-mobile.webm" type="video/webm" />
        <source src="/videos/hero-mobile.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
