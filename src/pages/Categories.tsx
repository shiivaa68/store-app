import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/apiRoute";
import { Link } from "react-router-dom";

export default function Categories() {
  // fetch category names
  const { data, isLoading, isError, error } = useQuery<string[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading)
    return <div className="p-4 text-xl text-center">Loading categories...</div>;

  if (isError)
    return (
      <div className="p-4 text-xl text-red-600 text-center">
        Error: {error.message}
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add an "All" category */}
        <Link
          to="/?category=all"
          className="p-6 border rounded shadow hover:shadow-lg transition text-center font-semibold"
        >
          All
        </Link>

        {data!.map((cat) => (
          <Link
            key={cat}
            to={`/?category=${cat}`}
            className="p-6 border rounded shadow hover:shadow-lg transition text-center font-semibold capitalize"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
