// src/pages/ProductsPage.tsx

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type Product } from "../api/products";

export default function ProductsPage() {
  const { data, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div className="p-4">Loading products...</div>;
  if (isError) return <div className="p-4">Error: {error.message}</div>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
  );
}
