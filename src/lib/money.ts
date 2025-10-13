export function formatINR(amountPaise: number) {
    const rupees = Math.round(amountPaise / 100)
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(rupees)
    } catch {
      return `₹ ${rupees.toLocaleString("en-IN")}`
    }
  }
  