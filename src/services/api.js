const BASE = 'https://fakestoreapi.com'

export async function fetchProducts(category = null) {
  const url = category ? `${BASE}/products/category/${encodeURIComponent(category)}` : `${BASE}/products`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/products/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export async function fetchProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}
