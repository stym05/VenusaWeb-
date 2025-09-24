import { products } from "@/lib/products"
import ShopView from "@/components/ShopView"

export const revalidate = 60

export const metadata = {
  title: "Shop — VENUSA",
}

export default function ShopPage() {
  return (
    <section className="bg-white text-black">
      <div className="container pt-12 pb-2">
        <div className="flex items-baseline justify-between">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Shop</h1>
          <div className="text-black/60 text-sm">Total {products.length} items</div>
        </div>
      </div>

      <ShopView allProducts={products} />
    </section>
  )
}
