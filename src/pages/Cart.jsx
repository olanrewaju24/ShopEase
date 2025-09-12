// src/pages/Cart.jsx
import { useCart } from "../state/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  if (!cart || cart.length === 0) {
    return <p className="text-center">Your cart is empty.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <img>{item.image}</img>
              <p className="font-semibold">{item.title}</p>
              <p>${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                className="w-16 border rounded text-center"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* ✅ Cart Summary */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold">Summary</h2>
        <p>Total Items: {cart.reduce((s, i) => s + i.quantity, 0)}</p>
        <p className="font-bold text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
      </div>
    </div>
  );
}
