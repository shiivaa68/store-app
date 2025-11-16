// src/pages/ProductsPage.tsx
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  fetchProducts,
  fetchProductsByCategory,
  searchProducts,
  type Product,
} from "../api/apiRoute";
import { useSearchParams, Link } from "react-router-dom";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [params] = useSearchParams();
  const selectedCategory = params.get("category") || "all";

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 1000); // 300ms delay
    return () => clearTimeout(handler);
  }, [search]);

  // React Query: fetch products based on category or search term
  const { data, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ["products", selectedCategory, debouncedSearch],
    queryFn: () =>
      debouncedSearch
        ? searchProducts(debouncedSearch)
        : selectedCategory === "all"
        ? fetchProducts()
        : fetchProductsByCategory(selectedCategory),
  });

  if (isLoading)
    return <div className="p-4 text-center">Loading products...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-600">Error: {error.message}</div>
    );

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 w-full max-w-md"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer">
              <img
                src={product.image}
                alt={product.title}
                className="h-40 mx-auto"
              />
              <h2 className="mt-2 font-bold">{product.title}</h2>
              <p className="mt-1 text-gray-600">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
