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
  const { data } = await axios.get("https://fakestoreapi.com/products");
  console.log(data);
  return data;
};
