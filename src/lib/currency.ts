// src/lib/currency.ts
export const INR = "INR" as const; export const USD = "USD" as const;
export function fxInrToUsd(inr: number, rate = Number(process.env.NEXT_PUBLIC_USD_RATE || "0.012")) {
  return Math.round(inr * rate);
}
export function formatPrice(value: number, currency: "INR"|"USD") {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", { style: "currency", currency }).format(value);
}
