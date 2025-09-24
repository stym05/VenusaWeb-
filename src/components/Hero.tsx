import Link from "next/link"

export default function Hero() {
  return (
    <section className="container mt-12 md:mt-20">
      <div className="card p-8 md:p-14 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-red/10 blur-3xl" />
        </div>

        <div className="max-w-3xl">
          <p className="badge">New Drop</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-body font-regularleading-[1.05]">
            Minimal. Modern. <span className="font-heading text-gradient-red">VENUSA</span>
          </h1>
          <p className="mt-4 font-body text-black/70 md:text-lg">
            Premium essentials engineered for comfort and built to last. Understated silhouettes, mid‑luxe finishes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-primary">Shop Collection</Link>
            <Link href="/lookbook" className="btn btn-outline">Lookbook</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
