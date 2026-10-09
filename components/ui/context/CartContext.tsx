"use client"
import { createContext, useContext, useState, ReactNode } from "react"

// Tipo do produto (igual ao que você já usa na HomePage)
type Product = {
  id: number
  name: string
  description: string
  price: number
  imageUrl?: string
  category: string
}

// Tipo do contexto
type CartContextType = {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
}

// Criando o contexto
const CartContext = createContext<CartContextType | undefined>(undefined)

// Provider que envolve o app
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product])
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Hook para usar o contexto
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider")
  }
  return context
}
