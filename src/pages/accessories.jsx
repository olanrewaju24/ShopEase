import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { fetchCategories, fetchProducts } from '../services/api.js'

export default function accessories() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('all')
  const [maxPrice, setMaxPrice] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 🔹 get search term from query params
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const [cats, prods] = await Promise.all([
        fetchCategories(),
        fetchProducts(category === 'all' ? null : category)
      ])
      setCategories(cats)
      setProducts(prods)
    } catch (e) {
      setError(e.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [category])

  const filtered = products.filter(p => {
    const priceOk = maxPrice ? p.price <= Number(maxPrice) : true
    const qOk = q ? p.title.toLowerCase().includes(q.toLowerCase()) : true
    return priceOk && qOk
  })

  return (
    <div className="space-y-4 justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded-xl px-3 py-2"
        >
          <option value="all">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          placeholder="Max price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="border rounded-xl px-3 py-2 w-36"
        />
        
          <a href="#" className="">Home</a>
          <a href="#" className="">Shoes</a>
          <a href="#" className="">Accessories</a>
          <a href="#" className="text-black">Contact</a>
      
      </div>

      {loading && <p>Loading products…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.length > 0 ? (
            filtered.map(p => <ProductCard key={p.id} product={p} />)
          ) : (
            <p>No products found.</p>
          )}
           
        </div>
      )}
    </div>
  )
}
