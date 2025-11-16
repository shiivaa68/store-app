import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import Categories from "./pages/Categories";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      {/* Simple Navigation */}
      <nav className="p-4 flex gap-4 bg-gray-100 shadow">
        <Link to="/">Products</Link>
        <Link to="/categories">Categories</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </>
  );
}

export default App;
