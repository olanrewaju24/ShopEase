// src/pages/ProductDetails2.jsx
import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails2 = ({ products }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2 className="text-center mt-10 text-red-500">Product not found</h2>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-64 h-64 object-cover mb-4 rounded-lg shadow"
      />
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold text-green-700 mb-6">${product.price}</p>

      <h2 className="text-2xl font-semibold mb-3">Customer Reviews</h2>
      {product.reviews && product.reviews.length > 0 ? (
        <ul className="space-y-3">
          {product.reviews.map((r, i) => (
            <li key={i} className="border p-4 rounded-lg shadow-sm bg-gray-50">
              <p className="font-semibold">{r.reviewerName}</p>
              <p className="text-sm text-gray-500">{r.date}</p>
              <p className="mt-2">{r.comment}</p>
              <p className="text-yellow-600 mt-1">⭐ {r.rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default ProductDetails2;
