// src/components/ProductCard.jsx
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-2xl p-4 shadow hover:shadow-lg transition bg-white flex flex-col">
      {/* Product Image */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      {/* Product Info */}
      <h3 className="font-semibold text-lg">{product.title}</h3>
      <p className="text-gray-500">{product.category}</p>
      <p className="text-black font-bold">${product.price}</p>

      {/* View button */}
      <Link
        to={`/products/${product.id}`}
        className="mt-auto bg-black text-white px-4 py-2 rounded-lg text-center hover:bg-gray-800"
      >
        View
      </Link>
    </div>
  );
}
