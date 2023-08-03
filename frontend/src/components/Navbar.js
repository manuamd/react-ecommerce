// components/Navbar.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from "./CartContext";
import { useAuth } from '../components/AuthContext';

const Navbar = () => {
  const { isLoggedIn, username, logout } = useAuth();                                     

  const { cartItems } = useContext(CartContext);

  const [totalItems, setTotalItems] = useState(0);

  // Calculate the total quantity of items in the cart when cartItems change
  useEffect(() => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0);
    setTotalItems(total);
  }, [cartItems]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        <i className="bi bi-cart3 me-2"></i> E-commerce Store
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="bi bi-house-door"></i> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              <i className="bi bi-grid"></i> Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              <i className="bi bi-cart3"></i> Cart {totalItems > 0 && <span className="badge bg-secondary">{totalItems}</span>}
            </Link>
          </li>
          {/* Add more links for other pages as needed */}
        </ul>
        {!isLoggedIn ? (
          <div className="d-flex">
            <Link to="/login" className="btn btn-primary me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        ) : (
          <div className="d-flex">
            <div className="me-3 text-white">Hi, {username}</div>
            <button className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;