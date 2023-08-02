import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:5000/api"; // Replace with your backend API base URL

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch products from the backend API
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_BASE_URL + "/products"); // Replace with your backend API endpoint
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
};

export default useProducts;
