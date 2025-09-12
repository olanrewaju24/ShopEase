// src/state/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const ORDERS_KEY = "orders";
const CART_KEY = "cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from localStorage on start
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    setCart(saved);
  }, []);

  // ✅ Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Add product (increase qty if already in cart)
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return; // prevent 0 or negative qty
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = (user) => {
    const newOrder = {
      id: Date.now().toString(),
      user: user?.uid || "guest",
      items: cart,
      total: subtotal,
      createdAt: Date.now(),
    };

    const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    localStorage.setItem(ORDERS_KEY, JSON.stringify([...all, newOrder]));

    setCart([]); // clear cart
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, subtotal, placeOrder, ORDERS_KEY }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
