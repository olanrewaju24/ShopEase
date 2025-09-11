import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const images = [
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="bg-green-600 text-white py-16 px-6 sm:px-12 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Discover the Best Deals <br /> at{" "}
            <span className="text-yellow-300">ShopEase</span>
          </h1>
          <p className="text-lg text-green-100 mb-8">
            Your one-stop shop for shoes, accessories, and more.  
            Shop smarter, save bigger, and enjoy seamless shopping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/products"
              className="bg-yellow-400 text-green-900 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
            >
              Shop Now
            </Link>
            <Link
              to="/signup"
              className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition"
            >
              Join Us
            </Link>
          </div>
        </div>

        {/* Right Slideshow */}
        <div className="flex-1 flex justify-center md:justify-end relative">
          <img
            src={images[current]}
            alt="Shopping"
            className="rounded-2xl shadow-lg w-full max-w-md h-80 object-cover transition-opacity duration-1000"
          />

          {/* Dots for navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full ${
                  current === i ? "bg-yellow-400" : "bg-white"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
