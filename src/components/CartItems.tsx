import Image from "next/image"
import { formatINR } from "@/lib/money"

export default function CartItems({ items, setQty, remove }: any) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white">
      <h2 className="text-lg font-medium px-6 py-4 border-b border-neutral-200 text-neutral-900">
        Your Bag ({items.length})
      </h2>
      <ul className="divide-y divide-neutral-200">
        {items.map((i: any) => (
          <li key={i.id} className="flex items-center gap-5 px-6 py-5">
            <div className="relative h-24 w-20 rounded-lg border border-neutral-200 overflow-hidden">
              <Image
                src={i.image || "/placeholder.jpg"}
                alt={i.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900">{i.title}</p>
              <p className="text-xs text-neutral-500">{i.size ?? "Free Size"}</p>
              <div className="mt-2 flex items-center gap-3">
                <button
                  onClick={() => setQty(i.id, i.size, Math.max(1, i.qty - 1))}
                  className="h-6 w-6 rounded-md border border-neutral-300 text-sm"
                >−</button>
                <span className="text-sm">{i.qty}</span>
                <button
                  onClick={() => setQty(i.id, i.size, i.qty + 1)}
                  className="h-6 w-6 rounded-md border border-neutral-300 text-sm"
                >+</button>
                <button
                  onClick={() => remove(i.id, i.size)}
                  className="ml-3 text-xs text-neutral-500 hover:text-neutral-900"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="text-sm font-medium text-neutral-800">{formatINR(i.price * 100)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
