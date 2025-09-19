import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../state/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Fetch single product
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        setProduct(data);

        // Fetch related products from same category
        return fetch(
          `https://dummyjson.com/products/category/${encodeURIComponent(
            data.category
          )}`
        );
      })
      .then((res) => (res && res.ok ? res.json() : { products: [] }))
      .then((catData) => {
        if (!catData || !catData.products) return;
        const filtered = catData.products
          .filter((p) => String(p.id) !== String(id)) // exclude current
          .slice(0, 4);
        setRelated(filtered);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <p className="text-center text-gray-600">Loading product...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-12">
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-96 object-contain rounded shadow"
        />

        <div>
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-600 mb-2 capitalize">{product.category}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 text-center hover:shadow-lg transition flex flex-col"
              >
                <Link to={`/product/${item.id}`} className="flex-1">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-40 object-contain mb-3 rounded"
                  />
                  <h3 className="text-sm font-medium truncate">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </Link>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-3 w-full bg-black px-3 py-2 text-white rounded hover:bg-gray-800"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
