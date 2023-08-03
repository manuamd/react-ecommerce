import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import { CartContext } from "./CartContext";

const ProductCard = ({ product }) => {

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="card mb-3">
      {/* Wrap the ProductCard with a Link */}
     
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
      <Link to={`/products/${product.id}`} className="text-decoration-none">
        View Details
      </Link>
      <button onClick={handleAddToCart} className="btn btn-primary">Add To Cart</button>
    </div>
  );
};

export default ProductCard;
