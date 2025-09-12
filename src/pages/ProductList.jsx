import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);

  useEffect(() => {
    fetch("https://dummyjson.com/products") // 👈 your API endpoint
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filter products by category + maxPrice
  const filteredProducts = products.filter((p) => {
    const categoryName = p.category?.name || p.category; // handle both object or string
    return (
      (!categoryFilter || categoryName === categoryFilter) &&
      p.price <= maxPrice
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      {/* Filter Section */}
      <div className="flex gap-4 mb-6 items-center">
        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          {[...new Set(products.map((p) => p.category?.name || p.category))].map(
            (cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            )
          )}
        </select>

        {/* Price Filter */}
        <div>
          <label className="mr-2 font-medium">
            Max Price: ${maxPrice}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id} // ✅ fixed unique key
            className="border rounded-lg shadow p-4 flex flex-col"
          >
            {/* Product Image */}
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-48 object-cover mb-3 rounded"
            />

            {/* Product Info */}
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-500">
              {product.category?.name || product.category}
            </p>
            <p className="text-gray-700 font-bold">${product.price}</p>

            {/* View Button */}
            <Link
              to={`/product/${product.id}`}
              className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
