import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProductList from './pages/ProductList.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Shoes from './pages/shoes.jsx'
import { useAuth } from './state/AuthContext.jsx'
import ProductDetails2 from './pages/ProductDetails2.jsx'
import Hero from './components/Hero.jsx'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  const location = useLocation() // 👈 get current route

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Show Hero ONLY on homepage */}
      {location.pathname === "/" && <Hero />}
      
      <main className="flex-1 container py-6">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/product2/:id" element={<ProductDetails2 />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        @ShopEase 2025
      </footer>
    </div>
  )
}
