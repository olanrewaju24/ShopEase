import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Shoes() {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch shoes products from API
    fetch("https://dummyjson.com/products/category/mens-shoes") 
      .then((res) => res.json())
      .then((data) => {
        setShoes(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching shoes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading shoes...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shoes Collection 👟</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shoes.map((shoe) => (
          <div
            key={shoe.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4"
          >
            {/* Product Image */}
            <img
              src={shoe.thumbnail}
              alt={shoe.title}
              className="w-full h-48 object-cover rounded-xl"
            />

            {/* Title */}
            <h2 className="text-lg font-bold text-gray-900 mt-3">
              {shoe.title}
            </h2>

            {/* Price */}
            <p className="text-indigo-600 font-semibold mt-1">
              ${shoe.price}
            </p>

            {/* View More Button */}
            <Link
              to={`/product/${shoe.id}`}
              className="mt-3 inline-block bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
            >
              View More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
