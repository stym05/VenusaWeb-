import LookbookGrid from "@/components/LookbookGrid"

export const metadata = {
  title: "Lookbook — VENUSA",
}

export default function LookbookPage() {
  return (
    <section className="bg-white text-black">
      <div className="container pt-12 pb-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Lookbook</h1>
        <p className="mt-2 text-black/60">
          A rolling gallery of silhouettes, textures, and places — captured around the world.
        </p>
      </div>

      <LookbookGrid />
    </section>
  )
}
