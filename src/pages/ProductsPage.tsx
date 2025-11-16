import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductsByCategory,
  type Product,
} from "../api/apiRoute";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [params] = useSearchParams();
  const selectedCategory = params.get("category") || "all";

  const { data, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory === "all"
        ? fetchProducts()
        : fetchProductsByCategory(selectedCategory),
  });

  if (isLoading) return <div className="p-4">Loading products...</div>;
  if (isError) return <div className="p-4">Error: {error.message}</div>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.map((product) => (
        <Link to={`/product/${product.id}`}>
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
        </Link>
      ))}
    </div>
  );
}
