/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type CartItem = {
  id: string
  slug: string
  name: string
  moment: string
  vessel: string
  scent: string
  ingredients: string[]
  size: 220 | 420
  price: number
  image: string
  color: string
  quantity: number
}

type CartValue = {
  items: CartItem[]
  count: number
  subtotal: number
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartValue | null>(null)
const storageKey = 'embera-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) ?? '[]') as CartItem[] } catch { return [] }
  })

  useEffect(() => localStorage.setItem(storageKey, JSON.stringify(items)), [items])

  const value = useMemo<CartValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    addItem: (item) => setItems((current) => {
      const signature = `${item.slug}-${item.vessel}-${item.scent}-${item.size}-${item.ingredients.join('|')}`
      const existing = current.find((entry) => entry.id === signature)
      return existing
        ? current.map((entry) => entry.id === signature ? { ...entry, quantity: entry.quantity + 1 } : entry)
        : [...current, { ...item, id: signature, quantity: 1 }]
    }),
    updateQuantity: (id, quantity) => setItems((current) => quantity < 1 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item)),
    removeItem: (id) => setItems((current) => current.filter((item) => item.id !== id)),
    clearCart: () => setItems([]),
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error('useCart must be used inside CartProvider')
  return cart
}
