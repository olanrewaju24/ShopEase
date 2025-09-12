// src/pages/Cart.jsx
import { useContext } from "react";
import { CartContext } from "../state/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  if (!cart || cart.length === 0) {
    return <p className="text-center">Your cart is empty.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-semibold">{item.title}</p>
              <p>${item.price}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
