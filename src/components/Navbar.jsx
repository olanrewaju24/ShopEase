import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../state/CartContext.jsx'
import { useAuth } from '../state/AuthContext.jsx'

export default function Navbar() {
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [menuOpen, setMenuOpen] = useState(false) // ✅ state for mobile menu

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (q.trim()) {
      navigate(`/products?q=${encodeURIComponent(q)}`)
      // setQ('') ❌ remove this so user still sees their query
    } else {
      navigate('/products')
    }
    setMenuOpen(false) // ✅ close menu after search on mobile
  }

  const active = ({ isActive }) =>
    isActive ? 'text-yellow-300' : 'hover:text-gray-200'

  return (
    <div className="shadow-md bg-green-600 text-white w-full relative z-40">
      <div className="flex justify-between items-center px-4 sm:px-8 py-3">
        
        {/* Logo */}
        <Link to="/" className="font-bold text-3xl">
          ShopEase
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <input
            placeholder="Search title..."
            value={q}
            onChange={e => setQ(e.target.value)}
            className="border rounded-l-xl px-3 py-2 flex-1 text-black"
          />
          <button
            type="submit"
            className="bg-gray-800 bg-gray text-white px-4 rounded-r-xl"
          >
            Search
          </button>
        </form>

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/products" className={active}>Products</NavLink>
          <NavLink to="/cart" className={active}>Cart ({cart.length})</NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className={active}>Dashboard</NavLink>
              <button onClick={handleLogout} className="btn">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="">Login</NavLink>
              <NavLink to="/signup" className="">Sign up</NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-700 px-4 py-3 space-y-3">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="flex">
            <input
              placeholder="Search title..."
              value={q}
              onChange={e => setQ(e.target.value)}
              className="border rounded-l-xl px-3 py-2 flex-1 text-black"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 rounded-r-xl"
            >
              Go
            </button>
          </form>

          <NavLink to="/products" className="block" onClick={() => setMenuOpen(false)}>Products</NavLink>
          <NavLink to="/cart" className="block" onClick={() => setMenuOpen(false)}>Cart ({cart.length})</NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className="block" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
              <button onClick={handleLogout} className="btn w-full text-left">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="block" onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink to="/signup" className="block" onClick={() => setMenuOpen(false)}>Sign up</NavLink>
            </>
          )}
        </div>
      )}
    </div>
  )
}
