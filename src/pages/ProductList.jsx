import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const q = searchParams.get("q")?.toLowerCase() || ""

  useEffect(() => {
    setLoading(true)
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        let results = data.products
        if (q) {
          results = results.filter(p =>
            p.title.toLowerCase().includes(q)
          )
        }
        setProducts(results)
        setLoading(false)
      })
  }, [q])

  if (loading) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id} className="border p-3 rounded">
          <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover" />
          <h2 className="font-semibold">{product.title}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  )
}
