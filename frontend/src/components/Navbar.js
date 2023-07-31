// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
              <i className="bi bi-cart3"></i> Cart
            </Link>
          </li>
          {/* Add more links for other pages as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;