"use client"

import { createContext, useContext, useEffect, useMemo, useReducer } from "react"

export type CartItem = {
  id: string          // product slug or id
  title: string
  price: number
  image?: string
  size?: string
  qty: number
}

type State = { items: CartItem[] }
type Action =
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; id: string; size?: string }
  | { type: "SET_QTY"; id: string; size?: string; qty: number }
  | { type: "CLEAR" }

const STORAGE_KEY = "venusa_cart_v1"

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": {
      const p = action.payload
      const idx = state.items.findIndex(i => i.id === p.id && i.size === p.size)
      if (idx >= 0) {
        const items = state.items.slice()
        items[idx] = { ...items[idx], qty: items[idx].qty + p.qty }
        return { items }
      }
      return { items: [{ ...p }, ...state.items] }
    }
    case "REMOVE":
      return { items: state.items.filter(i => !(i.id === action.id && i.size === action.size)) }
    case "SET_QTY":
      return {
        items: state.items.map(i =>
          i.id === action.id && i.size === action.size ? { ...i, qty: action.qty } : i
        ),
      }
    case "CLEAR":
      return { items: [] }
    default:
      return state
  }
}

const CartContext = createContext<{
  state: State
  add: (item: CartItem) => void
  remove: (id: string, size?: string) => void
  setQty: (id: string, size: string | undefined, qty: number) => void
  clear: () => void
}>({} as any)

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as State
        if (Array.isArray(parsed.items)) {
          parsed.items.forEach(i => dispatch({ type: "ADD", payload: { ...i } }))
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [state])

  const value = useMemo(() => ({
    state,
    add: (item: CartItem) => dispatch({ type: "ADD", payload: item }),
    remove: (id: string, size?: string) => dispatch({ type: "REMOVE", id, size }),
    setQty: (id: string, size: string | undefined, qty: number) =>
      dispatch({ type: "SET_QTY", id, size, qty }),
    clear: () => dispatch({ type: "CLEAR" }),
  }), [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
