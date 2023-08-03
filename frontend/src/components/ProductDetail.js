// src/components/ProductDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as constants from "../Constants";

const ProductDetail = () => {
  const { id } = useParams(); // Use useParams to access the "id" parameter from the URL

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Function to fetch the product details by ID from the backend API
    const fetchProductById = async () => {
      try {
        const response = await fetch(
          `${constants.API_BASE_URL}/products/${id}`
        ); // Replace with your backend API endpoint for fetching a single product
        const data = await response.json();
        setProduct(data); // Update the product state with the fetched product details
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductById();
  }, [id]);

  //Handle cases when the product is not found
  if (!product) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="container">
      <h1>{product.name}</h1>
      <div className="row">
        <div className="col-md-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-8">
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
