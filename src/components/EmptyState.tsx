export default function EmptyState() {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white/90 p-10 text-center">
        <p className="text-neutral-600">Your cart is empty</p>
        <a
          href="/shop"
          className="mt-4 inline-block border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
        >
          Continue Shopping
        </a>
      </div>
    )
  }
  