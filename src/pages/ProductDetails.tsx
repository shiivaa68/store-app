import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById, type Product } from "../api/apiRoute";

export default function ProductDetails() {
  const { id } = useParams();
  const productId = Number(id);

  const { data, isLoading, isError, error } = useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId, // only run if id exists
  });

  if (isLoading) return <div className="p-4">Loading product...</div>;
  if (isError)
    return <div className="p-4 text-red-600">Error: {error.message}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img src={data?.image} alt={data?.title} className="w-60 mx-auto" />
      <h1 className="text-2xl font-bold mt-4">{data?.title}</h1>
      <p className="text-gray-600 mt-2">{data?.description}</p>
      <p className="text-xl font-semibold mt-4">${data?.price}</p>
      <p className="mt-2 text-sm text-blue-500">{data?.category}</p>
    </div>
  );
}
