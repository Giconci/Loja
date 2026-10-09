"use client"

import { useCart } from "@/components/ui/context/CartContext" // <-- Importando o contexto
import { Button } from "@/components/ui/button"

export default function CarrinhoPage() {
  const { cart, removeFromCart } = useCart() // <-- Pegando carrinho e função de remover

  // Calcula o total
  const total = cart.reduce((acc, item) => acc + item.price, 0) // <-- ADIÇÃO: soma dos preços

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Seu Carrinho</h1>

      {cart.length === 0 ? ( // <-- ADIÇÃO: verifica se carrinho está vazio
        <p className="text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">R$ {item.price.toFixed(2)}</p>
                </div>
              </div>

              <Button
                variant="destructive"
                onClick={() => removeFromCart(item.id)} // <-- ADIÇÃO: remove item
              >
                Remover
              </Button>
            </div>
          ))}

          {/* Total */}
          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">Total: R$ {total.toFixed(2)}</h2>
            <Button className="mt-2 bg-blue-600 text-white hover:bg-blue-700">
              Finalizar Compra
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
