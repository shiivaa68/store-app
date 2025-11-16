// src/api/products.ts
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(
    "https://fakestoreapi.com/products"
  );
  return data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await axios.get<string[]>(
    "https://fakestoreapi.com/products/categories"
  );
  return data;
};

export const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const url =
    category === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${category}`;

  const { data } = await axios.get<Product[]>(url);
  return data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await axios.get<Product>(
    `https://fakestoreapi.com/products/${id}`
  );
  return data;
};
