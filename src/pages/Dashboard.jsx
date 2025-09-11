import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import { useCart } from '../state/CartContext.jsx'

export default function Dashboard() {
  const { user } = useAuth()
  const { ORDERS_KEY } = useCart()
  const loc = useLocation()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
    const mine = all.filter(o => o.user === (user?.uid || 'guest'))
    setOrders(mine)
  }, [ORDERS_KEY, user])

  const lastOrderId = loc.state?.lastOrderId

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h2 className="text-xl font-semibold">Welcome{user?.displayName ? `, ${user.displayName}` : ''}!</h2>
        <p className="text-gray-600">Email: {user?.email}</p>
        {lastOrderId && <p className="text-green-700 mt-2">Order placed successfully: <span className="font-mono">{lastOrderId}</span></p>}
      </div>

      <div className="card p-4">
        <h3 className="font-semibold mb-3">Past Orders</h3>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <ul className="space-y-3">
            {orders.map(o => (
              <li key={o.id} className="border rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order {o.id}</p>
                    <p className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${o.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{o.items.length} items</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
