type Address = {
    name: string
    line1: string
    city: string
    state: string
    zip: string
  }
  
  export default function AddressForm({
    address,
    setAddress,
  }: {
    address: Address
    setAddress: (a: Address) => void
  }) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-5">
        <h2 className="text-lg font-medium text-neutral-900">Delivery Details</h2>
        {(["name", "line1", "city", "state", "zip"] as (keyof Address)[]).map((f) => (
          <input
            key={f}
            type="text"
            value={address[f]}
            onChange={(e) => setAddress({ ...address, [f]: e.target.value })}
            placeholder={
              f === "line1"
                ? "Street Address"
                : f.charAt(0).toUpperCase() + f.slice(1)
            }
            className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
          />
        ))}
      </div>
    )
  }
  