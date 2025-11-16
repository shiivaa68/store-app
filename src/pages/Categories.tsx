// src/pages/Categories.tsx

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProductsByCategory, type Product } from "../api/products";

export default function Categories() {
  const [category, setCategory] = useState("all");

  const categories = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const { data, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ["products", category], // unique cache per category
    queryFn: () => fetchProductsByCategory(category), // must be a function!
    // keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div className="flex justify-center mt-20 text-xl">
        Loading products...
      </div>
    );

  if (isError)
    return (
      <div className="text-center mt-20 text-red-600 text-xl">
        Error: {error.message}
      </div>
    );

  return (
    <div className="p-4">
      {/* Category Filter */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-1"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto"
            />
            <h2 className="mt-2 font-bold">{product.title}</h2>
            <p className="mt-1 text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
