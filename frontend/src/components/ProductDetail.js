// src/components/ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ products }) => {
  const { id } = useParams(); // Use useParams to access the "id" parameter from the URL

  const productId = parseInt(id);

  // Find the product with the matching ID from the products array
  const product = products.find((item) => item.id === productId);

  // Handle cases when the product is not found
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container">
      <h1>{product.name}</h1>
      <div className="row">
        <div className="col-md-4">
          <img src={product.image} alt={product.name} className="img-fluid" />
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