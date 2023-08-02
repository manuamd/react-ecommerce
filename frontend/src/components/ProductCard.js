import React from "react";
import { Link } from "react-router-dom"; // Import the Link component

const ProductCard = ({ product }) => {
  return (
    <div className="card mb-3">
      {/* Wrap the ProductCard with a Link */}
      <Link to={`/products/${product.id}`} className="text-decoration-none">
        <img
          src={product.imageUrl}
          className="card-img-top"
          alt={product.name}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
