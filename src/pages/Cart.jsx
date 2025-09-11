import { Link } from 'react-router-dom'
import { useCart } from '../state/CartContext.jsx'

export default function Cart() {
  const { items, updateQty, removeItem, clearCart, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="mb-4">Your cart is empty.</p>
        <Link to="/" className="btn">Browse products</Link>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {items.map(item => (
          <div key={item.id} className="card p-4 flex gap-4 items-center">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </div>
            <input 
              type="number" 
              min="1" 
              value={item.qty} 
              onChange={e => updateQty(item.id, Number(e.target.value))} 
              className="border rounded-xl w-20 px-3 py-2" 
            />
            <button 
              onClick={() => removeItem(item.id)} 
              className="text-sm text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={clearCart} className="text-sm text-gray-600 hover:text-black">
          Clear cart
        </button>
      </div>

      <aside className="card p-4 h-max sticky top-24">
        <h3 className="font-semibold text-lg">Order Summary</h3>
        <div className="mt-3 flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <Link to="/checkout" className="btn w-full mt-4">Proceed to Checkout</Link>
      </aside>
    </div>
  )
}
