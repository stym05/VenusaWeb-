'use client'

type Props = {
  /** paths under /public, e.g. /videos/about-hero.mp4 */
  mp4?: string
  webm?: string
  poster?: string
  /** height of the band; change to `h-[70vh]` if you want taller */
  heightClass?: string
  /** optional dark wash over the video */
  overlayClass?: string
}

export default function VideoIntro({
  mp4 = '/videos/about-hero.mp4',
  webm,
  poster = '/videos/about-hero-poster.jpg',
  heightClass = 'h-[60vh]',
  overlayClass = 'bg-black/20'
}: Props) {
  return (
    <section className={`relative w-full ${heightClass} overflow-hidden`}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        // don’t eat scroll/taps
        style={{ pointerEvents: 'none' }}
      >
        {webm ? <source src={webm} type="video/webm" /> : null}
        <source src={mp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`absolute inset-0 ${overlayClass}`} />
    </section>
  )
}
