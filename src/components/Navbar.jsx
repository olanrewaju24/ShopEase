import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../state/CartContext.jsx'
import { useAuth } from '../state/AuthContext.jsx'

export default function Navbar() {
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (q.trim()) {
      navigate(`/products?q=${encodeURIComponent(q)}`)
      setQ('')
    } else {
      navigate('/products')
    }
  }

  const active = ({ isActive }) =>
    isActive ? 'text-white' : 'text-white-500 hover:text-gray'

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white w-full duration-200 relative z-40 items-center ">
      {/* upper nav */}
      <div className="bg-green-600 py-3 sm:py-2">
        <div className="w-full flex justify-between items-center px-4 sm:px-8">
          {/* Logo */}
          <Link to="/" className="font-bold text-4xl">
            ShopEase
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex flex-1 max-w-md mx-4">
            <input
              placeholder="Search title..."
              value={q}
              onChange={e => setQ(e.target.value)}
              className="border rounded-l-xl px-3 py-2 flex-1 text-black"
            />
            <button
              type="submit"
              className="bg-gray-400 text-white px-4 rounded-r-xl"
            >
              Search
            </button>
          </form>

          {/* Nav Links */}
          <div className="flex items-center gap-6 text-white">
            <NavLink to="/products" className={active}>
              Products
            </NavLink>
            <NavLink to="/cart" className={active}>
              Cart ({cart.length})
            </NavLink>

            {user ? (
              <>
                <NavLink to="/dashboard" className={active}>
                  Dashboard
                </NavLink>
                <button onClick={handleLogout} className="btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn">
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="btn text-white-600 hover:text-gray-600"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

     
    </div>
  )
}
