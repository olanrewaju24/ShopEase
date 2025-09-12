import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../state/CartContext";

const ProductDetail = () => {
  const { id } = useParams(); // get product id from route
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <p className="text-center text-gray-600">Loading product...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-96 object-cover rounded shadow"
        />

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-600 mb-2">
            {product.category?.name || product.category}
          </p>
          <p className="text-xl font-semibold text-green-600 mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
