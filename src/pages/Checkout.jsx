import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import { useCart } from '../state/CartContext.jsx'

export default function Checkout() {
  const { user } = useAuth()
  const { items, subtotal, placeOrder } = useCart()
  const navigate = useNavigate()

  const handlePlaceOrder = () => {
    const order = placeOrder(user)
    navigate('/dashboard', { state: { lastOrderId: order.id } })
  }

  if (items.length === 0) {
    return <p>Your cart is empty. Add items first.</p>
  }

  return (
    <div className="max-w-xl mx-auto card p-6">
      <h2 className="text-xl font-semibold">Checkout</h2>
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex justify-between"><span>Items</span><span>{items.length}</span></div>
        <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>$0.00</span></div>
        <div className="flex justify-between font-semibold text-black"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
      </div>
      <button onClick={handlePlaceOrder} className="btn w-full mt-6">Place Order</button>
      <p className="text-xs text-gray-500 mt-3">No real payment processed. This simulates an order.</p>
    </div>
  )
}
