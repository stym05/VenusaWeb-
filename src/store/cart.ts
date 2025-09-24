// src/store/cart.ts
import { create } from "zustand";
type Line = { id: string; title: string; priceINR: number; qty: number; gstRate?: 5|18 };
type State = { lines: Line[]; currency: "INR"|"USD" };
type Actions = {
  add: (line: Line) => void; remove: (id: string) => void; clear: () => void;
  setCurrency: (c: "INR"|"USD") => void;
};
export const useCart = create<State & Actions>((set) => ({
  lines: [], currency: (process.env.NEXT_PUBLIC_DEFAULT_CURRENCY as "INR"|"USD") || "INR",
  add: (l) => set(s => ({ lines: [...s.lines, l] })),
  remove: (id) => set(s => ({ lines: s.lines.filter(x => x.id !== id) })),
  clear: () => set({ lines: [] }),
  setCurrency: (c) => set({ currency: c })
}));
